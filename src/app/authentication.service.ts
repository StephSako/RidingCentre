import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

const baseURL = 'http://localhost:4000/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:variable-name
  public login(email_user, password_user): Observable<any> {
    return this.http.post('baseURL/connexion', email_user, password_user);
  }
}
