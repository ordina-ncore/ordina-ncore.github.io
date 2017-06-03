---
layout: post
authors: [pieter_nijs]
title: 'Techorama 2017 - My thoughts and takeaways'
image: /img/Techorama2017/ncore.jpg
tags: [Techorama, conferences]
category: Conferences
comments: true
---
> As every year, Ordina Belgium sends a whole bunch of consultants to Techorama. After all, we are – together with Microsoft – Ultimate partner of this great event.
In this blogpost, I’ll briefly summarize my overall thoughts of this event and I’ll go deeper into some things I’ve picked up from some sessions.

# Overall
First of all: the event itself. This year was the first year that it was being held in Antwerp, instead of Mechelen. This was necessary due to the fact that the venue in Mechelen was simply becoming too small to handle the number of visitors (1400!!). Even in such a big venue, it sometimes felt a bit crowdy in the Partner Expo, especially during lunch. But, even that was no real biggy: the weather was great so once we had our food, we could go outside and enjoy the sun. Is it just me, or is the weather always great during Techorama? 
About the food: it was GREAT: Belgian fries (what else?), Deluxe burger, pappardelle, meatloaf, BBQ sausage, Beef curry, pizza, Belgian waffles, … It reminded me a lot of NDC! And that, ladies and gentlemen, is a true compliment!
The sessions in general were of very good quality. Of course, they can’t all be at the same level. There were a few sessions that weren’t as favorable as others… I’m not saying they were bad, not at all! But I guess at some point you just get a bit spoiled with speakers like Scott Guthrie, Marcel De Vries, Shawn Wildermuth, Donovan Brown, Kasey Uhlenhuth, … First world problems! 😊

# Session takeaways
I’ve seen a lot of great session this year. And there are a few things that stayed with me that I would like to share.

**Azure: The intelligent Cloud (Scott Guthrie)**
- Microsoft is all-in on Azure.
- 90% of the fortune 500 uses Azure.
- Azure stack is the ideal solution for companies that -for whatever reason- don’t want to run their code or host their data in the public cloud. 
- Azure stack is the ideal solution for situations where there is no guarantee of an internet connection, so you run Azure on your own hardware.
- Xamarin Live Player looks great! It will definitely speed up development of Xamarin apps (although I think Scott had another version running than I have, because I didn’t get any further than a few exceptions yet… 😉)
- Cosmos DB is great for when you want to replicate your data around the globe, bringing it as close to your users as you can.
- The Gu can get UI tests working in Visual Studio Mobile Center (I don’t… )
- The Gu knows how to close VIM!

![Microservices](/img/Techorama2017/thegu.jpg)

**Containerized Delivery with Visual Studio Team Services and Docker (Rene van Osnabrugge)**

*Note: Yes, I am a Docker-n00b. So, this session was literally my introduction into Docker.*

- This container thing looks nice and promising.
- Prepare a Docker image and easily distribute it to anybody you want (via DockerHub or Azure Docker Registry) so they can easily and instantly can start playing Super Mario Bros. (or do anything else on it for that matter 😉)
- Need a SQL server to test some stuff => download and run Docker image in just a couple of seconds.
- Deliver your application -together with everything that is needed to run it- on a container. Productivity++, ITProHapiness++, DevHapiness++
- CD pipeline becomes a lot simpler!

**Architecting systems for Continuous Delivery (Marcel De Vries)**
- Monoliths = tightly-coupled, multi-tier, software.
- We know monoliths are a bad thing, so we started to use SOA some years ago.
- In most cases, SOA based architectures are still a monolith…
- … even worse; they are a distributed monolith.
- It’s about time to really break our monoliths in smaller, independent pieces.
- These pieces are vertical components/layers in your software, like Search or Recommendations, Shopping Cart, …
- If you want to make this work, the whole company should be structured in these verticals (Conway's law).
- Every vertical should use the tools/frameworks that are best suited to deal with the problem. After all, as these verticals run independently, this will not affect any other verticals.
- Every vertical can be developed on, built and released at its own pace without interfering with any other verticals

**Introduction to ASP.NET Core and Visual Studio 2017 (Shawn Wildermuth)**

*Note: as a mobile developer, I haven’t worked with ASP.NET (MVC) for years. So, I was really excited to see how this product evolved over the years, especially now with .NET Core.*

- ASP.NET Core is not much at its core.
- It won’t do any secret mumbo jumbo in a black box, everything is simple and transparent.
- It doesn’t force you into anything. Want to manually write output to the browser (even no html or whatsoever)? You can! Want to use MVC? You can! You just need to install a few packages and add a minimum configuration code. Just want to serve a document? You can! Want to use webforms? YOU CAN’T! And that’s a good thing, you really should seek some help if you wanted to do this.
- More transparent about which files will get distributed when publishing your site
- Shawn doesn’t like Serif font… And don’t ask him about it, especially not when his wife is around…

**Microservices – But not like that (Udi Dahan)**
- I guess this session was like how Neo must have felt when he took the red pill… 
- Microservices are the next big thing after REST
- But it is not the silver bullet, it won’t solve things like wrong requirements or bad processes.
- It is very important to model the structure of the company when going for micoservices (Conway's law).
- Passing an id from one service to another (instead of the whole object) doesn’t make the system loosely coupled when both services connect to the same DB in the end.
- Don’t try to fight things that just need to be done (adding a field to the DB and showing it on the screen will always require you to do some work on multiple levels/layers)
- Every service should use the tools/frameworks that are best suited to deal with the problem.

![Microservices](/img/Techorama2017/microservices.jpg)

**Reactive programming by Example (Peter Himschoot / Lander Verhack)**
- Reactive programming is like collections in an asynchronous way.
- Very powerful!
- Reactive Extension in .NET is a separate package that needs to be installed.
- Might look easy to start with, but it tends to get very complex very fast when you are new to it.
- Reactive programming is not there to solve only specific problems like Search, it can be used in a wide spectrum (but I guess you only see that when you have a good understanding of it)

**DevOps on the Microsoft Stack with Donovan Brown**
![That's what it is all about](/img/Techorama2017/devops.jpg)
- Donovan Brown is a great guy! I talked to him before his session, he is a very nice guy to talk to.
- He shares my opinion and pains about Visual Studio Mobile Center: it is a good start, but things like UI test should be fully integrated in the pipeline…
- … the team is working hard on this (and other) features that will make Mobile Center great!
- “DevOps is the union of people, process, and products to enable continuous delivery of value to our end users.”
- Why DevOps? Your competition is already doing it! If you don’t start now, you’ll never catch up!
- Why DevOps? Increase velocity, reduce downtime, reduce human error.
- DevOps on any platform, any technology => Microsoft supports it!

**.NET Code Style: code your way in Visual Studio 2017 (Kasey Uhlenhuth)**
- Kasey likes Belgian waffles!
- DYK in America they have barbaric things like Hot Crispy Chicken waffles?
- In Visual Studio 2017, in Tools, Options, Code Style menu, you can already define some preferences regarding code style.
- You can also define an editorconfig in which you can define your preferred coding style. If you check this in in your source control system, contributors will also have these guides.
- There is this thing called Kebap case? This-Is-Kebap-Case (see this pin going through my words?)
- Already some things about code style are in Visual Studio 2017, there is many more to come in the coming updates.

----------

Techorama 2017 was great! Met a lot of great people at the conference and attended some great sessions! 

**See you next year!!**
