import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../Services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { HelperService } from '../Services/helper.service';
import { TokenPayloadLogin } from '../Interfaces/UserInterface';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  nbErrors: number;
  spinnerShown: boolean;

  credentials: TokenPayloadLogin = {
    login_user: '',
    password_user: '',
  };

  loginControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar,
              private helper: HelperService, private titleService: Title) {
    this.titleService.setTitle('Page de connexion');
  }

  ngOnInit(): void {
    this.nbErrors = 0;
    this.spinnerShown = false;
  }

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

  login(): void {
    if (!this.helper.isEmpty(this.credentials.login_user) && !this.helper.isEmpty(this.credentials.password_user)) {
      this.spinnerShown = true;
      this.authService.login(this.credentials)
        .subscribe(
          () => {
            this.spinnerShown = false;
            if (this.authService.isInstructor()) { this.router.navigateByUrl('/home-instructor'); }
            else if (this.authService.isSuperAdmin() || this.authService.isAdmin()) { this.router.navigateByUrl('/admin-gestion'); }
            else { this.router.navigateByUrl('/home'); }
          },
          err => {
            this.spinnerShown = false;
            this.nbErrors++;
            if (this.nbErrors === 3) { this.router.navigateByUrl('/recuperation-mot-de-passe'); }
            else { this.authService.notifyUser(err, this.snackBar, 'error', 2000, 'OK'); }
          }
        );
    }
  }

}
