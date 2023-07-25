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
  const [canDrawCircles, setCanDrawCircles] = React.useState(false);
  const [polygons, setPolygons] = React.useState([]); // Step 7
  const [isDrawingPolygon, setIsDrawingPolygon] = React.useState(false); // Step 8
  



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
    if (obstacleHeight !== '' && offsetZone !== '') {
      setAllObstacleFieldsFilled(true);
      setCanDrawCircles(true);
    } else {
      setAllObstacleFieldsFilled(false);
      setCanDrawCircles(false);
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
  const [zoomLevel, setZoomLevel] = React.useState(1);

   // Function to add a new point to the polygon
   const addPolygonPoint = (x, y) => {
    setPolygonPoints([...polygonPoints, { x: x / zoomLevel, y: y / zoomLevel }]);
  };

  const handleSVGDoubleClick = (e) => {
    if (canDrawCircles) {
      const svgRect = e.target.getBoundingClientRect();
      const svgX = (e.clientX - svgRect.left) / zoomLevel; // Adjust X coordinate for zoom
      const svgY = (e.clientY - svgRect.top) / zoomLevel; // Adjust Y coordinate for zoom
  
      // Step 3: Create initial circle when "Create" button is clicked
      if (!isPolygonComplete) {
        setPolygonPoints([{ x: svgX, y: svgY }]);
        setInitialClickCoordinates({ x: svgX, y: svgY }); // Store initial click coordinates
        setPolygonComplete(true);
      } else {
        // Add new point to the polygon if it's not the initial circle
        addPolygonPoint(svgX, svgY);
      }
    }
  };
  


  const handlePolygonComplete = () => {
    if (isDrawingPolygon && polygonPoints.length > 0) {
      // Adjust points for zoom before saving
      const adjustedPoints = polygonPoints.map((point) => ({
        x: point.x / zoomLevel,
        y: point.y / zoomLevel,
      }));
      // Add the final line segment (connecting the last point to the initial point)
      const completedPolygonPoints = [...adjustedPoints, adjustedPoints[0]];
      // Save the points of the current polygon in localStorage
      localStorage.setItem('currentPolygon', JSON.stringify(completedPolygonPoints));
      setIsDrawingPolygon(false); // Stop drawing the current polygon
  
      // Add the current polygon to the list of polygons and save it in local storage
      const updatedPolygons = [...polygons, completedPolygonPoints];
      setPolygons(updatedPolygons);
      localStorage.setItem('polygons', JSON.stringify(updatedPolygons));
    }
  };
  
  
  
  const handleResetClick = () => {
    if (isDrawingPolygon && polygonPoints.length > 0) {
      // If the polygon is being drawn and there are points in the polygonPoints array, remove the last point
      const updatedPoints = polygonPoints.slice(0, -1);
      setPolygonPoints(updatedPoints);
      setPolygonComplete(updatedPoints.length > 0); // Check if the polygon is still complete
      localStorage.setItem('currentPolygon', JSON.stringify(updatedPoints));
    } else if (!isDrawingPolygon) {
      // If the polygon is complete, reset the drawing state and points
      setPolygonPoints([]);
      setIsDrawingPolygon(false);
      setPolygonComplete(false);
      localStorage.removeItem('currentPolygon');
    }
  };

  const renderCurrentPolygon = () => {
    // Check if there are points in localStorage for the current polygon
    const savedPoints = JSON.parse(localStorage.getItem('currentPolygon'));
  
    if (isDrawingPolygon && polygonPoints.length > 1) {
      const pathData = `M ${initialClickCoordinates.x} ${initialClickCoordinates.y} L ${polygonPoints
        .map((point) => `${point.x} ${point.y}`)
        .join(' ')} Z`;
  
      return <path d={pathData} fill="none" stroke="blue" />;
    } else if (!isDrawingPolygon && savedPoints && savedPoints.length > 1) {
      const pathData = `M ${initialClickCoordinates.x} ${initialClickCoordinates.y} L ${savedPoints
        .map((point) => `${point.x} ${point.y}`)
        .join(' ')} Z`;
  
      return <path d={pathData} fill="none" stroke="blue" />;
    }
  
    return null;
  };

  const handleCreateClick = () => {
    if (!isDrawingPolygon) {
      setIsDrawingPolygon(true); // Start drawing a new polygon
      setPolygonComplete(false);
      // Save the existing polygons in localStorage
      localStorage.setItem('polygons', JSON.stringify(polygons));
      // Reset the polygon points to start drawing a new polygon
      setPolygonPoints([]);
  
      // Update initialClickCoordinates to the last circle of the previous polygon
      if (polygonPoints.length > 0) {
        setInitialClickCoordinates({
          x: polygonPoints[polygonPoints.length - 1].x,
          y: polygonPoints[polygonPoints.length - 1].y,
        });
      }
    }
  };

   // Add this useEffect to clear polygons on component mount
   React.useEffect(() => {
    // Clear polygons from local storage when the component mounts
    localStorage.removeItem('polygons');
  }, [])
  
  
 
  React.useEffect(() => {
    // Check if there are existing polygons in localStorage
    const savedPolygons = JSON.parse(localStorage.getItem('polygons'));
    if (savedPolygons && savedPolygons.length > 0) {
      setPolygons(savedPolygons); // Load existing polygons from localStorage
    }
  }, []);
  
  const renderPolygons = () => {
    return polygons.map((polygon, index) => (
      <polyline
        key={index}
        points={polygon.map((point) => `${point.x},${point.y}`).join(' ')}
        fill="none"
        stroke="blue"
      />
    ));
  };

  const handleZoomChange = (value) => {
    setZoomLevel(value.a);
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
              disabled={!canDrawCircles}
              style={{
                backgroundColor: !canDrawCircles ? 'gray' : '#1a83ff',
                color: 'white',
              }}
              onClick={handleCreateClick}
            >
              {isDrawingPolygon ? 'Add Points' : 'Add Polygone'}
            </Button>

            {/* New "Reset" button to reset the shape to the previous state it was in */}
            <Button
              disabled={isDrawingPolygon && polygonPoints.length === 0}
              style={{
                backgroundColor: isDrawingPolygon && polygonPoints.length === 0 ? 'gray' : '#1a83ff',
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
         onDoubleClick={handleSVGDoubleClick}
        >
          <UncontrolledReactSVGPanZoom ref={Viewer} width={800} height={600} onChangeValue={handleZoomChange}>
            <svg width="500px" height="500px" viewBox={`0 0 ${800} ${600}`} style={{ overflow: 'visible' }}>
              {allRoofFieldsFilled && <image x="0" y="0" width="500" height="500" href={rugged} />}

              {/* Render completed polygons */}
              {polygons.map((polygon, index) => (
                <polyline
                  key={index}
                  points={polygon.map((point) => `${point.x},${point.y}`).join(' ')}
                  fill="none"
                  stroke="blue"
                />
              ))}

              {/* Render the current polygon */}
              {renderCurrentPolygon()}

              {/* Group to hold the circles and lines of the current polygon */}
              <g>
                {isDrawingPolygon &&
                  polygonPoints.map((point, index) => (
                    <circle key={index} cx={point.x} cy={point.y} r="5" fill="red" />
                  ))}

                {/* Render the initial circle */}
                {isDrawingPolygon && polygonPoints.length > 0 && (
                  <circle
                    cx={initialClickCoordinates.x}
                    cy={initialClickCoordinates.y}
                    r="5"
                    fill="red"
                    onClick={handlePolygonComplete} // Call the new function to complete the polygon
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