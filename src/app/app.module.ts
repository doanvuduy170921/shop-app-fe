import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { OrderComponent } from './component/order/order.component';
import { OrderConfirmComponent } from './component/order-confirm/order-confirm.component';
import { LoginComponent } from './component/login/login.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { RegisterComponent } from './component/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptor, TokenInterceptor} from "./interceptors/token.interceptor";
import {PaginatorModule} from "primeng/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppComponent } from './app/app.component';
import {AuthService} from "./services/AuthService";
import {TableModule} from "primeng/table";
import { CartComponent } from './component/cart/cart.component';
import {RatingModule} from "primeng/rating";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    HomeComponent,
     HeaderComponent,
     FooterComponent,
     DetailProductComponent,
     OrderComponent,
     OrderConfirmComponent,
     LoginComponent,
      AppComponent,
     RegisterComponent,
      AppComponent,
      CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PaginatorModule,
    BrowserAnimationsModule,
    TableModule,
    RatingModule,
    ButtonModule
  ],
  providers: [
    authInterceptor,
    AuthService
  ],
  bootstrap: [
    AppComponent
    // DetailProductComponent,
    // HomeComponent,
    // DetailProductComponent
    // OrderConfirmComponent
    // OrderComponent
    // LoginComponent
    // RegisterComponent
  ]
})
export class AppModule {

}
