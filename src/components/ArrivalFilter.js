import { useState, useEffect } from 'react';
import StationSelector from '@/components/StationSelector';
import Typography from '@mui/material/Typography';
import TrainTimeline from '@/components/TrainTimeline';
import { Stack } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import Divider from '@mui/material/Divider';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import HoverIcon from './HoverIcon';
import { removeArrivalStorage } from '@/utils/storage';

const ArrivalFilter = ({
  datetime,
  departure,
  showNewArrival,
  setShowNewArrival,
}) => {
  const [arrivals, setArrivals] = useState({});

  useEffect(() => {
    const rawStore = localStorage.getItem(departure.value);
    if (rawStore) setArrivals(JSON.parse(rawStore));
  }, [setArrivals]);

  const addStation = (e, i) => {
    if (!i) return;

    const newArrivals = { ...arrivals, [i.value]: i };
    setArrivals(newArrivals);
    localStorage.setItem(departure.value, JSON.stringify(newArrivals));
    setShowNewArrival(false);
  };

  const removeStation = (valueToRemove) => {
    const newArrivals = structuredClone(arrivals);
    delete newArrivals[valueToRemove];

    setArrivals(newArrivals);
    removeArrivalStorage(departure.value);
  };

  const displayArrival = (arrivalKey) => {
    const arr = arrivals[arrivalKey];

    return (
      <Stack key={arrivalKey} direction='column'>
        <Stack direction='row' alignItems='center' spacing={1}>
          <HoverIcon
            icon={<SportsScoreIcon />}
            hoverIcon={<RemoveIcon color='error' />}
            onClick={() => removeStation(arr.value)}
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
      {!showNewArrival || (
        <StationSelector onChange={addStation} placeholder='Add arrival' />
      )}
      {Object.keys(arrivals).map(displayArrival)}
    </Stack>
  );
};

export default ArrivalFilter;
