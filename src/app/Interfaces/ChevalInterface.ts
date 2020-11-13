import { RaceChevalInterface } from './RaceCheval';

export interface ChevalInterface {
  id_cheval: number;
  nom: string;
  age: number;
  race_cheval: RaceChevalInterface;
  race_cheval_id: number;
}
