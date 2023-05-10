import { useState } from 'react';
import ArrivalFilter from '@/components/ArrivalFilter';
import StationSelector from '@/components/StationSelector';

const DepartureFilter = ({ datetime }) => {
  const [departures, setDepartures] = useState([
    { station: 'lyon' },
    { station: 'paris' },
  ]);

  const displayDeparture = (dep) => {
    const key = datetime.toString() + dep.station;

    return (
      <div key={key}>
        <h2>{dep.station}</h2>
        <ArrivalFilter datetime={datetime} departure={dep} />
      </div>
    );
  };

  return (
    <div>
      {departures.map(displayDeparture)}
      <div>
        <StationSelector />
      </div>
    </div>
  );
};

export default DepartureFilter;
