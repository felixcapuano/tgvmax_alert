import { Step, StepButton } from '@mui/material';
import Stepper from '@mui/material/Stepper';

const TrainTimeline = () => {
  return (
    <div>
      <Stepper>
        <Step>
          <StepButton>19h</StepButton>
        </Step>
        <Step>
          <StepButton>20h</StepButton>
        </Step>
      </Stepper>
    </div>
  );
};

export default TrainTimeline;
