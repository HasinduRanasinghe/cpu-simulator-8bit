import React from 'react';
import classNames from 'classnames';

const DataBus = ({ active, direction, from, to }) => {
  return (
    <div 
      className={classNames('cpu-bus', { 'opacity-0': !active })}
      style={{ 
        width: direction === 'horizontal' ? '100%' : '2px',
        height: direction === 'vertical' ? '100%' : '2px'
      }}
    >
      {active && (
        <div className="text-xs text-center whitespace-nowrap">
          {from} → {to}
        </div>
      )}
    </div>
  );
};

export default DataBus;