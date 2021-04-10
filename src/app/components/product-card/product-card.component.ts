import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  quantity: number = 0;
  constructor(private cartService: CartService) {}
  @Input() product!: Product;
  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        this.quantity = this.cartService.getQuantity(this.product);
      },
    });
  }
  addToCart() {
    this.cartService.addToCart(this.product);
  }
  minusQuantity() {
    this.quantity--;
    this.cartService.setQuantity(this.product, this.quantity);
  }
  plusQuantity() {
    this.quantity++;
    this.cartService.setQuantity(this.product, this.quantity);
  }
}
