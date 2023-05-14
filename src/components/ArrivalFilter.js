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
      <Stack key={arr.index} direction='column'>
        <Stack direction='row' alignItems='center' spacing={1}>
          <HoverIcon
            icon={<SportsScoreIcon />}
            hoverIcon={<RemoveIcon color='error' />}
            onClick={() => closeHandler(arr.index)}
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
      {arrivals.map(displayArrival)}
      <StationSelector onChange={stationHandler} placeholder='Add arrival' />
    </Stack>
  );
};

export default ArrivalFilter;
