import { Box } from '@material-ui/core';
import React from 'react';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { HealthCheckEntry } from '../types';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const HealthCheckEntryInfo: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const healthRatingStars = (rating: number): JSX.Element => {
    const stars: JSX.Element[] = Array<JSX.Element>(3).fill(<StarBorderIcon />);
    stars.fill(<StarIcon />, 0, 3 - rating);
    return <span>{stars[0]}{stars[1]}{stars[2]}</span>;
  };

  return (
    <Box style={healthCheckStyle} >
      Health Check <HealthAndSafetyIcon /> {entry.date}<br />
      {entry.description}<br />
      {entry.healthCheckRating}<br />
      {healthRatingStars(entry.healthCheckRating)}<br />
      Specialist: {entry.specialist}
    </Box>
  );
};

const healthCheckStyle = {
  padding: "1em",
  border: "solid 1px",
  borderRadius: "10px"
};

export default HealthCheckEntryInfo;