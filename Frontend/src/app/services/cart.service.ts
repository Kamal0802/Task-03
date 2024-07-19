import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartLength:number=0

  constructor(private http:HttpClient) { }

  postCart(data:object){
    return this.http.post("http://localhost:5000/api/cart/add",data)
  }

  getCart(id:any){
    return this.http.get("http://localhost:5000/api/cart/"+id)
  }

  removeCart(data:any){
    return this.http.post("http://localhost:5000/api/cart/remove",data)
  }
}
