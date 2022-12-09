import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NewPatient, Entry, NewEntry } from '../types';

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

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find(patient => patient.id === patientId);
  const newEntry = {
    id: uuid(),
    ...entry
  };

  if (patient) patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getEntriesNoSsn,
  addPatient,
  addEntry,
};