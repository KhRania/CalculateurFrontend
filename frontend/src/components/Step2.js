import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, MenuItem, Typography } from '@mui/material';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import rugged from '../assets/rugged_terrain.png';


export default function Step2({handleBack, handleNext}) {
  const [roofHeight , setRoofHeight] = React.useState('');
  const [distanceBoard , setDistanceBoard] = React.useState('');
  const [pente, setPente] = React.useState('');
  const [membraneType, setMembraneType] = React.useState('');
  const [parapetHeight, setParapetHeight] = React.useState('');
  const [roofHeightTouched,setRoofHeightTouched] = React.useState(false);
  const [distanceBoardTouched, setDistanceBoardTouched] = React.useState(false);
  const [penteTouched , setPenteTouched] = React.useState(false);
  const [membraneTypeTouched, setMembraneTypeTouched] = React.useState(false);
  const [parapetHeightTouched, setParapetHeightTouched] = React.useState(false);
  const [allRoofFieldsFilled, setAllRoofFieldsFilled] = React.useState(false);

  const roofHeightError = roofHeightTouched  && roofHeight=== ''; 
  const distanceBoardError = distanceBoardTouched && distanceBoard === '';
  const penteError = penteTouched && pente === '';
  const membraneTypeError = membraneTypeTouched && membraneType === '';
  const parapetHeightError = parapetHeightTouched && parapetHeight === ''; 


  const handleRoofHeightBlur = () => {
    setRoofHeightTouched(true);
  };

  const handleDistanceBoardBlur = () => {
    setDistanceBoardTouched(true);
  };

  const handlePenteBlur = () => {
    setPenteTouched(true);
  };

  const handleMembraneTypeChange = (event) => {
    setMembraneType(event.target.value);
  };
  const handleMembraneTypeBlur = () => {
    setMembraneTypeTouched(true);
  };

  const handleParapetHeightBlur = () => {
    setParapetHeightTouched(true);
  };

  const Viewer = React.useRef(null);

  React.useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  React.useEffect(() => {
    if (Viewer.current !== null) {
      Viewer.current.zoomOnViewerCenter(1.1);
    }
  }, [Viewer.current]);

  const checkAllRoofFieldsFilled = () => {
    if (
      roofHeight !== '' &&
      distanceBoard !== '' &&
      pente !== '' &&
      membraneType !== '' &&
      parapetHeight !== ''
    ) {
      setAllRoofFieldsFilled(true);
    } else {
      setAllRoofFieldsFilled(false);
    }
  };

  // useEffect to check for changes in text field values
  React.useEffect(() => {
    checkAllRoofFieldsFilled();
  }, [roofHeight, distanceBoard, pente, membraneType, parapetHeight]);

  // function to handle input validation for numbers
  const handleNumberInput = (value, setStateFunc) => {
    const numberValue = value.replace(/[^0-9.]/g, ''); // Allow only numbers and a dot
    setStateFunc(numberValue);
  };


  return (
    <div>
      <Box
      marginTop='1rem'
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <Typography variant='h5' fontWeight="bold">Roof Dimensions</Typography>
        <TextField
          required
          id="outlined-required"
          label="Roof height"
          error={roofHeightError}
          helperText={roofHeightError && "Roof height is required"}
          value={roofHeight}
          onChange={(e) => handleNumberInput(e.target.value, setRoofHeight)}
          onBlur={handleRoofHeightBlur}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
          }}
        />

        <TextField
          required
          id="outlined-required"
          label="Edge distance"
          error={distanceBoardError}
          helperText={distanceBoardError && "Edge distace is required"}
          value={distanceBoard}
          onChange={(e) => handleNumberInput(e.target.value, setDistanceBoard)}
          onBlur={handleDistanceBoardBlur}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
          }}
        />

        <TextField
          required
          id="outlined-required"
          label="Roof Slope"
          error={penteError}
          helperText={penteError && "Pente is required"}
          value={pente}
          onChange={(e) => handleNumberInput(e.target.value, setPente)}
          onBlur={handlePenteBlur}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">degree</InputAdornment>,
          }}
        />

         <TextField
          required
          id="outlined-required"
          label="Parapet height"
          error={parapetHeightError}
          helperText={parapetHeightError && "Parapet Height is required"}
          value={parapetHeight}
          onChange={(e) => handleNumberInput(e.target.value, setParapetHeight)}
          onBlur={handleParapetHeightBlur}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
          }}
        />

        <TextField
          required
          select
          id="outlined-required"
          label="Membrane type"
          error={membraneTypeError}
          helperText={membraneTypeError && "Membrane type is required"}
          value={membraneType}
          onChange={handleMembraneTypeChange}
          onBlur={handleMembraneTypeBlur}
        >
          <MenuItem value="Option 1">PVC</MenuItem>
          <MenuItem value="Option 2">TPO</MenuItem>
          <MenuItem value="Option 3">Bituminous</MenuItem>
          <MenuItem value="Option 4">EPDM</MenuItem>
          <MenuItem value="Option 5">Other</MenuItem>
        </TextField>
        
        <Typography variant='h5' fontWeight="bold">Obstacles</Typography>
        
        <TextField
          id="outlined-basic"
          label="Obstacle height"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
          }}
        />
        <TextField
          id="outlined-basic"
          label="Offset Zone"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
          }}
        />
        
        <Button
          style={{ backgroundColor: '#1a83ff', color: 'white' }}
        >
          Create
        </Button>
        

      </Box>
      
      <div style={{marginLeft: '1rem'}}>
         <UncontrolledReactSVGPanZoom ref={Viewer} width={500} height={500}>
            <svg width="100%" height="100%" viewBox={`0 0 ${517} ${416}`}>
                  {allRoofFieldsFilled && (
                    <image
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    href={rugged} // Using the imported image here
                    />
                  )}
                </svg>
           </UncontrolledReactSVGPanZoom>
      </div>
      


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