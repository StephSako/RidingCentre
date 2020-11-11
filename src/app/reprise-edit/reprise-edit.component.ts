import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepriseCreateInterface } from '../Interfaces/RepriseInterface';

@Component({
  selector: 'app-reprise-edit',
  templateUrl: './reprise-edit.component.html',
  styleUrls: ['./reprise-edit.component.css']
})
export class RepriseEditComponent {

  reprise: RepriseCreateInterface = {
    user_id_user: null,
    id_reprise: null,
    rider_number_limit: null,
    date: null,
    galop_level: null,
    title: null,
    canceled: null,
    recurrence: null
  };

  constructor(@Inject(MAT_DIALOG_DATA) public reprisedata: RepriseCreateInterface) {
    this.reprise = reprisedata;
  }

}
