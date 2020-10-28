import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { AuthenticationService, TokenPayloadLogin } from '../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credentials: TokenPayloadLogin = {
    login_user: '',
    password_user: '',
  };

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.credentials)
      .subscribe(
      () => {
        if (this.authService.getUserDetails().role_user.id === 1) {this.router.navigateByUrl('/home'); }
        else if (this.authService.getUserDetails().role_user.id === 2) {this.router.navigateByUrl('/home-instructor'); }
        else { this.router.navigateByUrl('/home'); }
      },
        err => {
        console.error(err);
        }
    );
  }

}
