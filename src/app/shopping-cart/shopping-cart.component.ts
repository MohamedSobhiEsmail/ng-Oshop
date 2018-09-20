import { Component, OnInit } from '@angular/core';
import { shoppingCartService } from '../shoppingCart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
   cart$:ShoppingCart=new ShoppingCart({});
  constructor(private cartService:shoppingCartService) { }

 async ngOnInit() {
     (await this.cartService.getCart()).subscribe(cart=>{this.cart$=cart;
    console.log(cart);

    });
  }
  clearCart()
  {
    this.cartService.clearCart();
  }
}
