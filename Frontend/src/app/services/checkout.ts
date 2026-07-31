import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:2005/api/checkout';

  createOrder() {
    return this.http.post(this.apiUrl, {});
  }

  getMyOrders() {
    return this.http.get(`${this.apiUrl}/myOrders`);
  }

}
