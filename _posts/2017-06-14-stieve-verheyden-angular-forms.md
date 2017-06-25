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

So the goal of this blog post is to investigate angular forms, during building a form based application that will allow people to preorder nachos accompagned by their favorite sauce.

# Angular forms
Angular provides two ways to work with forms: ***template-driven*** forms and ***reactive*** forms.
With template-driven forms, the default way to work with forms in Angular, template directives are used to build an internal representation of the form. With reactive forms, by contrast, you build your own representation of a form in the component class.

## Template-driven forms
Let's first start creating our order form, with a template-driven form. There is nothing wrong with template-driven forms, they allow us to create forms with a minimum of code. The only thing that we need to do is creating the form in HTML.

### Import FormsModule
In order to use Angular forms we need to import Angular’s **`FormsModule`** into our application module.

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
After this we can start creating our form layout:

``` html
    <form #orderForm="ngForm"
          (ngSubmit)="sendOrder(orderForm)"> 
        ...
        <button type="submit" [disabled]="!orderForm.valid">Order</button>
    </form>
```

When Angular finds a form in HTML, it will automatically assign the `ngForm` directive to that form. The `ngForm` directive tells Angular to create a `FormGroup` and bind it to the form. The FormGroup will track the state and values of the form.

To access the `ngForm` object we need to export the reference and import it into a ***template-reference variable***. A Template-reference variable is prefixed by a **#**. Here we export the `ngForm` into a the `#orderForm` template-reference variable. Now we can disable the submit button, when `ngForm` is not valid.

Our form is using the `ngSubmit` directive, this is a best practice. `ngSubmit` ensures that the form does not submit, when the handler code throws and causes an actual http post request.

### Adding input fields
Let's add an input field so that we know who ordered the nachos.

``` html
    ...
        <input id="inputName"
               type="text"
               required
               [(ngModel)]="order.name"
               name="name"
               #nameVar="ngModel"/>        
    ...
```

The `ngModel` directive will setup two-way binding between the *component*-class property and the view. Angular automatically creates a `FormControl` and adds it to the form model, for each *input*-element with a `ngModel` directive. The `name` attribute is required, without it Angular would not know how to name the `FormControl` within the form-model.
By using a template-reference variable `#nameVar` we can access the FormControl on another location, within the current template.

### Validation

How could we improve our nacho experience for our hungry developers? Wouldn't it be great to allow them to choose their sauce out of three sauces?
Let's add an input field, so users can enter a valid number, who's related to their choice of preference.

``` html
    ...
        <input id="inputSauceNumber"
               type="number"
               required
               min="1"
               max="3"
               [(ngModel)]="order.sauceNumber"
               name="sauceNumber"
               #sauceNumberVar="ngModel"/>
        <span class="help-block" *ngIf="sauceNumberVar.errors">
            <span *ngIf="sauceNumberVar.errors.required">The number of the sauce, is required</span>
            <span *ngIf="sauceNumberVar.errors.min">The number of the sauce, can not be lower than 1</span>
            <span *ngIf="sauceNumberVar.errors.max">The number of the sauce, can not be higher than 3</span>
        </span>
    ...
```

Template-driven forms leverage the HTML validation attributes for validation. By using `*ngIf` the `errors` property can be checked and an appropriate error message can be displayed.

### Conclusion
One of the advantages of template-driven forms is that we barely need code. The only piece of code that you need to write is adding the model to the component-class.
Angular will handle all the rest.
But what if we need to write bigger forms? Those forms will end up in huge chunks of HTML and will become difficult to read and maintain.
What about complex situations? Let's say that we would also allow people to choose their own sauce and choose more than just one sauce. The form will need to be able to add an additional input-element, identical to the *sauceNumber* input-element.
