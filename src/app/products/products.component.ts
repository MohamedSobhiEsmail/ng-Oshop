import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { product } from '../models/product';
import { shoppingCartService } from '../shoppingCart.service';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
products:product[]=[];
filterdProducts:product[]=[];
categories$;
category:string;
cart:ShoppingCart=new ShoppingCart({});
subscribtion:Subscription;
lang="ar";

  constructor(private productService:ProductService,
    private categoryService:CategoryService,
    private cartService:shoppingCartService,
    private route:ActivatedRoute) {
     


  }
  changeLang()
  {
    
    this.lang="en";
  }
  async ngOnInit() {

    this.productService.getProducts().pipe(switchMap(products=>{
      this.products=products
      return this.route.queryParamMap;
   })).subscribe(a=>{this.category= a.get('category');
  this.filterdProducts=(this.category)?
  this.products.filter(p=>p.category===this.category):
  this.products;
    });

   this.subscribtion= ( await this.cartService.getCart()).subscribe(a=>{
    this.cart=a;
    //console.log(this.cart);
    
    } );
   // console.log(this.cart);
  }
ngOnDestroy()
{
 this.subscribtion.unsubscribe();
}
}
