import {ChevalInterface} from './ChevalInterface';

export interface RepriseInscriptionInterface {
  id: number;
  id_user: number;
  id_reprise: number;
  id_cheval?: number;
}

export interface RepriseInscriptionHomeInterface {
  id_reprise: number;
  cheval?: ChevalInterface;
}
