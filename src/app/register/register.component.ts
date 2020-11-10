import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../Services/authentication.service';
import { TokenPayloadRegister } from '../Interfaces/UserInterface';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  register(): void {
    this.authService.register(this.credentials)
      .subscribe(
        () => {
          this.router.navigateByUrl('/home');
        },
        err => {
          this.authService.notifyUser(err, this.snackBar, 'error', 2000);
        }
      );
  }

}
