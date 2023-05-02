import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FreePlaces from './FreePlaces';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const fetchStations = async (input) => {
  const params = new URLSearchParams({ q: input });

  const url = '/api/stations?' + params;
  const response = await fetch(url, { method: 'GET' });
  const data = await response.json();

  return data.stations;
};

function Journey({ datetime, identifier = 0 }) {
  const [arrival, setArrival] = useState({ label: '', value: '' });
  const [departure, setDeparture] = useState({ label: '', value: '' });

  const [arrivalOptions, setArrivalOptions] = useState([]);
  const [departureOptions, setDepartureOptions] = useState([]);

  const departureInputHandler = async (event, input) => {
    if (input.length < 3) return;

    const stations = await fetchStations(input);
    setDepartureOptions(stations);
  };
  const arrivalInputHandler = async (event, input) => {
    if (input.length < 3) return;

    const stations = await fetchStations(input);
    setArrivalOptions(stations);
  };

  useEffect(() => {
    const stored = localStorage.getItem(identifier);

    if (stored) {
      const storedObj = JSON.parse(stored);
      setDeparture(storedObj.dep);
      setArrival(storedObj.arr);
    }
  }, [setArrival, setDeparture]);

  const displayPlaces = (dt, dep, arr) => {
    if (!dep?.value || !arr?.value) return null;

    localStorage.setItem(identifier, JSON.stringify({ dep, arr }));

    return (
      <FreePlaces datetime={dt} departure={dep.value} arrival={arr.value} />
    );
  };

  return (
    <Box sx={{ width: '400px' }}>
      <Stack direction='row'>
        <Autocomplete
          value={departure}
          onChange={(e, i) => setDeparture(i)}
          options={departureOptions}
          onInputChange={departureInputHandler}
          filterOptions={(x) => x}
          isOptionEqualToValue={(o, v) => o.label === v}
          renderInput={(params) => <TextField {...params} label='Departure' />}
          disablePortal
          fullWidth
        />
        <Autocomplete
          value={arrival}
          onChange={(e, i) => setArrival(i)}
          options={arrivalOptions}
          onInputChange={arrivalInputHandler}
          filterOptions={(x) => x}
          isOptionEqualToValue={(o, v) => o.label === v}
          renderInput={(params) => <TextField {...params} label='Arrival' />}
          disablePortal
          fullWidth
        />
      </Stack>
      {displayPlaces(datetime, departure, arrival)}
    </Box>
  );
}

export default Journey;
