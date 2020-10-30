import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ChevalInterface } from '../Interfaces/ChevalInterface';

@Injectable({
  providedIn: 'root'
})
export class ChevalService {
  private baseURL = 'http://localhost:4000/api/cheval/';

  constructor(private http: HttpClient, private router: Router) { }

  public getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  public create(cheval: ChevalInterface): Observable<any> {
    return this.http.post(this.baseURL + 'create', cheval);
  }

  // tslint:disable-next-line:variable-name
  public edit(id_cheval: number, cheval: ChevalInterface): Observable<any> {
    return this.http.put(`${this.baseURL}edit/${id_cheval}`, cheval);
  }

  // tslint:disable-next-line:variable-name
  public details(id_cheval: number): Observable<any> {
    return this.http.get( `${this.baseURL}/${id_cheval}`);
  }

  // tslint:disable-next-line:variable-name
  public delete(id_cheval: number): Observable<any> {
    return this.http.delete(`${this.baseURL}delete/${id_cheval}`);
  }
}
