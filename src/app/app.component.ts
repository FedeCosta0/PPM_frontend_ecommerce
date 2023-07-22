
import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./shared/ui/header/header.component";
import {Cart} from "./cart/models/cart.model";
import {CartService} from "./cart/data-access/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent,
],
  standalone: true,
})
export class AppComponent implements OnInit {
  cart: Cart = {
    "type": "Cart",
    "id": "",
    "attributes": {
      "user": "",
      "total": "0.00",
      "cart_products": []
    }
  };

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    console.clear();
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }


}
