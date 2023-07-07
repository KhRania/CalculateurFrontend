import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import EnvironmentMap from './EnvironmentMap';


export default function Step3({ handleBack }) {
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = () => {
    setShowMap(true);
  };

  return (
    <div>
      {showMap ? (
        <EnvironmentMap />
      ) : (
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
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem', marginRight: '1rem' }}>
            <Button onClick={handleBack} style={{ backgroundColor: '#1a83ff', color: 'white' }}>
              Back
            </Button>
            <Button onClick={handleShowMap} style={{ backgroundColor: '#1a83ff', color: 'white', marginLeft: '1rem' }}>
              Show Map
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
