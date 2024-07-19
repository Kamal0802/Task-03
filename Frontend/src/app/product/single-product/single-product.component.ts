import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  id!: String;

  quantity: number = 0;

  product: any = {};

  reviewForm!: FormGroup;

  users: any = [];
  rateArr = [1, 2, 3, 4, 5];
  constructor(
    private router: Router,
    private prodServ: ProductServiceService,
    private userServ: UserService,
    private fb: FormBuilder,
    private cartServ: CartService
  ) {}

  ngOnInit(): void {
    this.id = this.router.url.replace('/singleProd/', '');
    console.log(this.id);

    this.reviewForm = this.fb.group({
      comment: ['', [Validators.required]],
      rating: ['', [Validators.required]],
    });

    this.userServ.getuser().subscribe((data) => {
      console.log(data);
      this.users = data;
    });

    this.prodServ.getProductById(this.id).subscribe((data) => {
      this.product = data;
      console.log(this.product);
    });
  }

  getUserName(id: any) {
    for (let user of this.users) {
      if (id == user._id) {
        return user.userName;
      }
    }
  }

  navigate() {
    let token = localStorage.getItem('UserId');

    let reviewObj = {
      user: token,
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment,
    };

    if (token) {
      this.prodServ.postReviews(reviewObj, this.id).subscribe((data) => {
        console.log(data);
        this.product = data;
      });
    } else {
      alert('please login to Submit review');
    }

    this.reviewForm.reset();
  }

  add() {
    if (this.product.stock > this.quantity) {
      this.quantity++;
    }
  }

  sub() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.quantity > 0) {
      let cartObj = {
        user: localStorage.getItem('UserId'),
        product: this.id,
        quantity: this.quantity,
      };
      this.cartServ.postCart(cartObj).subscribe((data) => {
        console.log(data);
        alert('Your product is Added to Cart');
      });
    } else {
      alert('Please choose the Quantity');
    }
  }
}
