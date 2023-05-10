import { useState } from 'react';
import StationSelector from '@/components/StationSelector';
import Typography from '@mui/material/Typography';
import TrainTimeline from '@/components/TrainTimeline';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const ArrivalFilter = ({ datetime, departure }) => {
  const [arrivals, setArrivals] = useState([]);

  const stationHandler = (e, i) => {
    if (!i) return;
    setArrivals([...arrivals, { ...i, index: arrivals.length }]);
  };

  const closeHandler = (indexToRemove) => {
    setArrivals(arrivals.filter(({ index }) => index !== indexToRemove));
  };

  const displayArrival = (arr) => {
    return (
      <Grid key={arr.index} container>
        <Grid xs={1}>
          <Button onClick={() => closeHandler(arr.index)}>-</Button>
        </Grid>
        <Grid xs={3}>
          <Typography>{'> ' + arr.label}</Typography>
        </Grid>
        <Grid xs={8}>
          <TrainTimeline
            datetime={datetime}
            departure={departure}
            arrivals={arrivals}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      {arrivals.map(displayArrival)}
      <dic>
        <StationSelector onChange={stationHandler} placeholder='Arrival' />
      </dic>
    </div>
  );
};

export default ArrivalFilter;
