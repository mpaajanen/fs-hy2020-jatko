import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import React from 'react';
import { Patient, Diagnosis, Entry } from '../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const Entries: React.FC<{ selectedPatient: Patient, diagnosis: { [code:string]: Diagnosis } }> = ({ selectedPatient, diagnosis }) => {
  console.log({selectedPatient});
  const diagnoseName = (code: string): string => {
    const objs = Object.entries(diagnosis);
    const diagnose = objs.find(obj => obj[0] === code);
    return diagnose ? diagnose[1].name : '';
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry />;
      case "HealthCheck":
        return <HealthCheckEntry />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <Box>
    <Typography variant="h5">
        Entries...:
      </Typography>
        {selectedPatient.entries.map((entry, idx) => (
          <Box key={idx}>
            <EntryDetails entry={entry} />
            <Box>
            <Typography variant="body1">{entry.date} <i>{entry.description}</i></Typography>
            </Box>
            <List dense={true}>
              {entry.diagnosisCodes?.map((code, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${code} ${diagnoseName(code)}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
    </Box>
  );
};

export default Entries;