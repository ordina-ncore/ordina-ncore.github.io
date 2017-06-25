---
layout: post
authors: ["stieve_verheyden"]
title: 'Overview of Angular talks @ Techorama 2017'
image: /img/Techorama2017/techorama-banner.jpg
tags: [Techorama, conferences, Angular]
category: Conferences
comments: false
---

> Third year in a row, that Ordina Belgium gave me the opportunity to attend Techorama, this together with a lot of my enthusiastic colleagues.
As a web enthusiast, I was particularly interested in the talks related to ASP.Net Core and Angular. 
This blogpost contains small summaries, of sessions that caught my attention.

# Angular 2 Modules (Deborah Kurata)

### The differences between ES2015/Typescript modules and Angular modules?

|ES2015 / Typescript module                        | Angular module                                                         |
|--------------------------------------------------|------------------------------------------------------------------------|
|Is a code file                                    | Contains different Angular parts like: components, pipes, services, ...|
|Can **export** and/or **import** other code files.| A way to **organize** your application **by functionality**.           |
|A way to organize your code.                      | Just a class with a NgModule decorator.                                |

### Services and the providers array

Developers tend to group specific functionality into custom services.
Thanks to Angular's dependency injection framework we could, for example, inject an instance of our service into a component.
By adding your services to the `providers`-array in the `@NgModule` decorator, your services will be registered within the DI framework.
When an Angular application starts all elements, within the `providers`-array, are registered by the injector. 
It's the injector that will inject services over the entire application. 
This special behaviour is the reason why the providers array **ONLY** contains services.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CalculatorService } from "./calculator.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule    
  ],
  providers: [CalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


### RouterModule: .forRoot([...]) vs .forChild([...])

