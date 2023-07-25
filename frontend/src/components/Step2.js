import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, MenuItem } from '@mui/material';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import { Tab, Tabs } from '@mui/material';
import rugged from '../assets/rugged_terrain.png';


export default function Step2({handleBack, handleNext}) {
  const [obstacleHeight , setObstacleHeight] = React.useState('');
  const [offsetZone, setOffsetZone] = React.useState('');
  const [roofHeight , setRoofHeight] = React.useState('');
  const [distanceBoard , setDistanceBoard] = React.useState('');
  const [pente, setPente] = React.useState('');
  const [membraneType, setMembraneType] = React.useState('');
  const [parapetHeight, setParapetHeight] = React.useState('');
  const [obstacleHeightTouched , setObstacleHeightTouched] = React.useState(false);
  const [offsetZoneTouched , setOffsetZoneTouched] = React.useState(false);
  const [roofHeightTouched,setRoofHeightTouched] = React.useState(false);
  const [distanceBoardTouched, setDistanceBoardTouched] = React.useState(false);
  const [penteTouched , setPenteTouched] = React.useState(false);
  const [membraneTypeTouched, setMembraneTypeTouched] = React.useState(false);
  const [parapetHeightTouched, setParapetHeightTouched] = React.useState(false);
  const [allRoofFieldsFilled, setAllRoofFieldsFilled] = React.useState(false);
  const [allObstacleFieldsFilled, setAllObstacleFieldsFilled] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const roofHeightError = roofHeightTouched  && roofHeight=== ''; 
  const distanceBoardError = distanceBoardTouched && distanceBoard === '';
  const penteError = penteTouched && pente === '';
  const membraneTypeError = membraneTypeTouched && membraneType === '';
  const parapetHeightError = parapetHeightTouched && parapetHeight === ''; 
  const obstacleHeightError = obstacleHeightTouched && obstacleHeight === '';
  const offsetZoneError = offsetZoneTouched && offsetZone === '' ;

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

  const handleObstacleHeightBlur = () => {
    setObstacleHeightTouched(true);
  }
  
  const handleOffsetZoneBlur = () => {
    setOffsetZoneTouched(true);
  }

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

  const checkAllObstacleFieldsFilled = () => {
    if (
      obstacleHeight !== '' &&
      offsetZone !== '' 
    ) {
      setAllObstacleFieldsFilled(true);
    } else {
      setAllObstacleFieldsFilled(false);
    }
  };

  // useEffect to check for changes in text field values and other conditions. 
  React.useEffect(() => {
    checkAllRoofFieldsFilled();
    checkAllObstacleFieldsFilled();
  }, [roofHeight, distanceBoard, pente, membraneType, parapetHeight, obstacleHeight, offsetZone]);


  // function to handle input validation for numbers
  const handleNumberInput = (value, setStateFunc) => {
    const numberValue = value.replace(/[^0-9.]/g, ''); // Allow only numbers and a dot
    setStateFunc(numberValue);
  };

  const [polygonPoints, setPolygonPoints] = React.useState([]); // Step 1
  const [isPolygonComplete, setPolygonComplete] = React.useState(false); // Step 1
  const [initialClickCoordinates, setInitialClickCoordinates] = React.useState({
    x: 0,
    y: 0,
  }); // Step 2

   // Function to add a new point to the polygon
   const addPolygonPoint = (x, y) => {
    setPolygonPoints([...polygonPoints, { x, y }]);
  };

  // Step 2: Event listener for mouse click on the SVG canvas
  const handleSVGClick = (e) => {
    const svgRect = e.target.getBoundingClientRect();
    const svgX = e.clientX - svgRect.left;
    const svgY = e.clientY - svgRect.top;

    // Step 3: Create initial circle when "Create" button is clicked
    if (!isPolygonComplete) {
      setPolygonPoints([{ x: svgX, y: svgY }]);
      setInitialClickCoordinates({ x: svgX, y: svgY }); // Store initial click coordinates
      setPolygonComplete(true);
    } else {
      // Add new point to the polygon if it's not the initial circle
      addPolygonPoint(svgX, svgY);
    }
  };


  // Step 4: Handle click on initial circle to complete the polygon
  const handleInitialCircleClick = () => {
    setPolygonComplete(false);
    setPolygonPoints(polygonPoints.slice(0, -1));
  };

   // Step 5: Handle click on the "Reset" button to undo the last action on the canvas
   const handleResetClick = () => {
    if (isPolygonComplete && polygonPoints.length > 0) {
      // If the polygon is complete and there are points in the polygonPoints array, remove the last point
      const updatedPoints = polygonPoints.slice(0, -1);
      setPolygonPoints(updatedPoints);
      setPolygonComplete(updatedPoints.length > 0); // Check if the polygon is still complete
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Tabs
          style={{ marginTop: '1rem' }}
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Roof Dimensions" style={{ fontWeight: 'bold' }} />
          <Tab label="Obstacles" style={{ fontWeight: 'bold' }} />
        </Tabs>

        <div role="tabpanel" hidden={activeTab !== 0}>
          <Box
            display="flex"
            flexDirection="column"
            marginTop="1rem"
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '22ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-required"
              label="Roof height"
              error={roofHeightError}
              helperText={roofHeightError && 'Roof height is required'}
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
              helperText={distanceBoardError && 'Edge distance is required'}
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
              helperText={penteError && 'Pente is required'}
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
              helperText={parapetHeightError && 'Parapet Height is required'}
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
              helperText={membraneTypeError && 'Membrane type is required'}
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
          </Box>
        </div>

        <div role="tabpanel" hidden={activeTab !== 1}>
          <Box
            display="flex"
            flexDirection="column"
            marginTop="1rem"
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '22ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Obstacle height"
              sx={{ m: 1, width: '25ch' }}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
              onChange={(e) => handleNumberInput(e.target.value, setObstacleHeight)}
              onBlur={handleObstacleHeightBlur}
              error={obstacleHeightError}
              helperText={obstacleHeightError && 'Obstacle height is required'}
              value={obstacleHeight}
            />

            <TextField
              id="outlined-basic"
              label="Offset Zone"
              sx={{ m: 1, width: '25ch' }}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
              onChange={(e) => handleNumberInput(e.target.value, setOffsetZone)}
              onBlur={handleOffsetZoneBlur}
              error={offsetZoneError}
              helperText={offsetZoneError && 'Offset zone is required'}
              value={offsetZone}
            />

          <Button
            disabled={!allObstacleFieldsFilled || polygonPoints.length > 0}
            style={{
              backgroundColor: !allObstacleFieldsFilled ? 'gray' : '#1a83ff',
              color: 'white',
            }}
            onClick={() => {
              if (!isPolygonComplete) {
                // The circle has already been created on the first click, no additional code needed here.
              } else {
                // Code to handle the completion of the polygon.
                setPolygonComplete(false);
                setPolygonPoints([]);
              }
            }}
            >
            Create
          </Button>

           {/* New "Reset" button to reset the shape to the previous state it was in */}
          <Button
            disabled={!isPolygonComplete || polygonPoints.length === 0}
            style={{
              backgroundColor: !isPolygonComplete || polygonPoints.length === 0 ? 'gray' : '#1a83ff',
              color: 'white',
            }}
            onClick={handleResetClick}
          >
            Reset
          </Button>

        </Box>
        </div>


        <div style={{ display: "flex" , marginRight: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem'}}>
            <Button onClick={handleBack} style={{ backgroundColor: '#1a83ff', color: 'white' }}>
              Back
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', marginLeft: '8rem' }}>
            <Button onClick={handleNext} style={{ backgroundColor: '#1a83ff', color: 'white' }}>
              Next
            </Button>
          </div>
        </div>
      </div>

      <div style={{ flex: 2, marginRight: '1rem', marginTop: '1rem' }}>
        <div
          style={{ width: '40rem', height: '15rem' }}
          onClick={handleSVGClick}
        >
          <UncontrolledReactSVGPanZoom ref={Viewer} width={800} height={600}>
            <svg
              width="500px"
              height="500px"
              viewBox={`0 0 ${800} ${600}`}
              style={{ overflow: 'visible' }}
            >
              {allRoofFieldsFilled && <image x="0" y="0" width="500" height="500" href={rugged} />}

              {/** Group to hold the circles and lines of the polygon */}
              <g>
                {isPolygonComplete &&
                  polygonPoints.map((point, index) => (
                    <circle key={index} cx={point.x} cy={point.y} r="5" fill="red" />
                  ))}

                {/* Render the polyline */}
                {isPolygonComplete && polygonPoints.length > 1 && (
                  <polyline
                    points={[
                      ...polygonPoints.map((point) => `${point.x},${point.y}`),
                      `${initialClickCoordinates.x},${initialClickCoordinates.y}`, // Add the initial point to close the polygon
                    ].join(' ')}
                    fill="none"
                    stroke="blue"
                  />
                )}

                {isPolygonComplete && polygonPoints.length > 0 && (
                  <circle
                    cx={initialClickCoordinates.x}
                    cy={initialClickCoordinates.y}
                    r="5"
                    fill="red"
                    onClick={handleInitialCircleClick}
                  />
                )}
              </g>
            </svg>
          </UncontrolledReactSVGPanZoom>
        </div>
      </div>
    </div>
  );
}