import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {DetailProductComponent} from "./component/detail-product/detail-product.component";
import {OrderComponent} from "./component/order/order.component";
import {OrderConfirmComponent} from "./component/order-confirm/order-confirm.component";
import {CartComponent} from "./component/cart/cart.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
 // {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'product/detail/:id',component:DetailProductComponent},
  {path:'orders',component:OrderComponent},
  {path:'cart',component:CartComponent},
  {path:'orders-confirm',component:OrderConfirmComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
