import { Box } from '@material-ui/core';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import React from 'react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryInfo: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Box style={occupationalHealthCheckStyle} >
      Occupational Health Check <MedicalServicesIcon /> {entry.date}<br />
      {entry.description}<br />
      Sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}<br />
      Specialist: {entry.specialist}
    </Box>
  );
};

const occupationalHealthCheckStyle = {
  padding: "1em",
  border: "solid 1px",
  borderRadius: "10px"
};

export default OccupationalHealthcareEntryInfo;