import {Routes} from "@angular/router";
import {HomeComponent} from "./home/feature/home/home.component";
import {CartComponent} from "./cart/feature/cart/cart.component";
import {SignupComponent} from "./auth/feature/signup/signup.component";
import {SigninComponent} from "./auth/feature/signin/signin.component";


export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
]
