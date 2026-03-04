import { useRef, useEffect } from "react";
import { X, Minimize2, Maximize2 } from "lucide-react";

interface TerminalLine {
  type: "stdout" | "stderr" | "info" | "command";
  text: string;
  timestamp: number;
}

interface TerminalProps {
  lines: TerminalLine[];
  onClear: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export type { TerminalLine };

export default function Terminal({ lines, onClear, isMinimized, onToggleMinimize }: TerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="flex flex-col bg-terminal border-t border-border">
      <div className="flex items-center justify-between px-3 py-1.5 bg-toolbar border-b border-border">
        <span className="text-xs font-mono text-muted-foreground">TERMINAL</span>
        <div className="flex items-center gap-1">
          <button onClick={onClear} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-3 h-3" />
          </button>
          <button onClick={onToggleMinimize} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div ref={scrollRef} className="flex-1 overflow-auto p-3 font-mono text-xs min-h-[120px] max-h-[200px]">
          {lines.length === 0 && (
            <span className="text-muted-foreground">Ready. Run your code to see output here.</span>
          )}
          {lines.map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap ${
              line.type === "stderr" ? "text-destructive" :
              line.type === "info" ? "text-info" :
              line.type === "command" ? "text-primary" :
              "text-terminal-foreground"
            }`}>
              {line.type === "command" && <span className="text-accent mr-1">$</span>}
              {line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
