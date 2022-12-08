export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Discharge {
  date: string,
  criteria: string,
}

export interface Sickleave {
  startDate: string,
  endDate: string,
}

export type NewPatient = Omit<Patient, 'id'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;
export type NewBaseEntry = UnionOmit<Entry, 'id' | 'discharge' | 'healthCheckRating' | 'employerName' | 'sickLeave'>;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Entry {
// }

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: Sickleave;
  // sickLeave?: {
  //   startDate: string;
  //   endDate: string;
  // }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
  // discharge: {
  //   date: string;
  //   criteria: string;
  // }
}

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type EntryType = | "Hospital" | "HealthCheck" | "OccupationalHealthcare";

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;