import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function Step2({handleBack, handleNext}) {
  return (
    <div>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
      <div style={{display:'flex'}}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' , marginRight: '1rem'}}>
        <Button
          onClick={handleBack}
          style={{ backgroundColor: '#1a83ff', color: 'white' }}
        >
          Back
        </Button>
      </div>
      <div style={{  display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' , marginRight: '1rem'}}>
        <Button
          onClick={handleNext} 
          style={{ backgroundColor: '#1a83ff', color: 'white'  }}
        >
          next
        </Button>
      </div>
      </div>
      
    </div>
    
  );
}