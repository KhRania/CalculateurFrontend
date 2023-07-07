import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import { Button } from '@mui/material';
import 'leaflet/dist/leaflet.css';

const EnvironmentMap = () => {
  const [windSpeedData, setWindSpeedData] = useState([]);
  const [elevationData, setElevationData] = useState([]);
  const [snowLoadData, setSnowLoadData] = useState([]);

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

  return (
    <div>
      <div>
        <Button variant="contained" onClick={handleWindSpeedClick}>
          Wind Speed
        </Button>
        <Button variant="contained" onClick={handleElevationClick}>
          Elevation
        </Button>
        <Button variant="contained" onClick={handleSnowLoadClick}>
          Snow Load
        </Button>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <MapContainer center={[46.603354, 1.888334]} zoom={6} style={{ height: '400px' }}>
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
  );
};

export default EnvironmentMap;
