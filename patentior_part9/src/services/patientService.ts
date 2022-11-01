/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getEntriesNoSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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

export default {
  getEntries,
  getEntriesNoSsn,
  addPatient
};