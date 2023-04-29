import Travel from '@/components/Travel';
import { useState } from 'react';
import Select from 'react-select';

export default function Home() {
  const datetime = '2023-04-30T00:00:00';

  // const [datetime, setDatetime] = useState('');

  return (
    <div>
      <input type='datetime-local' id='birthdaytime' name='birthdaytime' />
      <Travel datetime={datetime}></Travel>
    </div>
  );
}
