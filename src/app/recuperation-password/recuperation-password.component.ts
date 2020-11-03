import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../Services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HelperService} from '../Services/helper.service';

@Component({
  selector: 'app-recuperation-password',
  templateUrl: './recuperation-password.component.html',
  styleUrls: ['./recuperation-password.component.css']
})
export class RecuperationPasswordComponent implements OnInit {

  email: string;
  sent: boolean;
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageEmail(): string {
    if (this.emailControl.hasError('required')) {
      return 'Champ obligatoire';
    }
    else if (this.emailControl.hasError('email')) {
      return 'Format invalide. Ex : user@fai.fr';
    }
  }

  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar, private helper: HelperService) { }

  ngOnInit(): void {
    this.sent = false;
  }

  recupPassword(): void {
    if (!this.helper.isEmpty(this.email)){
      this.authService.retrievePassword(this.email).subscribe(() => {
          this.authService.notifyUser('Votre compte a bien été modifié', this.snackBar, 'success', 2000, 'OK');
          this.sent = true;
        },
        err => {
          this.authService.notifyUser(err, this.snackBar, 'error', 2000, 'OK');
        });
    }
  }

}
