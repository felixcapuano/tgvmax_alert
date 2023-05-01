import AsyncSelect from 'react-select/async';
import { useEffect, useState } from 'react';
import FreePlaces from './FreePlaces';

function Travel({ datetime, key = 0 }) {
  const [arrival, setArrival] = useState(undefined);
  const [departure, setDeparture] = useState(undefined);

  const fetchStations = async (search) => {
    if (search.length < 3) return [];

    const params = new URLSearchParams({ q: search });

    const url = '/api/stations?' + params;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    return data.stations;
  };

  useEffect(() => {
    const stored = localStorage.getItem(key);

    if (stored) {
      setDeparture(JSON.parse(stored).dep);
      setArrival(JSON.parse(stored).arr);
    }
  }, [setArrival, setDeparture]);

  const displayPlaces = (dt, dep, arr) => {
    if (!dep?.value || !arr?.value) return null;

    localStorage.setItem(key, JSON.stringify({ dep, arr }));

    return (
      <FreePlaces datetime={dt} departure={dep.value} arrival={arr.value} />
    );
  };

  return (
    <div className='Travel'>
      <AsyncSelect
        instanceId={1}
        placeholder='Departure'
        defaultOptions={[]}
        loadOptions={(s) => fetchStations(s)}
        cacheOptions
        value={departure}
        onChange={(choice) => setDeparture(choice)}
      />
      <AsyncSelect
        instanceId={2}
        placeholder='Arrival'
        defaultOptions={[]}
        loadOptions={(s) => fetchStations(s)}
        cacheOptions
        value={arrival}
        onChange={(choice) => setArrival(choice)}
      />
      {displayPlaces(datetime, departure, arrival)}
    </div>
  );
}

export default Travel;
