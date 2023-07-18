import React from 'react';

const WindSpeedLegend = () => {
  return (
    <div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#bcc0df', marginRight: '5px' }}></div>
          <span>22 m/s</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#d0f4d4', marginRight: '5px' }}></div>
          <span>24 m/s</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#e8f4bc', marginRight: '5px' }}></div>
          <span>26 m/s</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#ddc1bc', marginRight: '5px' }}></div>
          <span>28 m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WindSpeedLegend;
