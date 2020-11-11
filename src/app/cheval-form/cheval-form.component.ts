import {Component, Input, OnInit} from '@angular/core';
import {ChevalInterface} from '../Interfaces/ChevalInterface';
import {RaceChevalInterface} from '../Interfaces/RaceCheval';
import {FormControl, Validators} from '@angular/forms';

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
    race: null,
  };

  races: RaceChevalInterface[] = [
    {nom: 'Merens'},
    {nom: 'Pure race espagnole'},
    {nom: 'Pur-sang Anglais'},
    {nom: 'Morgans'},
    {nom: 'Tennessee'},
    {nom: 'Akhal Teke'},
    {nom: 'Lusitanien'},
    {nom: 'Selle Français'},
    {nom: 'Frison'},
    {nom: 'Lipizzan'},
    {nom: 'Holstein'},
    {nom: 'Pur-sang Arabe'},
    {nom: 'Appaloosa'},
    {nom: 'Camarguais'},
    {nom: 'Mustang'}
  ];

  nomChevalControl = new FormControl('', [Validators.required]);
  ageControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}')]);
  raceControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
    this.races.sort((a, b) => (a.nom > b.nom) ? 1 : -1);
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
    else if (this.ageControl.hasError('pattern')) {
      return 'Les chevaux vivent moins de 100 ans ...';
    }
  }

}
