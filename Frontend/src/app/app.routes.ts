import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { CartComponent } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { Contact } from './components/contact/contact';
import { Login } from './components/login/login';
import { ProductDetails } from './components/product-details/product-details';
import { Products } from './components/products/products';
import { Register } from './components/register/register';
import { MyOrders } from './components/my-orders/my-orders';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {path : '' , redirectTo : "home" , pathMatch : 'full'}, // localhost:4200/
  {path : "home" , component : Home} ,
  {path : "about" , component : About},
  {path : "cart" , component : CartComponent , canActivate : [authGuard]},
  {path : "checkout" , component : Checkout , canActivate : [authGuard]},
  {path : "contact" , component : Contact},
  {path : "login" , component : Login} ,
  {path : "products" , component : Products} ,
  {path : "products/:id" , component : ProductDetails},
  {path : "register" , component : Register},
  {path : "my-orders" , component : MyOrders , canActivate : [authGuard]}
];
