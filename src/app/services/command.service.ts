import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { Command } from '../models/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  apiurl = 'http://localhost:8080/commands';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiurl);
  }

  editProduct(idProduct: number)  {
    return this.http.get(this.apiurl+'/'+idProduct);
  }

  saveCommand(command: Command)  {
    return this.http.post(this.apiurl, command);
  }

  deleteProduct(idProduct: number) {
    return this.http.delete(this.apiurl+'/'+idProduct);
  }
}
