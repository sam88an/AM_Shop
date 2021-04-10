import { UserService } from './../user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getAllProductsUrl = 'http://localhost/api/products';
  getAllProducts() {
    return this.http
      .get<responseProduct>(this.getAllProductsUrl, {
        headers: {
          Authorization: `Bearer ${this.userService.getToken()}`,
        },
      })
      .pipe(
        map((result: responseProduct) => {
          return result.products;
        })
      );
  }
  getProductById(id: string) {
    return this.http
      .get(`${this.getAllProductsUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.userService.getToken()}`,
        },
      })
      .pipe(
        map((result) => {
          return <Product>result;
        })
      );
  }
}
interface responseProduct {
  number: number;
  products: Product[];
}
