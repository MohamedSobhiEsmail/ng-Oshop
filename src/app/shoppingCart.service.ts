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
  async getCart():Promise<Observable<ShoppingCart>>
  {
    let cartId=await this.getOrCreateCartId();
    return (this.db.object('/shopping-carts'+cartId)as AngularFireObject<ShoppingCart>).valueChanges()
    .pipe(map(a=>{
      return new ShoppingCart(a)
    }
    )
    );
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
console.log(product);
 let cartId=await this.getOrCreateCartId();
 let item$=this.db.object('/shopping-carts' + cartId + '/' +product.key);
item$.snapshotChanges().pipe(take(1)).subscribe(item=>{
  this.shoppingCart=item;
  if(item.payload.exists()){
    //console.log(this.shoppingCart.payload.val().quantity);
     item$.update({
      title:product.title,
      imageUrl:product.imageUrl,
      price:product.price,
    quantity:this.shoppingCart.payload.val().quantity +1});
  }
    else{ 
   // console.log(product)
    item$.set({
       //product:product,
       title:product.title,
       imageUrl:product.imageUrl,
       price:product.price,
       quantity:1
    });
  }
})
}
async removeFormCart(product)
{
  let cartId=await this.getOrCreateCartId();
 let item$=this.db.object('/shopping-carts' + cartId + '/' +product.key);
   item$.snapshotChanges().pipe(take(1)).subscribe(item=>{
  this.shoppingCart=item;
  if(item.payload.exists()){
    console.log(this.shoppingCart.payload.val().quantity);    
  if(this.shoppingCart.payload.val().quantity===1)item$.remove();
   else item$.update({
    quantity:this.shoppingCart.payload.val().quantity -1});
    }
});
}
async clearCart()
{
  let cartId=await this.getOrCreateCartId();
  this.db.object('/shopping-carts'+cartId).remove();
}
}
