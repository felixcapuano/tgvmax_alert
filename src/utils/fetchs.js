const fetchStations = async (input) => {
  const params = new URLSearchParams({ q: input });

  const url = '/api/stations?' + params;
  const response = await fetch(url, { method: 'GET' });
  const data = await response.json();

  return data.stations;
};

const fetchTrains = async () => {
  const dtStr = datetime.format(DATETIME_FORMAT);

  const params = new URLSearchParams({
    departure: departure,
    arrival: arrival,
    datetime: dtStr,
  });

  const url = '/api/freeplaces?' + params;
  const response = await fetch(url, { method: 'GET' });
  const data = await response.json();

  return data.proposals || [];
};

export { fetchStations, fetchTrains };
