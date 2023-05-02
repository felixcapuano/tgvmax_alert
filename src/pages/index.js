import Journey from '@/components/Journey';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const defaultDatetime = () => dayjs().hour(0).minute(0).second(0);

const createIdentifier = () => {
  return 'jid-' + (Math.random() + 1).toString(36).substring(7);
};

const loadJourneysIdentifier = () => {
  const storageKeys = Object.keys({ ...localStorage });
  return storageKeys.filter((k) => k.startsWith('jid-'));
};

export default function Home() {
  const [datetime, setDatetime] = useState(defaultDatetime());
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    const storedDatetime = localStorage.getItem('datetime');
    if (storedDatetime) setDatetime(dayjs(storedDatetime));

    setJourneys(loadJourneysIdentifier().map((i) => ({ id: i })));
  }, [setDatetime]);

  const updateDatetime = (dt) => {
    localStorage.setItem('datetime', dt.toISOString());
    setDatetime(dt);
  };

  const JourneyTile = ({ identifier, datetime }) => {
    return (
      <Paper>
        <Journey identifier={identifier} datetime={datetime} />
      </Paper>
    );
  };

  const resetHandler = () => setDatetime(defaultDatetime());
  const previousHandler = () => setDatetime((dt) => dt.subtract(1, 'day'));
  const nextHandler = () => setDatetime((dt) => dt.add(1, 'day'));
  const newJourneyHandler = () => {
    setJourneys([...journeys, { id: createIdentifier() }]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction='row'>
        <Button onClick={previousHandler}>Previous</Button>
        <DatePicker value={datetime} onChange={updateDatetime} />
        <Button onClick={resetHandler}>Reset</Button>
        <Button onClick={nextHandler}>Next</Button>
      </Stack>

      <Stack direction='row'>
        {journeys.map(({ id }) => (
          <JourneyTile key={id} datetime={datetime} identifier={id} />
        ))}
        <Button onClick={newJourneyHandler}>+</Button>
      </Stack>
    </LocalizationProvider>
  );
}
