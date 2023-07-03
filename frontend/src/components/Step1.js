import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVkaS1tYWtobG91ZiIsImEiOiJjbGpjdDJwdXowM3Z2M2RzMnJzMW5id2N1In0.gH1XsrErXO_3cp7ZxirG2g';
mapboxgl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  null,
  true 
);

const Step1 = ({ handleNext }) => {
  const [projectName, setProjectName] = useState('');
  const [address, setAddress] = useState('');
  const [projectNameTouched, setProjectNameTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleProjectNameBlur = () => {
    setProjectNameTouched(true);
  };

  const handleAddressBlur = () => {
    setAddressTouched(true);
  };

  const projectNameError = projectNameTouched && projectName === '';
  const addressError = addressTouched && address === '';

  const [coordinates, setCoordinates] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      if (address.trim() !== '') {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          setCoordinates([lng, lat]);
        }
      }
    };

    geocodeAddress();
  }, [address]);

  useEffect(() => {
    if (coordinates.length > 0) {
      const [lng, lat] = coordinates;

      if (!mapRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: 12
        });

        mapRef.current.on('click', (e) => {
          const { lngLat } = e;
          reverseGeocode(lngLat);
        });

        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);
      } else {
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: mapRef.current.getZoom()
        });

        markerRef.current.setLngLat([lng, lat]);
      }
    }
  }, [coordinates]);

  const reverseGeocode = async (lngLat) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const address = data.features[0].place_name;
      setAddress(address);
    }
  };

  const isNextButtonDisabled = projectName === '' || address === '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex'}}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, width: '30ch' },
            marginRight: '1rem'
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Project Name"
              value={projectName}
              onChange={handleProjectNameChange}
              onBlur={handleProjectNameBlur}
              error={projectNameError}
              helperText={projectNameError && 'Project Name is required'}
            />
          </div>
          
          <div>
            <TextField
              required
              id="outlined-required"
              label="Address"
              value={address}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur}
              error={addressError}
              helperText={addressError && 'Address is required'}
            />
          </div>
          <div>
            <TextField id="outlined-multiline-flexible" label="Description" multiline maxRows={8} />
          </div>
        </Box>
        <div style={{ flex: 1 , marginTop: '1rem' ,marginRight:'1rem'}}>
          <div id="map" style={{ height: '35rem' }} ref={mapContainerRef}></div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6rem' , marginRight: '1rem'}}>
        <Button
          disabled={isNextButtonDisabled}
          onClick={handleNext}
          style={{ backgroundColor: isNextButtonDisabled ? 'gray' : '#1a83ff', color: 'white' }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1;
