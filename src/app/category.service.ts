import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { query } from '@angular/core/src/render3/query';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }
  getCategories(){
    return this.db.list('/categories/',(a=>a.orderByChild('name'))).snapshotChanges(
    );
  }
}
