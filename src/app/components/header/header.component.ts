import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private cartService: CartService) {}
  numberOfItems: number = 0;
  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        console.log(cart);
        this.numberOfItems = Object.keys(cart).length;
      },
    });
  }
}
