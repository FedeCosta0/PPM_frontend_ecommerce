import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgOptimizedImage, MatIconModule],
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter<Product>()

  constructor() {
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

}
