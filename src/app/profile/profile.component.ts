import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../Services/authentication.service';
import { UserEditInterface, UserInterface } from '../Interfaces/UserInterface';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInterface;
  userEdit: UserEditInterface = {
    id_user: null,
    lastname_user: null,
    firstname_user: null,
    email_user: null,
    phone_number_user: null,
    license_number_user: null
  };

  constructor(private authService: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.profile().subscribe(
      user => {
        this.user = user;
      },
      err => {
        console.error(err);
      }
    );
  }

  openDialog(user: UserEditInterface): void {
    this.dialog.open(ProfileEditComponent, {
      width: '60%',
      data: user
    });
  }

}
