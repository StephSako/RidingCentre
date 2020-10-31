import {RoleUserInterface} from './RoleUser';

export interface UserInterface {
  id_user: number;
  role_user: RoleUserInterface;
  firstname_user: string;
  lastname_user: string;
  email_user: string;
  password_user: string;
  license_number_user: string;
  phone_number_user: string;
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
  success: boolean;
  message: string;
}

export interface TokenPayloadLogin {
  login_user: string;
  password_user: string;
}

export interface RepriseCreateInscriptionInterface {
  id_user: number;
  id_reprise: number;
}

export interface RegisteredToRepriseInterface {
    user: {
      id_user: number;
      firstname_user: string;
      lastname_user: string;
    };
    cheval?: {
      id_cheval: number;
      nom: string;
      race: string;
      age: number;
    };
}

export interface TokenPayloadRegister {
  firstname_user: string;
  lastname_user: string;
  email_user: string;
  role_user: RoleUserInterface;
  password_user?: string;
  license_number_user: string;
  phone_number_user: string;
}

export interface UserEditInterface {
  id_user: number;
  firstname_user: string;
  lastname_user: string;
  email_user: string;
  license_number_user: string;
  phone_number_user: string;
}
