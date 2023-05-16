import ArrivalFilter from '@/components/ArrivalFilter';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TrainIcon from '@mui/icons-material/Train';
import ClearIcon from '@mui/icons-material/Clear';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HoverIcon from '@/components/HoverIcon';

const Departure = ({
  datetime,
  departure,
  closeHandler,
  accordionChangeHandler,
}) => {
  return (
    <Accordion
      className='departure'
      defaultExpanded={departure.expanded}
      onChange={(e, exp) => accordionChangeHandler(departure, exp)}
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
            onClick={() => closeHandler(departure.value)}
          />

          <Typography>{departure.label}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <ArrivalFilter datetime={datetime} departure={departure} />
      </AccordionDetails>
    </Accordion>
  );
};

export default Departure;
