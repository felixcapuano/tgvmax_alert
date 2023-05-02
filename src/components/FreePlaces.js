import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { lightGreen, red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'; // 2023-04-30T00:00:00

const FreePlaces = ({ datetime, departure, arrival }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
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

      setTrains(data.proposals || []);
    };

    fetchTrains();
  }, [departure, arrival, datetime]);

  const displayTrain = (train) => {
    const departureTimeStr = dayjs(train.departureDate).format('HH:mm');
    const arrivalTimeStr = dayjs(train.arrivalDate).format('HH:mm');

    const timeStr = departureTimeStr + ' > ' + arrivalTimeStr;

    const style = {
      bgcolor: train.freePlaces > 0 ? lightGreen[500] : red[500],
    };
    return (
      <ListItem key={train.trainNumber}>
        <ListItemAvatar>
          <Avatar sx={style}>{train.freePlaces}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={timeStr} secondary={train.trainNumber} />
      </ListItem>
    );
  };

  return (
    <div>
      <Box
        sx={{
          height: '70vh',
          overflow: 'hidden',
          overflowY: 'scroll',
        }}
      >
        <List>{trains.map(displayTrain)}</List>
      </Box>
    </div>
  );
};

export default FreePlaces;
