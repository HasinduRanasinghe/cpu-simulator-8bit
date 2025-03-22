import React from 'react';

const InstructionSet = () => {
  const instructions = [
    { opcode: '0x00', mnemonic: 'NOP', description: 'No operation' },
    { opcode: '0x1x', mnemonic: 'LDA x', description: 'Load value from memory[x] to A' },
    { opcode: '0x2x', mnemonic: 'STA x', description: 'Store A to memory[x]' },
    { opcode: '0x30', mnemonic: 'ADD B', description: 'Add B to A' },
    { opcode: '0x40', mnemonic: 'SUB B', description: 'Subtract B from A' },
    { opcode: '0x5x', mnemonic: 'LDI x', description: 'Load immediate value x to A' },
    { opcode: '0x6x', mnemonic: 'JMP x', description: 'Jump to address x' },
    { opcode: '0x7x', mnemonic: 'JZ x', description: 'Jump to x if zero flag is set' },
    { opcode: '0x80', mnemonic: 'MOV B,A', description: 'Copy A to B' },
    { opcode: '0x90', mnemonic: 'MOV A,B', description: 'Copy B to A' },
    { opcode: '0xFx', mnemonic: 'HLT', description: 'Halt execution' },
  ];

  return (
    <div className="overflow-hidden">
      <div className="overflow-y-auto pr-2">
        <table className="w-full">
          <thead className="border-b border-cpu-light">
            <tr>
              <th className="text-left py-2">Opcode</th>
              <th className="text-left py-2">Instruction</th>
              <th className="text-left py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {instructions.map((instr, index) => (
              <tr key={index} className="border-b border-cpu-dark">
                <td className="py-2 font-mono">{instr.opcode}</td>
                <td className="py-2 font-mono">{instr.mnemonic}</td>
                <td className="py-2 text-sm">{instr.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">CPU Stages</h3>
          <ol className="list-decimal pl-5">
            <li className="mb-2">
              <span className="font-semibold">Fetch:</span> Read the instruction from memory at the address in PC
            </li>
            <li className="mb-2">
              <span className="font-semibold">Decode:</span> Figure out what the instruction means
            </li>
            <li className="mb-2">
              <span className="font-semibold">Execute:</span> Perform the operation (arithmetic, load/store, etc.)
            </li>
            <li className="mb-2">
              <span className="font-semibold">Update PC:</span> Move to the next instruction (or jump)
            </li>
          </ol>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Flags</h3>
          <ul className="list-disc pl-5">
            <li className="mb-2">
              <span className="font-semibold">Z (Zero):</span> Set when the result of an operation is zero
            </li>
            <li className="mb-2">
              <span className="font-semibold">C (Carry):</span> Set when an operation results in a carry or borrow
            </li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">About This Simulator</h3>
          <p className="text-sm">
            This 8-bit CPU simulator demonstrates the fundamental concepts of how a processor works.
            It features a simplified instruction set, register bank, memory, and executes instructions
            in the classic fetch-decode-execute cycle. The visualization shows data flow between components
            and provides a real-time view of the CPU's internal state.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructionSet;