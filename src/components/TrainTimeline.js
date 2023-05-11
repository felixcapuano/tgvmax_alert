import { fetchTrains } from '@/utils/fetchs';
import { Avatar, Step, StepButton, StepLabel } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';

const TrainTimeline = ({ datetime, departure, arrival }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    (async () => {
      const trains = await fetchTrains(datetime, departure, arrival);

      setTrains(trains);
    })();
  }, [setTrains, datetime, departure, arrival]);

  const displayTrain = ({
    departureDate,
    arrivalDate,
    freePlaces,
    trainNumber,
  }) => {
    const departureDatetime = dayjs(departureDate);
    const arrivalDatetime = dayjs(arrivalDate);

    return (
      <Step key={trainNumber}>
        <StepLabel>{departureDatetime.format('H[h]mm')}</StepLabel>
      </Step>
    );
  };

  return (
    <div>
      <Stepper>{trains.map(displayTrain)}</Stepper>
    </div>
  );
};

export default TrainTimeline;
