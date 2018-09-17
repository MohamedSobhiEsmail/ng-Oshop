import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { product } from './models/product';

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
   return (this.db.list('/products') as AngularFireList<product>).snapshotChanges().pipe(map(action=>{
     return action.map(c=>({key:c.payload.key, ...c.payload.val()}))
   }));
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
