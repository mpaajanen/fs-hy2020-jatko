import React from 'react';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Box, Typography } from '@material-ui/core';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ selectedPatient }, dispatch] = useStateValue();
  React.useEffect(() => {
    const patientId = id || '';
    void axios.get<void>(`${apiBaseUrl}/patients/${patientId}`);

    const fetchSelectedPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch({ type: "SET_SELECTED_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchSelectedPatient();
  }, [dispatch]);

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
        <Typography variant="h6">
         {selectedPatient.name} {selectedPatient.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}
        </Typography>
        <Typography variant="body1">
          ssn: {selectedPatient.ssn}<br />
          occupation: {selectedPatient.occupation}
        </Typography>
      </Box>
    </div>
  );
};

export default PatientPage;