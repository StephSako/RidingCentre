import {Component, Input, OnInit} from '@angular/core';
import {ChevalInterface} from '../Interfaces/ChevalInterface';
import {RaceChevalInterface} from '../Interfaces/RaceCheval';
import {FormControl, Validators} from '@angular/forms';
import {RaceChevalService} from '../Services/race-cheval.service';

@Component({
  selector: 'app-cheval-form',
  templateUrl: './cheval-form.component.html',
  styleUrls: ['./cheval-form.component.css']
})
export class ChevalFormComponent implements OnInit {

  @Input() cheval: ChevalInterface = {
    id_cheval: null,
    nom: null,
    age: null,
    race_cheval: null,
    race_cheval_id: null
  };

  races: RaceChevalInterface[] = [
    {
      id: null,
      nom: null
    }
  ];

  nomChevalControl = new FormControl('', [Validators.required]);
  ageControl = new FormControl('', [Validators.required]);
  raceControl = new FormControl('', [Validators.required]);

  constructor(private raceChevalService: RaceChevalService) { }

  ngOnInit(): void {
    this.raceChevalService.getAll().subscribe(races => this.races = races);
  }

  getErrorMessageInput(): string {
    if (this.nomChevalControl.hasError('required') || this.raceControl.hasError('required')) {
      return 'Champ obligatoire';
    }
  }

  getErrorMessageAge(): string {
    if (this.ageControl.hasError('required')) {
      return 'Age obligatoire';
    }
  }

}
