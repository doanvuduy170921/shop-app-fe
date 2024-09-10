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
import {FormsModule} from "@angular/forms";
import {TokenInterceptor} from "./interceptors/token.interceptor";

@NgModule({
  declarations: [
    HomeComponent,
     HeaderComponent,
     FooterComponent,
     DetailProductComponent,
     OrderComponent,
     OrderConfirmComponent,
     LoginComponent,

     RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [//DetailProductComponent,
   HomeComponent,
 // DetailProductComponent
   // OrderConfirmComponent
  //  OrderComponent
   // LoginComponent
   // RegisterComponent
  ]
})
export class AppModule {

}
