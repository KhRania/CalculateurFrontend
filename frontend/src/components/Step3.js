import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function Step3({handleBack}) {
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
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' , marginRight: '1rem'}}>
        <Button
          
          onClick={handleBack}
          style={{ backgroundColor: '#1a83ff', color: 'white' }}
        >
          Back
        </Button>
      </div>
    </div>
    
  );
}