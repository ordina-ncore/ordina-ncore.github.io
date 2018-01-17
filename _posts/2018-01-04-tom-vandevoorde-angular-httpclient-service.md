---
layout: post
authors: [tom_vandevoorde]
title: "A close look at Angular's new HttpClient"
image: /img/angular-httpclient/ng-be.jpg
tags: [Angular, HTTP]
category: Angular
comments: true
---

This year Ordina send me, together with some of my colleagues, to NG-BE in Ghent. The entire day I attended presentations given by good speakers. One of these talks that got my attention, was one ginving an overview on how to communicate over HTTP with Angular 4.3.x and later versions.

> In AngularJS, HTTP requests were done using $http. Since Angular 2, this service was completely rewritten into a separate Http module. It now returns observables through RxJS, whereas $http in AngularJS returned Promises. Because this new service was experimental and only based on the most common use cases, it did not provide the full list of features the old $http service had, in AngularJS.

A new **`HttpClient`** service has been introduced in *Angular 4.3.x*. This new service includes all the features of the `$http` service of AngularJS and a lot of additional features. It still returns `Observables` through RxJS like the **`Http`** Service of Angular 2. 
Since Angular 5.x, the old Http Service is marked as ***deprecated***.

## Basics

### Injecting
The imported module is now **`HttpClientModule`** from `@angular/common/http` instead of *`HttpModule`* from *`@angular/http`* and the injectable is now **`HttpClient`** instead of *`Http`*.

#### Before Angular 4.3.x
{% highlight typescript %}
import { HttpModule} from '@angular/http';
@NgModule({
  ...
  imports: [
    HttpModule
  ],
  ...
})
import { Http } from '@angular/http';
constructor(http: Http) {}
{% endhighlight %}

#### Starting from Angular 4.3.x
{% highlight typescript %}
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  ...
  imports: [
    HttpClientModule
  ],
  ...
})
import { HttpClient } from '@angular/common/http';
constructor(httpClient: HttpClient) {}
{% endhighlight %}

### Making Http Requests
You do not have to serialize or deserialize JSON data anymore and you can define the response type now. There is also a simpler way for defining headers.

#### Before Angular 4.3.x
{% highlight typescript %}
let headers = new Headers({ 
  'Content-Type': 'application/json',
  'Accept', 'application/json'
});

let params = new URLSearchParams().set('city', 'Mechelen');

this.http.get('http://localhost/hotels', {headers, params }
      .map((res: Response) => {
        return res.json();
      });
{% endhighlight %}

#### Starting from Angular 4.3.x
The syntax for setting headers is simplified. You now have to instantiate `HttpHeaders` and pass (‘header’, ‘value’) into the set or append functions.

{% highlight typescript %}
let headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .append('Accept', 'application/json');

let params = new HttpParams().set('city', 'Mechelen');

this.httpClient.get('http://localhost/hotels', {headers, params });

{% endhighlight %}

**Response type definition**
You can *explicitly* set the *expected return type*.

{% highlight typescript %}
this.httpClient.get<Hotel[]>('http://localhost/hotels', 
  {headers, params });
{% endhighlight %}

**Getting the full HTTP response**

{% highlight typescript %}
this.httpClient.post<HotelBooking>('http://localhost/hotels', 
{ headers, observe: 'response' })
      .pipe(
        map((response: HttpResponse<HotelBooking>) => {
          console.debug('status', response.status);
          console.debug('body', response.body);
          return response.headers.get('Location');
      }));
{% endhighlight %}

**Using an XML response and parseString from xml2js to convert xml to object**

{% highlight typescript %}
this.httpClient.get(url, {headers, params, responseType: 'text' })
  .pipe(
    switchMap(xmlString => {
      let observableFactory = bindCallback(parseString);
      return observableFactory(xmlString, parserOptions);
    }),
    map(js => js[1].hotelBooking)
);
{% endhighlight %}

**Downloading binary data**
You just have to set the response type to blob.

{% highlight typescript %}
downloadFile(id: number): Observable<any> {
  return this.httpClient.get(`http://localhost/hotel/${id}`, 
    {responseType: 'blob' });
}
{% endhighlight %}

**Uploading binary data**
You can send the File object, which inherits from blob, using the put or post methods. You can also observe events and change the return type if you want to use, for example, progress events.

{% highlight typescript %}
uploadFile(id: number, file: File): Observable<HttpEvent<object>> {
  return this.httpClient.put((`http://localhost/hotel/${id}`, 
    file, {reportProgress: true, observe: 'events' });
}

uploadFile.subscribe(
  event => {
    if (event.type === HttpEventType.UploadProcess) {
       this.percentDone = Math.round(event.loaded / event.total * 100);
    } else if (event instanceof HttpResponse) {
      this.percentDone = 100;
      console.debug('response', event);
    }
  },
  err => console.error('err', err);
);
{% endhighlight %}

## Interceptors
An interceptor provides a hook that allows you to *modify requests and responses globally*. Because of this, interceptors are interesting for including headers, for example for security headers. You can also use interceptors for parsing data formats, like XML. You could also do global error handling or caching using interceptors.
Interceptors use the *Chain of Responsibility* pattern. The first interceptor decorates the logic and is decorated by another interceptor, which on his turn is decorated again by another interceptor and so on. The request then has to pass all interceptors, which can manipulate the request, and end up at the logic. Then the response has to pass back through the interceptors in the opposite way. An interceptor can also shortcut the request which will prevent it from being sent to the logic.
To create your own interceptor, you have to implement `HttpInterceptor` and the intercept method. The first parameter is the HttpRequest and the second is the HttpHandler of the next interceptor in the chain.

### Sending an Access Token, with each request
We check if the current url is a url for our own back-end because we only want to send the token there. Then we get the token from the storage and set the header. We then have to create a new request, based on the old request because the old request is immutable and we want to add the header. After this, we call the next part of the chain.

{% highlight typescript %}
public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let url = req.url.toLowerCase();

        if (url.startsWith('http://www.angular.at/api')) {
            let token = this.authStorage.getItem('access_token');
            let header = 'Bearer ' + token;

            let headers = req.headers
                                .set('Authorization', header);

            req = req.clone({ headers });
        }

        return next.handle(req).pipe(
             map(event => event),
             catchError(err => this.handleError(err))
        );
    }
{% endhighlight %}

### Global error handling
In the previous code, we catch errors from the response and pass them to the method below.

{% highlight typescript %}
handleError(error: HttpErrorResponse) {
  console.error('error intercepted', error);
  if (error.status === 401 || error.status === 403) {
    this.router.navigate(['/home', {needsLogin: true}]);
    return of(null);
  }
  return of(error);
}
{% endhighlight %}

### Registering an interceptor
{% highlight typescript %}
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
{% endhighlight %}

## Conclusion
The new `HttpClient` brings back the great features that the old *`$http`* had but is much easier to use. It is easier to get the entire response and the events by using observe. The new `HttpClient` also has a powerful **Interceptor Chain** which allows you to modify the request and responses globally.
You can watch the presentation by Manfred Steyer on [YouTube](https://youtu.be/GFX6tsSLwYQ).