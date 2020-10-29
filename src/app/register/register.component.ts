import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { AuthenticationService, TokenPayloadRegister } from '../Services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayloadRegister = {
    firstname_user: null,
    lastname_user: null,
    email_user: null,
    role_user: {
      id: 0,
      role: null
    },
    password_user: null,
    license_number_user: null,
    phone_number_user: null
  };

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void { }

  register(): void {
    this.authService.register(this.credentials)
      .subscribe(
        () => {
          this.router.navigateByUrl('/home');
        },
        err => {
          console.error(err);
        }
      );
  }

}
