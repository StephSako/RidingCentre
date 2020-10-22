import {Time} from '@angular/common';

export interface RepriseInterface {
  id_reprise: number;
  date: Date;
  hour: Time;
  title: string;
  rider_number_limit: number;
  galop_level: string;
}
