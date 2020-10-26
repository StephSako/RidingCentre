import { Component, OnInit } from '@angular/core';

import { RepriseInterface } from '../Interfaces/RepriseInterface';
import { RepriseService } from '../Services/reprise.service';
import { RepriseEditComponent } from '../reprise-edit/reprise-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-instructor',
  templateUrl: './home-instructor.component.html',
  styleUrls: ['./home-instructor.component.css']
})
export class HomeInstructorComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'rider_number_limit', 'galop_level', 'modify', 'delete'];
  allReprises: RepriseInterface[];

  reprise: RepriseInterface = {
    id: null,
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
    this.repriseService.getAll().subscribe(heroes => this.allReprises = heroes );
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

  openDialog(cours: RepriseInterface): void {
    const dialogRef = this.dialog.open(RepriseEditComponent, {
      width: '80%',
      data: cours
    });
  }

}
