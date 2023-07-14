import React from 'react';

const WindSpeedLegend = () => {
  return (
    <div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#4c4cff', marginRight: '5px' }}></div>
          <span>22 m/s</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#4cffc4', marginRight: '5px' }}></div>
          <span>24 m/s</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#c3ff4c', marginRight: '5px' }}></div>
          <span>26 m/s</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#ff4c4c', marginRight: '5px' }}></div>
          <span>28 m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WindSpeedLegend;
