import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import{take}from'rxjs/operators';
import{map}from'rxjs/operators';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class shoppingCartService {
  shoppingCart;
  constructor(private db:AngularFireDatabase) { }
  create()
  {
   return this.db.list('/shopping-carts').push({
     createtionDate:new Date().getTime()
   });
  }
  async getCart()
  {
    let cartId=await this.getOrCreateCartId();
    return (this.db.object('/shopping-carts'+cartId)as AngularFireObject<ShoppingCart>)
  }
private async getOrCreateCartId():Promise<string>
{
  let cartId=localStorage.getItem('cartId');
  if(cartId)return cartId;
      let result=await this.create();
          localStorage.setItem('cartId',result.key);
          return result.key;
      
}
async addToCart(product)
{

 let cartId=await this.getOrCreateCartId();
 let item$=this.db.object('/shopping-carts' + cartId + '/items' +product.key);
 console.log(product.key);
item$.snapshotChanges().pipe(take(1)).subscribe(item=>{
  this.shoppingCart=item;
  if(item.payload.exists()){
    console.log(this.shoppingCart.payload.val().quantity);    
    item$.update({
    quantity:this.shoppingCart.payload.val().quantity +1});
  }
    else{ 
    console.log(product)
    item$.set({
       product:product,
       quantity:1
    });
  }
})
}
async removeFormCart(product)
{
  let cartId=await this.getOrCreateCartId();
 let item$=this.db.object('/shopping-carts' + cartId + '/items' +product.key);
   item$.snapshotChanges().pipe(take(1)).subscribe(item=>{
  this.shoppingCart=item;
  if(item.payload.exists()){
    console.log(this.shoppingCart.payload.val().quantity);    
    item$.update({
    quantity:this.shoppingCart.payload.val().quantity -1});
    }
});
}
}
