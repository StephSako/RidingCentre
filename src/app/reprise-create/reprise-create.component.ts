import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RepriseService, Reprise } from '../Services/reprise.service';

@Component({
  selector: 'app-reprise-create',
  templateUrl: './reprise-create.component.html',
  styleUrls: ['./reprise-create.component.css']
})
export class RepriseCreateComponent implements OnInit {

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
