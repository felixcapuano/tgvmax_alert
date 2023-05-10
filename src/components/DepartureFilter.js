import { useState } from 'react';
import ArrivalFilter from '@/components/ArrivalFilter';
import StationSelector from '@/components/StationSelector';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const DepartureFilter = ({ datetime }) => {
  const [departures, setDepartures] = useState([]);

  const stationHandler = (e, i) => {
    if (!i) return;
    setDepartures([...departures, { ...i, index: departures.length }]);
  };

  const closeHandler = (indexToRemove) => {
    setDepartures(departures.filter(({ index }) => index !== indexToRemove));
  };

  const displayDeparture = (dep) => {
    console.log(dep);
    return (
      <div key={dep.index}>
        <Stack direction='horizontal'>
          <Button onClick={() => closeHandler(dep.index)}>-</Button>
          <Typography>{dep.label}</Typography>
        </Stack>
        <ArrivalFilter datetime={datetime} departure={dep} />
      </div>
    );
  };

  return (
    <div>
      {departures.map(displayDeparture)}
      <div>
        <StationSelector onChange={stationHandler} placeholder='Departure' />
      </div>
    </div>
  );
};

export default DepartureFilter;
