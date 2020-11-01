import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../Services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { HelperService } from '../Services/helper.service';
import { TokenPayloadLogin } from '../Interfaces/UserInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  nbErrors: number;

  credentials: TokenPayloadLogin = {
    login_user: '',
    password_user: '',
  };

  loginControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

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
    this.nbErrors = 0;
  }

  login(): void {
    if (!(this.helper.isEmpty(this.credentials.login_user) || this.helper.isEmpty(this.credentials.password_user))) {
      this.authService.login(this.credentials)
        .subscribe(
          () => {
            if (this.authService.isInstructor()) {
              this.router.navigateByUrl('/home-instructor');
            } else {
              this.router.navigateByUrl('/home');
            }
          },
          err => {
            this.nbErrors++;
            if (this.nbErrors === 3) { this.router.navigateByUrl('/recuperation-mot-de-passe'); }
            else { this.authService.notifyUser(err, 'OK', this.snackBar, 'error', 2000); }
          }
        );
    }
  }

}
