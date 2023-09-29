import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductCategory} from "../models/product.model";

const BASE_URL = 'https://web-production-db80.up.railway.app';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {}


  getProducts(
    sort = 'desc',
    pageIndex?: number,
    category?: string,
  ): Observable<Array<Product>> {

      return this.httpClient.get<Array<Product>>(
        `${BASE_URL}/products${category ? '?category=' + category  + `${sort ? '&ordering=' + sort : ''}` + `${pageIndex ? '&page=' + pageIndex : ''}`: `${sort ? '?ordering=' + sort + `${pageIndex ? '&page=' + pageIndex : ''}` : `${pageIndex ? '?page=' + pageIndex : ''}`}`}`
      );

    }

    getAllProducts() : Observable<number>{
      return this.httpClient.get<number>(
        `${BASE_URL}/products-count/`
      );
    }





  getAllCategories(): Observable<Array<ProductCategory>> {
    return this.httpClient.get<Array<ProductCategory>>(
      `${BASE_URL}/products-category/`
    )
  }
}
