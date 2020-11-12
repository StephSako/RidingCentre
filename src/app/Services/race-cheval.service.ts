import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceChevalService {
  private baseURL = 'http://localhost:4000/api/race_cheval/';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }
}
