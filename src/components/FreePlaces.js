import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { green, lightGreen, red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import dayjs from 'dayjs';

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
      <h4>{dayjs(datetime).format('dddd, MMMM D')}</h4>
      <List>{trains.map(displayTrain)}</List>
    </div>
  );
};

export default FreePlaces;
