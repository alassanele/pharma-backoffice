import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject,tap } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiurl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {
  }

  private _refreshrequired=new Subject<void>();

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiurl);
  }

  editProduct(idProduct: number)  {
    return this.http.get(this.apiurl+'/'+idProduct);
  }

  addProduct(product: Product)  {
    console.log("product : ",product);
    return this.http.post(this.apiurl, product);
  }

  deleteProduct(idProduct: number) {
    return this.http.delete(this.apiurl+'/'+idProduct);
  }


  /*

  private _refreshrequired=new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  GetEmployee(): Observable<Employee> {
    return this.http.get<Employee>(this.apiurl);
  }
  GetEmployeebycode(code:any){
    return this.http.get(this.apiurl+'/'+code);
  }
  Remove(code:any){
    return this.http.delete(this.apiurl+'/'+code);
  }
  Save(inputdata:any){
    return this.http.post(this.apiurl,inputdata).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  GetDes(){
    return this.http.get('https://localhost:44308/Designation');
  }
   */

}
