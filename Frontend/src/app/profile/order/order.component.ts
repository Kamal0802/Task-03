import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toArray } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private orderServ: OrderService,
    private cartServ: CartService
  ) {}

  shipForm!: FormGroup;

  ngOnInit(): void {
    this.shipForm = this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
    });
  }

  ship() {
    let cart: any;
    let product: any;
    let totalPrice = 0;
    let uid = localStorage.getItem('UserId');
    let orderItems: { product: string; price: number; quantity: number }[] = [];
    this.cartServ.getCart(uid).subscribe((data) => {
      cart = data;
      product = cart.items;

      cart.items.forEach(
        (item: { product: { price: number }; quantity: number }) => {
          totalPrice += item.product.price * item.quantity;
        }
      );

      product.forEach(
        (item: { product: { _id: any; price: any }; quantity: any }) => {
          const productObj = {
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
          };

          orderItems.push(productObj);
        }
      );

      let obj = {
        user: uid,
        orderItems: orderItems,
        shippingAddress: {
          address: this.shipForm.value.address,
          city: this.shipForm.value.city,
          postalCode: this.shipForm.value.pincode,
          country: this.shipForm.value.country,
        },
        paymentMethod: this.shipForm.value.paymentMethod,
        itemsPrice: totalPrice,
        shippingPrice: 5,
        totalPrice: totalPrice + 5,
      };

      this.orderServ.postOrder(obj).subscribe((data) => {});

      this.shipForm.reset();
      alert("order placed Successfully")
    });
  }
}
