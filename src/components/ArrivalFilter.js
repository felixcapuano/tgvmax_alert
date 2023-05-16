import { useState, useEffect } from 'react';
import StationSelector from '@/components/StationSelector';
import Typography from '@mui/material/Typography';
import TrainTimeline from '@/components/TrainTimeline';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import Divider from '@mui/material/Divider';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import HoverIcon from './HoverIcon';

const ArrivalFilter = ({ datetime, departure }) => {
  const [arrivals, setArrivals] = useState({});

  useEffect(() => {
    const rawStore = localStorage.getItem(departure.value);
    if (rawStore) setArrivals(JSON.parse(rawStore));
  }, [setArrivals]);

  const stationHandler = (e, i) => {
    if (!i) return;

    const newArrivals = { ...arrivals, [i.value]: i };
    setArrivals(newArrivals);
    localStorage.setItem(departure.value, JSON.stringify(newArrivals));
  };

  const closeHandler = (valueToRemove) => {
    const newArrivals = structuredClone(arrivals);
    delete newArrivals[valueToRemove];
    setArrivals(newArrivals);
    localStorage.removeItem(departure.value);
  };

  const displayArrival = (arrivalKey) => {
    const arr = arrivals[arrivalKey];
    return (
      <Stack key={arr.index} direction='column'>
        <Stack direction='row' alignItems='center' spacing={1}>
          <HoverIcon
            icon={<SportsScoreIcon />}
            hoverIcon={<RemoveIcon color='error' />}
            onClick={() => closeHandler(arr.value)}
          />
          <Typography>{arr.label}</Typography>
        </Stack>
        <TrainTimeline
          datetime={datetime}
          departure={departure}
          arrival={arr}
        />
      </Stack>
    );
  };

  return (
    <Stack
      className='arrival-filter'
      direction='column'
      spacing={0.5}
      divider={<Divider orientation='horizontal' flexItem />}
    >
      {Object.keys(arrivals).map(displayArrival)}
      <StationSelector onChange={stationHandler} placeholder='Add arrival' />
    </Stack>
  );
};

export default ArrivalFilter;
