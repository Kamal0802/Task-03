import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Data, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartServ: CartService, private router: Router) {}

  cartData!: any;

  rateArr = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    let id = localStorage.getItem('UserId');
    this.cartServ.getCart(id).subscribe((data) => {
      this.cartData = data;
    });
  }

  delete(id: any) {
    let uid = localStorage.getItem('UserId');

    let obj = {
      user: uid,
      product: id,
    };
    this.cartServ.removeCart(obj).subscribe((data) => {
      let obj = data;
      this.cartData = obj;

      this.router
        .navigate(['/'], {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate(['/cart']);
        });
    });
  }

  totalAmount() {
    let totalPrice = 0;

    this.cartData.items.forEach(
      (item: { product: { price: number }; quantity: number }) => {
        totalPrice += item.product.price * item.quantity;
      }
    );
    return totalPrice.toFixed(2);
  }
}
