import {UserInterface} from './UserInterface';

export interface RepriseInterface {
  id_reprise: number;
  user: UserInterface;
  date: number;
  title: string;
  rider_number_limit: number;
  galop_level: number;
  canceled: boolean;
  recurrence: null;
}

export interface RepriseCreateInterface {
  id_reprise: number;
  user_id_user: number;
  date: number;
  title: string;
  rider_number_limit: number;
  galop_level: number;
  canceled: boolean;
  recurrence: null;
}
