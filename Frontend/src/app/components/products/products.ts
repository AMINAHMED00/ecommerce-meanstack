import { Component, ChangeDetectorRef ,inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  private productService = inject(ProductService);
  private cartService = inject(CartService);


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
        this.cdr.detectChanges();
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
        this.cdr.detectChanges();
        console.log(this.products);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  onFilterChange() {
     console.log('Filter changed! searchTerm:', this.searchTerm);
    this.loadProducts();
  }

  addToCart(product: any) {

  this.cartService.addToCart(product._id, 1).subscribe({

    next: (res) => {

      console.log(res);

      alert('Product added to cart');

    },

    error: (err) => {

      console.log(err);

    }

  });

}

}
