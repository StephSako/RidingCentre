import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

import { RepriseCreateInterface, RepriseInterface } from '../Interfaces/RepriseInterface';
import { RepriseService } from '../Services/reprise.service';
import { RepriseEditComponent } from '../reprise-edit/reprise-edit.component';
import { AuthenticationService } from '../Services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-instructor',
  templateUrl: './home-instructor.component.html',
  styleUrls: ['./home-instructor.component.css']
})
export class HomeInstructorComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'rider_number_limit', 'galop_level', 'open', 'modify', 'delete'];
  allReprises: RepriseInterface[];

  reprise: RepriseCreateInterface = {
    id_reprise: null,
    user_id_user: null,
    rider_number_limit: null,
    date: null,
    galop_level: null,
    title: null,
    canceled: null
  };

  constructor(public repriseService: RepriseService, public dialog: MatDialog, private authService: AuthenticationService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.updateAllReprises();
  }

  updateAllReprises(): void {
    this.repriseService.getAll().subscribe(allReprises => this.allReprises = allReprises );
  }

  createReprise(): void {
    // this.reprise.date = moment(this.reprise.date).utc().format('YYYY-MM-DD hh:mm');
    const dt = moment(this.reprise.date).utc().format('YYYY-MM-DD HH:mm');
    this.reprise.user_id_user = this.authService.getUserDetails().id_user;
    this.repriseService.create(this.reprise)
      .subscribe(
        () => {
          this.updateAllReprises();
          this.authService.notifyUser('Reprise créée', this.snackBar, 'success', 1500, 'OK');
        },
        err => {
          console.error(err);
        }
      );
  }

  // tslint:disable-next-line:variable-name
  delete(id_reprise: number): void {
    this.repriseService.delete(id_reprise)
      .subscribe(
        () => {
          this.updateAllReprises();
        },
        err => {
          console.error(err);
        }
      );
  }

  openDialogEditReprise(cours: RepriseInterface): void {
    this.dialog.open(RepriseEditComponent, {
      width: '60%',
      data: cours
    });
  }

  isInvalid(): boolean {
    return (!this.repriseService.isEmpty(this.reprise.title) && this.reprise.galop_level && this.reprise.rider_number_limit
      && this.reprise.galop_level > 0 && this.reprise.rider_number_limit > 0);
  }
}
