import { CartService } from 'src/app/services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription, Observable } from 'rxjs';

import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  cart: any;
  cartItems: CartItem[] = [];
  cartSubscription!: Subscription;

  ngOnInit(): void {
    this.subscribeCart();
  }
  subscribeCart() {
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        let array = JSON.parse(localStorage.getItem('product') || '[]');

        this.dataSource = new MatTableDataSource<any>(array ? array : []);
        console.log(this.dataSource);

        // this.cartItems = [];
        // let observables = [];
        // for (let id in cart) {
        //   observables.push(
        //     this.productService.getProductById(id).pipe(
        //       map((product) => {
        //         console.log('test product', product);

        //         let item: CartItem = {
        //           product: product,
        //           quantity: 5,
        //         };
        //         return item;
        //       })
        //     )
        //   );
        // }

        // forkJoin(observables).subscribe({
        //   next: (result) => {
        //     console.log(result);
        //   },
        // });
      },
    });
  }

  displayedColumns: string[] = ['id', 'name', 'weight', 'symbol'];

  // dataSource: PeriodicElement[] = [
  //   { id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  // ];
}
interface CartItem {
  product: Product;
  quantity: number;
}
export interface PeriodicElement {
  id: number;
  name: string;

  weight: number;
  symbol: string;
}
