import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../Services/authentication.service';
import { TokenPayloadRegister } from '../Interfaces/UserInterface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import {HelperService} from '../Services/helper.service';

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
    role_user_id: 1,
    password_user: null,
    license_number_user: null,
    phone_number_user: null
  };
  spinnerShown: boolean;

  constructor(private authService: AuthenticationService, private router: Router, private helper: HelperService,
              private snackBar: MatSnackBar, private titleService: Title) {
    this.titleService.setTitle('Page d\'inscription');
  }

  ngOnInit(): void {
    this.spinnerShown = false;
  }

  register(): void {
    if (!this.helper.isEmpty(this.credentials.firstname_user) && !this.helper.isEmpty(this.credentials.lastname_user)
      && !this.helper.isEmpty(this.credentials.email_user) && !this.helper.isEmpty(this.credentials.password_user)
      && !this.helper.isEmpty(this.credentials.phone_number_user)
      && /^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.credentials.email_user)
      && /^[0-9]{10,10}$/.test(this.credentials.phone_number_user)) {
      this.spinnerShown = true;
      this.authService.register(this.credentials)
        .subscribe(
          () => {
            this.spinnerShown = false;
            this.router.navigateByUrl('/home');
          },
          err => {
            this.spinnerShown = false;
            this.authService.notifyUser(err, this.snackBar, 'error', 2000);
          }
        );
    }
  }

}
