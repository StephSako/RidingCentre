import { Component, OnInit } from '@angular/core';

import { RepriseService } from '../Services/reprise.service';
import { RepriseInterface } from '../Interfaces/RepriseInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allReprises: RepriseInterface[];

  constructor(private repriseService: RepriseService) { }

  ngOnInit(): void {
    this.repriseService.getAll().subscribe(heroes => this.allReprises = heroes);
  }

}
