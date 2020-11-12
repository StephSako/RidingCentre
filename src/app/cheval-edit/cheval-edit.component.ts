import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ChevalInterface } from '../Interfaces/ChevalInterface';
import { ChevalService } from '../Services/cheval.service';
import {HelperService} from '../Services/helper.service';

@Component({
  selector: 'app-cheval-edit',
  templateUrl: './cheval-edit.component.html',
  styleUrls: ['./cheval-edit.component.css']
})
export class ChevalEditComponent {

  cheval: ChevalInterface = {
    id_cheval: null,
    nom: null,
    age: null,
    race_cheval: null,
    race_cheval_id: null
  };

  constructor(private chevalService: ChevalService, @Inject(MAT_DIALOG_DATA) public chevaldata: ChevalInterface,
              private helper: HelperService) {
    this.cheval = chevaldata;
  }

  edit(): void {
    this.chevalService.edit(this.cheval).subscribe(() => { }, err => { console.error(err); });
  }

  isInvalid(): boolean {
    return (!this.helper.isEmpty(this.cheval.nom) && this.cheval.race_cheval_id != null && this.cheval.age != null);
  }

}
