import { useEffect, useState } from 'react';
import ArrivalFilter from '@/components/ArrivalFilter';
import StationSelector from '@/components/StationSelector';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TrainIcon from '@mui/icons-material/Train';
import ClearIcon from '@mui/icons-material/Clear';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HoverIcon from '@/components/HoverIcon';

const updateStorage = (newDepartures) => {
  localStorage.setItem('departures', JSON.stringify(newDepartures));
};

const DepartureFilter = ({ datetime }) => {
  const [departures, setDepartures] = useState({});

  useEffect(() => {
    const rawStore = localStorage.getItem('departures');
    if (rawStore) setDepartures(JSON.parse(rawStore));
  }, [setDepartures]);

  const stationHandler = (e, i) => {
    if (!i) return;
    const newDepartures = { ...departures, [i.value]: i };

    setDepartures(newDepartures);
    updateStorage(newDepartures);
  };

  const closeHandler = (valueToRemove) => {
    const newDepartures = structuredClone(departures);
    delete newDepartures[valueToRemove];

    setDepartures(newDepartures);
    updateStorage(newDepartures);
    localStorage.removeItem(valueToRemove);
  };

  const displayDeparture = (departureKey) => {
    const dep = departures[departureKey];
    return (
      <Accordion key={dep.value} className='departure' defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Stack direction='row' alignItems='center' spacing={2}>
            <HoverIcon
              icon={<TrainIcon />}
              hoverIcon={<ClearIcon color='error' />}
              onClick={() => closeHandler(dep.value)}
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
      {Object.keys(departures).map(displayDeparture)}
    </Stack>
  );
};

export default DepartureFilter;
