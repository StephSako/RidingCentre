import { Component, Input, OnInit } from '@angular/core';
import { UserEditInterface } from '../Interfaces/UserInterface';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Input() user: UserEditInterface = {
    id_user: null,
    lastname_user: null,
    firstname_user: null,
    email_user: null,
    phone_number_user: null,
    license_number_user: null
  };

  fieldControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneNumberControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]);

  getErrorMessageField(): string {
    if (this.fieldControl.hasError('required')) {
      return 'Champ obligatoire';
    }
  }

  getErrorMessagePhoneNumber(): string {
    if (this.phoneNumberControl.hasError('required')) {
      return 'Numéro de téléphone obligatoire';
    }
    else if (this.phoneNumberControl.hasError('pattern')) {
      return 'Format invalide. Ex : 01233456789';
    }
  }

  getErrorMessageEmail(): string {
    if (this.fieldControl.hasError('required')) {
      return 'Champ obligatoire';
    }
    else if (this.emailControl.hasError('email')) {
      return 'Format invalide. Ex : user@fai.fr';
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
