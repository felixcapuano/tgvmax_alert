import freeplaces from '@/pages/api/freeplaces';
import { fetchTrains } from '@/utils/fetchs';
import {
  Avatar,
  Step,
  StepButton,
  StepLabel,
  Stack,
  Chip,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
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
    const depTime = dayjs(departureDate).format('H[h]mm');
    const arrTime = dayjs(arrivalDate).format('H[h]mm');

    const label = `${depTime}`; // - ${arrTime}`;

    return (
      <Chip
        key={trainNumber}
        label={label}
        color='success'
        avatar={<Avatar>{freePlaces}</Avatar>}
      />
    );
  };

  return (
    <Stack className='train-timeline' direction='row' spacing={1}>
      {trains.map(displayTrain)}
    </Stack>
  );
};

export default TrainTimeline;
