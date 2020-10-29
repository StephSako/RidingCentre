import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ChevalService } from '../Services/cheval.service';
import { ChevalInterface } from '../Interfaces/ChevalInterface';
import { ChevalEditComponent } from '../cheval-edit/cheval-edit.component';
import { HelperService } from '../Services/helper.service';

@Component({
  selector: 'app-cheval-instructor',
  templateUrl: './cheval-instructor.component.html',
  styleUrls: ['./cheval-instructor.component.css']
})
export class ChevalInstructorComponent implements OnInit {

  displayedColumns: string[] = ['name', 'age', 'race', 'modify', 'delete'];
  allCheval: ChevalInterface[];

  cheval: ChevalInterface = {
    id: null,
    nom: null,
    age: null,
    race: null
  };

  constructor(public chevalService: ChevalService, public dialog: MatDialog, private helper: HelperService) { }

  ngOnInit(): void {
    this.updateAllCheval();
  }

  updateAllCheval(): void {
    this.chevalService.getAll().subscribe(allCheval => this.allCheval = allCheval );
  }

  create(): void {
    // this.cheval.date = moment(this.cheval.date).utc().format('YYYY-MM-DD hh:mm');
    // console.log(this.cheval);
    this.chevalService.create(this.cheval)
      .subscribe(
        () => {
          this.updateAllCheval();
        },
        err => {
          console.error(err);
        }
      );
  }

  // tslint:disable-next-line:variable-name
  delete(id_cheval: number): void {
    this.chevalService.delete(id_cheval)
      .subscribe(
        () => {
          this.updateAllCheval();
        },
        err => {
          console.error(err);
        }
      );
  }

  openDialog(cheval: ChevalInterface): void {
    this.dialog.open(ChevalEditComponent, {
      width: '80%',
      data: cheval
    });
  }

  isInvalid(): boolean {
    return (!this.helper.isEmpty(this.cheval.nom) && this.cheval.age && this.cheval.race && this.cheval.age > 0);
  }

}
