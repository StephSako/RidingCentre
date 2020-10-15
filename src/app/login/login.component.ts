import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { MaterializeAction} from 'angular2-materialize';

import * as M from 'materialize-css/dist/js/materialize';

import { AuthenticationService, TokenPayload } from '../authentication.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})

export class LoginComponent implements OnInit {

  toastModule = new EventEmitter<string|MaterializeAction>();

  credentials: TokenPayload = {
    id_user: 0,
    firstname_user: '',
    lastname_user: '',
    email_user: '',
    password_user: '',
    license_number_user: '',
    phone_number_user: ''
  };

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // this.toastMe('Vous êtes connecté');
  }

  toastMe(texte: string): void {
    M.toast({html: texte});
  }

  login(): void {
    this.authService.login(this.credentials)
      .subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
        err => {
        console.error(err);
        }
    );
  }

}
