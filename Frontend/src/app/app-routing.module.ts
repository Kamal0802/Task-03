import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { SignupLoginComponent } from './layouts/signup-login/signup-login.component';
import { SignupComponent } from './layouts/signup-login/signup/signup.component';
import { SingleProductComponent } from './product/single-product/single-product.component';
import { UserDetailsComponent } from './profile/user-details/user-details.component';
import { CartComponent } from './profile/cart/cart.component';
import { OrderComponent } from './profile/order/order.component';

const routes: Routes = [
  {path:'',title:"Amazon.com",component:HomeComponent},
  {path:'login',title:"Amazon-login",component:SignupLoginComponent},
  {path:'signup',title:"Amazon-singup",component:SignupComponent},
  {path:'singleProd/:id',title:"Amazon.com",component:SingleProductComponent},
  {path:'user-details',title:"Amazon.profile",component:UserDetailsComponent},
  {path:'cart',title:"Amazon-cart",component:CartComponent},
  {path:'order',title:"Amazon-order",component:OrderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
