import { Injectable, inject } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:2005/api/products';
  private categoryUrl = 'http://localhost:2005/api/products/category';


  getTrendingProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trending`);
  }

  getAllProducts(){
    return this.http.get(`${this.apiUrl}`);
  }

  getProductById(id : string){
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

    searchProducts(filters: { q?: string, category?: string, sortBy?: string }) {
    let params = new HttpParams();

    if (filters.q) params = params.set('name', String(filters.q));
    if (filters.category) params = params.set('category', String(filters.category));
    if (filters.sortBy) params = params.set('sortBy', String(filters.sortBy));

    return this.http.get(`${this.apiUrl}/search`, { params });
  }

    getCategories() {
    return this.http.get(this.categoryUrl);
  }

}
