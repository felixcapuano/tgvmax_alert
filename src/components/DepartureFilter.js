import { useEffect, useState } from 'react';
import ArrivalFilter from '@/components/ArrivalFilter';
import StationSelector from '@/components/StationSelector';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TrainIcon from '@mui/icons-material/Train';
import ClearIcon from '@mui/icons-material/Clear';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HoverIcon from '@/components/HoverIcon';

const DepartureFilter = ({ datetime }) => {
  const [departures, setDepartures] = useState([]);

  useEffect(() => {
    const rawStore = localStorage.getItem('departures');
    if (rawStore) setDepartures(JSON.parse(rawStore));
  }, [setDepartures]);

  const updateStorage = (newDepartures) => {
    localStorage.setItem('departures', JSON.stringify(newDepartures));
  };

  const stationHandler = (e, i) => {
    if (!i) return;
    const newDepartures = [...departures, { ...i, index: departures.length }];

    setDepartures(newDepartures);
    updateStorage(newDepartures);
  };

  const closeHandler = (indexToRemove) => {
    const newDepartures = departures.filter(
      ({ index }) => index !== indexToRemove
    );

    setDepartures(newDepartures);
    updateStorage(newDepartures);
  };

  const displayDeparture = (dep) => {
    return (
      <Accordion key={dep.index} className='departure' defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Stack direction='row' alignItems='center' spacing={2}>
            <HoverIcon
              icon={<TrainIcon />}
              hoverIcon={<ClearIcon color='error' />}
              onClick={() => closeHandler(dep.index)}
            />

            <Typography>{dep.label}</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <ArrivalFilter datetime={datetime} departure={dep} />
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Stack className='departure-filter' direction='column' spacing={2}>
      <StationSelector onChange={stationHandler} placeholder='Add departure' />
      {departures.map(displayDeparture)}
    </Stack>
  );
};

export default DepartureFilter;
