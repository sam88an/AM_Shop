import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any = {};
  cartItem = localStorage.getItem('product')
    ? JSON.parse(localStorage.getItem('product') || '[]')
    : [];

  private _cartObservable: BehaviorSubject<Object>;

  cartLocalStorage: any = [];
  constructor() {
    if (!this.isCartExists())
      localStorage.setItem('cart', JSON.stringify(this.cart));

    this.readCartDataFromLocalStorage();
    this._cartObservable = new BehaviorSubject(this.cart);
  }

  readCartDataFromLocalStorage() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '{}');
  }

  writeCartDataToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  get cartObservable() {
    return this._cartObservable;
  }

  clearCart() {
    localStorage.removeItem('cart');
    this._cartObservable.next({});
  }
  findIndex(id: any, product: any) {
    let result = -1;
    for (let i = 0; i < product.length; i++) {
      if (product[i].id === id) {
        result = i;
      }
    }
    return result;
  }
  addToCart(product: Product) {
    let cart = JSON.parse(localStorage.getItem('product') || '[]');
    let index = this.findIndex(product._id, cart);
    if (index !== -1) {
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      let data = {
        id: product._id,
        category: product.category,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      cart.push(data);
    }
    localStorage.setItem('product', JSON.stringify(cart));

    // let quantity = this.cart[product._id];
    // if (quantity) {
    //   this.cart[product._id] = +quantity + 1;
    // } else {
    //   this.cart[product._id] = 1;
    // }
    // this._cartObservable.next(this.cart);
    // localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  isCartExists() {
    if (localStorage.getItem('cart')) {
      return true;
    } else {
      return false;
    }
  }

  getQuantity(product: Product) {
    return this.cart[product._id] ? +this.cart[product._id] : 0;
  }

  setQuantity(product: Product, quantity: number) {
    if (quantity < 1) {
      delete this.cart[product._id];
    } else {
      this.cart[product._id] = quantity;
    }

    this.writeCartDataToLocalStorage();
    this._cartObservable.next(this.cart);
  }
}
