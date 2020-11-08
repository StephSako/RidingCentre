import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {HelperService} from '../Services/helper.service';
import {TokenPayloadRegister, UserInfoInterface} from '../Interfaces/UserInterface';
import {AuthenticationService} from '../Services/authentication.service';
import {DialogData} from '../Interfaces/DialogData';
import {DialogComponent} from '../dialog/dialog.component';
import {RoleUserInterface} from '../Interfaces/RoleUser';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrls: ['./admin-gestion.component.css']
})
export class AdminGestionComponent implements OnInit {

  displayedColumns: string[] = ['name', 'licenceNumber', 'email', 'phoneNumber'];
  allAccounts: UserInfoInterface[];

  account: TokenPayloadRegister = {
    firstname_user: null,
    lastname_user: null,
    email_user: null,
    role_user_id: null,
    password_user: null,
    license_number_user: null,
    phone_number_user: null
  };

  constructor(public authService: AuthenticationService, public dialog: MatDialog, private helper: HelperService) { }

  ngOnInit(): void {
    this.updateAllAccounts();
  }

  updateAllAccounts(): void {
    this.authService.getAllAccounts().subscribe(allAccounts => this.allAccounts = allAccounts );
  }

  create(): void {
    this.authService.register(this.account)
      .subscribe(
        () => {
          this.updateAllAccounts();
        },
        err => {
          console.error(err);
        }
      );
  }

  isInvalid(): boolean {
    return (!this.helper.isEmpty(this.account.firstname_user) && !this.helper.isEmpty(this.account.firstname_user) &&
      !this.helper.isEmpty(this.account.email_user) && !this.helper.isEmpty(this.account.phone_number_user)
      && !this.helper.isEmpty(this.account.license_number_user));
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
        this.updateAllAccounts();
        }, err => { console.error(err); });
    });
  }

  nommer(user: UserInfoInterface, firstname: string, lastname: string, action: string): void {
    const accountToDowngrade: DialogData = {
      id: user.id_user,
      action: (action === 'r' ? 'Rétrograder' : 'Promouvoir') + ' le role de',
      subtitle: firstname + ' ' + lastname
    };

    this.dialog.open(DialogComponent, {
      width: '30%',
      data: accountToDowngrade
    })
      .afterClosed().subscribe(result => {
        if (result) {
          let newRole = user.role_user.id;
          console.log(newRole);

          if (action === 'r'){ newRole--; }
          else { newRole++; }

          console.log(newRole);
          this.authService.editRole(user, newRole).subscribe(() => {
            this.updateAllAccounts();
          }, err => { console.error(err); });
        }
    });
  }

}
