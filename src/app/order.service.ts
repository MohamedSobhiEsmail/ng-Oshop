import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { shoppingCartService } from './shoppingCart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private db:AngularFireDatabase,private cartService:shoppingCartService) { }
 async placeeOrder(order)
  {
     let result= this.db.list('/orders').push(order);
     this.cartService.clearCart();
     return result;
  }
}
