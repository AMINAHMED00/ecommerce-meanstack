import { Component, OnInit, inject , ChangeDetectorRef} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { CheckoutService } from '../../services/checkout';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {

  private cartService = inject(CartService);
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  cart: any = null;
  totalPrice = 0;
  loading = true;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {

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

    this.cart.items.forEach((item: any) => {

      this.totalPrice += item.product.price * item.quantity;

    });

  }

  placeOrder() {

    this.checkoutService.createOrder().subscribe({

      next: (res: any) => {
       this.router.navigate(['/my-orders']);
      },

      error: (err) => {

        console.log(err);
        console.log(err.error);
        alert(err.error.msg);

      }

    });

  }

}
