---
layout: post
authors: ["stieve_verheyden"]
title: 'Angular forms @ Techorama 2017'
image: /img/Techorama2017/techorama-banner.jpg
tags: [Techorama, conferences, Angular]
category: Conferences
comments: false
---

> Like every year Ordina Belgium gives a lot of their consultants the opportunity to attend Techorama. This year Ordina offered nachos at their booth for all the hungry developers ;). After attending a session about Angular Forms, given by Deborah Kurata, I was thinking about how we could improve our nachos service next year. Maybe we should allow people to order nachos in advance, by using a web-application based on Angular forms.

Before we start building our application it might be interesting to know the different approaches that can be used while working with Angular Forms.

# Different approaches
Angular provides two ways to work with forms: ***template-driven*** forms and ***reactive*** forms. With *template-driven* forms, the default way to work with forms in Angular, template directives are used to build an internal representation of the form. With *reactive* forms, you build your own representation of a form in the component class.

Let’s start by using template-driven forms and see how far we get.

# Template-driven forms
Let's start by creating our order form with the template-driven approach.

### Import FormsModule
In order to use Angular forms we need to import Angular’s **`FormsModule`**, who can be found in the `@angular/forms` module, into our application module *(AppModule.ts)*.

``` typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export AppModule {}
```

### Creating the form
We first need to create a component. This can be done quickly by using the angular-cli.
``` shell
    ng generate component template-driven
```

Now we can start creating our form layout in the component html file.
``` html
    <form (ngSubmit)="sendOrder()"> 
        ...
        <button type="submit">Order</button>
    </form>
```

When Angular finds a form it will automatically been seen as a `ngForm` directive. This is because the `ngForm` directive has a selector matching `<form>`. The `ngForm` directive tells Angular to create a `FormGroup` and bind it to the form. The `FormGroup` will track the state and values of the form.

Our form is using the `ngSubmit` directive, this is a best practice. `ngSubmit` ensures that the form does not submit, when the handler code throws and causes an actual http post request.

### Template-reference variables
Now that we have a form and a submit button I would like to disable the submit button when the form is not valid, by checking the valid property of the `ngForm` instance. To access the `ngForm` instance we need to export the reference and import it into a **template-reference variable**. A Template-reference variable is *prefixed by a **#***. Here we export the `ngForm` into a the `#orderForm` template-reference variable. Now we can disable the submit button when our `ngForm` is not valid.
``` html
    <form #orderForm="ngForm"
          (ngSubmit)="sendOrder(orderForm)"> 
        ...
        <button type="submit" [disabled]="!orderForm.valid">Order</button>
    </form>
```

### Adding input elements
A form does not make a lot of sense when it does not contain any input fields. So this will be our next step.
``` html
    ...
        <input id="inputFirstName"
               type="text"
               required
               [(ngModel)]="order.firstName"
               name="firstName"
               #firstNameVar="ngModel"/>        
    ...
```
The `ngModel` directive will setup two-way binding between the *component*-class property and the view. Angular automatically creates a `FormControl` and adds it to the form model, for each *input*-element with a `ngModel` directive. The `name` attribute is **required**, without it Angular would not know how to name the `FormControl` within the form-model.
By using a template-reference variable `#firstNameVar` we can access the FormControl on another location, within the current template.

### Validation
Template-driven forms leverage the HTML validation attributes for validation. By using `*ngIf` the `errors` property, of an input element, can be checked and an appropriate error message can be displayed.
``` html
    ...
        <input id="inputFirstName"
               type="text"
               required
               [(ngModel)]="order.firstName"
               name="firstName"
               #firstNameVar="ngModel"/>
        <span style="color: red" [hidden]="firstNameVar.valid || !firstNameVar.touched">
            <small *ngIf="!firstNameVar.errors.required">{{'Please enter your first name'}}</small>
        </span>
    ...
```
Angular provides us a subset of built-in validators out of the box. We can apply them either declaratively as directives on elements in our DOM. Next to this Angular allows us to easily extend with custom validators, but this is outside the scope of this post.

# Reactive forms
Let’s see how much effort we need to refactor our template-driven form into a reactive or model-driven one. When taking the reactive form approach we will define the form-model by creating the `FormGroup` and the form instance our self, in our component-class. After this we’ll bind the template to our form model. This means that the form won’t be modifying our data model directly.

### Import ReactiveFormsModule
First thing we need to do is loading the correct module. To be able to use Reactive form directives we need to import Angular’s `ReactiveFormsModule`, who can also be found in the `@angular/forms` module, into our application module (AppModule.ts).

``` typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export AppModule {}
```

### Refactor the component class
Let’s start refactoring. In the template-driven part we saw that Angular, behind the scenes, creates a `FormGroup` for each form it encounters. We’ll start by creating our form model by initializing a `FormGroup`. The best place to initialize the form is in the `ngOnInit()` method, who is one of the lifecycle hook methods that is called shortly after the creation of our component.
``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Order } from '../models/order';

@Component({
  selector: 'app-reactive',
  ...
})
export class ReactiveComponent implements OnInit {
  orderForm: FormGroup;
  order: Order;
  ...
  ngOnInit() {
    this.orderForm = new FormGroup();
  }
  ...
}
```
Great we now have a form, but it’s an empty one. So the next step will be to add a `FormControl` for each input element.
``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Order } from '../models/order';

@Component({
  selector: 'app-reactive',
  ...
})
export class ReactiveComponent implements OnInit {
  orderForm: FormGroup;
  order: Order;
  ...
  ngOnInit() {
    this.orderForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      mySauce: new FormControl('chili')
    });
  ...
}
```
By passing a value to the first parameter, of the `FormControl` constructor, we can set default values.

### Linking to the template
After defining our form and its controls, in the component class, we need to link it with our template.
``` typescript
    <form [formGroup]="orderForm"
          (ngSubmit)="sendOrder()">
    ...
    </form>
```
This can be done by using the `formGroup` directive, who will connect our model with the form template.

The next thing we need to do is connect all the form controls to the model.
``` html
    <form [formGroup]="orderForm"
          (ngSubmit)="sendOrder()">
    
    <label for="inputFirstName">First Name:</label>
    <input id="inputFirstName"
                type="text"
                required
                formControlName="firstName"/>
    ...
    </form>
```
We replaced the combination of an `ngModel` and `name` attribute, like in template-driven forms, by a single `formControlName` directive. The `formControlName` directive will make the association between the form controls and the model.

### Accessing the From Model properties
When using template-driven forms we could make usage of template-reference variables to access form objects somewhere else in the template. 
Reactive forms requires another approach.
``` html
    <form [formGroup]="orderForm"
          (ngSubmit)="sendOrder()">
    
        <label for="inputFirstName">First Name:</label>
        <input id="inputFirstName"
            type="text"
            required
            formControlName="firstName"/>
        <span style="color: red" *ngIf="(orderForm.get('firstName').touched && !orderForm.get('firstName').valid)">
            <small *ngIf="orderForm.get('firstName').errors.required">{{'Please enter your first name'}}</small>
        </span>

    ...
    </form>
```

By using `orderForm.get('firstName')` you are requesting the firstName FormControl of our main FormGroup.

### Validation
There are different ways to add validation, when using reactive forms, we can either add them as directives to the template or to the `FormControl` instance in our model.
We will add the validations directly to the `FormControl`.
``` html
    ...
        <label for="inputFirstName">First Name:</label>
        <input id="inputFirstName"
               type="text"
               formControlName="firstName"/>
    ...
    </form>
```
First we need to remove the `required` attribute from our template.

``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../models/order';

@Component({
  selector: 'app-reactive',
  ...
})
export class ReactiveComponent implements OnInit {
  orderForm: FormGroup;
  order: Order;
  ...
  ngOnInit() {
    this.orderForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mySauce: new FormControl('chili')
    });
  }
  ...
```
When more than one validator is needed an array of validators can be passed.

# Summary
This was a very quick intro to Angular Forms and it's only a tip of the iceberg. We can do a lot more with forms but the intention was to give an overview about basic funtionality that we use day in and day out when working with forms.

Here is a small overview of both ways:

|   Template-driven	        |   Reactive
|---------------------------|---	
|Easy to use   	            |Flexibel   	
|Similar to AngularJs  	    |More code
|2-way data binding   	    |Immutable data model
|automatic tracking of state|Easier to test, because everything is in code