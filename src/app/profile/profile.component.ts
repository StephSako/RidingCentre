import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../Services/authentication.service';
import { UserInfoInterface } from '../Interfaces/UserInterface';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { Title } from '@angular/platform-browser';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInfoInterface;
  userEdit: UserInfoInterface = {
    role_user: null,
    id_user: null,
    lastname_user: null,
    firstname_user: null,
    email_user: null,
    phone_number_user: null,
    license_number_user: null
  };

  passwords = {
    oldPassword: null,
    newPassword: null,
    newPasswordTwice: null
  };

  public oldPasswordControl = new FormControl('', [Validators.required]);
  public newPasswordControl = new FormControl('', [Validators.required]);
  public newPasswordTwiceControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthenticationService, public dialog: MatDialog, private titleService: Title,
              private snackbar: MatSnackBar) {
    this.titleService.setTitle('Mon profil');
  }

  getErrorMessageOldPassword(): string {
    if (this.oldPasswordControl.hasError('required')) {
      return 'Vous devez renseigner votre mot de passe actuel';
    }
  }

  getErrorMessageNewPassword(): string {
    if (this.newPasswordControl.hasError('required')) {
      return 'Vous devez renseigner votre nouveau mot de passe';
    }
  }

  getErrorMessageNewPasswordTwice(): string {
    if (this.newPasswordControl.hasError('required')) {
      return 'Vous devez retaper votre nouveau mot de passe';
    }
  }

  ngOnInit(): void {
    this.authService.profile().subscribe(
      user => {
        this.user = user;
      },
      err => {
        this.authService.notifyUser('Profil introuvable', this.snackbar, 'error', 2000);
      }
    );
  }

  openDialog(user: UserInfoInterface): void {
    this.dialog.open(ProfileEditComponent, {
      width: '60%',
      data: user
    });
  }

  editPassword(): void {
    if (this.passwords.newPassword !== this.passwords.newPasswordTwice){
      this.authService.notifyUser('Les nouveaux mots de passe ne correspondent pas', this.snackbar, 'error', 2000, 'OK');
    }
    else {
      this.authService.editPasswordForm(this.authService.getUserDetails().id_user, this.passwords.oldPassword, this.passwords.newPassword)
        .subscribe(
          (result) => {
            this.authService.notifyUser(result, this.snackbar, 'error', 2000);
          },
          err => {
            this.authService.notifyUser(err.error.text, this.snackbar, 'error', 2000);
          }
        );
    }
  }

  isInvalid(): boolean {
    return (this.passwords.oldPassword != null && this.passwords.newPassword != null && this.passwords.oldPassword.length > 0 &&
      this.passwords.oldPassword.length > 0);
  }

}
