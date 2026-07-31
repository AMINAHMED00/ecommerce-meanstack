import { Component, inject, OnInit , ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {

  private cartService = inject(CartService);
  private cdr = inject(ChangeDetectorRef);


  cart: any;

  loading = true;

  totalPrice = 0;

  ngOnInit(): void {

    this.loadCart();

  }

  loadCart() {

    this.loading = true;

    this.cartService.getMyCart().subscribe({

      next: (res: any) => {

        this.cart = res.cart;

        this.calculateTotal();

        this.loading = false;
        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

        this.loading = false;

      }

    });

  }

  calculateTotal() {

    this.totalPrice = 0;

    if (!this.cart) return;

    for (let item of this.cart.items) {

      this.totalPrice += item.product.price * item.quantity;

    }

  }

  increaseQuantity(item: any) {

    const quantity = item.quantity + 1;

    this.cartService.updateCart(item.product._id, quantity).subscribe({

      next: () => {

        item.quantity = quantity;

        this.calculateTotal();
        this.cdr.detectChanges();
      },

      error: (err) => console.log(err)

    });

  }

  decreaseQuantity(item: any) {

    const quantity = item.quantity - 1;

    this.cartService.updateCart(item.product._id, quantity).subscribe({

      next: () => {

        if (quantity <= 0) {

          this.loadCart();
          this.cdr.detectChanges();
          return;

        }

        item.quantity = quantity;

        this.calculateTotal();
        this.cdr.detectChanges();
      },

      error: (err) => console.log(err)

    });

  }

  removeItem(item: any) {

    this.cartService.removeFromCart(item.product._id).subscribe({

      next: () => {

        this.loadCart();
        this.cdr.detectChanges();
      },

      error: (err) => console.log(err)

    });

  }

}
