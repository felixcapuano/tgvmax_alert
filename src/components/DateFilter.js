import dayjs from 'dayjs';

import DepartureFilter from '@/components/DepartureFilter';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';

const defaultDatetime = dayjs().hour(0).minute(0).second(0);

const DateFilter = () => {
  const [datetime, setDatetime] = useState(defaultDatetime);

  useEffect(() => {
    const storedDatetime = dayjs(localStorage.getItem('datetime'));
    if (storedDatetime && storedDatetime > dayjs()) setDatetime(storedDatetime);
  }, [setDatetime]);

  const updateStorage = (newDatetime) => {
    localStorage.setItem('datetime', newDatetime.toISOString());
  };

  const selectHandler = (dt) => {
    setDatetime(dt);
    updateStorage(dt);
  };

  const resetHandler = () => {
    setDatetime(defaultDatetime);
    updateStorage(defaultDatetime);
  };
  const previousHandler = () => {
    const newDatetime = datetime.subtract(1, 'day');
    setDatetime(newDatetime);
    updateStorage(newDatetime);
  };
  const nextHandler = () => {
    const newDatetime = datetime.add(1, 'day');
    setDatetime(newDatetime);
    updateStorage(newDatetime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction='row'>
        <Button onClick={previousHandler} disabled={datetime < dayjs()}>
          Prev
        </Button>
        <DatePicker value={datetime} onChange={selectHandler} />
        <Button onClick={resetHandler}>Reset</Button>
        <Button onClick={nextHandler}>Next</Button>
      </Stack>
      <DepartureFilter datetime={datetime} />
    </LocalizationProvider>
  );
};

export default DateFilter;
