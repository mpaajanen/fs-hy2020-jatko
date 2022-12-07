import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Patient, Diagnosis, Entry } from '../types';
import HealthCheckEntryInfo from './HealthCheckEntryInfo';
import HospitalEntryInfo from './HospitalEntryInfo';
import OccupationalHealthcareEntryInfo from './OccupationalHealthcareEntryInfo';

const Entries: React.FC<{ selectedPatient: Patient, diagnosis: { [code:string]: Diagnosis } }> = ({ selectedPatient }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryInfo entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryInfo entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryInfo entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <Box>
    <Typography variant="h5">
        Entries:
    </Typography>
      {selectedPatient.entries.map((entry, idx) => (
        <Box key={idx}>
          <EntryDetails entry={entry} />
        </Box>
      ))}
    </Box>
  );
};

export default Entries;