import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { StickyNote, Minus, X, Maximize2, GripHorizontal } from "lucide-react";

interface NotepadOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotepadOverlay({ isOpen, onClose }: NotepadOverlayProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [notes, setNotes] = useState("");
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ w: 350, h: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; origW: number; origH: number } | null>(null);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: position.x, origY: position.y };
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      setPosition({
        x: dragRef.current.origX + (ev.clientX - dragRef.current.startX),
        y: dragRef.current.origY + (ev.clientY - dragRef.current.startY),
      });
    };
    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [position]);

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeRef.current = { startX: e.clientX, startY: e.clientY, origW: size.w, origH: size.h };
    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      setSize({
        w: Math.max(250, resizeRef.current.origW + (ev.clientX - resizeRef.current.startX)),
        h: Math.max(200, resizeRef.current.origH + (ev.clientY - resizeRef.current.startY)),
      });
    };
    const onUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [size]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed z-50 shadow-2xl rounded-lg border border-border overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: isMinimized ? 200 : size.w,
        height: isMinimized ? "auto" : size.h,
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={onDragStart}
        className="flex items-center justify-between px-3 py-2 bg-toolbar cursor-move select-none border-b border-border"
      >
        <div className="flex items-center gap-2 text-xs font-medium text-toolbar-foreground">
          <StickyNote className="w-3.5 h-3.5 text-warning" />
          Notepad
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-0.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          </button>
          <button onClick={onClose} className="p-0.5 rounded hover:bg-destructive text-muted-foreground hover:text-destructive-foreground transition-colors">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="relative h-[calc(100%-36px)] bg-card">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Quick notes... jot down ideas, snippets, or reminders"
            className="w-full h-full p-3 bg-transparent text-foreground text-sm font-mono resize-none outline-none placeholder:text-muted-foreground"
          />
          {/* Resize handle */}
          <div
            onMouseDown={onResizeStart}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <GripHorizontal className="w-3 h-3 rotate-[-45deg]" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
