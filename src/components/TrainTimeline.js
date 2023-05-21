import { fetchTrains } from '@/utils/fetchs';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const TrainTimeline = ({ datetime, departure, arrival }) => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const trains = await fetchTrains(datetime, departure, arrival);
      setTrains(trains);
      setLoading(false);
    })();
  }, [setTrains, setLoading, datetime, departure, arrival]);

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
    <Box>
      {loading ? (
        <LinearProgress color='inherit' />
      ) : (
        <Stack className='train-timeline' direction='row' spacing={1}>
          {trains.map(displayTrain)}
        </Stack>
      )}
    </Box>
  );
};

export default TrainTimeline;
