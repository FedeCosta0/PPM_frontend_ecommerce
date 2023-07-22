import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductCategory} from "../models/product.model";

const BASE_URL = 'http://127.0.0.1:8000';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit= '12', sort='desc'): Observable<Array<Product>>{
    return this.httpClient.get<Array<Product>>(
      `${BASE_URL}/products/`
    )
  }


  getAllCategories(): Observable<Array<ProductCategory>>{
    return this.httpClient.get<Array<ProductCategory>>(
      `${BASE_URL}/products-category/`
    )
  }
}
