import { Component, inject, OnInit , ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private productService = inject(ProductService);
  private cartService = inject(CartService);


  product:any;

  loading=true;

  ngOnInit(){

    const id=this.route.snapshot.paramMap.get("id");

    if(id){
      this.productService.getProductById(id).subscribe({
        next:(res : any)=>{
          this.product=res.product;
          this.loading=false;
          console.log(this.product);
          this.cdr.detectChanges();
        },
        error:(err)=>{
          console.log(err);
          this.loading=false;
        }
      });
    }
  }
  addToCart() {

    this.cartService.addToCart(this.product._id, 1).subscribe({

      next: (res: any) => {

        alert("Product added to cart");

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}
