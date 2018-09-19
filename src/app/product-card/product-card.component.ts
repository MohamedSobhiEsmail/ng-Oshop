import { Component, OnInit, Input } from '@angular/core';
import { shoppingCartService } from '../shoppingCart.service';
import { resource } from 'selenium-webdriver/http';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
@Input('product')product;
@Input('show-action')showActions=true;
@Input('shopping-cart')ShoppingCart;
  constructor(private cartService:shoppingCartService) { 

  }
  addToCart(product)
  {
    this.cartService.addToCart(product);
  }
 
  ngOnInit() {
    //console.log(this.ShoppingCart);

  }

}
