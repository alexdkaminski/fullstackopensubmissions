export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface MatchParams {
  id: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}
