import { useState, useEffect } from 'react';
import RegisterBank from './components/RegisterBank';
import ALU from './components/ALU';
import ControlUnit from './components/ControlUnit';
import Memory from './components/Memory';
import DataBus from './components/DataBus';
import InstructionSet from './components/InstructionSet';

function App() {
  // CPU state
  const [registers, setRegisters] = useState({
    A: 0, // Accumulator
    B: 0, // General purpose
    C: 0, // General purpose
    D: 0, // General purpose
    PC: 0, // Program Counter
    SP: 255, // Stack Pointer
    IR: 0, // Instruction Register
    FLAGS: 0, // Status flags (Zero, Carry, etc.)
  });
  
  const [memory, setMemory] = useState(Array(256).fill(0));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500); // ms between cycles
  const [activeBus, setActiveBus] = useState(null);
  const [cycle, setCycle] = useState(0);
  const [memoryHighlight, setMemoryHighlight] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev.slice(-9), message]);
  };

  // Instruction execution logic
  const executeInstruction = () => {
    // Fetch cycle
    const instructionAddress = registers.PC;
    setMemoryHighlight(instructionAddress);
    const instruction = memory[instructionAddress];
    
    // Highlight memory to register bus
    setActiveBus('memory-to-ir');
    
    setTimeout(() => {
      // Decode cycle
      setRegisters(prev => ({ ...prev, IR: instruction, PC: prev.PC + 1 }));
      setActiveBus('ir-to-cu');
      
      setTimeout(() => {
        // Execute cycle
        setActiveBus(null);
        
        // Opcode is in high 4 bits, operand is in low 4 bits
        const opcode = (instruction & 0xF0) >> 4;
        const operand = instruction & 0x0F;
        
        // Execute based on opcode
        switch (opcode) {
          case 0: // NOP
            addLog(`[${cycle}] NOP - No operation`);
            break;
            
          case 1: // LDA - Load value to A from memory address
            const loadAddress = operand;
            setMemoryHighlight(loadAddress);
            addLog(`[${cycle}] LDA ${loadAddress} - Load value from address ${loadAddress} to A`);
            
            setActiveBus('memory-to-a');
            setTimeout(() => {
              setRegisters(prev => ({ ...prev, A: memory[loadAddress] }));
              setActiveBus(null);
            }, speed / 2);
            break;
            
          case 2: // STA - Store A to memory
            const storeAddress = operand;
            setMemoryHighlight(storeAddress);
            addLog(`[${cycle}] STA ${storeAddress} - Store value from A to address ${storeAddress}`);
            
            setActiveBus('a-to-memory');
            setTimeout(() => {
              setMemory(prev => {
                const newMem = [...prev];
                newMem[storeAddress] = registers.A;
                return newMem;
              });
              setActiveBus(null);
            }, speed / 2);
            break;
            
          case 3: // ADD - Add B to A
            addLog(`[${cycle}] ADD B - Add B to A`);
            
            setActiveBus('b-to-alu');
            setTimeout(() => {
              setActiveBus('alu-to-a');
              setTimeout(() => {
                const result = (registers.A + registers.B) & 0xFF; // 8-bit constraint
                const carryFlag = registers.A + registers.B > 255 ? 1 : 0;
                const zeroFlag = result === 0 ? 1 : 0;
                setRegisters(prev => ({ 
                  ...prev, 
                  A: result,
                  FLAGS: (zeroFlag << 1) | carryFlag // Set flags
                }));
                setActiveBus(null);
              }, speed / 2);
            }, speed / 2);
            break;
            
          case 4: // SUB - Subtract B from A
            addLog(`[${cycle}] SUB B - Subtract B from A`);
            
            setActiveBus('b-to-alu');
            setTimeout(() => {
              setActiveBus('alu-to-a');
              setTimeout(() => {
                const rawResult = registers.A - registers.B;
                const result = (rawResult < 0) ? (rawResult + 256) & 0xFF : rawResult;
                const carryFlag = rawResult < 0 ? 1 : 0;
                const zeroFlag = result === 0 ? 1 : 0;
                setRegisters(prev => ({ 
                  ...prev, 
                  A: result,
                  FLAGS: (zeroFlag << 1) | carryFlag
                }));
                setActiveBus(null);
              }, speed / 2);
            }, speed / 2);
            break;
            
          case 5: // LDI - Load immediate value to A
            addLog(`[${cycle}] LDI ${operand} - Load immediate value ${operand} to A`);
            
            setActiveBus('cu-to-a');
            setTimeout(() => {
              setRegisters(prev => ({ ...prev, A: operand }));
              setActiveBus(null);
            }, speed / 2);
            break;
            
          case 6: // JMP - Jump to address
            addLog(`[${cycle}] JMP ${operand} - Jump to address ${operand}`);
            
            setActiveBus('cu-to-pc');
            setTimeout(() => {
              setRegisters(prev => ({ ...prev, PC: operand }));
              setActiveBus(null);
            }, speed / 2);
            break;
            
          case 7: // JZ - Jump if zero flag is set
            if ((registers.FLAGS & 0x02) !== 0) {
              addLog(`[${cycle}] JZ ${operand} - Jump to ${operand} (Zero flag is set)`);
              setActiveBus('cu-to-pc');
              setTimeout(() => {
                setRegisters(prev => ({ ...prev, PC: operand }));
                setActiveBus(null);
              }, speed / 2);
            } else {
              addLog(`[${cycle}] JZ ${operand} - Not jumping (Zero flag is not set)`);
            }
            break;
            
          case 8: // MOV B,A - Move A to B
            addLog(`[${cycle}] MOV B,A - Move value from A to B`);
            
            setActiveBus('a-to-b');
            setTimeout(() => {
              setRegisters(prev => ({ ...prev, B: prev.A }));
              setActiveBus(null);
            }, speed / 2);
            break;
            
          case 9: // MOV A,B - Move B to A
            addLog(`[${cycle}] MOV A,B - Move value from B to A`);
            
            setActiveBus('b-to-a');
            setTimeout(() => {
              setRegisters(prev => ({ ...prev, A: prev.B }));
              setActiveBus(null);
            }, speed / 2);
            break;
            
          case 15: // HLT - Halt execution
            addLog(`[${cycle}] HLT - Halting execution`);
            setRunning(false);
            break;
            
          default:
            addLog(`[${cycle}] Unknown opcode: ${opcode}`);
            break;
        }
        
        // Update cycle counter
        setCycle(prev => prev + 1);
      }, speed / 2);
    }, speed / 2);
  };

  // Auto-run effect
  useEffect(() => {
    let timer = null;
    
    if (running) {
      timer = setTimeout(executeInstruction, speed);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [running, registers.PC, cycle]);

  // Load a sample program
  const loadSampleProgram = () => {
    const sampleProgram = [
      0x50, // LDI 0 - Load 0 into A
      0x80, // MOV B,A - Move A to B
      0x53, // LDI 3 - Load 3 into A
      0x30, // ADD B - Add B (0) to A (3) = 3
      0x80, // MOV B,A - Move A (3) to B
      0x54, // LDI 4 - Load 4 into A
      0x30, // ADD B - Add B (3) to A (4) = 7
      0x20, // STA 0 - Store A (7) to memory address 0
      0x10, // LDA 0 - Load from memory address 0 to A
      0x40, // SUB B - Subtract B (3) from A (7) = 4
      0x21, // STA 1 - Store A (4) to memory address 1
      0x60, // JMP 0 - Jump to beginning (infinite loop)
      0xF0, // HLT - Halt (unreachable due to jump)
    ];
    
    // Reset CPU state
    setRegisters({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      PC: 0,
      SP: 255,
      IR: 0,
      FLAGS: 0,
    });
    
    // Load program into memory
    const newMemory = Array(256).fill(0);
    sampleProgram.forEach((value, index) => {
      newMemory[index] = value;
    });
    
    setMemory(newMemory);
    setCycle(0);
    setLogs([]);
    setActiveBus(null);
    setMemoryHighlight(null);
    addLog("Sample program loaded");
  };

  // Load counter program
  const loadCounterProgram = () => {
    const counterProgram = [
      0x50, // LDI 0 - Load 0 into A (counter start)
      0x20, // STA 0 - Store A to memory[0] (counter variable)
      0x10, // LDA 0 - Load counter from memory[0] to A
      0x51, // LDI 1 - Load 1 into A
      0x80, // MOV B,A - Move A (1) to B
      0x10, // LDA 0 - Load counter from memory[0] to A
      0x30, // ADD B - Add B (1) to A (counter)
      0x20, // STA 0 - Store A back to memory[0]
      0x62, // JMP 2 - Jump to instruction at 2 (loop)
    ];
    
    // Reset CPU state
    setRegisters({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      PC: 0,
      SP: 255,
      IR: 0,
      FLAGS: 0,
    });
    
    // Load program into memory
    const newMemory = Array(256).fill(0);
    counterProgram.forEach((value, index) => {
      newMemory[index] = value;
    });
    
    setMemory(newMemory);
    setCycle(0);
    setLogs([]);
    setActiveBus(null);
    setMemoryHighlight(null);
    addLog("Counter program loaded");
  };
  
  return (
    <div className="min-h-screen p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-cpu-accent mb-2">8-Bit CPU Simulator</h1>
        <p className="text-lg">Explore how a basic CPU works with this interactive simulator</p>
      </header>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            className="cpu-btn" 
            onClick={() => setRunning(!running)}
          >
            {running ? 'Pause' : 'Run'}
          </button>
          <button 
            className="cpu-btn" 
            onClick={() => {
              if (!running) executeInstruction();
            }}
            disabled={running}
          >
            Step
          </button>
          <button 
            className="cpu-btn" 
            onClick={loadSampleProgram}
            disabled={running}
          >
            Load Sample Program
          </button>
          <button 
            className="cpu-btn" 
            onClick={loadCounterProgram}
            disabled={running}
          >
            Load Counter
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="speed">Clock Speed:</label>
            <input 
              id="speed" 
              type="range" 
              min="100" 
              max="2000" 
              step="100" 
              value={speed} 
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-32"
            />
            <span>{(1000 / speed).toFixed(1)} Hz</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {/* CPU Components */}
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cpu-medium p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Register Bank</h2>
              <RegisterBank registers={registers} />
            </div>
            
            <div className="bg-cpu-medium p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">ALU & Control Unit</h2>
              <ALU registers={registers} />
              <div className="h-4"></div>
              <ControlUnit 
                ir={registers.IR} 
                pc={registers.PC} 
                flags={registers.FLAGS} 
              />
            </div>
            
            <div className="md:col-span-2 bg-cpu-medium p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Memory (First 32 Bytes)</h2>
              <Memory 
                memory={memory.slice(0, 32)} 
                highlight={memoryHighlight < 32 ? memoryHighlight : null} 
                baseAddress={0}
              />
            </div>
            
            <div className="md:col-span-2 bg-cpu-medium p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Execution Log</h2>
              <div className="bg-cpu-dark rounded p-2 overflow-y-auto font-mono text-sm">
                {logs.length === 0 ? (
                  <p className="text-gray-400">Execution log will appear here...</p>
                ) : (
                  logs.map((log, i) => <div key={i} className="mb-1">{log}</div>)
                )}
              </div>
            </div>
          </div>
          
          {/* Instruction Set Reference */}
          <div className="col-span-2 bg-cpu-medium p-4 rounded-lg shadow-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Instruction Set</h2>
            <InstructionSet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;