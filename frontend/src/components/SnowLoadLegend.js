import React from 'react';

const SnowLoadLegend = () => {
    return (
        <div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#4c4cff', marginRight: '5px' }}></div>
              <span>Zone A1</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#4cffc4', marginRight: '5px' }}></div>
              <span>Zone A2</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#c3ff4c', marginRight: '5px' }}></div>
              <span>Zone B</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#ff4c4c', marginRight: '5px' }}></div>
              <span>Zone C</span>
            </div>
          </div>
        </div>
      );
};

export default SnowLoadLegend;
