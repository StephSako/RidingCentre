import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../Services/authentication.service';

@Component({
  selector: 'app-menu-gestion',
  templateUrl: './menu-gestion.component.html',
  styleUrls: ['./menu-gestion.component.css']
})
export class MenuGestionComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
