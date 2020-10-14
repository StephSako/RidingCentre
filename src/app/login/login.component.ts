import {Component, OnInit} from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { User } from '../../entity/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.login();
  }

  login(): void {
    this.authService.login('sakovitch@et.esiea.fr', 'stephen')
      .subscribe(
      response => console.log(response)
    );
  }

}
