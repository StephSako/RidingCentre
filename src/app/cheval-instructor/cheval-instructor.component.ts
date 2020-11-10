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
    race: null
  };

  panelOpenState = false;

  constructor(public chevalService: ChevalService, public dialog: MatDialog, private helper: HelperService,
              private authService: AuthenticationService, private snackBar: MatSnackBar) { }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState;
  }

  ngOnInit(): void {
    this.updateAllCheval();
  }

  updateAllCheval(): void {
    this.chevalService.getAll().subscribe(allCheval => this.allCheval = allCheval );
  }

  create(): void {
    this.chevalService.create(this.cheval)
      .subscribe(
        () => {
          this.togglePanel();
          this.updateAllCheval();
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
        this.updateAllCheval();
      }, err => { console.error(err); });
    });
  }

  editCheval(cheval: ChevalInterface): void {
    this.dialog.open(ChevalEditComponent, {
      width: '60%',
      data: cheval
    });
  }

  isInvalid(): boolean {
    return (!this.helper.isEmpty(this.cheval.nom) && this.cheval.age && this.cheval.race && this.cheval.age > 0);
  }

}
