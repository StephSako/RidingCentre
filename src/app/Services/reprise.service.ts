import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RepriseService {
  private baseURL = 'http://localhost:4000/api/reprise';

  constructor(private http: HttpClient, private router: Router) { }

  public getReprise(idReprise: number): Observable<any> {
    return this.http.post( this.baseURL + '/details', idReprise);
  }
}
