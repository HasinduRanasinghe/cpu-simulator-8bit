import React from 'react';
import classNames from 'classnames';

const Memory = ({ memory, highlight, baseAddress = 0 }) => {
  return (
    <div className="grid grid-cols-8 gap-2">
      {memory.map((value, index) => {
        const absoluteAddress = baseAddress + index;
        const isHighlighted = absoluteAddress === highlight;
        
        return (
          <div key={index} className="flex flex-col items-center">
            <div className="text-xs text-gray-400 mb-1">{absoluteAddress.toString(16).padStart(2, '0').toUpperCase()}</div>
            <div 
              className={classNames('cpu-memory-cell', { 'active': isHighlighted })}
              title={`Address: ${absoluteAddress}, Value: ${value}`}
            >
              {value.toString(16).padStart(2, '0').toUpperCase()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Memory;