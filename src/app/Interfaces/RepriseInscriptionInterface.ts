import {UserInterface} from './UserInterface';
import {RepriseInterface} from './RepriseInterface';
import {ChevalInterface} from './ChevalInterface';

export interface RepriseInscriptionInterface {
  id: number;
  id_user: UserInterface;
  id_reprise: RepriseInterface;
  id_cheval?: ChevalInterface;
}
