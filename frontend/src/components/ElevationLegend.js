import React from 'react';

const ElevationLegend = () => {
  return (
    <div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#c2d9ba', marginRight: '5px' }}></div>
          <span>0 m to 500 m</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#eae1b0', marginRight: '5px' }}></div>
          <span>500 m to 2000 m</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#ded0b3', marginRight: '5px' }}></div>
          <span>2000 m +</span>
        </div>
        
      </div>
    </div>
  );
};

export default ElevationLegend;
