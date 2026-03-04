import { useState } from "react";
import { X, Layout } from "lucide-react";

interface TemplateSection {
  id: string;
  label: string;
  description: string;
  placeholder: string;
  value: string;
}

const DEFAULT_SECTIONS: TemplateSection[] = [
  { id: "imports", label: "Imports & Dependencies", description: "Import statements and package dependencies", placeholder: "import ...", value: "" },
  { id: "config", label: "Configuration", description: "App config, constants, environment variables", placeholder: "const CONFIG = { ... }", value: "" },
  { id: "models", label: "Models / Data Structures", description: "Classes, interfaces, data models", placeholder: "class User { ... }", value: "" },
  { id: "logic", label: "Business Logic", description: "Core functions and algorithms", placeholder: "function processData() { ... }", value: "" },
  { id: "ui", label: "UI / Views", description: "User interface components and layouts", placeholder: "function App() { return <div>...</div> }", value: "" },
  { id: "api", label: "API / Networking", description: "API calls, endpoints, network handlers", placeholder: "fetch('/api/data')", value: "" },
  { id: "main", label: "Main Entry Point", description: "App initialization and startup", placeholder: "app.run()", value: "" },
];

interface AppTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  onExportAll: (code: string) => void;
}

export default function AppTemplate({ isOpen, onClose, onExportAll }: AppTemplateProps) {
  const [sections, setSections] = useState<TemplateSection[]>(DEFAULT_SECTIONS);

  const updateSection = (id: string, value: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  };

  const handleExportAll = () => {
    const combined = sections
      .filter((s) => s.value.trim())
      .map((s) => `// === ${s.label.toUpperCase()} ===\n${s.value}`)
      .join("\n\n");
    onExportAll(combined);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">App Building Template</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExportAll} className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
              Combine & Use
            </button>
            <button onClick={onClose} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-border rounded-lg overflow-hidden">
              <div className="px-3 py-2 bg-secondary">
                <div className="text-xs font-semibold text-foreground">{section.label}</div>
                <div className="text-[10px] text-muted-foreground">{section.description}</div>
              </div>
              <textarea
                value={section.value}
                onChange={(e) => updateSection(section.id, e.target.value)}
                placeholder={section.placeholder}
                className="w-full p-3 bg-editor text-foreground text-xs font-mono min-h-[100px] resize-y outline-none placeholder:text-muted-foreground"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
