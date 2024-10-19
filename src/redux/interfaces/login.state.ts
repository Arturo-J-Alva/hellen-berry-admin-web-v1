export interface LoginState {
  personalData: PersonalData | null;
  isLogged: boolean | null;
  idUser: string;
}

export interface PersonalData {
  name: string;
  surname: string;
  email: string;
  created: Date | string;
  validated: boolean;
}
