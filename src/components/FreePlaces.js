import { useState, useEffect } from 'react';

const FreePlaces = ({ datetime, departure, arrival }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      // const datetimeStr = datetime.
      const params = new URLSearchParams({
        departure,
        arrival,
        datetime,
      });

      const url = '/api/freeplaces?' + params;
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();

      setTrains(data.proposals || []);
    };

    fetchTrains();
  }, [departure, arrival, datetime]);

  const displayTrain = (train) => {
    return (
      <li id={train.trainNumber}>
        {train.trainNumber + ' free=' + train.freePlaces}
      </li>
    );
  };

  return <ul>{trains.map(displayTrain)}</ul>;
};

export default FreePlaces;
