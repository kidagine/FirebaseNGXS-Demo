import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private angularFirestore: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.angularFirestore.collection<Product>('products').valueChanges();
  }

  addProduct(product: Product) {
    this.angularFirestore.collection<Product>('products').add(product);
  }

  updateProduct(product: Product) {
    this.angularFirestore.collection<Product>('products').doc("S").set({
      name: product.name
    });
  }

  deleteProduct(produc: Product) {
    this.angularFirestore.collection<Product>('products').doc('s').delete();
  }
}
