import { useState } from 'react';

const ArrivalFilter = ({ datetime, departure }) => {
  const [arrivals, setArrivals] = useState([
    { station: 'lyon' },
    { station: 'paris' },
  ]);

  const displayArrival = (arr) => {
    const key = datetime.toString() + departure.station + arr.station;
    return <div key={key}>arrival {arr.station}</div>;
  };

  return <div>{arrivals.map(displayArrival)}</div>;
};

export default ArrivalFilter;
