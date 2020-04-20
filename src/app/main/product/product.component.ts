import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { Select,Store } from '@ngxs/store';
import { GetProducts, AddProduct, UpdateProduct, DeleteProduct, SetSelectedProduct } from './product.action';
import { ProductState } from './product.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Select(ProductState.getProductList) products: Observable<Product[]>;
  selectedProduct: Product;

  productForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private store: Store,private productService: ProductService) {
  }

  ngOnInit() {
    this.store.dispatch(new GetProducts());
  }

  addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

  updateProduct(product: Product) {
    this.selectedProduct.name = product.name;
    this.store.dispatch(new UpdateProduct(this.selectedProduct));
  }

  deleteProduct(product: Product) {
    this.store.dispatch(new DeleteProduct(product));
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
    this.store.dispatch(new SetSelectedProduct(product));
  }
}