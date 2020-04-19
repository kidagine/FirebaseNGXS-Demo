import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Observable<Product[]>
  selectedProduct: Product;

  productForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  ngOnInit() {
  }

  addProduct(product: Product) {
    this.productService.addProduct(product);
  }

  updateProduct(product: Product) {
    this.selectedProduct.name = product.name;
    this.productService.updateProduct(this.selectedProduct);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product);
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

}
