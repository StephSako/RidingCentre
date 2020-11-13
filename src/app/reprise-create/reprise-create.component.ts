import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';

import { RepriseCreateInterface } from '../Interfaces/RepriseInterface';
import { AuthenticationService } from '../Services/authentication.service';
import { UserInterface } from '../Interfaces/UserInterface';

@Component({
  selector: 'app-reprise-create',
  templateUrl: './reprise-create.component.html',
  styleUrls: ['./reprise-create.component.css']
})
export class RepriseCreateComponent implements OnInit {

  @ViewChild('picker') picker: any;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Date;
  public maxDate: Date;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public disableMinute = false;
  public hideTime = false;

  public dateControl = new FormControl('', [Validators.required]);
  public limitPersonControl = new FormControl('', [Validators.required]);
  public levelControl = new FormControl('', [Validators.required]);
  public moniteurControl = new FormControl('', [Validators.required]);

  @Input() public editMonitor = true;

  @Input() reprise: RepriseCreateInterface = {
    id_reprise: null,
    user_id_user: null,
    rider_number_limit: null,
    date: null,
    galop_level: null,
    title: null,
    canceled: false,
    recurrence: null
  };

  public moniteurs: UserInterface[];

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.editMonitor) { this.authService.getAllMoniteurs().subscribe(moniteurs => this.moniteurs = moniteurs); }
  }

  getErrorMessageInput(): string {
    if (this.dateControl.hasError('required')) {
      return 'Horaire obligatoire';
    }
  }

  getErrorMessageLevel(): string {
    if (this.levelControl.hasError('required')) {
      return 'Niveau du galop obligatoire';
    }
  }

  getErrorMessageLimit(): string {
    if (this.limitPersonControl.hasError('required')) {
      return 'Limite du nombre de cavaliers obligatoire';
    }
  }

  getErrorMessageMoniteur(): string {
    if (this.moniteurControl.hasError('required')) {
      return 'Moniteur obligatoire';
    }
  }

}
