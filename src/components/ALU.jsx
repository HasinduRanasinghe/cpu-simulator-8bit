import React from 'react';

const ALU = ({ registers }) => {
  const zeroFlag = Boolean(registers.FLAGS & 0x02);
  const carryFlag = Boolean(registers.FLAGS & 0x01);
  
  return (
    <div className="border border-cpu-light rounded-md p-3">
      <h3 className="text-lg font-semibold mb-2">Arithmetic Logic Unit</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-sm text-gray-400">Input A</div>
          <div className="cpu-register">{registers.A.toString(16).padStart(2, '0').toUpperCase()}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Input B</div>
          <div className="cpu-register">{registers.B.toString(16).padStart(2, '0').toUpperCase()}</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-sm text-gray-400">Flags</div>
        <div className="flex gap-2">
          <div className={`px-2 py-1 rounded ${zeroFlag ? 'bg-cpu-accent' : 'bg-cpu-dark'}`}>
            Z: {zeroFlag ? '1' : '0'}
          </div>
          <div className={`px-2 py-1 rounded ${carryFlag ? 'bg-cpu-accent' : 'bg-cpu-dark'}`}>
            C: {carryFlag ? '1' : '0'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALU;