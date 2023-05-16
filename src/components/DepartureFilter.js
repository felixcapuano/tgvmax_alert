import { useEffect, useState } from 'react';
import StationSelector from '@/components/StationSelector';
import Stack from '@mui/material/Stack';
import Departure from './Departure';
import { removeArrivalStorage, setDeparturesStorage } from '@/utils/storage';

const DepartureFilter = ({ datetime }) => {
  const [departures, setDepartures] = useState({});

  useEffect(() => {
    const rawStore = localStorage.getItem('departures');
    if (rawStore) setDepartures(JSON.parse(rawStore));
  }, [setDepartures]);

  const stationHandler = (e, i) => {
    if (!i) return;
    i.expanded = true;
    const newDepartures = { ...departures, [i.value]: i };

    setDepartures(newDepartures);
    setDeparturesStorage(newDepartures);
  };

  const closeHandler = (departureKey) => {
    const newDepartures = structuredClone(departures);
    delete newDepartures[departureKey];

    setDepartures(newDepartures);
    setDeparturesStorage(newDepartures);
    removeArrivalStorage(departureKey);
  };

  const accordionChangeHandler = (departure, expanded) => {
    departure.expanded = expanded;
    setDeparturesStorage(departures);
  };

  const displayDeparture = (departureKey) => {
    return (
      <Departure
        key={departureKey}
        datetime={datetime}
        departure={departures[departureKey]}
        closeHandler={closeHandler}
        accordionChangeHandler={accordionChangeHandler}
      />
    );
  };

  return (
    <Stack className='departure-filter' direction='column' spacing={2}>
      {Object.keys(departures).map(displayDeparture)}
      <StationSelector onChange={stationHandler} placeholder='Add departure' />
    </Stack>
  );
};

export default DepartureFilter;
