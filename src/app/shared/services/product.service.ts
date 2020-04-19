import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private angularFirestore: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.angularFirestore.collection<Product>('products').snapshotChanges().pipe(
      map(documents => {
        const productArray: Product[] = [];
        documents.forEach(doc => {
          const prod = doc.payload.doc.data();
          productArray.push({
            id: doc.payload.doc.id,
            name: prod.name
          });
        });
        return productArray;
      })
    );
  }

  addProduct(product: Product) {
    this.angularFirestore.collection<Product>('products').add(product);
  }

  updateProduct(product: Product) {
    this.angularFirestore.collection<Product>('products').doc("S").set({
      name: product.name
    });
  }

  deleteProduct(product: Product) {
    this.angularFirestore.collection<Product>('products').doc().delete();
  }
}
