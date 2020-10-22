import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

import { UserInterface } from '../Interfaces/UserInterface';
import { map } from 'rxjs/operators';

interface TokenResponse {
  token: string;
}

export interface TokenPayloadLogin {
  login_user: string;
  password_user: string;
}

export interface TokenPayloadRegister {
  firstname_user: string;
  lastname_user: string;
  email_user: string;
  role_user: number;
  password_user: string;
  license_number_user: string;
  phone_number_user: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseURL = 'http://localhost:4000/api/user';
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('userToken', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) { this.token = localStorage.getItem('userToken'); }
    return this.token;
  }

  public getUserDetails(): UserInterface {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) { return user.exp > Date.now() / 1000; }
    else { return false; }
  }

  public isAdmin(): boolean {
    const user = this.getUserDetails();
    if (this.isLoggedIn()) {
      if (user.role_user === 3) { return user.exp > Date.now() / 1000; }
      else { return false; }
    } else { return false; }
  }

  public isInstructor(): boolean {
    const user = this.getUserDetails();
    if (this.isLoggedIn()) {
      if (user.role_user === 2) { return user.exp > Date.now() / 1000; }
      else { return false; }
    } else { return false; }
  }

  public register(user: TokenPayloadRegister): Observable<any> {
    const URL = this.http.post(this.baseURL + '/register', user);

    return URL.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public login(user: TokenPayloadLogin): Observable<any> {
    const URL = this.http.post(this.baseURL + '/login', user);

    return URL.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public profile(): Observable<any> {
    return this.http.get( this.baseURL + '/profile', {
      headers: { Authorization: `${this.getToken()}` }
    });
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('userToken');
    this.router.navigateByUrl('/login');
  }
}
