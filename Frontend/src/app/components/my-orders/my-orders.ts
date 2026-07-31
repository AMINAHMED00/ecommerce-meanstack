import { ChangeDetectorRef, Component , inject} from '@angular/core';
import { CheckoutService } from '../../services/checkout';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DecimalPipe, DatePipe , NgClass} from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone : true ,
  imports: [CommonModule , NgClass , DecimalPipe ,],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {

  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef) ;

  orders : any[] = [] ;
  loading = true ;

  ngOnInit():void {
    this.loadOrders();
  }

  loadOrders(){

      this.checkoutService.getMyOrders().subscribe({
        next : (res : any) =>{
            this.orders = res.orders ;
            console.log(this.orders);
            this.loading = false ;
            this.cdr.detectChanges();
        },
        error : (err : any) =>{
          console.log(err);
          this.loading = false ;
        }
      })
  }

}
