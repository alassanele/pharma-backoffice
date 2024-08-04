import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject,tap } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiurl = 'http://localhost:8080/products';

  /*
  private products:Product[] = [
    {
      id: 1,
      label: "REMDESIVIR 100 mg, pdr pr sol à diluer pr perf",
      dci:"REMDESIVIR",
      sectionPrice: "25",
      publicPrice:"35",
      cip: "3400958902208",
      ucd:"3400890004800",
      tva: "10",
      quantiteStock: 1
    },
    {
      id: 2,
      label: "REMDESIVIR 100 mg/20 mL, sol à diluer pr perf, flac",
      dci:"REMDESIVIR",
      sectionPrice: "20",
      publicPrice:"30",
      cip: "3400958902192",
      ucd:"3400890004817",
      tva: "10",
      quantiteStock: 3
    },
    {
      id: 3,
      label: "VEKLURY 100 mg, pdr pr sol à diluer pr perf",
      dci:"REMDESIVIR",
      sectionPrice: "40",
      publicPrice:"50",
      cip: "3400955074267",
      ucd:"3400890007153",
      tva: "10",
      quantiteStock: 9
    },
    {
      id: 4,
      label: "PARACETAMOL 1 000 mg/100 mL CARELIDE, sol pr perf, poche avec site d'inj",
      dci:"PARACETAMOL",
      sectionPrice: "45",
      publicPrice:"55",
      cip: "3400957689582",
      ucd:"3400893506585",
      tva: "10",
      quantiteStock: 12
    },
    {
      id: 5,
      label: "PARACETAMOL 1 000 mg/100 mL CARELIDE, sol pr perf, poche avec site d'inj + set",
      dci:"PARACETAMOL",
      sectionPrice: "60",
      publicPrice:"85",
      cip: "3400957690762 ; 3400957691073",
      ucd:"3400893506646",
      tva: "10",
      quantiteStock: 15
    },
    {
      id: 6,
      label: "PARACETAMOL 1 000 mg/100 mL CARELIDE, sol pr perf, poche avec site d'inj + set",
      dci:"PARACETAMOL",
      sectionPrice: "60",
      publicPrice:"85",
      cip: "3400957690762 ; 3400957691073",
      ucd:"3400893506646",
      tva: "10",
      quantiteStock: 15
    }
  ];*/

  constructor(private http: HttpClient) {

  }

  private _refreshrequired=new Subject<void>();

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  getProducts(): Observable<Product[]> {
    //return this.products;
    //return this.http.get<Product[]>(this.urlApi);

    return this.http.get<Product[]>(this.apiurl);
  }

  /*
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlApi);
  }*/

  editProduct(idProduct: number)  {
    return this.http.get(this.apiurl+'/'+idProduct);
  }

  addProduct(product: Product)  {
    return this.http.post(this.apiurl, product).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
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
