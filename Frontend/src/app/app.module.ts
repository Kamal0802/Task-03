import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './layouts/home/home.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { FeatureProductsComponent } from './product/feature-products/feature-products.component';
import { SingleProductComponent } from './product/single-product/single-product.component';
import { SignupLoginComponent } from './layouts/signup-login/signup-login.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './layouts/signup-login/signup/signup.component';
import { UserDetailsComponent } from './profile/user-details/user-details.component';
import { OrderComponent } from './profile/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './profile/cart/cart.component';
import{NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductListComponent,
    FeatureProductsComponent,
    SingleProductComponent,
    SignupLoginComponent,
    SignupComponent,
    UserDetailsComponent,
    OrderComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
    

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
