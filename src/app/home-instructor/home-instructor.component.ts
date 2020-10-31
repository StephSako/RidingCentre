import { Component, OnInit } from '@angular/core';

import { RepriseInterface } from '../Interfaces/RepriseInterface';
import { RepriseService } from '../Services/reprise.service';
import { RepriseEditComponent } from '../reprise-edit/reprise-edit.component';
import { MatDialog } from '@angular/material/dialog';
import {AssignHorsesComponent} from '../assign-horses/assign-horses.component';

@Component({
  selector: 'app-home-instructor',
  templateUrl: './home-instructor.component.html',
  styleUrls: ['./home-instructor.component.css']
})
export class HomeInstructorComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'rider_number_limit', 'galop_level', 'assign_horses', 'modify', 'delete'];
  allReprises: RepriseInterface[];

  reprise: RepriseInterface = {
    id_reprise: null,
    rider_number_limit: null,
    date: null,
    galop_level: null,
    title: null
  };

  constructor(public repriseService: RepriseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateAllReprises();
  }

  updateAllReprises(): void {
    this.repriseService.getAll().subscribe(allReprises => this.allReprises = allReprises );
  }

  create(): void {
    // this.reprise.date = moment(this.reprise.date).utc().format('YYYY-MM-DD hh:mm');
    // console.log(this.reprise);
    this.repriseService.create(this.reprise)
      .subscribe(
        () => {
          this.updateAllReprises();
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

  // tslint:disable-next-line:variable-name
  openDialogAssignHorses(id_reprise: number): void {
    this.dialog.open(AssignHorsesComponent, {
      width: '60%',
      data: id_reprise
    });
  }

  isInvalid(): boolean {
    return (!this.repriseService.isEmpty(this.reprise.title) && this.reprise.galop_level && this.reprise.rider_number_limit
      && this.reprise.galop_level > 0 && this.reprise.rider_number_limit > 0);
  }
}
