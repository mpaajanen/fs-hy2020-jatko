import React from 'react';
import { addEntry, setSelectedPatient, useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Box, Button, Typography } from '@material-ui/core';
import Entries from './Entries';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ selectedPatient, diagnosis }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        values
      );
      dispatch(addEntry({id: id as string, entry: newEntry}));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
        <Entries selectedPatient={selectedPatient} diagnosis={diagnosis}/>
      </Box>
    </div>
  );
};

export default PatientPage;