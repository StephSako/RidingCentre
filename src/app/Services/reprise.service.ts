import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RepriseInterface } from '../Interfaces/RepriseInterface';

@Injectable({
  providedIn: 'root'
})
export class RepriseService {
  private baseURL = 'http://localhost:4000/api/reprise/';
  private baseURLInscription = 'http://localhost:4000/api/reprise_inscription/';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  public create(reprise: RepriseInterface): Observable<any> {
    return this.http.post(this.baseURL + 'create', reprise);
  }

  // tslint:disable-next-line:variable-name
  public edit(id_reprise: number, reprise: RepriseInterface): Observable<any> {
    return this.http.put(`${this.baseURL}edit/${id_reprise}`, reprise);
  }

  // tslint:disable-next-line:variable-name
  public details(id_reprise: number): Observable<any> {
    return this.http.get( `${this.baseURL}/${id_reprise}`);
  }

  // tslint:disable-next-line:variable-name
  public delete(id_reprise: number): Observable<any> {
    return this.http.delete(`${this.baseURL}delete/${id_reprise}`);
  }

  // tslint:disable-next-line:variable-name
  public isEmpty(_string: string): boolean {
    return (!_string || 0 === _string.trim().length);
  }

  // tslint:disable-next-line:variable-name
  public getRegisteredUsers(id_reprise: number): Observable<any> {
    return this.http.get( `${this.baseURLInscription}reprise/${id_reprise}`);
  }
}
