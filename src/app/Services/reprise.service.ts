import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { RepriseInterface } from '../Interfaces/RepriseInterface';
import {Time} from '@angular/common';

export interface Reprise {
  rider_number_limit: number;
  date: Date;
  hour: Time;
  galop_level: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class RepriseService {
  private baseURL = 'http://localhost:4000/api/reprise/';

  constructor(private http: HttpClient, private router: Router) { }

  public getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  public create(reprise: Reprise): Observable<any> {
    return this.http.post(this.baseURL, reprise);
  }

  // tslint:disable-next-line:variable-name
  public details(id_reprise: number): Observable<any> {
    return this.http.get( `${this.baseURL}/${id_reprise}`);
  }
}
