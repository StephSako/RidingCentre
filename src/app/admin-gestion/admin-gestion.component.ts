import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HelperService } from '../Services/helper.service';
import { TokenPayloadRegister, UserInfoInterface } from '../Interfaces/UserInterface';
import { AuthenticationService } from '../Services/authentication.service';
import { DialogData } from '../Interfaces/DialogData';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrls: ['./admin-gestion.component.css']
})
export class AdminGestionComponent implements OnInit {

  displayedColumns: string[] = ['name', 'licenceNumber', 'email', 'phoneNumber'];
  allAdministrators: UserInfoInterface[];

  administrator: TokenPayloadRegister = {
    firstname_user: null,
    lastname_user: null,
    email_user: null,
    role_user_id: 3,
    password_user: null,
    license_number_user: null,
    phone_number_user: null
  };

  constructor(public authService: AuthenticationService, public dialog: MatDialog, private helper: HelperService) { }

  ngOnInit(): void {
    this.updateAllAdministrators();
  }

  updateAllAdministrators(): void {
    this.authService.getAllAdministrators().subscribe(allAdministrators => this.allAdministrators = allAdministrators );
  }

  create(): void {
    this.authService.register(this.administrator)
      .subscribe(
        () => {
          this.updateAllAdministrators();
        },
        err => {
          console.error(err);
        }
      );
  }

  isInvalid(): boolean {
    return (!this.helper.isEmpty(this.administrator.firstname_user) && !this.helper.isEmpty(this.administrator.firstname_user) &&
      !this.helper.isEmpty(this.administrator.email_user) && !this.helper.isEmpty(this.administrator.phone_number_user)
      && !this.helper.isEmpty(this.administrator.license_number_user));
  }

  deleteAccount(idUser: number, firstname: string, lastname: string): void {
    const accountToDelete: DialogData = {
      id: idUser,
      action: 'Supprimer le compte',
      subtitle: firstname + ' ' + lastname
    };

    this.dialog.open(DialogComponent, {
      width: '30%',
      data: accountToDelete
    })
      .afterClosed().subscribe(result => {
      this.authService.deleteAccount(result).subscribe(() => {
        this.updateAllAdministrators();
        }, err => { console.error(err); });
    });
  }

}
