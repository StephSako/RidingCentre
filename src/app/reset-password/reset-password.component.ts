import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../Services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HelperService} from '../Services/helper.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password: string = '';
  passwordControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar, private helper: HelperService,
              private titleService: Title) {
    this.titleService.setTitle('Récupération du mot de passe');
  }

  ngOnInit(): void {
  }

  getErrorMessageEmail(): string {
    if (this.passwordControl.hasError('required')) {
      return 'Champ obligatoire';
    }
    else if (this.passwordControl.hasError('email')) {
      return 'Format invalide. Ex : user@fai.fr';
    }
  }

  recupPassword(): void {
    if (!this.helper.isEmpty(this.password)){
      this.authService.retrievePassword(this.password).subscribe(() => {
          this.authService.notifyUser('Votre compte a bien été modifié', this.snackBar, 'success', 2000, 'OK');
        },
        err => {
          this.authService.notifyUser(err, this.snackBar, 'error', 2000, 'OK');
        });
    }
  }

}
