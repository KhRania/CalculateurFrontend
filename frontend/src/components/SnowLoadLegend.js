import React from 'react';

const SnowLoadLegend = () => {
    return (
        <div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#bcc0df', marginRight: '5px' }}></div>
              <span>Zone A1</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#d0f4d4', marginRight: '5px' }}></div>
              <span>Zone A2</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#e8f4bc', marginRight: '5px' }}></div>
              <span>Zone B</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#ddc1bc', marginRight: '5px' }}></div>
              <span>Zone C</span>
            </div>
          </div>
        </div>
      );
};

export default SnowLoadLegend;
