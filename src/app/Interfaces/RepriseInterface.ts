import {UserInterface} from './UserInterface';

export interface RepriseInterface {
  id_reprise: number;
  user: UserInterface;
  date: Date;
  title: string;
  rider_number_limit: number;
  galop_level: number;
  canceled: boolean;
}

export interface RepriseCreateInterface {
  id_reprise: number;
  user_id_user: number;
  date: Date;
  title: string;
  rider_number_limit: number;
  galop_level: number;
  canceled: boolean;
}
