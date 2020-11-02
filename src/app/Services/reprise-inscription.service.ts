import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {RepriseInscriptionInterface} from '../Interfaces/RepriseInscriptionInterface';

@Injectable({
  providedIn: 'root'
})
export class RepriseInscriptionService {
  private baseURL = 'http://localhost:4000/api/reprise_inscription/';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:variable-name
  public getRegisteredUsers(id_reprise: number): Observable<any> {
    return this.http.get(`${this.baseURL}reprise/${id_reprise}`);
  }

  // tslint:disable-next-line:variable-name
  public editSubscription(reprise_inscription: RepriseInscriptionInterface): Observable<any> {
    return this.http.put(`${this.baseURL}edit/${reprise_inscription.id}`, reprise_inscription);
  }

  // tslint:disable-next-line:variable-name
  isRegistered(id_reprise: number, id_user: number): Observable<any> {
    return this.http.get(`${this.baseURL}isRegistered/reprise/${id_reprise}/user/${id_user}`);
  }
}
