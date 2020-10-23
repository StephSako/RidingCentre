import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { RepriseService, Reprise } from '../Services/reprise.service';
import {ThemePalette} from '@angular/material/core';
import {FormControl} from '@angular/forms';

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

  reprise: Reprise = {
    rider_number_limit: null,
    date: null,
    galop_level: null,
    title: ''
  };

  constructor(private repriseService: RepriseService, private router: Router) { }

  ngOnInit(): void {

  }

  create(): void {
    // this.reprise.date = moment(this.reprise.date).utc().format('YYYY-MM-DD hh:mm');
    console.log(this.reprise);
    this.repriseService.create(this.reprise)
      .subscribe(
        () => {
          this.router.navigateByUrl('/home');
        },
        err => {
          console.error(err);
        }
      );
  }

}
