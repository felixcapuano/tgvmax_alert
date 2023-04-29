import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import FreePlaces from './FreePlaces';

function Travel({ datetime }) {
  const [arrival, setArrival] = useState({ value: '', label: '' });
  const [departure, setDeparture] = useState({ value: '', label: '' });

  const fetchStations = async (search) => {
    if (search.length < 3) return [];

    const params = new URLSearchParams({ q: search });

    const url = '/api/stations?' + params;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    return data.stations;
  };

  return (
    <div className='Travel'>
      <h3>Travel</h3>
      <AsyncSelect
        instanceId={1}
        placeholder='Departure'
        defaultOptions={[]}
        loadOptions={(s) => fetchStations(s)}
        cacheOptions
        onChange={(choice) => setDeparture(choice)}
      />
      <AsyncSelect
        instanceId={2}
        placeholder='Arrival'
        defaultOptions={[]}
        loadOptions={(s) => fetchStations(s)}
        cacheOptions
        onChange={(choice) => setArrival(choice)}
      />
      {departure.value && arrival.value && (
        <FreePlaces
          datetime={datetime}
          departure={departure.value}
          arrival={arrival.value}
        />
      )}
    </div>
  );
}

export default Travel;
