import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiurl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) {
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiurl);
  }

  editClient(idClient: number)  {
    return this.http.get(this.apiurl+'/'+idClient);
  }

  addClient(client: Client)  {
    return this.http.post(this.apiurl, client);
  }

  deleteClient(idClient: number) {
    return this.http.delete(this.apiurl+'/'+idClient);
  }
}
