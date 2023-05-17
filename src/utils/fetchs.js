// TODO Deal with 400/500 error with no body

const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'; // 2023-04-30T00:00:00

const fetchStations = async (input) => {
  const params = new URLSearchParams({ q: input });

  const url = '/api/stations?' + params;
  const response = await fetch(url, {
    method: 'GET',
    next: { revalidate: 600 },
  });
  if (response.status != 200) return [];

  const data = await response.json();
  return data.stations;
};

const fetchTrains = async (datetime, departure, arrival) => {
  const dtStr = datetime.format(DATETIME_FORMAT);

  const params = new URLSearchParams({
    departure: departure.value,
    arrival: arrival.value,
    datetime: dtStr,
  });
  const url = '/api/freeplaces?' + params;
  const response = await fetch(url, {
    method: 'GET',
    next: { revalidate: 60 },
  });

  if (response.status != 200) return [];

  const data = await response.json();
  return data.proposals || [];
};

export { fetchStations, fetchTrains };
