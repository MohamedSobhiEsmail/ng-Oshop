//import { product } from "./product";

export class ShoppingCartItem
{ 
    key:string;
    title:string;
    imageUrl:string;
    price:number;
    quantity:number;

    get totalPrice(){
       // console.log(this.price);
        return this.price*this.quantity}
}