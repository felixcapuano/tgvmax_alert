const freeplacesStationsURL =
  'https://www.maxjeune-tgvinoui.sncf/api/public/refdata/freeplaces-stations'; // GET

export default async (req, res) => {
  if (req.method === 'GET') {
    const response = await fetch(
      freeplacesStationsURL + `?label=${req.query.q}`,
      {
        method: 'GET',
      }
    );

    const data = await response.json();
    data.stations = data.stations.map(({ codeStation, station }) => ({
      label: station,
      value: codeStation,
    }));

    res.status(200).json(data);
  } else {
    res.status(404);
  }
};
