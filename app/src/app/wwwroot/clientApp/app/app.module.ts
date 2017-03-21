import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import BooksComponent from "../books/books.component";
import LoginComponent from "../login/login.component";
import AlertComponent from "../alert/alert.component";
import NavBarComponent from "../navbar/navbar.component";
import CheckoutComponent from "../checkout/checkout.component";



const appRoutes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'books', component: BooksComponent },
    { path: 'login', component: LoginComponent },
    { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule,ReactiveFormsModule, HttpModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, NavBarComponent,BooksComponent,LoginComponent,CheckoutComponent,AlertComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }