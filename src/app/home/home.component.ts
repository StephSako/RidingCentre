import { Component, OnInit } from '@angular/core';

import { RepriseService } from '../Services/reprise.service';
import { RepriseInterface } from '../Interfaces/RepriseInterface';
import {AuthenticationService} from '../Services/authentication.service';
import {RepriseInscriptionHomeInterface} from '../Interfaces/RepriseInscriptionInterface';
import {ChevalInterface} from '../Interfaces/ChevalInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allReprises: RepriseInterface[];
  allRegistredReprises: RepriseInscriptionHomeInterface[];

  constructor(private repriseService: RepriseService, public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllReprises();
    this.getAllRegisteredReprises();
  }

  getAllReprises(): void {
    this.repriseService.getAll().subscribe(reprises => this.allReprises = reprises);
  }

  getAllRegisteredReprises(): void {
    this.authService.getRegisteredReprises().subscribe(reprises => {
      this.allRegistredReprises = reprises;
    });
  }

  isRegistered(idReprise: number): boolean {
    if (this.allRegistredReprises) { return (this.allRegistredReprises.some(inscription => inscription.id_reprise === idReprise)); }
  }

  updateAllRegisteredReprises(): void {
    this.authService.getRegisteredReprises().subscribe(allRegistredReprises => this.allRegistredReprises = allRegistredReprises );
  }

  // tslint:disable-next-line:variable-name
  deleteRegisteredReprise(id_reprise: number): void {
    this.authService.deleteRegisteredReprise(id_reprise)
      .subscribe(
        () => {
          this.updateAllRegisteredReprises();
        },
        err => {
          console.error(err);
        }
      );
  }

  // tslint:disable-next-line:variable-name
  registerToReprise(id_reprise: number): void {
    this.authService.registerToReprise(id_reprise)
      .subscribe(
        () => {
          this.updateAllRegisteredReprises();
        },
        err => {
          console.error(err);
        }
      );
  }

  nomCheval(idReprise: number): ChevalInterface {
    if (this.allRegistredReprises) {
      if (this.allRegistredReprises.find(inscription => inscription.id_reprise === idReprise)) {
        return this.allRegistredReprises.find(inscription => inscription.id_reprise === idReprise).cheval;
      } else {
        return null;
      }
    }
  }

}
