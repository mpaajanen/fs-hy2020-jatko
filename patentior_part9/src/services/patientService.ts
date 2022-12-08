import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NewPatient, Entry } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getEntriesNoSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: Entry): Entry => {
  const patient = patients.find(patient => patient.id === id);
  // const newEntry = {
  //   // different entries???
  // };

  if (patient) patient.entries.push(entry);
  return entry;
};

export default {
  getEntries,
  getEntriesNoSsn,
  addPatient,
  addEntry,
};