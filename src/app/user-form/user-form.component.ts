import { Component, Input, OnInit } from '@angular/core';
import { TokenPayloadRegister } from '../Interfaces/UserInterface';

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
    role_user_id: 1,
    password_user: null,
    license_number_user: null,
    phone_number_user: null
  };

  constructor() { }

  ngOnInit(): void { }

}
