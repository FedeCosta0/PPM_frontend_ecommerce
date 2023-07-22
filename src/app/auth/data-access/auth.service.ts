import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const STORE_BASE_URL = 'http://127.0.0.1:8000';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(body: {}){
    return this.http.post(`${STORE_BASE_URL}/users/`, body);
  }

  signIn(body: {}){
    return this.http.post(`${STORE_BASE_URL}/login/`, body);
  }
}
