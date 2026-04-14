import { Cpu, GitBranch, Terminal } from "lucide-react";

export const StatusBar = () => {
  return (
    <div className="flex items-center justify-between w-full px-3 py-1 bg-[#007acc] text-white text-xs font-medium">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer">
          <GitBranch className="h-3 w-3" />
          <span>main*</span>
        </div>
        <div className="flex items-center gap-1">
          <Terminal className="h-3 w-3" />
          <span>08 Errors</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span>Ln 42, Col 12</span>
        <span>UTF-8</span>
        <div className="flex items-center gap-1">
          <Cpu className="h-3 w-3" />
          <span>TypeScript JSX</span>
        </div>
      </div>
    </div>
  );
};
