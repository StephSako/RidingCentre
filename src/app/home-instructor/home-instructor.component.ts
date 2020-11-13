import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RepriseCreateInterface, RepriseInterface } from '../Interfaces/RepriseInterface';
import { RepriseService } from '../Services/reprise.service';
import { RepriseEditComponent } from '../reprise-edit/reprise-edit.component';
import { AuthenticationService } from '../Services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from '../Interfaces/DialogData';
import { DialogComponent } from '../dialog/dialog.component';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-instructor',
  templateUrl: './home-instructor.component.html',
  styleUrls: ['./home-instructor.component.css'],
  providers: [DatePipe]
})
export class HomeInstructorComponent implements OnInit {

  displayedColumns: string[] = ['title', 'moniteur', 'date', 'recurrence', 'rider_number_limit', 'galop_level', 'open', 'modify', 'delete'];
  allReprises: RepriseInterface[];
  spinnerShown: boolean;

  reprise: RepriseCreateInterface = {
    id_reprise: null,
    user_id_user: null,
    rider_number_limit: null,
    date: null,
    galop_level: null,
    title: null,
    canceled: null,
    recurrence: null
  };

  panelOpenState = false;

  constructor(public repriseService: RepriseService, public dialog: MatDialog, public authService: AuthenticationService,
              private snackBar: MatSnackBar, private datepipe: DatePipe, private titleService: Title) {
    this.titleService.setTitle('Gestion des reprises');
  }

  ngOnInit(): void {
    this.spinnerShown = false;
    this.updateAllReprises();
  }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState;
  }

  updateAllReprises(): void {
    this.repriseService.getAll().subscribe(allReprises => this.allReprises = allReprises );
  }

  createReprise(): void {
    this.spinnerShown = true;
    this.reprise.user_id_user = this.authService.getUserDetails().id_user;
    this.repriseService.create(this.reprise)
      .subscribe(
        () => {
          this.spinnerShown = false;
          this.togglePanel();
          this.updateAllReprises();
          this.authService.notifyUser('Reprise créée', this.snackBar, 'success', 1500, 'OK');
        },
        err => {
          this.spinnerShown = false;
          console.error(err);
        }
      );
  }

  delete(idReprise: number, title: string, date: number): void {
    const dateConverted = new Date(date);
    const accountToDelete: DialogData = {
      id: idReprise,
      action: 'Supprimer la reprise et les inscriptions de',
      subtitle: (title ? title : 'du ' + this.datepipe.transform(dateConverted, 'dd/MM/yyyy') + ' à ' +
        this.datepipe.transform(dateConverted, 'HH:mm'))
    };

    this.dialog.open(DialogComponent, {
      width: '45%',
      data: accountToDelete
    }).afterClosed().subscribe(result => {
      this.repriseService.delete(result).subscribe(() => {
        this.updateAllReprises();
      }, err => { console.error(err); });
    });
  }

  edit(cours: RepriseInterface): void {
    this.dialog.open(RepriseEditComponent, {
      width: '60%',
      data: cours
    }).afterClosed().subscribe(() => {
      this.repriseService.edit(cours).subscribe(() => {
        this.updateAllReprises();
      }, err => { console.error(err); });
    });
  }

  isInvalid(): boolean {
    return (this.reprise.date != null && this.reprise.rider_number_limit != null && this.reprise.galop_level != null);
  }
}
