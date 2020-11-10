import { Component, Input, OnInit } from '@angular/core';
import { TokenPayloadRegister } from '../Interfaces/UserInterface';
import {RoleUserInterface} from '../Interfaces/RoleUser';
import {RoleService} from '../Services/role.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: TokenPayloadRegister = {
    firstname_user: null,
    lastname_user: null,
    email_user: null,
    role_user_id: null,
    password_user: null,
    license_number_user: null,
    phone_number_user: null
  };

  @Input() roleAdmin: boolean;
  listRoles: RoleUserInterface[];

  lastnameControl = new FormControl('', [Validators.required]);
  firstnameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  roleControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneNumberControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{10,10}')]);

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    if (this.roleAdmin){
      this.roleService.getListRolesAdminCreateAccount().subscribe((listRoles) => {
          this.listRoles = listRoles;
        },
        err => {
          console.error(err);
        });
    }
  }

  getErrorMessageLogin(): string {
    if (this.lastnameControl.hasError('required') || this.firstnameControl.hasError('required')
      || this.passwordControl.hasError('required')  || this.roleControl.hasError('required')) {
      return 'Champ obligatoire';
    }
  }

  getErrorMessageEmail(): string {
    if (this.emailControl.hasError('required')) {
      return 'Adresse email obligatoire';
    }
    else if (this.emailControl.hasError('email')) {
      return 'Format d\'adresse email incorrect';
    }
  }

  getErrorMessagePhoneNumber(): string {
    if (this.phoneNumberControl.hasError('required')) {
      return 'Numéro de téléphone obligatoire';
    }
    else if (this.phoneNumberControl.hasError('pattern')) {
      return 'Format de numéro de téléphone incorrect';
    }
  }

}
