import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RegisteredToRepriseInterface } from '../Interfaces/UserInterface';
import { RepriseService } from '../Services/reprise.service';
import {ChevalInterface} from '../Interfaces/ChevalInterface';
import {ChevalService} from '../Services/cheval.service';

@Component({
  selector: 'app-assign-horses',
  templateUrl: './assign-horses.component.html',
  styleUrls: ['./assign-horses.component.css']
})
export class AssignHorsesComponent implements OnInit {

  // tslint:disable-next-line:variable-name max-line-length
  constructor(private chevalService: ChevalService, private repriseService: RepriseService, @Inject(MAT_DIALOG_DATA) public id_reprise: number) { }

  selectedHorse: ChevalInterface;
  subscriptions: RegisteredToRepriseInterface[];
  availableHorses: ChevalInterface[];

  ngOnInit(): void {
    this.repriseService.getRegisteredUsers(this.id_reprise).subscribe((subscriptions) => {
      this.subscriptions = subscriptions;
      console.log(this.subscriptions);
    });

    this.chevalService.getAll().subscribe((availableHorses) => {
      this.availableHorses = availableHorses;
      console.log(this.availableHorses);
    });
  }

}
