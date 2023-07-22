import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Cart, CartProduct} from "../models/cart.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({
    "type": "Cart",
    "id": "",
    "attributes": {
      "user": "",
      "total": "0.00",
      "cart_products": []
    }
  });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(cart_product: CartProduct): void {
    const products: CartProduct[] = [...this.cart.value.attributes.cart_products];

    const productInCart = products.find((_product) => _product.id === cart_product.id);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      products.push(cart_product);
    }
    this.cart.next({
      "type": "Cart",
      "id": "",
      "attributes": {
        "user": "",
        "total": "0.00",
        "cart_products": products,
      }
    });
    this._snackBar.open('1 item added to cart.', 'Ok', {duration: 3000});
  }

  decreaseQuantity(product: CartProduct): void {
    this.cart.value.attributes.cart_products.map((_product) => {
      if (_product.id === product.id) {
        _product.quantity--;
        if (_product.quantity === 0) {
          this.removeSingleProductFromCart(product);
        }
      }

    });
  }

  clearCart(): void {
    this.cart.next({
      "type": "Cart",
      "id": "",
      "attributes": {
        "user": "",
        "total": "0.00",
        "cart_products": [],
      }
    });
    this._snackBar.open('Cart is cleared.', 'Ok', {duration: 3000});
  }

  removeSingleProductFromCart(product: CartProduct): void {
    const filteredProducts = this.cart.value.attributes.cart_products.filter(
      (_product) => _product.id !== product.id
    );
    this.cart.next({
      "type": "Cart",
      "id": "",
      "attributes": {
        "user": "",
        "total": "0.00",
        "cart_products": filteredProducts,
      }
    });
    this._snackBar.open('1 item removed from cart.', 'Ok', {duration: 3000});
  }
}
