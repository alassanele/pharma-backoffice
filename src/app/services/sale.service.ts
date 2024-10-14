import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  apiurl = 'http://localhost:8080/sales';

  constructor(private http: HttpClient) {
  }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiurl);
  }

  editSale(idSale: number)  {
    return this.http.get(this.apiurl+'/'+idSale);
  }

  saveSale(sale: Sale)  {
    return this.http.post(this.apiurl, sale);
  }

  deleteSale(idSale: number) {
    return this.http.delete(this.apiurl+'/'+idSale);
  }
}
