import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FreePlaces from './FreePlaces';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const fetchStations = async (input) => {
  const params = new URLSearchParams({ q: input });

  const url = '/api/stations?' + params;
  const response = await fetch(url, { method: 'GET' });
  const data = await response.json();

  return data.stations;
};

function Journey({ datetime, numId = 0 }) {
  const [arrival, setArrival] = useState({ label: '', value: '' });
  const [departure, setDeparture] = useState({ label: '', value: '' });

  const [arrivalOptions, setArrivalOptions] = useState([]);
  const [departureOptions, setDepartureOptions] = useState([]);

  const [page, setPage] = useState(1);

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
    const stored = localStorage.getItem(numId);

    if (stored) {
      const storedObj = JSON.parse(stored);
      setDeparture(storedObj.dep);
      setArrival(storedObj.arr);
    }
  }, [setArrival, setDeparture]);

  const displayPlaces = (dt, dep, arr) => {
    if (!dep?.value || !arr?.value) return null;

    localStorage.setItem(numId, JSON.stringify({ dep, arr }));

    const day = dt.add(page - 1, 'day');

    return (
      <FreePlaces datetime={day} departure={dep.value} arrival={arr.value} />
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
      <Pagination
        count={Infinity}
        page={page}
        onChange={(e, i) => setPage(i)}
      />
    </Box>
  );
}

export default Journey;
