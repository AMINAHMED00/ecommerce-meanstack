import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  private productService = inject(ProductService);

  products: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  sortBy: string = 'newest';
  loading = true;

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.categories || res;
      },
      error: (err) => console.log(err)
    });
  }

  loadProducts() {
    this.loading = true;

    this.productService.searchProducts({
      q: this.searchTerm,
      category: this.selectedCategory,
      sortBy: this.sortBy
    }).subscribe({
      next: (res: any) => {
        this.products = res.products;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  onFilterChange() {
    this.loadProducts();
  }

}
