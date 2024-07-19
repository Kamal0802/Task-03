import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  loginUser(data: any){

    return this.http.post("http://localhost:5000/api/users/login",data)
  }

  signupUser(data:any){
    return this.http.post("http://localhost:5000/api/users/signup",data)
  }

   getuser(){
    return this.http.get("http://localhost:5000/api/users/profile")
   }

   getuserById(id:any){
    return this.http.get("http://localhost:5000/api/users/profile/"+id)
   }
}
