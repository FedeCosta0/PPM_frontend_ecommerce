import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {ProductsHeaderComponent} from "../../../products/ui/products-header/products-header.component";
import {FiltersComponent} from "../../../products/ui/filters/filters.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {ProductBoxComponent} from "../../../products/ui/product-box/product-box.component";
import {CartService} from "../../../cart/data-access/cart.service";
import {Product, ProductCategory} from "../../../products/models/product.model";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {ProductsService} from "../../../products/data-access/products.service";


const ROWS_HEIGHT: { [id: number]: number } = {1: 400, 3: 335, 4: 350};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, ProductsHeaderComponent, FiltersComponent, MatGridListModule, ProductBoxComponent, MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  categories: Array<ProductCategory> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;
  productsCategoriesSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();

  }

  getProducts(): void {
    this.productsSubscription = this.productsService.getAllProducts(this.count, this.sort).subscribe(
      (_products: any) => {
        this.products = _products['data'];
      });
  }

  getCategories(): void {
    this.productsCategoriesSubscription = this.productsService.getAllCategories().subscribe(
      (_categories: any) => {
        this.categories = _categories['data'];
      }
    )
  }


  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product.id, 1);
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
