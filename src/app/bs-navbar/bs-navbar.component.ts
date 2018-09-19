import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { shoppingCartService } from '../shoppingCart.service';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
appUser:AppUser;
shoppingCartItemCount:number;
cart$:ShoppingCart;

  constructor(private auth:AuthService,private router:Router,private cartService:shoppingCartService) {
    this.auth.appUser$.subscribe(appUser=>{this.appUser=appUser});
  }
  async ngOnInit() {
 ( await this.cartService.getCart()).subscribe(a=>{this.cart$=a;
     //console.log(a);
});
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
