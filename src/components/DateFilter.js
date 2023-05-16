import dayjs from 'dayjs';

import DepartureFilter from '@/components/DepartureFilter';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import ButtonGroup from '@mui/material/ButtonGroup';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

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
      <Stack className='datetime-picker-wrapper' direction='row' spacing={1}>
        <Fab
          className='disable-full-opacity'
          onClick={previousHandler}
          variant='primary'
          disabled={datetime < dayjs()}
        >
          <NavigateBeforeIcon />
        </Fab>
        <DatePicker value={datetime} onChange={selectHandler} />
        <Fab className='round-button' onClick={resetHandler} variant='primary'>
          Now
        </Fab>
        <Fab className='round-button' onClick={nextHandler} variant='primary'>
          <NavigateNextIcon />
        </Fab>
      </Stack>
      <DepartureFilter datetime={datetime} />
    </LocalizationProvider>
  );
};

export default DateFilter;
