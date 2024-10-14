import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Command } from '../models/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  apiurl = 'http://localhost:8080/commands';

  constructor(private http: HttpClient) {
  }

  getCommands(): Observable<Command[]> {
    return this.http.get<Command[]>(this.apiurl);
  }

  editCommand(idCommand: number)  {
    return this.http.get(this.apiurl+'/'+idCommand);
  }

  saveCommand(command: Command)  {
    return this.http.post(this.apiurl, command);
  }

  deleteCommand(idCommand: number) {
    return this.http.delete(this.apiurl+'/'+idCommand);
  }
}
