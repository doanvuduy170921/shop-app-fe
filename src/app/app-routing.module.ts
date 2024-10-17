import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {DetailProductComponent} from "./component/detail-product/detail-product.component";
import {OrderComponent} from "./component/order/order.component";
import {OrderConfirmComponent} from "./component/order-confirm/order-confirm.component";
import {CartComponent} from "./component/cart/cart.component";
import {UserInfoComponent} from "./component/user-info/user-info.component";
import {AdminComponent} from "./admin-page/admin/admin.component";
import {AdminNavbarComponent} from "./admin-page/admin-navbar/admin-navbar.component";
import {ManageProductComponent} from "./admin-page/manage-product/manage-product.component";





const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
 // {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'product/detail/:id',component:DetailProductComponent},
  {path:'orders',component:OrderComponent},
  {path:'cart',component:CartComponent},
  {path:'user-info',component:UserInfoComponent},

  {path:'admin',component:AdminComponent},

  {path:'admin/mn-product',component:ManageProductComponent},



  {path:'orders-confirm',component:OrderConfirmComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
