import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiurl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiurl);
  }

  editProduct(idProduct: number)  {
    return this.http.get(this.apiurl+'/'+idProduct);
  }

  addProduct(product: Product)  {
    return this.http.post(this.apiurl, product);
  }

  deleteProduct(idProduct: number) {
    return this.http.delete(this.apiurl+'/'+idProduct);
  }

  getProductWithoutIds(ids:String): Observable<Product[]> {
    console.log('ids:', ids);
    if(ids == null || ids == ""){
      return this.getProducts();
    }
    return this.http.get<Product[]>(this.apiurl+"/exclude/"+ids);
  }
}
