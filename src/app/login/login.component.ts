import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { AuthenticationService, TokenPayload } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    id_user: 0,
    firstname_user: '',
    lastname_user: '',
    email_user: '',
    password_user: '',
    license_number_user: '',
    phone_number_user: ''
  };

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void { }

  login(): void {
    this.authService.login(this.credentials)
      .subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
        err => {
        console.error(err);
        }
    );
  }

}
