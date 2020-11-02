import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RepriseService } from '../Services/reprise.service';
import { RepriseInterface } from '../Interfaces/RepriseInterface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChevalInterface } from '../Interfaces/ChevalInterface';
import { RegisteredToRepriseInterface } from '../Interfaces/UserInterface';
import { ChevalService } from '../Services/cheval.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../Services/authentication.service';
import {IsRegistereddRepriseInscriptionInterface, RepriseInscriptionInterface} from '../Interfaces/RepriseInscriptionInterface';
import {RepriseInscriptionService} from '../Services/reprise-inscription.service';

@Component({
  selector: 'app-reprise',
  templateUrl: './reprise.component.html',
  styleUrls: ['./reprise.component.css']
})
export class RepriseComponent implements OnInit {

  isRegistered: IsRegistereddRepriseInscriptionInterface = {
    isRegistered: null
  };
  displayedColumns: string[] = ['cavalier', 'horse'];
  chevauxDisponibles: ChevalInterface[];
  cavaliersInscrits: RegisteredToRepriseInterface[] = [{
    id_reprise_inscription: null,
    user: {
      id_user: null,
      firstname_user: null,
      lastname_user: null
    },
    cheval: [{
      id_cheval: null,
      nom: null,
      race: null,
      age: null
    }]
  }];

  reprise: RepriseInterface = {
    id_reprise: null,
    rider_number_limit: null,
    date: null,
    galop_level: null,
    title: null,
    canceled: null
  };

  constructor(private route: ActivatedRoute, private repriseInscriptionService: RepriseInscriptionService,
              private chevalService: ChevalService, private snackBar: MatSnackBar, public authService: AuthenticationService,
              private repriseService: RepriseService) {}

  // tslint:disable-next-line:variable-name
  dropStackToUser(event: CdkDragDrop<ChevalInterface[]>, id_user: number, id_reprise_inscription: number): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length === 0){
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        this.editUserHorse(id_user, id_reprise_inscription, event.item.data.id_cheval);
        this.authService.notifyUser('Le cheval a été assigné', null, this.snackBar, 'success', 1000);
      } else {
        this.authService.notifyUser('Le cavalier a déjà un cheval assigné', null, this.snackBar, 'error', 1000);
      }
    }
  }

  dropUserToStack(event: CdkDragDrop<ChevalInterface[]>): void {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    if (event.item.data.user) {
      this.editUserHorse(event.item.data.user.id_user, event.item.data.id_reprise_inscription);
      this.authService.notifyUser('Cheval désassigné', null, this.snackBar, 'error', 500);
    }
  }

  ngOnInit(): void {
    this.getReprise();
    this.getAvailableHorses();
  }

  getReprise(): void {
    // tslint:disable-next-line:variable-name
    const id_reprise = +this.route.snapshot.paramMap.get('id_reprise');
    this.repriseService.details(id_reprise).subscribe(
      reprise => {
        this.reprise = reprise;
        this.getSubscribdedUsers();
        this.inRegistered();
      },
      err => {
        console.error(err);
      }
    );
  }

  getAvailableHorses(): void {
    const idReprise = +this.route.snapshot.paramMap.get('id_reprise');
    this.chevalService.getAvailableHorses(idReprise).subscribe(
      chevauxDisponibles => {
        this.chevauxDisponibles = chevauxDisponibles;
      },
      err => {
        console.error(err);
      }
    );
  }

  getSubscribdedUsers(): void {
    this.repriseInscriptionService.getRegisteredUsers(this.reprise.id_reprise).subscribe((subscriptions) => {
      this.cavaliersInscrits = subscriptions;
      this.getAvailableHorses();
    });
  }

  // tslint:disable-next-line:variable-name
  editUserHorse(id_user: number, id_reprise_inscription: number, id_cheval?: number): void {
    // tslint:disable-next-line:variable-name
    const reprise_inscription: RepriseInscriptionInterface = {
      id: id_reprise_inscription,
      id_reprise: this.reprise.id_reprise,
      id_cheval,
      id_user
    };

    this.repriseInscriptionService.editSubscription(reprise_inscription).subscribe(() => {
        this.getSubscribdedUsers();
      },
      err => {
        this.authService.notifyUser(err, 'OK', this.snackBar, 'error', 2000);
      });
  }

  editRepriseStatus(): void {
    this.reprise.canceled = !this.reprise.canceled;
    this.repriseService.edit(this.reprise).subscribe(() => {
      this.getReprise();
    }, err => {
      console.error(err);
    });
  }

  // tslint:disable-next-line:variable-name
  deleteRegisteredReprise(): void {
    this.authService.deleteRegisteredReprise(this.reprise.id_reprise)
      .subscribe(
        () => {
          this.inRegistered();
        },
        err => {
          console.error(err);
        }
      );
  }

  // tslint:disable-next-line:variable-name
  registerToReprise(): void {
    this.authService.registerToReprise(this.reprise.id_reprise)
      .subscribe(
        () => {
          this.inRegistered();
        },
        err => {
          console.error(err);
        }
      );
  }

  inRegistered(): void {
    this.repriseInscriptionService.isRegistered(this.reprise.id_reprise, this.authService.getUserDetails().id_user).subscribe(
      (isRegistered) => {
        this.isRegistered = isRegistered;
    }, err => {
      console.error(err);
    });
  }
}
