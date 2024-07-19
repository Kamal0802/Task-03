import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-feature-products',
  templateUrl: './feature-products.component.html',
  styleUrls: ['./feature-products.component.css'],
})
export class FeatureProductsComponent implements OnInit {
  allProducts!: any;

  rateArr = [1, 2, 3, 4, 5];

  constructor(private ProdService: ProductServiceService) {}

  ngOnInit(): void {
    this.ProdService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      this.allProducts = this.allProducts.slice(0, 3);
    });
  }
}
