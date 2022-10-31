import patientData from '../../data/patients';

import { Patient } from '../types';

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

export default {
  getEntries,
  getEntriesNoSsn
};