const searchFreeplacesProposalsURL =
  'https://www.maxjeune-tgvinoui.sncf/api/public/refdata/search-freeplaces-proposals'; // POST

export default async (req, res) => {
  if (req.method === 'GET') {
    const body = JSON.stringify({
      departureDateTime: req.query.datetime,
      origin: req.query.departure,
      destination: req.query.arrival,
    });

    const response = await fetch(searchFreeplacesProposalsURL, {
      method: 'POST',
      body: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    res.status(200).json(data);
  } else {
    res.status(404);
  }
};
