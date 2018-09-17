import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { product } from '../models/product';
import { shoppingCartService } from '../shoppingCart.service';
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
cart:any;
subscribtion:Subscription;

  constructor(private productService:ProductService,
    private categoryService:CategoryService,
    private cartService:shoppingCartService,
    private route:ActivatedRoute) {
     this.productService.getProducts().pipe(switchMap(products=>{
        this.products=products
        return route.queryParamMap;
     })).subscribe(a=>{this.category= a.get('category');
    this.filterdProducts=(this.category)?
    this.products.filter(p=>p.category===this.category):
    this.products;
      });


  }

  async ngOnInit() {
   this.subscribtion= ( await this.cartService.getCart()).valueChanges().subscribe(a=>{
    this.cart=a;
    } );

  }
ngOnDestroy()
{
 this.subscribtion.unsubscribe();
}
}
