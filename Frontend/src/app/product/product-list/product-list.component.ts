import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  allProducts!: any;
  rateArr = [1, 2, 3, 4, 5];
  pageNumber = 1;
  count = 0;
  productListSize = 9;

  searchText !:String;

  Search() {
    console.log(this.searchText);

    if (this.searchText !== '') {
      if (!this.searchText) {
        this.allProducts = this.allProducts;
      }

      const searchTermLower = this.searchText.toLowerCase().trim();
      this.allProducts = this.allProducts.filter(
        (product: { category: string }) =>
          product.category.toLowerCase().includes(searchTermLower)
      );
    }
  }

  constructor(
    private ProdService: ProductServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getproducts();
  }

  getproducts() {
    this.ProdService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      console.log(this.allProducts);
    });
  }
  navigate(id: string) {
    let token = localStorage.getItem('UserId');

    if (token) {
      this.router.navigateByUrl('/singleProd/' + id);
    } else {
      alert('please login to access');
    }
  }

  onPageChange(event: any) {
    this.pageNumber = event;
    this.getproducts();

    if (this.searchText !== 'Select Catagory...') {
      if (!this.searchText) {
        this.allProducts = this.allProducts;
      }

      const searchTermLower = this.searchText.toLowerCase().trim();
      this.allProducts = this.allProducts.filter(
        (product: { category: string }) =>
          product.category.toLowerCase().includes(searchTermLower)
      );
    }

    this.router
      .navigate(['/'], {
        skipLocationChange: true,
      })
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
