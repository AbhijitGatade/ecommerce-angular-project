import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './general/header/header.component';
import { FooterComponent } from './general/footer/footer.component';
import { HomeComponent } from './general/home/home.component';
import { AboutComponent } from './general/about/about.component';
import { ContactComponent } from './general/contact/contact.component';
import { ProductsComponent } from './general/products/products.component';
import { AdminloginComponent } from './general/adminlogin/adminlogin.component';
import { LoginComponent } from './general/login/login.component';
import { RegisterComponent } from './general/register/register.component';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { ProductComponent } from './general/product/product.component';
import { CartComponent } from './general/cart/cart.component';
import { CheckoutComponent } from './general/checkout/checkout.component';
import { OrdersuccessComponent } from './general/ordersuccess/ordersuccess.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductsComponent,
    AdminloginComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    OrdersuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
