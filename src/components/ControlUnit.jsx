import React from 'react';

const ControlUnit = ({ ir, pc, flags }) => {
  // Add checks for undefined values
  const safeIr = ir !== undefined ? ir : 0;
  const opcode = (safeIr & 0xF0) >> 4;
  const operand = safeIr & 0x0F;
  const safePc = pc !== undefined ? pc : 0;
  
  const getOpcodeName = (code) => {
    const opcodes = {
      0: 'NOP',
      1: 'LDA',
      2: 'STA',
      3: 'ADD',
      4: 'SUB',
      5: 'LDI',
      6: 'JMP',
      7: 'JZ',
      8: 'MOV B,A',
      9: 'MOV A,B',
      15: 'HLT'
    };
    
    return opcodes[code] || `Unknown (${code})`;
  };
  
  return (
    <div className="border border-cpu-light rounded-md p-3">
      <h3 className="text-lg font-semibold mb-2">Control Unit</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-sm text-gray-400">Current Opcode</div>
          <div className="cpu-register">{getOpcodeName(opcode)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Operand</div>
          <div className="cpu-register">{operand.toString(16).toUpperCase()}</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-sm text-gray-400">Next Instruction</div>
        <div className="cpu-register">Address: {safePc.toString(16).padStart(2, '0').toUpperCase()}</div>
      </div>
    </div>
  );
};

export default ControlUnit;