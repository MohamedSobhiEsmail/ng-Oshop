import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import {take, map} from 'rxjs/operators';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  ngOnInit() {
  
  }
  products$;
  closeResult: string;
  categories$;
  productId;
  product={};
     constructor(config: NgbModalConfig,
       private modalService: NgbModal,
       private categoryService:CategoryService,
       private productService:ProductService,
       private router:Router)
        {
          this.products$=this.productService.getProducts(); 
       config.backdrop = 'static';
        this.categories$= this.categoryService.getCategories();
     }
   
     open(content) {
      this.product={};
      this.productId=null;
       this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
         this.closeResult = `Closed with: ${result}`;
       }, (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       });
     }
   
     private getDismissReason(reason: any): string {
       if (reason === ModalDismissReasons.ESC) {
         return 'by pressing ESC';
       } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
         return 'by clicking on a backdrop';
       } else {
         return  `with: ${reason}`;
       }
     }
   save(product)
   {
console.log(product);
     if(product.valid)
     {
      if(!this.productId)
       {
         this.productService.create(product.value);
         console.log("Created");
       }
       else
         {
           this.productService.Update(this.productId,product.value);
           console.log("Updated");
         }
       this.modalService.dismissAll();
       this.router.navigateByUrl('/admin/products')
     }
 
   }
   edit(content,id)
   {
     
    this.open(content);
    this.productService.getById(id).pipe(take(1)).subscribe(p=>this.product=p);
    this.productId=id;
   }
   delete(id)
   {
     if(!confirm('Are You sure you want to delete this product'))return;

    this.productService.delete(id);
    this.router.navigateByUrl('/admin/products')
   }

}
