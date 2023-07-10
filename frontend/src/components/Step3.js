import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button , Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { MapContainer, TileLayer, GeoJSON, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogTitle, DialogContent, FormControlLabel, RadioGroup, Radio } from '@mui/material';

const windSpeed = [
  {
    value: '22 m/s',
    label: '22 m/s',
  },
  {
    value: '24 m/s',
    label: '24 m/s',
  },
  {
    value: '26 m/s',
    label: '26 m/s',
  },
  {
    value: '28 m/s',
    label: '28 m/s',
  },
];

const snowLoadZones = [
  {
    value: 'Zone A',
    label: 'Zone A',
  },
  {
    value: 'Zone B',
    label: 'Zone B',
  },
  {
    value: 'Zone C',
    label: 'Zone C',
  },
  {
    value: 'Zone D',
    label: 'Zone D',
  },
];

const terrainChoices = [
  {
    value: '0',
    label: 'Terrain 0',
  },
  {
    value: '1',
    label: 'Terrain 1',
  },
  {
    value: '2',
    label: 'Terrain 2',
  },
  {
    value: '3',
    label: 'Terrain 3',
  },
  {
    value: '4',
    label: 'Terrain 4',
  },
];


export default function Step3({ handleBack , handleNext}) {
  const [windSpeedData, setWindSpeedData] = useState([]);
  const [elevationData, setElevationData] = useState([]);
  const [snowLoadData, setSnowLoadData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedOrography, setSelectedOrography] = useState('');
  const [isOrographySelected, setIsOrographySelected] = useState(false);
  const [selectedTerrain, setSelectedTerrain] = useState('');

  const franceWindSpeedData = [
    // Array containing wind speed data for different regions in France
    // Format: [regionName, windSpeedValue, polygonPositions]
    ['Region 1', 10, [[48, -4], [42, 9], [51, 8], [48, -4]]],
    ['Region 2', 20, [[45, -3], [41, 7], [49, 7], [45, -3]]],
    // Add more regions and wind speed values
  ];
  const franceElevationData = [
    // Array containing elevation data for different regions in France
    // Format: [regionName, elevationValue, polygonPositions]
    ['Region 1', 100, [[48, -4], [42, 9], [51, 8], [48, -4]]],
    ['Region 2', 200, [[45, -3], [41, 7], [49, 7], [45, -3]]],
    // Add more regions and elevation values
  ];
  const franceSnowLoadData = [
    // Array containing snow load data for different zones in France
    // Format: [zoneName, snowLoadValue, polygonPositions]
    ['Zone 1', '10 kN/m²', [[48, -4], [42, 9], [51, 8], [48, -4]]],
    ['Zone 2A', '15 kN/m²', [[45, -3], [41, 7], [49, 7], [45, -3]]],
    // Add more zones and snow load values
  ];

  const handleWindSpeedClick = () => {
    setWindSpeedData(franceWindSpeedData);
    setElevationData([]);
    setSnowLoadData([]);
  };

  const handleElevationClick = () => {
    setWindSpeedData([]);
    setElevationData(franceElevationData);
    setSnowLoadData([]);
  };

  const handleSnowLoadClick = () => {
    setWindSpeedData([]);
    setElevationData([]);
    setSnowLoadData(franceSnowLoadData);
  };

  const handlePopupOpen = () => {
    setOpenPopup(true);
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
  };

  const handleOrographyChange = (event) => {
    const choiceValue = event.target.value;
    setSelectedOrography(choiceValue);
    setIsOrographySelected(true);
  };

  const handleTerrainChange = (event) => {
    const choiceValue = event.target.value;
    setSelectedTerrain(choiceValue);
  };
  
  
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
      <div style={{ flex: '1', marginRight: '1rem' }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-select-currency"
            select
            label="Wind Speed"
            defaultValue=""
          >
            {windSpeed.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Snow Load Zone"
            defaultValue=""
          >
            {snowLoadZones.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-basic"
            label="Elevation"
            defaultValue=""
          >
          </TextField>

          <TextField
            id="outlined-basic"
            label="Orography factor"
            variant="outlined"
            value={selectedOrography === 'choice1' ? '100' : selectedOrography === 'choice2' ? '200' : ''}
            style={{marginRight: '1rem' }}
          />
          <Button variant="contained" onClick={handlePopupOpen} style={{ width:'4rem', height:'2rem', marginTop:'1.4rem', marginLeft:'0'}}>
            select
          </Button>

          {/** terrain type choice */}
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '1.2rem'}}>Select your Terrain type:</Typography>
          <RadioGroup value={selectedTerrain} onChange={handleTerrainChange}>
            {terrainChoices.map((choice) => (
            <FormControlLabel
              key={choice.value}
              value={choice.value}
              control={<Radio />}
              label={choice.label}
            />
            ))}
          </RadioGroup>
        </Box>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
          <Button onClick={handleBack} style={{ backgroundColor: '#1a83ff', color: 'white' }}>
            Back
          </Button>
        </div>

        <div style={{  display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
        <Button
          onClick={handleNext} style={{ backgroundColor: '#1a83ff', color: 'white'  }}>
          next
        </Button>
      </div>
      
      </div>
      <div style={{ flex: '1', marginRight: '2rem' }}>
        <div>

          {/** buttons for different characterisitics */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Button variant="contained" onClick={handleWindSpeedClick} style={{ marginRight: '1rem' }}>
              Wind Speed
            </Button>
            <Button variant="contained" onClick={handleElevationClick} style={{ marginRight: '1rem' }}>
              Elevation
            </Button>
            <Button variant="contained" onClick={handleSnowLoadClick}>
              Snow Load
            </Button>
          </div>

          {/** the leaflet map to visualize information */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: 1 }}>
              <MapContainer center={[46.603354, 1.888334]} zoomControl={false} zoom={6} style={{ height: '35rem' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {windSpeedData.map(([regionName, windSpeed, polygonPositions], index) => (
                  <Polygon
                    key={index}
                    positions={polygonPositions}
                    eventHandlers={{
                      click: (e) => {
                        e.target.openPopup();
                      },
                    }}
                  >
                    <Popup>
                      <div>
                        <h3>{regionName}</h3>
                        <p>Wind Speed: {windSpeed}</p>
                      </div>
                    </Popup>
                  </Polygon>
                ))}

                {elevationData.map(([regionName, elevation, polygonPositions], index) => (
                  <Polygon
                    key={index}
                    positions={polygonPositions}
                    eventHandlers={{
                      click: (e) => {
                        e.target.openPopup();
                      },
                    }}
                  >
                    <Popup>
                      <div>
                        <h3>{regionName}</h3>
                        <p>Elevation: {elevation}</p>
                      </div>
                    </Popup>
                  </Polygon>
                ))}

                {snowLoadData.map(([zoneName, snowLoadValue, polygonPositions], index) => (
                  <Polygon
                    key={index}
                    positions={polygonPositions}
                    eventHandlers={{
                      click: (e) => {
                        e.target.openPopup();
                      },
                    }}
                  >
                    <Popup>
                      <div>
                        <h3>{zoneName}</h3>
                        <p>Snow Load: {snowLoadValue}</p>
                      </div>
                    </Popup>
                  </Polygon>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {/** orography value using popup dialog and radio groups  */}
      <Dialog open={openPopup} onClose={handlePopupClose}>
        <DialogTitle>Choose surrounding for orography factor</DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedOrography} onChange={handleOrographyChange}>
            <FormControlLabel value="choice1" control={<Radio />} label="Flat land or gentle hills" />
            <FormControlLabel value="choice2" control={<Radio />} label="Steep hills or cliffs" />
          </RadioGroup>
          <Button onClick={handlePopupClose} 
          variant="contained" 
          disabled={!isOrographySelected}>
            Apply
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
