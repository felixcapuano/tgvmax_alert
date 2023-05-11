import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState, useCallback } from 'react';
import { fetchStations } from '@/utils/fetchs';

const defaultStation = { label: '', value: '' };

const StationSelector = ({ onChange, placeholder }) => {
  const [station, setStation] = useState(defaultStation);
  const [stationOptions, setStationOptions] = useState([]);

  const stationInputHandler = useCallback(
    async (e, input) => {
      if (input.length < 3) return;

      const stations = await fetchStations(input);
      setStationOptions(stations);
    },
    [setStationOptions]
  );

  return (
    <Autocomplete
      value={station}
      onChange={(e, i) => {
        onChange(e, i);
        setStation(defaultStation);
      }}
      options={stationOptions}
      onInputChange={stationInputHandler}
      filterOptions={(x) => x}
      renderInput={(params) => <TextField {...params} label={placeholder} />}
      disablePortal
      fullWidth
    />
  );
};

export default StationSelector;
