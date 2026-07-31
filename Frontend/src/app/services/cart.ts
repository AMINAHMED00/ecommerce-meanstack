import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:2005/api/cart';

  getMyCart() {
    return this.http.get(`${this.apiUrl}/myCart`);
  }

  addToCart(productId: string, quantity: number = 1) {
    console.log(localStorage.getItem("token"));
    return this.http.post(`${this.apiUrl}/add`, {
      productId,
      quantity
    });
  }

  updateCart(productId: string, quantity: number) {
    return this.http.patch(`${this.apiUrl}/update/${productId}`, {
      quantity
    });
  }

  removeFromCart(productId: string) {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

}
