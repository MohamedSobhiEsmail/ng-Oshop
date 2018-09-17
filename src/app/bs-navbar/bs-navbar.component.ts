import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { shoppingCartService } from '../shoppingCart.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
appUser:AppUser;
shoppingCartItemCount:number;
  constructor(private auth:AuthService,private router:Router,private cartService:shoppingCartService) {
this.auth.appUser$.subscribe(appUser=>{this.appUser=appUser});
  }
 async ngOnInit() {
   let cart$= await this.cartService.getCart();
   cart$.valueChanges().subscribe(cart=>{
     this.shoppingCartItemCount=0;
     console.log(cart);

     for(let productId in cart)
     {
     this.shoppingCartItemCount+= cart[productId].quantity;
     }
   })
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
