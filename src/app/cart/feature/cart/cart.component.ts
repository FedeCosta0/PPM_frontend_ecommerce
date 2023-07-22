import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Cart, CartProduct} from "../../models/cart.model";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {CartService} from "../../data-access/cart.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatTableModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = {
    "type": "Cart",
    "id": "",
    "attributes": {
      "user": "",
      "total": "0.00",
      "cart_products": []
    }
  };

  dataSource: Array<CartProduct> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.dataSource = this.cart.attributes.cart_products;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.attributes.cart_products;
    });
  }



  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(cart_product: CartProduct): void {
    this.cartService.removeSingleProductFromCart(cart_product);

  }

  onIncreaseQuantity(cart_product: CartProduct): void {
    this.cartService.addToCart(cart_product);
  }

  onDecreaseQuantity(cart_product: CartProduct): void {
    this.cartService.decreaseQuantity(cart_product);
  }
}
