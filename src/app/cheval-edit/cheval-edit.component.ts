import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChevalInterface } from '../Interfaces/ChevalInterface';
import { ChevalService } from '../Services/cheval.service';

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
    race: null
  };

  constructor(private chevalService: ChevalService, @Inject(MAT_DIALOG_DATA) public chevaldata: ChevalInterface) {
    this.cheval = chevaldata;
  }

  edit(): void {
    this.chevalService.edit(this.cheval.id_cheval, this.cheval).subscribe(() => { }, err => { console.error(err); });
  }

}
