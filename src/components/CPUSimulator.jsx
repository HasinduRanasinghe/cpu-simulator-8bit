import RegisterBank from "./RegisterBank";
import ALU from "./ALU";
import ControlUnit from "./ControlUnit";
import Memory from "./Memory";
import DataBus from "./DataBus";
import InstructionSet from "./InstructionSet";
import { useCPU } from "../context/CPUContext";

const CPUSimulator = () => {
  const { registers, memory, activeBus, memoryHighlight } = useCPU();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cpu-medium p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Register Bank</h2>
          <RegisterBank registers={registers} />
        </div>

        <div className="bg-cpu-medium p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">ALU & Control Unit</h2>
          <ALU registers={registers} />
          <div className="h-4"></div>
          <ControlUnit ir={registers.IR} flags={registers.FLAGS} />
        </div>
      </div>

      <Memory memory={memory} highlight={memoryHighlight} />
      <DataBus activeBus={activeBus} />
      <InstructionSet />
    </div>
  );
};

export default CPUSimulator;
