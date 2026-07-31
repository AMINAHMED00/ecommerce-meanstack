import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';



@Component({
  selector: 'app-trending-products',
  imports: [RouterLink],
  templateUrl: './trending-products.html',
  styleUrl: './trending-products.css',
})
export class TrendingProducts implements OnInit {

   private productService = inject(ProductService);
   private cartService = inject(CartService);

  products: any[] = [];
  loading = true ;

  ngOnInit(): void {
    this.productService.getTrendingProducts().subscribe({
      next: (res : any) => {
        console.log(res);
        this.products = res.products;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
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
