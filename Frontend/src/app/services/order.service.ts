import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  postOrder(data:any){
    return this.http.post("http://localhost:5000/api/order",data)
  }

  getOrder(id:any){
    return this.http.get("http://localhost:5000/api/order/"+id)
  }
}
