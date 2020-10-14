import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { AuthenticationService, TokenPayload } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit {

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

  register(): void {
    this.authService.register(this.credentials)
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
