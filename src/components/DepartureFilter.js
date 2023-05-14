import { useEffect, useState } from 'react';
import ArrivalFilter from '@/components/ArrivalFilter';
import StationSelector from '@/components/StationSelector';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import Paper from '@mui/material/Paper';

const DepartureFilter = ({ datetime }) => {
  const [departures, setDepartures] = useState([]);

  useEffect(() => {
    const rawStore = localStorage.getItem('departures');
    if (rawStore) setDepartures(JSON.parse(rawStore));
  }, [setDepartures]);

  const updateStorage = (newDepartures) => {
    localStorage.setItem('departures', JSON.stringify(newDepartures));
  };

  const stationHandler = (e, i) => {
    if (!i) return;
    const newDepartures = [...departures, { ...i, index: departures.length }];

    setDepartures(newDepartures);
    updateStorage(newDepartures);
  };

  const closeHandler = (indexToRemove) => {
    const newDepartures = departures.filter(
      ({ index }) => index !== indexToRemove
    );

    setDepartures(newDepartures);
    updateStorage(newDepartures);
  };

  const displayDeparture = (dep) => {
    return (
      <Paper key={dep.index} elevation={5} className='departure'>
        <Grid container alignItems='center'>
          <Grid item xs={11}>
            <Typography>from : {dep.label}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={() => closeHandler(dep.index)}>
              <ClearIcon />
            </Button>
          </Grid>
        </Grid>
        <ArrivalFilter datetime={datetime} departure={dep} />
      </Paper>
    );
  };

  return (
    <Stack className='departure-filter' direction='column' spacing={2}>
      {departures.map(displayDeparture)}
      <StationSelector onChange={stationHandler} placeholder='Add departure' />
    </Stack>
  );
};

export default DepartureFilter;
