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
    firstname_user: '',
    lastname_user: '',
    email_user: '',
    role_user: 0,
    password_user: '',
    license_number_user: '',
    phone_number_user: ''
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
