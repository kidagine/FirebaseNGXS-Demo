import {State, Action, StateContext, Selector} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { GetProducts, AddProduct, UpdateProduct, DeleteProduct, SetSelectedProduct } from './product.action';
import { Injectable } from '@angular/core';

export class ProductStateModel {
    products: Product[];
    selectedProduct: Product;
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: [],
        selectedProduct: null
    }
})
@Injectable()
export class ProductState {

    constructor(private productService: ProductService) {}

    @Selector()
    static getProductList(state: ProductStateModel) {
      return state.products;
    }

    @Selector()
    static getSelectedProduct(state: ProductStateModel) {
      return state.selectedProduct;
    }

    @Action(GetProducts)
    getProducts({getState, setState}: StateContext<ProductStateModel>) {
      return this.productService.getProducts().pipe(tap((result) => {
          const state = getState();
          setState({
              ...state,
              products: result,
          });
      }));
    }

    @Action(AddProduct)
    addProduct({getState, patchState}: StateContext<ProductStateModel>, {payload}: AddProduct) {
      return this.productService.addProduct(payload);
    }

    @Action(UpdateProduct)
    updateProduct({getState, setState}: StateContext<ProductStateModel>, {payload}: UpdateProduct) {
      return this.productService.updateProduct(payload);
    }

    @Action(DeleteProduct)
    deleteProduct({getState, setState}: StateContext<ProductStateModel>, {payload}: DeleteProduct) {
      return this.productService.deleteProduct(payload);
    }

    @Action(SetSelectedProduct)
    setSelectedTodoId({getState, setState}: StateContext<ProductStateModel>, {payload}: SetSelectedProduct) {
        const state = getState();
        setState({
            ...state,
            selectedProduct: payload
        });
    }
}