---
layout: post
authors: ["jeroen_rombouts"]
title: 'Workshop Advanced RxJS in angular'
image: /img/advanced-rxjs-workshop/banner.png
tags: [RxJS, conferences, NG-BE]
category: Conferences
comments: false
---
On Thursday 7 December, early in the morning at 7:30, I made my way to the Holiday Inn near the Expo in Ghent for a full day workshop about advanced RxJS.
The workshop was given by Brecht Billiet and Kwinten Pisman, collectively known as Strongbrew.
I already had a workshop lead by these guys last year (about reactive programming with NgRx), so I knew that they know their stuff.

About a week ago all participants had received an email with all information and prerequisites for taking the workshop: access to Gitlab repos where the exercises where hosted, a special Slack channel for the workshop, how to install Git, Node and Npm, how to install a trial version for Webstorm (a JavaSript IDE from JetBrains), configure it for Typescript and include WallabyJS (an awesome Integrated continuous testing tool).
Just like last year the instructions where easy to follow.

The workshop started with explaining and showing what the problem was that RxJS was meant to solve: asynchronous programming is hard and why and how functional reactive programming could help.

Next up: the basic observables and operators: since I already have a background in RxJS, I’m not really qualified to say if this was covered in a way to help people completely new to the material, but I think that it did.
The metaphor of a pneumatic tube was a good one.
The JsBin examples used to show code working where also well prepared.
Luckily after all that theory we could start writing code with the first number of exercises.

Also before lunch: the more dreaded subject of -errr -Subjects, hot vs cold observables and higher order observables.
And of course, this was followed by a enough exercises to keep you busy after the workshop has ended.
The giphy app was a nice example to work with.

In the afternoon we covered some more theory, like multicasting.
But the most important thing Kwinten and Brecht covered was a way to think about your web app as a stream of events.

They call it the **SIP** principle:
* **S**: Source streams
* **I**: intermediate streams
* **P**: presentation streams

How it works:
1. Source streams: define what the user can do, in terms of streams and make a list of them.
2. Presentation streams: these are the streams of things your application needs to render.
3. Make intermediate streams: compare the list of source streams to the list of presentation streams. First, mark those that are identical as the source stream as OK. For the others, find intermediate streams by combining source streams, and where necessary combining intermediate streams.
4. Make a SIP schema of all source, intermediate and presentation streams. This will make clear if everything is covered and which streams need to multicast, if any.
Simple, yet effective!

One of the most difficult things in working with streams is debugging. You could do it by putting .do(console.log) everywhere in your code, but that’s hardly ideal.
Kwinten has helpfully created a [Chrome plugin](https://chrome.google.com/webstore/detail/rxjs-developer-tools/dedeglckjaldaochjmnochcfamanokie) that can help with this.
It visualizes the marble diagrams of your streams.
He did state that is was still a work in progress and doesn’t (yet?) work with lettable operators.
There are alternatives, like RX-spy and RxFiddle.

After that, Brecht and Kwinten cleared something up for me that I didn’t know: where to put error handling in a observable chain.
Putting a throw in the wrong place breaks the observable chain.
This is especially problematic if you want to keep receiving events from a stream after an error, since an error stops a stream.
The last part is about the future of RxJS.
RxJS was not made with bundling in mind.
That’s why it’s all too easy to import too much into your applications and make it too big.
The build-in tree-shaking of the Angular compiler doesn’t work because we have to use prototype patching to include parts of the RxJS lib.
Another problem is that it’s very difficult to write your own operators.

The first and biggest new thing in RxJS 5.5 are **[lettable operators](https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md)**.
Lettable operators can be imported from ‘rxjs./operators’ (instead of the old patch from ‘rxjs/add/operator/*’ some operators had their name changed.
Most importantly, the **`let`** operator is now **`Observable.prototype.pipe`** and cannot be imported.
That method is used to compose operators, instead of the more traditional dot-notation.

As an example: this is dot-notation:
{% highlight javascript %}
Sources$
.filter(x => x%2 ==0)
.map(x => 2*x )
.subscribe(x => console.log(x))
{% endhighlight %}

With pipe:
{% highlight javascript %}
Sources$.pipe(
filter(x => x%2 ==0),
map(x => 2*x )
)
.subscribe(x => console.log(x))
{% endhighlight %}

**Important note**: in version 6.0 patch operators will be deprecated and removed in version 7.0.
In the final part Brecht gave us some other pointers about using RxJS about how to handle clean-up of manual subscriptions in the `ngOndestroy` lifecycle hook or by using a `destroy$` stream with `takeUntil()`.
Brecht has written an npm package that introduces a @Destroy and @Changes decorator.
It can be found here: [https://www.npmjs.com/package/ngx-reactivetoolkit](https://www.npmjs.com/package/ngx-reactivetoolkit)

Other general guidelines where covered too: don’t pass streams to components or services, avoid manual subscription whenever possible, avoid Subject unless really necessary, `switchMap` is *usually saver* than `mergeMap`.

The workshop finished with us building a Calendar app from scratch, using the above mentioned SIP method.

All in all, an information packed workshop.
I think that for a complete RxJS beginner this workshop might be a bit too intense, but if you have the basics down, this is a very good one.
Both Brecht and Kwinten are very knowledgeable about the material and have prepared a good workshop.