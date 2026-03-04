import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import CodeEditor from "@/components/CodeEditor";
import Terminal, { TerminalLine } from "@/components/Terminal";
import Toolbar from "@/components/Toolbar";
import NotepadOverlay from "@/components/NotepadOverlay";
import RecentProjects from "@/components/RecentProjects";
import AppTemplate from "@/components/AppTemplate";
import ConvertLanguageModal from "@/components/ConvertLanguageModal";
import { useProjects, Project } from "@/hooks/useProjects";
import { LANGUAGES, getLanguageById, detectLanguage } from "@/lib/languages";
import { runCode, RunResult } from "@/lib/codeRunner";
import { exportAsDocument, exportAsSourceFile } from "@/lib/exportCode";
import { Code2 } from "lucide-react";

export default function Index() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();

  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState("python");
  const [projectName, setProjectName] = useState("untitled");

  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const [showNotepad, setShowNotepad] = useState(false);
  const [showRecentProjects, setShowRecentProjects] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showConvert, setShowConvert] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addTerminalLine = useCallback((type: TerminalLine["type"], text: string) => {
    setTerminalLines((prev) => [...prev, { type, text, timestamp: Date.now() }]);
  }, []);

  const handleRun = useCallback(async () => {
    if (!code.trim()) { toast.error("No code to run"); return; }
    const lang = getLanguageById(languageId);
    setIsRunning(true);
    setShowTerminal(true);
    setIsTerminalMinimized(false);
    addTerminalLine("command", `run ${lang.name.toLowerCase()} main${lang.extension}`);
    addTerminalLine("info", `Executing ${lang.name} code...`);

    const result = await runCode(code, lang);
    if (result.output) addTerminalLine("stdout", result.output);
    if (result.error) addTerminalLine("stderr", result.error);
    addTerminalLine("info", `Process exited with code ${result.exitCode}`);
    setIsRunning(false);
  }, [code, languageId, addTerminalLine]);

  const handleEdit = () => toast.info("Edit mode active — modify code in the editor above.");
  const handleCorrect = () => {
    addTerminalLine("info", "Code correction requires AI integration. Enable Lovable Cloud to activate this feature.");
    toast.info("Code correction requires AI — enable Lovable Cloud for this feature.");
  };
  const handleBuild = () => {
    addTerminalLine("command", "build");
    addTerminalLine("info", `Building ${getLanguageById(languageId).name} project...`);
    addTerminalLine("info", "Build simulation complete. For real compilation, connect a build service.");
    toast.success("Build simulation complete");
  };

  const handleExportDoc = () => {
    if (!code.trim()) { toast.error("No code to export"); return; }
    exportAsDocument(code, getLanguageById(languageId), projectName);
    toast.success("Exported as document");
  };

  const handleExportSource = () => {
    if (!code.trim()) { toast.error("No code to export"); return; }
    exportAsSourceFile(code, getLanguageById(languageId), projectName);
    toast.success("Exported as source file");
  };

  const handleConvert = (targetLangId: string) => {
    const from = getLanguageById(languageId);
    const to = getLanguageById(targetLangId);
    const header = `// Converted from ${from.name} to ${to.name}\n// TODO: Manually verify and adapt this code\n\n`;
    setCode(header + `// Original ${from.name} code:\n// ` + code.split("\n").join("\n// ") + "\n\n" + to.template);
    setLanguageId(targetLangId);
    toast.success(`Code structure converted to ${to.name}`);
  };

  const handleUpload = () => fileInputRef.current?.click();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      setCode(content);
      const detected = detectLanguage(content, file.name);
      setLanguageId(detected.id);
      setProjectName(file.name.replace(/\.[^.]+$/, ""));
      toast.success(`Loaded ${file.name} (${detected.name})`);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleNewProject = () => {
    if (code.trim() && currentProject) {
      updateProject(currentProject.id, { code, languageId });
    } else if (code.trim()) {
      addProject({ name: projectName, languageId, code });
    }
    setCode("");
    setLanguageId("python");
    setProjectName("untitled");
    setCurrentProject(null);
    setTerminalLines([]);
    toast.success("New project created");
  };

  const handleOpenProject = (project: Project) => {
    setCode(project.code);
    setLanguageId(project.languageId);
    setProjectName(project.name);
    setCurrentProject(project);
    toast.success(`Opened "${project.name}"`);
  };

  const handleSave = useCallback(() => {
    if (currentProject) {
      updateProject(currentProject.id, { code, languageId, name: projectName });
      toast.success("Project saved");
    } else if (code.trim()) {
      const p = addProject({ name: projectName, languageId, code });
      setCurrentProject(p);
      toast.success("Project saved");
    }
  }, [currentProject, code, languageId, projectName, updateProject, addProject]);

  const handleTemplateExport = (combinedCode: string) => {
    setCode(combinedCode);
    setShowTemplate(false);
    toast.success("Template code loaded into editor");
  };

  const handleCodeChange = (val: string) => {
    setCode(val);
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-toolbar border-b border-border">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold text-foreground tracking-tight">CodeForge</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-secondary text-foreground text-xs px-2 py-1 rounded border border-border outline-none focus:ring-1 focus:ring-primary w-40"
            placeholder="Project name"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-medium"
          >
            Save
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="relative">
        <Toolbar
          languageId={languageId}
          onLanguageChange={setLanguageId}
          onRun={handleRun}
          onEdit={handleEdit}
          onCorrect={handleCorrect}
          onBuild={handleBuild}
          onExportDoc={handleExportDoc}
          onExportSource={handleExportSource}
          onConvertLanguage={() => setShowConvert(true)}
          onUpload={handleUpload}
          onToggleRecentProjects={() => setShowRecentProjects(!showRecentProjects)}
          onToggleNotepad={() => setShowNotepad(!showNotepad)}
          onToggleTemplate={() => setShowTemplate(true)}
          onToggleTerminal={() => setShowTerminal(!showTerminal)}
          onNewProject={handleNewProject}
          isRunning={isRunning}
        />
        <RecentProjects
          projects={projects}
          onOpen={handleOpenProject}
          onDelete={deleteProject}
          isOpen={showRecentProjects}
          onClose={() => setShowRecentProjects(false)}
        />
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <CodeEditor
          value={code}
          onChange={handleCodeChange}
          languageId={languageId}
          height="100%"
        />
      </div>

      {/* Terminal */}
      {showTerminal && (
        <Terminal
          lines={terminalLines}
          onClear={() => setTerminalLines([])}
          isMinimized={isTerminalMinimized}
          onToggleMinimize={() => setIsTerminalMinimized(!isTerminalMinimized)}
        />
      )}

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} accept=".py,.js,.ts,.java,.c,.cpp,.json,.gradle,.rules,.txt,.jsx,.tsx" />

      {/* Overlays */}
      <NotepadOverlay isOpen={showNotepad} onClose={() => setShowNotepad(false)} />
      <AppTemplate isOpen={showTemplate} onClose={() => setShowTemplate(false)} onExportAll={handleTemplateExport} />
      <ConvertLanguageModal isOpen={showConvert} onClose={() => setShowConvert(false)} currentLanguageId={languageId} onConvert={handleConvert} />
    </div>
  );
}
