import { Component, OnInit, OnDestroy } from '@angular/core';
import { shoppingCartService } from '../shoppingCart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit,OnDestroy {
 shipping={};
 cart:ShoppingCart;
 userId;
 subscription:Subscription;
 UserSubscription:Subscription;

  constructor(private cartService:shoppingCartService,private orderService:OrderService,
   private authService:AuthService,private route:Router) {

   }
  async placeOrder()
   {
      let order={
        datetime:new Date().getDate(),
        userId:this.userId,
        shipping:this.shipping,
        items:this.cart.items.map(i=>{
         return {
          product:{
              title:i.title,
              imageUrl:i.imageUrl,
              price:i.price,

          },
          quantity:i.quantity,
          totalPrice:i.totalPrice
        }
        })
      }
   let result= (await this.orderService.placeeOrder(order));
       this.route.navigate(['/order-success',result.key]);
   }
 async ngOnInit() {
    let cart$=await this.cartService.getCart();
    this.subscription=cart$.subscribe(a=>{
      this.cart=a;
    })
   this.UserSubscription= this.authService.user$.subscribe(user=>{ this.userId=user.uid});
   //console.log("asd")
   //console.log(this.cart);
  }
ngOnDestroy()
{
  this.subscription.unsubscribe();
  this.UserSubscription.unsubscribe();
}
}
