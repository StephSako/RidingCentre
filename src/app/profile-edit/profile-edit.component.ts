import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEditInterface } from '../Interfaces/UserInterface';
import { AuthenticationService } from '../Services/authentication.service';
import { HelperService } from '../Services/helper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {

  user: UserEditInterface = {
    id_user: null,
    lastname_user: null,
    firstname_user: null,
    email_user: null,
    phone_number_user: null,
    license_number_user: null
  };

  constructor(private authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) public userdata: UserEditInterface,
              private helper: HelperService, private snackBar: MatSnackBar) {
    this.user = userdata;
  }

  edit(): void {
    this.authService.edit(this.user).subscribe(() => {
        this.authService.notifyUser('Votre compte a bien été modifié', 'OK', this.snackBar, 'success', 2000);
      },
      err => {
        this.authService.notifyUser(err, 'OK', this.snackBar, 'error', 2000);
      });
  }

  isInvalid(): boolean {
    return (!this.helper.isEmpty(this.user.email_user) && !this.helper.isEmpty(this.user.firstname_user)
      && !this.helper.isEmpty(this.user.lastname_user) && !this.helper.isEmpty(this.user.phone_number_user));
  }

}
