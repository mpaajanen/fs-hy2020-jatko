import React from 'react';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ selectedPatient }, dispatch] = useStateValue();
  console.log(selectedPatient);
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


  return (
    <div>
      {/* {id} {selectedPatient.name} */}
      {id} {selectedPatient ? selectedPatient.name : ''}
    </div>
  );
};

export default PatientPage;