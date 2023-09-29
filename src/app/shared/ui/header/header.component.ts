import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {Cart} from "../../../cart/models/cart.model";
import {CartService} from "../../../cart/data-access/cart.service";
import {AuthService} from "../../../auth/data-access/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatBadgeModule, MatButtonModule, MatMenuModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  itemsQuantity = 0;

  constructor(private cartService: CartService, private authService: AuthService) {
  }

  private _cart: Cart = {
    "type": "Cart",
    "id": "",
    "attributes": {
      "user": "",
      "total": "0.00",
      "cart_products": []
    }
  };

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.attributes.cart_products.map((cart_product) => cart_product.quantity)
      .reduce((prev, current) => prev + current, 0)
  }

  ngOnInit() {
    this.cartService.getCart();
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  isUserLogged(): boolean {
    return (localStorage.getItem('user') !== null);
  }

  isUserAdmin(): boolean{
    if(localStorage.getItem('user') != null){
      // @ts-ignore
      // @ts-ignore
      return JSON.parse(localStorage.getItem('user'))['user']['is_admin']
    }
    return false;
  }

  onLogout() {
    this.authService.logout();
  }
}
