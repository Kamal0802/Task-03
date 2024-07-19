import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  allProducts :object=[]

  constructor(private http : HttpClient) { }

  getAllProducts(){

    return this.http.get("http://localhost:5000/api/product")
  }

  getProductById(id :any){
    return this.http.get("http://localhost:5000/api/product/"+id)
  }

  postReviews(data:any,id:any){
    return this.http.post("http://localhost:5000/api/product/"+id+"/reviews",data)
  }
}
