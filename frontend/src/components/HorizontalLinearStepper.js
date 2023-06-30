import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropsFields from './PropsFields';
import PropsFields2 from './PropsFields2'
const steps = ['', '', ''];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepLabel = (stepIndex) => {
    if (stepIndex === 0) {
      return 'Step One';
    } else if (stepIndex === 1) {
      return 'Step Two';
    } else if (stepIndex === 2) {
      return 'Step Three';
    }
    return '';
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((_, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step sx={{
                marginTop: 1 }}  
                key={index} {...stepProps}>
              <StepLabel {...labelProps}>{getStepLabel(index)}</StepLabel>
            </Step>
          );
        })}
        
      </Stepper>
      {activeStep === 0 && <PropsFields/>}
      {activeStep === 1 && <PropsFields2/>}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 ,marginRight: 1 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset} 
            style={{'background-color':'#1a83ff', 'color':'white'}} >Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 , marginRight: 1 , marginLeft: 1 }}>
            {activeStep !== 0 && (
              <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              style={{'background-color':'#1a83ff', 'color':'white'}} 
            >
              Back
            </Button>
            )}
            
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}
            style={{'background-color':'#1a83ff', 'color':'white'}} >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
