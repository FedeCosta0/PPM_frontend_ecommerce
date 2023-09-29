import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user.model";
import {CartService} from "../../cart/data-access/cart.service";

const BASE_URL = 'https://web-production-db80.up.railway.app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | undefined;


  constructor(private http: HttpClient, private cartService: CartService) {
  }

  signUp(body: {}) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.api+json',
      })
    };
    return this.http.post(`${BASE_URL}/users/`, body, httpOptions);
  }

  signIn(body: {}) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.api+json',
      })
    };
    return this.http.post(`${BASE_URL}/login/`, body, httpOptions);

  }

  logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${JSON.parse(localStorage.getItem('user')!)._token}`,
        'Content-Type': 'application/vnd.api+json'
      })
    };
    this.user = undefined;
    localStorage.removeItem('user');
    let observable = this.http.post(`${BASE_URL}/logout/`, {}, httpOptions);
    this.cartService.getCart();
    return observable;

  }

  createUser(id: string, email: string, firstName: string, lastName: string, token: string, expirationDate: Date, isAdmin: boolean) {
    this.user = {
      '_expiry': expirationDate,
      '_token': token,
      'user': {
        'id': id,
        'email': email,
        'first_name': firstName,
        'last_name': lastName,
        'is_admin': isAdmin
      }
    }
  }
}
