import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { UserInterface } from '../UserInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInterface;

  constructor(private authService: AuthenticationService) { }

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

}
