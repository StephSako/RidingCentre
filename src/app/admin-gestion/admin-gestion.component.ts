import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HelperService } from '../Services/helper.service';
import { TokenPayloadRegister, UserInfoInterface } from '../Interfaces/UserInterface';
import { AuthenticationService } from '../Services/authentication.service';
import { DialogData } from '../Interfaces/DialogData';
import { DialogComponent } from '../dialog/dialog.component';
import { RoleUserInterface } from '../Interfaces/RoleUser';
import { RoleService } from '../Services/role.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';
import {RepriseService} from '../Services/reprise.service';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrls: ['./admin-gestion.component.css']
})
export class AdminGestionComponent implements OnInit {

  displayedColumns: string[] = ['name', 'licenceNumber', 'email', 'phoneNumber'];
  allAccounts: UserInfoInterface[];

  allRoles: RoleUserInterface[];
  rolesControl = new FormControl();
  namesControl = new FormControl();

  newAdmin: TokenPayloadRegister = {
    firstname_user: null,
    lastname_user: null,
    email_user: null,
    role_user_id: null,
    password_user: null,
    license_number_user: null,
    phone_number_user: null
  };

  panelOpenState = false;

  constructor(public authService: AuthenticationService, public dialog: MatDialog, private helper: HelperService,
              private roleService: RoleService, private snackBar: MatSnackBar, private titleService: Title,
              private repriseService: RepriseService) {
    this.titleService.setTitle('Gestion des comptes');
  }

  ngOnInit(): void {
    this.getAllAccounts();
    this.getAllRoles();
  }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState;
  }

  getAllRoles(): void {
    this.roleService.getAll().subscribe(allRoles => this.allRoles = allRoles.filter(role => role.id !== 4),
      err => {
        console.error(err);
      });
  }

  getAllAccounts(): void {
    this.authService.getAllAccounts().subscribe((allAccounts) =>
      {
        this.allAccounts = allAccounts;

        if (this.rolesControl.value != null && this.rolesControl.value.length > 0){
          this.allAccounts = this.allAccounts.filter(account => this.rolesControl.value.includes(account.role_user.id));
        }
        if (this.namesControl.value != null && this.namesControl.value.length > 0){
          this.allAccounts = this.allAccounts.filter(account =>
            // tslint:disable-next-line:max-line-length
            ((account.firstname_user.toLowerCase()) + ' ' + (account.lastname_user.toLowerCase())).includes(this.namesControl.value.toLowerCase()));
        }
      },
      err => {
        console.error(err);
      });
  }

  create(): void {
    this.authService.register(this.newAdmin)
      .subscribe(
        () => {
          this.getAllAccounts();
          this.togglePanel();
          this.authService.notifyUser('Compte créé', this.snackBar, 'success', 1000);
        },
        err => {
          this.authService.notifyUser(err, this.snackBar, 'error', 2000);
        }
      );
  }

  isInvalid(): boolean {
    return (this.newAdmin.role_user_id && !this.helper.isEmpty(this.newAdmin.firstname_user) &&
      !this.helper.isEmpty(this.newAdmin.firstname_user) && !this.helper.isEmpty(this.newAdmin.email_user)
      && !this.helper.isEmpty(this.newAdmin.phone_number_user));
  }

  deleteAccount(user: UserInfoInterface): void {
    let message;
    if (user.role_user.id === 1) { message = 'Supprimer le compte et les inscriptions aux cours de'; }
    else if (user.role_user.id === 2) { message = 'Supprimer le compte et les reprises créées de'; }
    else {  message = 'Supprimer le compte de'; }

    const accountToDelete: DialogData = {
      id: user.id_user,
      action: message,
      subtitle: user.firstname_user + ' ' + user.lastname_user
    };

    this.dialog.open(DialogComponent, {
      width: '50%',
      data: accountToDelete
    }).afterClosed().subscribe(result => {
      this.authService.deleteAccount(result).subscribe(() => {
        this.getAllAccounts();
        }, err => { console.error(err); });
    });
  }

  nommer(user: UserInfoInterface, firstname: string, lastname: string, action: string): void {
    const accountToDowngrade: DialogData = {
      id: user.id_user,
      action: (action === 'r' ? 'Rétrograder' : 'Promouvoir') + ' le rôle de',
      subtitle: firstname + ' ' + lastname
    };

    this.dialog.open(DialogComponent, {
      width: '30%',
      data: accountToDowngrade
    }).afterClosed().subscribe(result => {
        if (result) {
          let newRole = user.role_user.id;

          if (action === 'r'){ newRole--; }
          else { newRole++; }

          this.authService.editRole(user.id_user, newRole).subscribe(() => {
            // On défini le champ 'moniteur' de la table Reprise du compte rétrogader s'il s'agit d'un compte moniteur
            // car une reprise ne peut être dirigée que par un moniteur
            if (user.role_user.id === 2){
              this.repriseService.editInstructor(user.id_user).subscribe(() => { }, err => { console.error(err); });
            }
            this.getAllAccounts();
          }, err => { console.error(err); });
        }
    });
  }

}
