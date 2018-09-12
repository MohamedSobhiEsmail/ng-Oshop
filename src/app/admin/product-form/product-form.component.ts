import { Component, OnInit, Input } from '@angular/core';
import { ModalDismissReasons, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  ngOnInit() {
  }
 
  
}
