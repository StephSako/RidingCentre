import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ChevalService } from '../Services/cheval.service';
import { ChevalInterface } from '../Interfaces/ChevalInterface';
import { ChevalEditComponent } from '../cheval-edit/cheval-edit.component';
import { HelperService } from '../Services/helper.service';
import { DialogData } from '../Interfaces/DialogData';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthenticationService } from '../Services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cheval-instructor',
  templateUrl: './cheval-instructor.component.html',
  styleUrls: ['./cheval-instructor.component.css']
})
export class ChevalInstructorComponent implements OnInit {

  displayedColumns: string[] = ['name', 'age', 'race', 'modify', 'delete'];
  allCheval: ChevalInterface[];

  cheval: ChevalInterface = {
    id_cheval: null,
    nom: null,
    age: null,
    race_cheval: null,
    race_cheval_id: null
  };

  panelOpenState = false;

  constructor(public chevalService: ChevalService, public dialog: MatDialog, private helper: HelperService,
              private authService: AuthenticationService, private snackBar: MatSnackBar, private titleService: Title) {
    this.titleService.setTitle('Gestion des chevaux');
  }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState;
  }

  ngOnInit(): void {
    this.getAllCheval();
  }

  getAllCheval(): void {
    this.chevalService.getAll().subscribe(allCheval => this.allCheval = allCheval );
  }

  create(): void {
    this.chevalService.create(this.cheval)
      .subscribe(
        () => {
          this.togglePanel();
          this.getAllCheval();
          this.authService.notifyUser('Cheval créé', this.snackBar, 'success', 1000);
        },
        err => {
          console.error(err);
        }
      );
  }

  deleteCheval(idCheval: number, nomCheval: string): void {
    const horseToDelete: DialogData = {
      id: idCheval,
      action: 'Supprimer le cheval',
      subtitle: nomCheval
    };

    this.dialog.open(DialogComponent, {
      width: '30%',
      data: horseToDelete
    })
      .afterClosed().subscribe(result => {
      this.chevalService.delete(result).subscribe(() => {
        this.getAllCheval();
      }, err => { console.error(err); });
    });
  }

  editCheval(cheval: ChevalInterface): void {
    this.dialog.open(ChevalEditComponent, {
      width: '60%',
      data: cheval
    }).afterClosed().subscribe(() => {
      this.chevalService.edit(cheval).subscribe(() => {
        this.getAllCheval();
        }, err => { console.error(err); });
    });
  }

  isInvalid(): boolean {
    return (!this.helper.isEmpty(this.cheval.nom) && this.cheval.race_cheval_id != null && this.cheval.age != null);
  }

}
