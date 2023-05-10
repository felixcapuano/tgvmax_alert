import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState, useCallback } from 'react';
import { fetchStations } from '@/utils/fetchs';

const StationSelector = ({ onChange, placeholder }) => {
  const [station, setStation] = useState({ label: '', value: '' });
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
      onChange={onChange}
      options={stationOptions}
      onInputChange={stationInputHandler}
      filterOptions={(x) => x}
      isOptionEqualToValue={(o, v) => o.label === v}
      renderInput={(params) => <TextField {...params} label={placeholder} />}
      disablePortal
      fullWidth
    />
  );
};

export default StationSelector;
