import { useState } from 'react';

import ArrivalFilter from '@/components/ArrivalFilter';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TrainIcon from '@mui/icons-material/Train';
import ClearIcon from '@mui/icons-material/Clear';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import HoverIcon from '@/components/HoverIcon';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';

const Departure = ({
  datetime,
  departure,
  closeHandler,
  accordionChangeHandler,
}) => {
  const [expanded, setExpanded] = useState(departure.expanded);
  const [showNewArrival, setShowNewArrival] = useState(false);

  return (
    <Accordion
      className='departure'
      expanded={expanded}
      onChange={(e, exp) => {
        setExpanded(exp);
        accordionChangeHandler(departure, exp);
      }}
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Stack direction='row' alignItems='center' spacing={2}>
          <HoverIcon
            icon={<TrainIcon />}
            hoverIcon={<ClearIcon color='error' />}
            onClick={(e) => {
              e.stopPropagation();
              closeHandler(departure.value);
            }}
          />
          <Typography>{departure.label}</Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setShowNewArrival(!showNewArrival);
            }}
            disabled={!expanded}
          >
            {!showNewArrival ? <AddIcon /> : <RemoveIcon />}
          </IconButton>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <ArrivalFilter
          datetime={datetime}
          departure={departure}
          showNewArrival={showNewArrival}
          setShowNewArrival={setShowNewArrival}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default Departure;
