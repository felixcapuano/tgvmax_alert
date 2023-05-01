import Travel from '@/components/Travel';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'; // 2023-04-30T00:00:00

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
      <DateTimePicker value={datetime} onChange={updateDatetime} />

      <Travel datetime={datetime.format(DATETIME_FORMAT)} />
    </LocalizationProvider>
  );
}
