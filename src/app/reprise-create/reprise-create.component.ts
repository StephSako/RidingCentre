import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl } from '@angular/forms';

import { RepriseInterface } from '../Interfaces/RepriseInterface';

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
  public dateControl = new FormControl(null);

  @Input() reprise: RepriseInterface = {
    id: null,
    rider_number_limit: null,
    date: null,
    galop_level: null,
    title: null
  };

  constructor() { }

  ngOnInit(): void { }

}
