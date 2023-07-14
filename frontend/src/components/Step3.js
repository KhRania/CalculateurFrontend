import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button , Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogTitle, DialogContent, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import regionsData from './regions.json';
import WindSpeedLegend from './WindSpeedLegend';
import ElevationLegend from './ElevationLegend';
import SnowLoadLegend from './SnowLoadLegend';


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
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isMapClicked, setIsMapClicked] = useState(false);
  const [showWindSpeedLegend, setShowWindSpeedLegend] = useState(false);
  const [showElevationLegend, setShowElevationLegend] = useState(false);
  const [showSnowLoadLegend, setShowSnowLoadLegend] = useState(false);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setSelectedFeature(feature);
        setIsMapClicked(true);
      },
    });
  };

  const handleWindSpeedClick = () => {
    setWindSpeedData(regionsData.features);
    setElevationData([]);
    setSnowLoadData([]);
    const ileDeFrance = regionsData.features.find((feature) => feature.properties.code === '11');
    const bretagne = regionsData.features.find((feature) => feature.properties.code === '53');
    const normandie = regionsData.features.find((feature) => feature.properties.code === '28');
    const hautsDeFrance = regionsData.features.find((feature) => feature.properties.code === '32');
    const grandEst = regionsData.features.find((feature) => feature.properties.code === '44');
    const bourgogneFranceComte = regionsData.features.find((feature) => feature.properties.code === '27');
    const centrevalDeLoire = regionsData.features.find((feature) => feature.properties.code === '24');
    const paysDeLaLoire = regionsData.features.find((feature) => feature.properties.code === '52');
    const nouvelleAquitaine = regionsData.features.find((feature) => feature.properties.code === '75');
    const auvergneRhoneAlpes = regionsData.features.find((feature) => feature.properties.code === '84');
    const occitanie = regionsData.features.find((feature) => feature.properties.code === '76');
    const provenceAplesCote = regionsData.features.find((feature) => feature.properties.code === '93');
    const corse = regionsData.features.find((feature) => feature.properties.code === '94');

    setSelectedFeature([ileDeFrance, bretagne , normandie, hautsDeFrance , grandEst , bourgogneFranceComte , centrevalDeLoire, paysDeLaLoire, nouvelleAquitaine, auvergneRhoneAlpes,occitanie,provenceAplesCote, corse]);
    setShowWindSpeedLegend(true);
    setShowElevationLegend(false);
    setShowSnowLoadLegend(false);
  };
  
  const handleElevationClick = () => {
    setWindSpeedData([]);
    setElevationData(regionsData.features);
    setSnowLoadData([]);
    const ileDeFrance = regionsData.features.find((feature) => feature.properties.code === '11');
    const bretagne = regionsData.features.find((feature) => feature.properties.code === '53');
    const normandie = regionsData.features.find((feature) => feature.properties.code === '28');
    const hautsDeFrance = regionsData.features.find((feature) => feature.properties.code === '32');
    const grandEst = regionsData.features.find((feature) => feature.properties.code === '44');
    const bourgogneFranceComte = regionsData.features.find((feature) => feature.properties.code === '27');
    const centrevalDeLoire = regionsData.features.find((feature) => feature.properties.code === '24');
    const paysDeLaLoire = regionsData.features.find((feature) => feature.properties.code === '52');
    const nouvelleAquitaine = regionsData.features.find((feature) => feature.properties.code === '75');
    const auvergneRhoneAlpes = regionsData.features.find((feature) => feature.properties.code === '84');
    const occitanie = regionsData.features.find((feature) => feature.properties.code === '76');
    const provenceAplesCote = regionsData.features.find((feature) => feature.properties.code === '93');
    const corse = regionsData.features.find((feature) => feature.properties.code === '94');

    setSelectedFeature([ileDeFrance, bretagne , normandie, hautsDeFrance , grandEst , bourgogneFranceComte , centrevalDeLoire, paysDeLaLoire, nouvelleAquitaine, auvergneRhoneAlpes,occitanie,provenceAplesCote, corse]);    
    setShowWindSpeedLegend(false);
    setShowElevationLegend(true);
    setShowSnowLoadLegend(false);
  };
  
  const handleSnowLoadClick = () => {
    setWindSpeedData([]);
    setElevationData([]);
    setSnowLoadData(regionsData.features);
    const ileDeFrance = regionsData.features.find((feature) => feature.properties.code === '11');
    const bretagne = regionsData.features.find((feature) => feature.properties.code === '53');
    const normandie = regionsData.features.find((feature) => feature.properties.code === '28');
    const hautsDeFrance = regionsData.features.find((feature) => feature.properties.code === '32');
    const grandEst = regionsData.features.find((feature) => feature.properties.code === '44');
    const bourgogneFranceComte = regionsData.features.find((feature) => feature.properties.code === '27');
    const centrevalDeLoire = regionsData.features.find((feature) => feature.properties.code === '24');
    const paysDeLaLoire = regionsData.features.find((feature) => feature.properties.code === '52');
    const nouvelleAquitaine = regionsData.features.find((feature) => feature.properties.code === '75');
    const auvergneRhoneAlpes = regionsData.features.find((feature) => feature.properties.code === '84');
    const occitanie = regionsData.features.find((feature) => feature.properties.code === '76');
    const provenceAplesCote = regionsData.features.find((feature) => feature.properties.code === '93');
    const corse = regionsData.features.find((feature) => feature.properties.code === '94');

    setSelectedFeature([ileDeFrance, bretagne , normandie, hautsDeFrance , grandEst , bourgogneFranceComte , centrevalDeLoire, paysDeLaLoire, nouvelleAquitaine, auvergneRhoneAlpes,occitanie,provenceAplesCote, corse]);    
    setShowWindSpeedLegend(false);
    setShowElevationLegend(false);
    setShowSnowLoadLegend(true);
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
  
  const legendsContainerStyle = {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    zIndex: 1000, // Ensure the legends appear above the map layers
    backgroundColor: 'rgba(255, 255, 255)', // White background with transparency
    padding: '1rem',
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
              <MapContainer center={[46.603354, 1.888334]} 
              zoomControl={false} 
              zoom={6} 
              style={{ height: '35rem' }} 
              onClick={() => setIsMapClicked(false)}>
                
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Legends container */}
                <div className="legends-container" style={legendsContainerStyle}>
                  {showWindSpeedLegend && <WindSpeedLegend />}
                  {showElevationLegend && <ElevationLegend />}
                  {showSnowLoadLegend && <SnowLoadLegend />}
                </div>

                <GeoJSON
                  data={regionsData}
                  style={(feature) => {
                    const isSelected = selectedFeature && Array.isArray(selectedFeature) && selectedFeature.some((selected) => selected.properties.code === feature.properties.code);
                    const isIleDeFrance = feature.properties.code === '11';
                    const isBretagne = feature.properties.code === '53';
                    const isNormandie = feature.properties.code === '28'; 
                    const isHautsDeFrance = feature.properties.code === '32' ; 
                    const isGrandEst = feature.properties.code === '44' ; 
                    const isBourgogneFranceComte = feature.properties.code === '27' ;
                    const isCentrevalDeLoire = feature.properties.code === '24';
                    const isPaysDeLaLoire = feature.properties.code === '52';
                    const isNouvelleAquitaine = feature.properties.code === '75';
                    const isAuvergneRhoneAlpes = feature.properties.code === '84';
                    const isOccitanie = feature.properties.code === '76';
                    const isProvenceAplesCote = feature.properties.code === '93';
                    const isCorse = feature.properties.code === '94' ;

                    if (isSelected || isMapClicked) {
                      if (isIleDeFrance && windSpeedData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000', weight: 0.5 };
                      } else if (isBretagne && windSpeedData.length > 0) {
                        return { fillColor: '#c3ff4c', color: '#000000', weight: 0.5 }; // 26
                      } else if (isNormandie && windSpeedData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000', weight: 0.5 };
                      } else if (isAuvergneRhoneAlpes && windSpeedData.length > 0) {
                        return { fillColor: '#4c4cff', color: '#000000', weight: 0.5 }; //22
                      } else if (isBourgogneFranceComte && windSpeedData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000', weight: 0.5 };
                      } else if (isCentrevalDeLoire && windSpeedData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000', weight: 0.5 };
                      } else if (isCorse && windSpeedData.length > 0) {
                        return { fillColor: '#880808', color: '#000000', weight: 0.5 }; // 28
                      } else if (isGrandEst && windSpeedData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000' , weight: 0.5};
                      } else if (isHautsDeFrance && windSpeedData.length > 0) {
                        return { fillColor: '#c3ff4c', color: '#000000' , weight: 0.5}; // 26
                      } else if (isNouvelleAquitaine && windSpeedData.length > 0) {
                        return { fillColor: '#4c4cff', color: '#000000', weight: 0.5 }; // 22
                      } else if (isOccitanie && windSpeedData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000' , weight: 0.5};
                      } else if (isPaysDeLaLoire && windSpeedData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000', weight: 0.5 };
                      } else if (isProvenceAplesCote && windSpeedData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000', weight: 0.5 };

                      } else if (isIleDeFrance && elevationData.length > 0) {
                        return { fillColor: '#008000', color: '#000000' , weight: 0.5};
                      } else if (isBretagne && elevationData.length > 0) {
                        return { fillColor: '#008000', color: '#000000', weight: 0.5 };
                      } else if (isNormandie && elevationData.length > 0) {
                        return { fillColor: '#008000', color: '#000000', weight: 0.5 };
                      } else if (isAuvergneRhoneAlpes && elevationData.length > 0) {
                        return { fillColor: '#A0522D', color: '#000000' , weight: 0.5};//
                      } else if (isBourgogneFranceComte && elevationData.length > 0) {
                        return { fillColor: '#DAA520', color: '#000000' , weight: 0.5};//
                      } else if (isCentrevalDeLoire && elevationData.length > 0) {
                        return { fillColor: '#008000', color: '#000000', weight: 0.5 };
                      } else if (isCorse && elevationData.length > 0) {
                        return { fillColor: '#DAA520', color: '#000000', weight: 0.5 }; //
                      } else if (isGrandEst && elevationData.length > 0) {
                        return { fillColor: '#008000', color: '#000000', weight: 0.5 };
                      } else if (isHautsDeFrance && elevationData.length > 0) {
                        return { fillColor: '#008000', color: '#000000' , weight: 0.5};
                      } else if (isNouvelleAquitaine && elevationData.length > 0) {
                        return { fillColor: '#008000', color: '#000000', weight: 0.5 };
                      } else if (isOccitanie && elevationData.length > 0) {
                        return { fillColor: '#DAA520', color: '#000000' , weight: 0.5};//
                      } else if (isPaysDeLaLoire && elevationData.length > 0) {
                        return { fillColor: '#008000', color: '#000000', weight: 0.5 };
                      } else if (isProvenceAplesCote && elevationData.length > 0) {
                        return { fillColor: '#A0522D', color: '#000000', weight: 0.5 };//

                      } else if (isIleDeFrance && snowLoadData.length > 0) {
                        return { fillColor: '#4c4cff', color: '#000000' , weight: 0.5}; //a1
                      } else if (isBretagne && snowLoadData.length > 0) {
                        return { fillColor: '#4c4cff', color: '#000000' , weight: 0.5};//a1
                      } else if (isNormandie && snowLoadData.length > 0) {
                        return { fillColor: '#4c4cff', color: '#000000', weight: 0.5 };//a1
                      } else if (isAuvergneRhoneAlpes && snowLoadData.length > 0) {
                        return { fillColor: '#ff4c4c', color: '#000000', weight: 0.5 };//c
                      } else if (isBourgogneFranceComte && snowLoadData.length > 0) {
                        return { fillColor: '#c3ff4c', color: '#000000', weight: 0.5 };//b
                      } else if (isCentrevalDeLoire && snowLoadData.length > 0) {
                        return { fillColor: '#4c4cff', color: '#000000' , weight: 0.5}; //a1
                      } else if (isCorse && snowLoadData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000', weight: 0.5 };//a2
                      } else if (isGrandEst && snowLoadData.length > 0) {
                        return { fillColor: '#4c4cff', color: '#000000', weight: 0.5 };//a1
                      } else if (isHautsDeFrance && snowLoadData.length > 0) {
                        return { fillColor: '#4c4cff', color: '#000000', weight: 0.5 }; //a1
                      } else if (isNouvelleAquitaine && snowLoadData.length > 0) {
                        return { fillColor: '#4cffc4', color: '#000000' , weight: 0.5};//a2
                      } else if (isOccitanie && snowLoadData.length > 0) {
                        return { fillColor: '#c3ff4c', color: '#000000' , weight: 0.5};//b
                      } else if (isPaysDeLaLoire && snowLoadData.length > 0) {
                        return { fillColor: '#4c4cff', color: '#000000', weight: 0.5 }; //a1
                      } else if (isProvenceAplesCote && snowLoadData.length > 0) {
                        return { fillColor: '#ff4c4c', color: '#000000', weight: 0.5 };//c
                    }}

                    return { fillColor: 'transparent', color: '#000000', weight: 0.5 };
                  }}
                  onEachFeature={onEachFeature}
                >
                 {/** {selectedFeature && Array.isArray(selectedFeature) && (
                    <Popup>
                      {selectedFeature.map((feature) => (
                        <div key={feature.properties.code}>
                          <h3>{feature.properties.nom}</h3>
                          {windSpeedData.length > 0 && (
                            <p>Wind Speed: {feature.properties.windSpeed}</p>
                          )}
                          {elevationData.length > 0 && (
                            <p>Elevation: {feature.properties.elevation}</p>
                          )}
                          {snowLoadData.length > 0 && (
                            <p>Snow Load: {feature.properties.snowLoad}</p>
                          )}
                        </div>
                      ))}
                    </Popup>
                  )} */}

                </GeoJSON>


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
