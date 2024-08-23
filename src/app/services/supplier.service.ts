import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  apiurl = 'http://localhost:8080/suppliers';

  constructor(private http: HttpClient) {
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiurl);
  }

  editSupplier(idSupplier: number)  {
    return this.http.get(this.apiurl+'/'+idSupplier);
  }

  addSupplier(supplier: Supplier)  {
    return this.http.post(this.apiurl, supplier);
  }

  deleteSupplier(idSupplier: number) {
    return this.http.delete(this.apiurl+'/'+idSupplier);
  }
}
