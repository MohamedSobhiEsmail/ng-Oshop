import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product)
  {
    this.db.list('/products').push(product);
  }
  getProducts()
  {
   return this.db.list('/products').snapshotChanges();
  }
  getById(productId)
  {
   return this.db.object('/products/'+productId).valueChanges();
  }
  Update(productId,product)
  {
   return this.db.object('/products/'+productId).update(product);
  }
  delete(productId)
  {
   return this.db.object('/products/'+productId).remove();
  }
}
