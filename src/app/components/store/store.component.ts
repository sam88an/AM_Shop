import { ProductService } from './../../services/product/product.service';

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(private productServices: ProductService) {
    this.collectProducts();
  }
  products: Product[] = [];
  ngOnInit(): void {}
  collectProducts() {
    this.productServices.getAllProducts().subscribe({
      next: (result: Product[]) => {
        this.products = result;
        console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
