import React from 'react';

const ElevationLegend = () => {
  return (
    <div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#008000', marginRight: '5px' }}></div>
          <span>0 m to 500 m</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#DAA520', marginRight: '5px' }}></div>
          <span>500 m to 2000 m</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#A0522D', marginRight: '5px' }}></div>
          <span>2000m +</span>
        </div>
        
      </div>
    </div>
  );
};

export default ElevationLegend;
