import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {ProductsHeaderComponent} from "./products-header/products-header.component";
import {FiltersComponent} from "./filters/filters.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {ProductBoxComponent} from "./product-box/product-box.component";
import {CartService} from "../../../services/cart.service";
import {Product} from "../../../models/product.model";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {StoreService} from "../../../services/store.service";


const ROWS_HEIGHT: { [id: number]: number } = {1: 400, 3: 335, 4: 350};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, ProductsHeaderComponent, FiltersComponent, MatGridListModule, ProductBoxComponent, MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort).subscribe(
      (_products: any) => { this.products = _products.map((_product: Product) => {});
        console.log("home.component.ts _products in arrivo dallo storeService.getAllProducts(): ")
      console.log(_products["data"]);}
    );
    console.log("home.component.ts this.products array del component:");
    console.log(this.products);
  }

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }

  ngOnDestroy() {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
  }
}
