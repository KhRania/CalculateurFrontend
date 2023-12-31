import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Step2 from './Step2';
import { Button } from '@mui/material';
import CreateProject from './CreateProject';
import EnvPage from './EnvPage';

// Update the step labels in the steps array
const steps = ['Project Info', 'Building', 'Environment'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    // Function to handle the "Next" button click
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    // Function to handle the "Back" button click
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            // render Step component for each step in the array
            <Step sx={{ marginTop: 1 }} key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* show the contents of each step */}
      {activeStep === 0 && <CreateProject handleNext={handleNext} handleBack={handleBack} />}
      {activeStep === 1 && <Step2 handleNext={handleNext} handleBack={handleBack} />}
      {activeStep === 2 && <EnvPage handleNext={handleNext} handleBack={handleBack} />}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginRight: 1 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset} style={{ backgroundColor: '#1a83ff', color: 'white' }}>
              Reset
            </Button>
          </Box>
        </React.Fragment>
      ) : null}
    </Box>
  );
}
