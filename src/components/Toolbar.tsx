import {
  Play, FileDown, FileText, RotateCcw, Wrench, Upload, FolderOpen, StickyNote, Layout, RefreshCw, Terminal as TerminalIcon, ArrowRightLeft,
} from "lucide-react";
import LanguageSelector from "./LanguageSelector";

interface ToolbarProps {
  languageId: string;
  onLanguageChange: (id: string) => void;
  onRun: () => void;
  onEdit: () => void;
  onCorrect: () => void;
  onBuild: () => void;
  onExportDoc: () => void;
  onExportSource: () => void;
  onConvertLanguage: () => void;
  onUpload: () => void;
  onToggleRecentProjects: () => void;
  onToggleNotepad: () => void;
  onToggleTemplate: () => void;
  onToggleTerminal: () => void;
  onNewProject: () => void;
  isRunning: boolean;
}

function ToolbarButton({ onClick, icon: Icon, label, variant = "default", disabled = false }: {
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  variant?: "default" | "primary" | "accent" | "warning";
  disabled?: boolean;
}) {
  const variantClasses = {
    default: "bg-secondary hover:bg-border text-secondary-foreground",
    primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
    accent: "bg-accent hover:bg-accent/90 text-accent-foreground",
    warning: "bg-warning hover:bg-warning/90 text-warning-foreground",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]}`}
      title={label}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-toolbar border-b border-border overflow-x-auto">
      {/* Left section */}
      <div className="flex items-center gap-1 mr-2">
        <ToolbarButton onClick={props.onToggleRecentProjects} icon={FolderOpen} label="Recent" />
        <ToolbarButton onClick={props.onNewProject} icon={RefreshCw} label="New" />
        <ToolbarButton onClick={props.onUpload} icon={Upload} label="Upload" />
        <ToolbarButton onClick={props.onToggleTemplate} icon={Layout} label="Template" />
      </div>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Language selector */}
      <LanguageSelector value={props.languageId} onChange={props.onLanguageChange} />

      <div className="w-px h-6 bg-border mx-1" />

      {/* Code actions */}
      <div className="flex items-center gap-1">
        <ToolbarButton onClick={props.onEdit} icon={Wrench} label="Edit" />
        <ToolbarButton onClick={props.onCorrect} icon={RotateCcw} label="Correct" />
        <ToolbarButton onClick={props.onBuild} icon={Wrench} label="Build" />
        <ToolbarButton onClick={props.onRun} icon={Play} label="Run" variant="accent" disabled={props.isRunning} />
      </div>

      <div className="flex-1" />

      {/* Right section */}
      <div className="flex items-center gap-1">
        <ToolbarButton onClick={props.onToggleNotepad} icon={StickyNote} label="Notepad" variant="warning" />
        <ToolbarButton onClick={props.onToggleTerminal} icon={TerminalIcon} label="Terminal" />
        <ToolbarButton onClick={props.onConvertLanguage} icon={ArrowRightLeft} label="Convert" />
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton onClick={props.onExportDoc} icon={FileText} label="Export Doc" variant="primary" />
        <ToolbarButton onClick={props.onExportSource} icon={FileDown} label="Export Source" variant="primary" />
      </div>
    </div>
  );
}
