import React from 'react';
import { HospitalEntry } from '../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Box } from '@material-ui/core';

const HospitalEntryInfo: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Box style={hospitalStyle} >
      Hospital Visit <LocalHospitalIcon /> {entry.date}<br />
      {entry.description}<br />
      Discharged: {entry.discharge.date} {entry.discharge.criteria}<br />
      Specialist: {entry.specialist}
    </Box>
  );
};

const hospitalStyle = {
  padding: "1em",
  border: "solid 1px",
  borderRadius: "10px"
};

export default HospitalEntryInfo;