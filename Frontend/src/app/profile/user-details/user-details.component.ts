import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{


  toggleVal=false

  

  constructor(private userServ:UserService,private orderServ:OrderService){

  }

  user:any={}

  orders:any


  ngOnInit(): void {
    let id=localStorage.getItem("UserId")
    this.userServ.getuserById(id).subscribe(data=>{
      console.log(data);
      this.user=data
      
    })

this.getOrder()
   

  }

  getOrder():void{
    this.orderServ.getOrder(localStorage.getItem("UserId")).subscribe(data=>{
      console.log(data);
      this.orders=data
      
    })
  }

  toggle(){
    this.toggleVal=!this.toggleVal
  }

  
}

