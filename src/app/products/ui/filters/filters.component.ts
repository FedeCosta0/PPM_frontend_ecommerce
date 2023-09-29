import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {ProductCategory} from "../../models/product.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule, MatOptionModule, MatButtonModule, RouterLink],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Input() categories: Array<ProductCategory> | undefined;
  @Output() showCategory = new EventEmitter<string>();


  constructor() {
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
