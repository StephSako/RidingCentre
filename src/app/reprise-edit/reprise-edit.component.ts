import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepriseInterface } from '../Interfaces/RepriseInterface';
import { RepriseService } from '../Services/reprise.service';

@Component({
  selector: 'app-reprise-edit',
  templateUrl: './reprise-edit.component.html',
  styleUrls: ['./reprise-edit.component.css']
})
export class RepriseEditComponent {

  reprise: RepriseInterface = {
    id: null,
    rider_number_limit: null,
    date: null,
    galop_level: null,
    title: null
  };

  constructor(private repriseService: RepriseService, @Inject(MAT_DIALOG_DATA) public reprisedata: RepriseInterface) {
    this.reprise = reprisedata;
  }

  edit(): void {
    this.repriseService.edit(this.reprise.id, this.reprise ).subscribe(() => { }, err => { console.error(err); });
  }

}
