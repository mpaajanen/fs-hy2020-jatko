import React from 'react';
import { setSelectedPatient, useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Box, Typography } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Entries from './Entries';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ selectedPatient, diagnosis }, dispatch] = useStateValue();
  React.useEffect(() => {
    const patientId = id || '';
    void axios.get<void>(`${apiBaseUrl}/patients/${patientId}`);

    const fetchSelectedPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(setSelectedPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchSelectedPatient();
  }, [dispatch]);

  const diagnoseName = (code: string): string => {
    const objs = Object.entries(diagnosis);
    const diagnose = objs.find(obj => obj[0] === code);
    return diagnose ? diagnose[1].name : '';
  };

  if (!selectedPatient) {
    return (
      <div>
        loading...
      </div>
    );
  }

  return (
    <div>
      <Box>
        <Typography variant="h4">
         {selectedPatient.name} {selectedPatient.gender === 'other' ? '' : selectedPatient.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}
        </Typography>
        <Typography variant="body1">
          ssn: {selectedPatient.ssn}<br />
          occupation: {selectedPatient.occupation}
        </Typography>
        <Entries selectedPatient={selectedPatient} diagnosis={diagnosis}/>
        <Typography variant="h5">
          Entries:
        </Typography>
          {selectedPatient.entries.map((entry, idx) => (
            <Box key={idx}>
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
    </div>
  );
};

export default PatientPage;