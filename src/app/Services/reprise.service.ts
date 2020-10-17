import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { RepriseInterface } from '../Interfaces/RepriseInterface';

export interface Reprise {
  rider_number_limit: number;
  date: Date;
  galop_level: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class RepriseService {
  private baseURL = 'http://localhost:4000/api/reprise';

  constructor(private http: HttpClient, private router: Router) { }

  public create(reprise: Reprise): Observable<any> {
    return this.http.post(this.baseURL + '/create', reprise);
  }

  // tslint:disable-next-line:variable-name
  public details(id_reprise: number): Observable<any> {
    return this.http.get( `${this.baseURL}/details/${id_reprise}`);
  }
}
