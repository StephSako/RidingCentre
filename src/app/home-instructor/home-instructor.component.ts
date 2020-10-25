import { Component, OnInit } from '@angular/core';
import {RepriseInterface} from '../Interfaces/RepriseInterface';
import {RepriseService} from '../Services/reprise.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-instructor',
  templateUrl: './home-instructor.component.html',
  styleUrls: ['./home-instructor.component.css']
})
export class HomeInstructorComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'rider_number_limit', 'galop_level', 'modify', 'delete'];
  allReprises: RepriseInterface[];

  constructor(public repriseService: RepriseService, private router: Router) { }

  ngOnInit(): void {
    this.updateAllReprises();
  }

  updateAllReprises(): void {
    this.repriseService.getAll().subscribe(heroes => this.allReprises = heroes );
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

}
