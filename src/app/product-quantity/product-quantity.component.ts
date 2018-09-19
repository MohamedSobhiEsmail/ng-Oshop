import { Component, OnInit, Input } from '@angular/core';
import { shoppingCartService } from '../shoppingCart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product')product;
  @Input('shopping-cart')ShoppingCart;
    constructor(private cartService:shoppingCartService) { }
    addToCart(product)
    {
     // console.log(product);
      this.cartService.addToCart(product);
    }
    removeFormCart()
    {
      this.cartService.removeFormCart(this.product);
    }
   
  ngOnInit() {
  }

}
