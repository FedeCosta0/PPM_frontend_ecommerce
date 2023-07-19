import {Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/components/home.component";
import {CartComponent} from "./pages/cart/components/cart/cart.component";


export const ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
]
