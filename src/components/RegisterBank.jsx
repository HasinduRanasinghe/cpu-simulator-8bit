import React from 'react';

const RegisterBank = ({ registers }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-sm text-gray-400 mb-1">Accumulator (A)</div>
        <div className="cpu-register">
          {registers.A.toString(16).padStart(2, '0').toUpperCase()} <span className="text-gray-400 text-xs">({registers.A})</span>
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400 mb-1">Register B</div>
        <div className="cpu-register">
          {registers.B.toString(16).padStart(2, '0').toUpperCase()} <span className="text-gray-400 text-xs">({registers.B})</span>
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400 mb-1">Register C</div>
        <div className="cpu-register">
          {registers.C.toString(16).padStart(2, '0').toUpperCase()} <span className="text-gray-400 text-xs">({registers.C})</span>
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400 mb-1">Register D</div>
        <div className="cpu-register">
          {registers.D.toString(16).padStart(2, '0').toUpperCase()} <span className="text-gray-400 text-xs">({registers.D})</span>
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400 mb-1">Program Counter (PC)</div>
        <div className="cpu-register">
          {registers.PC.toString(16).padStart(2, '0').toUpperCase()} <span className="text-gray-400 text-xs">({registers.PC})</span>
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400 mb-1">Stack Pointer (SP)</div>
        <div className="cpu-register">
          {registers.SP.toString(16).padStart(2, '0').toUpperCase()} <span className="text-gray-400 text-xs">({registers.SP})</span>
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400 mb-1">Instruction Register (IR)</div>
        <div className="cpu-register">
          {registers.IR.toString(16).padStart(2, '0').toUpperCase()} <span className="text-gray-400 text-xs">({registers.IR})</span>
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400 mb-1">Flags</div>
        <div className="cpu-register">
          <span className={registers.FLAGS & 0x02 ? "text-cpu-accent" : "text-gray-500"}>Z</span>
          <span className={registers.FLAGS & 0x01 ? "text-cpu-accent" : "text-gray-500"}>C</span>
          <span className="text-gray-400 text-xs ml-2">({registers.FLAGS})</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterBank;