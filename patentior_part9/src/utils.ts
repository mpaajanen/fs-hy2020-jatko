import { Entry, 
         Gender, 
         NewPatient, 
         NewEntry,
         EntryType,
         Diagnose,
         Discharge,
         HealthCheckRating,
         Sickleave,
         NewBaseEntry
        } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
  const regex = new RegExp('\\d{6}[-+A]\\d{3}[0-9A-Y]');
  return regex.test(ssn);
};

const isEntry = (entries: unknown): entries is Entry[] => {
  return typeof entries === "object" || entries instanceof Array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDoB = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
    
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if ( !entries || !isEntry(entries) ) {
    throw new Error("Incorrect or missing entries: " + entries);
  }
  return entries;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries?: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries = [] }: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDoB(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };
  return newEntry;
};

const parseDescription = (description: unknown): string => {
  if ( !description || !isString(description) ) {
    throw new Error("Incorrect or missing description: " + description);
  }
  return description;
};

const isEntryType = (type: unknown): type is EntryType => {
  return typeof type === 'string' || type instanceof String;
};

const parseType = (type: unknown): EntryType => {
  if ( !type || !isEntryType(type) ) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

const isDiagnosisCodes = (diagnosisCodes: unknown): diagnosisCodes is Array<Diagnose["code"]> => {
  return typeof diagnosisCodes === "object" || diagnosisCodes instanceof Array;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose["code"]> => {
  if ( !diagnosisCodes || !isDiagnosisCodes(diagnosisCodes) ) {
    throw new Error("Incorrect or missing diganosis codes: " + diagnosisCodes);
  }
  return diagnosisCodes;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return typeof discharge === "object" || discharge instanceof Array;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if ( !discharge || !isDischarge(discharge) ) {
    throw new Error("Incorrect or missing discharge: " + discharge);
    
  }
  return discharge;
};

const isHealthCheckRating = (healthCheckRating: unknown): healthCheckRating is HealthCheckRating => {
  return typeof healthCheckRating === "object" || healthCheckRating instanceof Array;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if ( !healthCheckRating || !isHealthCheckRating(healthCheckRating) ) {
    throw new Error("Incorrect or missing health check rating: " + healthCheckRating);
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if ( !employerName || !isString(employerName) ) {
    throw new Error("Incorrect or missing employer name: " + employerName);
  }
  return employerName;
};

const isSickleave = (sickleave: unknown): sickleave is Sickleave => {
  return typeof sickleave === "object" || sickleave instanceof Array;
};

const parseSickleave = (sickleave: unknown): Sickleave => {
  if ( !isSickleave(sickleave) ) {
    throw new Error("Incorrect sickleave information: " + sickleave);
  }
  return sickleave;
};

type EntryFields = { description: unknown, 
                     date: unknown, 
                     specialist: unknown, 
                     type: unknown,
                     diagnosisCodes?: unknown, 
                     healthCheckRating?: unknown, 
                     discharge?: unknown, 
                     employerName?: unknown, 
                     sickLeave?: unknown
                   };

export const toNewEntry = ({ description, date, specialist, type, diagnosisCodes, healthCheckRating, discharge, employerName, sickLeave }: EntryFields): NewEntry => {
  const newEntry: NewBaseEntry = {
    description: parseDescription(description),
    date: parseDoB(date),
    specialist: parseDescription(specialist),
    type: parseType(type),
    ...diagnosisCodes ? {diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)} : null,
  };

  switch (type) {
    case "Hospital":
      const newHospitalEntry: NewEntry = {
        ...newEntry,
        type: "Hospital",
        discharge: parseDischarge(discharge),
      };
      return newHospitalEntry;
    case "HealthCheck":
      const newHealthCheckEntry: NewEntry = {
        ...newEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      return newHealthCheckEntry;
    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry: NewEntry = {
        ...newEntry,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(employerName),
        ...sickLeave ? {sickLeave: parseSickleave(sickLeave)} : null,
      };
      return newOccupationalHealthcareEntry;
    default:
      return assertNever(type as never);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};