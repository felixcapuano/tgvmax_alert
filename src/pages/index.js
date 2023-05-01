import Journey from '@/components/Journey';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';

export default function Home() {
  const [datetime, setDatetime] = useState(dayjs());

  useEffect(() => {
    const stored = localStorage.getItem('datetime');
    if (stored) setDatetime(dayjs(stored));
  }, [setDatetime]);

  const updateDatetime = (dt) => {
    localStorage.setItem('datetime', dt.toISOString());
    setDatetime(dt);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={datetime} onChange={updateDatetime} />

      <Stack direction='row'>
        <Journey numId={0} datetime={datetime} />
        <Journey numId={1} datetime={datetime} />
      </Stack>
    </LocalizationProvider>
  );
}
