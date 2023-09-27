import {Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Cart, CartProduct} from "../models/cart.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient, HttpHeaders} from "@angular/common/http";


const BASE_URL = 'https://web-production-db80.up.railway.app';


@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit, OnChanges {
  cart = new BehaviorSubject<Cart>({
    "type": "Cart",
    "id": "",
    "attributes": {
      "user": "",
      "total": "0.00",
      "cart_products": []
    }
  });

  _cart: Cart | undefined;

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {
  }

  ngOnInit() {
    console.log('cart service onInit')
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('cart service onChanges')
    console.log(changes)
  }

  addToCart(product_id: string, quantity: number = 1) {
    this.getCart();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('user')!)._token}`
      })
    };
    const products: CartProduct[] = [...this.cart.value.attributes.cart_products];
    const productAlreadyInCart = products.find((_cart_product) => _cart_product.product_id === product_id)
    if (productAlreadyInCart) {
      this.http.put(`${BASE_URL}/cart-product/${productAlreadyInCart.product_id}/`, {quantity: 1}, httpOptions).subscribe((data) => console.log(data));
    } else {
      this.http.post(`${BASE_URL}/cart-product/`, {
        "product": product_id,
        "quantity": 1
      }, httpOptions).subscribe((data) => console.log(data));
    }
    this.getCart();
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
    if (localStorage.getItem('user')) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Token ${JSON.parse(localStorage.getItem('user')!)._token}`
        })
      };
      this.http.post<Cart>(`${BASE_URL}/cart/`, httpOptions).subscribe((_cart: any) => {
        this.cart.next(_cart['data']);
      })
      this._snackBar.open('Cart is cleared.', 'Ok', {duration: 3000});
    }



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

  getCart() {
    if (localStorage.getItem('user')) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Token ${JSON.parse(localStorage.getItem('user')!)._token}`
        })
      };
      this.http.get<Cart>(`${BASE_URL}/cart/`, httpOptions).subscribe((_cart: any) => {
        this.cart.next(_cart['data']);
      })
    } else {
      this.cart.next({
        "type": "Cart",
        "id": "",
        "attributes": {
          "user": "",
          "total": "0.00",
          "cart_products": [],
        }
      });
    }

  }


}
