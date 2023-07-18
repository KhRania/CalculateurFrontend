import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button , FormControl, InputLabel, Select, Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogTitle, DialogContent, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import regionsData from './regions.json';
import WindSpeedLegend from './WindSpeedLegend';
import ElevationLegend from './ElevationLegend';
import SnowLoadLegend from './SnowLoadLegend';
import rugged from '../assets/rugged_terrain.png';
import smooth from '../assets/smooth_terrain.png';
import terrain0 from '../assets/terrain0.png' ;
import terrain2 from '../assets/terrain2.png' ;
import terrain3a from '../assets/terrain3a.png' ;
import terrain3b from '../assets/terrain3b.png' ;
import terrain4 from '../assets/terrain4.png' ;


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
    value: 'Zone A1',
    label: 'Zone A1',
  },
  {
    value: 'Zone A2',
    label: 'Zone A2',
  },
  {
    value: 'Zone B',
    label: 'Zone B',
  },
  {
    value: 'Zone C',
    label: 'Zone C',
  },
];

const elevation = [
  {
   value: '0 m to 500 m',
   label: '0 m to 500 m',
  },
  {
    value: '500 m to 2000 m',
    label: '500 m to 2000 m',
  },
  {
    value: '2000 m +',
    label: '2000 m +',
  },
]

const terrainChoices = [
  {
    value: '0',
    labelBold: 'Terrain category 0 :' ,
    labelRegular: ' Sea or coastal area exposed to sea winds; lakes with a fetch of at least 5 km',
    image: terrain0,
  },
  {
    value: '1',
    labelBold: 'Terrain category 2 :', 
    labelRegular: ' Open country, with or without a few isolated obstacles (trees, buildings, etc.) separated from each other by more than 40 times their height',
    image: terrain2 ,
  },
  {
    value: '2',
    labelBold: 'Terrain category 3a :',
    labelRegular: ' Countryside with hedges; vineyards; grove; scattered habitat' ,
    image: terrain3a ,
  },
  {
    value: '3',
    labelBold: 'Terrain category 3b :',
    labelRegular: ' Urbanized or industrial areas; dense grove; orchards',
    image: terrain3b ,
  },
  {
    value: '4',
    labelBold: 'Terrain category 4 :',
    labelRegular: ' Urban areas where at least 15% of the surface is covered by buildings with an average height of more than 15 m; forests',
    image: terrain4 ,
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

  const [windSpeedValue, setWindSpeedValue] = useState('');
  const [snowLoadValue, setSnowLoadValue] = useState('');
  const [elevationValue, setElevationValue] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const isFormFilled =
      windSpeedValue.trim() !== '' &&
      snowLoadValue.trim() !== '' &&
      elevationValue.trim() !== '' &&
      selectedTerrain !== '' &&
      selectedOrography !== '';

    setIsFormValid(isFormFilled);
  };

  React.useEffect(() => {
    validateForm();
  }, [windSpeedValue, snowLoadValue, elevationValue, selectedTerrain, selectedOrography]);


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
            {/* Wind Speed */}
            <FormControl fullWidth variant="outlined">
            <InputLabel id="wind-speed-label">Wind Speed</InputLabel>
            <Select
              labelId="wind-speed-label"
              id="wind-speed-select"
              label="Wind Speed"
              value={windSpeedValue}
              onChange={(e) => setWindSpeedValue(e.target.value)}
            >
              {windSpeed.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Snow Load Zone */}
          <FormControl fullWidth variant="outlined">
            <InputLabel id="snow-load-label">Snow Load Zone</InputLabel>
            <Select
              labelId="snow-load-label"
              id="snow-load-select"
              label="Snow Load Zone"
              value={snowLoadValue}
              onChange={(e) => setSnowLoadValue(e.target.value)}
            >
              {snowLoadZones.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

           {/* Elevation */}
           <FormControl fullWidth variant="outlined">
            <InputLabel id="elevation-label">Elevation</InputLabel>
            <Select
              labelId="elevation-label"
              id="elevation-select"
              label="Elevation"
              value={elevationValue}
              onChange={(e) => setElevationValue(e.target.value)}
            >
              {elevation.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/** Orography */}
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
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={choice.image}
                alt={`terrain${choice.value}`}
                style={{ marginRight: '1rem', height: '5rem', width: '5rem' , marginTop:'0.5rem'}}
              />
              <div style={{ maxWidth: '25rem', wordWrap: 'break-word', whiteSpace: 'pre-wrap' , width:'25rem' }}>
                <span style={{ fontWeight: 'bold' }}>{choice.labelBold}</span>
                {choice.labelRegular}
              </div>
            </div>
              }
            />
            ))}
          </RadioGroup>
        </Box>
        
        <div style={{display: 'flex' , marginTop: '1rem'}}>
            <Button onClick={handleBack} style={{ backgroundColor: '#1a83ff', color: 'white' , marginLeft:'1rem'}}>
              Back
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
          <div style={{ display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column', height:'100%'}}>
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
                
                {/** assign unique code and colors to each region */}
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
            <div style={{display: 'flex' , justifyContent: 'flex-end',marginTop: '2.2rem', margineLeft: '50rem'}}>
              <Button
                onClick={handleNext} style={{ backgroundColor: !isFormValid ? 'gray' : '#1a83ff', color: 'white'  }} disabled={!isFormValid}>
                next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/** orography value using popup dialog and radio groups  */}
      <Dialog open={openPopup} onClose={handlePopupClose} sx={{ maxWidth: 'cg', width: '100%' }} >
      <DialogTitle>Choose surrounding for orography factor</DialogTitle>
      <DialogContent>
        <RadioGroup value={selectedOrography} onChange={handleOrographyChange}>
          <FormControlLabel
            value="choice1"
            control={<Radio />}
            label={
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <img
                  src={smooth} 
                  alt="smooth terrain"
                  style={{ marginRight: '1rem', height:'10rem' , width:'10rem' }}
                /> 
                <div>
                  <strong>Flat land or gentle hills : </strong> <br/>
                  The orography is made up of obstacles  <br/>
                  of varying heights and shapes.This type of  <br/>
                  orography is the most frequently encountered;  <br/>
                  in this case, the orography coefficient Co is  <br/> 
                  calculated automatically according to procedure  <br/>
                  1 described in the NF EN-1991-1-4/NA.
                  
                </div>
              </div>
            }
            labelPlacement="end" // This places the label after the image
          />
          <FormControlLabel
            value="choice2"
            control={<Radio />}
            label={
              <div style={{ display: 'flex', alignItems: 'center' ,marginTop: '1rem'}}>
                <img
                  src={rugged}
                  alt="rugged terrain"
                  style={{ marginRight: '1rem', height:'10rem', width:'10rem' }}
                />
                <div>
                  <strong>Steep hills or cliffs :</strong> <br/>
                  The orography is made up of well-individualized<br/> 
                  obstacles. An isolated cliff or hill belong to <br/>
                  this category of orography, and is more rarely <br/>
                  encountered. In this case, the Co coefficient of <br/>
                  orography is calculated manually according <br/>
                  procedure 2 of the NF EN-1991-1-4/NA.
                </div>
              </div>
            }
            labelPlacement="end" // This places the label after the image
          />
        </RadioGroup>
        <Button onClick={handlePopupClose} variant="contained" disabled={!isOrographySelected}
        style={{ marginTop:'2rem'}}>
          Apply
        </Button>
      </DialogContent>
    </Dialog>
    </div>
  );
}
