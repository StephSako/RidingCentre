import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RepriseService } from '../Services/reprise.service';
import { RepriseInterface } from '../Interfaces/RepriseInterface';

@Component({
  selector: 'app-reprise',
  templateUrl: './reprise.component.html',
  styleUrls: ['./reprise.component.css']
})
export class RepriseComponent implements OnInit {

  reprise: RepriseInterface;

  constructor(private route: ActivatedRoute, private repriseManager: RepriseService) {}

  ngOnInit(): void {
    this.getReprise();
  }

  getReprise(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.repriseManager.getReprise(id).subscribe(
      reprise => {
        this.reprise = reprise;
      },
      err => {
        console.error(err);
      }
    );
  }

}
