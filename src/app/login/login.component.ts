import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { AuthenticationService, TokenPayloadLogin } from '../Services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import {HelperService} from '../Services/helper.service';

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

  loginControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageLogin(): string {
    if (this.loginControl.hasError('required')) {
      return 'Login obligatoire';
    }
  }

  getErrorMessagePassword(): string {
    if (this.passwordControl.hasError('required')) {
      return 'Mot de passe obligatoire';
    }
  }

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar,
              private helper: HelperService) { }

  ngOnInit(): void {
  }

  login(): void {
    if (!(this.helper.isEmpty(this.credentials.login_user) || this.helper.isEmpty(this.credentials.password_user))) {
      this.authService.login(this.credentials)
        .subscribe(
          () => {
            if (this.authService.isRider()) {
              this.router.navigateByUrl('/home');
            } else if (this.authService.isInstructor()) {
              this.router.navigateByUrl('/home-instructor');
            } else {
              this.router.navigateByUrl('/home');
            }
          },
          err => {
            this.openSnackBar(err, 'OK');
          }
        );
    }
  }

  openSnackBar(message: string, action: string): void {
    this.authService.notifyUser(message, action, this.snackBar);
  }

}
