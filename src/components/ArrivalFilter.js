import { useState, useEffect } from 'react';
import StationSelector from '@/components/StationSelector';
import Typography from '@mui/material/Typography';
import TrainTimeline from '@/components/TrainTimeline';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import Divider from '@mui/material/Divider';

const ArrivalFilter = ({ datetime, departure }) => {
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    const rawStore = localStorage.getItem(departure.index);
    if (rawStore) setArrivals(JSON.parse(rawStore));
  }, [setArrivals]);

  const updateStorage = (newArrivals) => {
    localStorage.setItem(departure.index, JSON.stringify(newArrivals));
  };

  const stationHandler = (e, i) => {
    if (!i) return;
    const newArrivals = [...arrivals, { ...i, index: arrivals.length }];
    setArrivals(newArrivals);
    updateStorage(newArrivals);
  };

  const closeHandler = (indexToRemove) => {
    const newArrivals = arrivals.filter(({ index }) => index !== indexToRemove);
    setArrivals(newArrivals);
    updateStorage(newArrivals);
  };

  const displayArrival = (arr) => {
    return (
      <Grid container key={arr.index} alignItems='center'>
        <Grid item xs={2}>
          <Typography>to : {arr.label}</Typography>
        </Grid>
        <Grid item xs={9}>
          <TrainTimeline
            datetime={datetime}
            departure={departure}
            arrival={arr}
          />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={() => closeHandler(arr.index)}>
            <RemoveIcon />
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Stack
      className='arrival-filter'
      direction='column'
      spacing={0.5}
      divider={<Divider orientation='horizontal' flexItem />}
    >
      {arrivals.map(displayArrival)}
      <StationSelector onChange={stationHandler} placeholder='Add arrival' />
    </Stack>
  );
};

export default ArrivalFilter;
