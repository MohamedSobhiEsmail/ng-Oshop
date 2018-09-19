import { ShoppingCartItem } from "./shopping-cart-item";
import { product } from "./product";

export class ShoppingCart
{
    constructor(public itemsMaps:any)
    {
        this.itemsMaps=this.itemsMaps||{};
        for (const key in itemsMaps) {
            let item=itemsMaps[key];
            let x=new ShoppingCartItem();
            Object.assign(x,item);
            x.key=key;
            //x.price=item.product.price;
           // console.log(x);        
           this.items.push(x)
        }
    }

    items:ShoppingCartItem[]=[];

    getquantity(product:product)
    {
      // console.log(product);
      //console.log(this.itemsMaps);
     let item= this.itemsMaps[product.key]
     //let item= this.itemsMaps[product.key]

     return item? item.quantity: 0;
    }

    get totalPrice()
    {
        let count=0;
       // console.log(this.items)
        this.items.forEach(element => {
            count+= element.totalPrice;
        });
        return count;
    }
    get ItemsCount()
    {
       let count=0;
       // console.log(this.items)
        this.items.forEach(element => {
            count+= element.quantity;
        });
        return count;

        // for(let productId in this.items)
        // {
        // count+= this.items["items"+productId].quantity;
        // return count;
        // }
    }
}