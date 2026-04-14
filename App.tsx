import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

// Import your new components
import { WorkspaceLayout } from "./components/WorkspaceLayout";
import { Previewer } from "./components/Previewer";
import { ChatSidebar } from "./components/ChatSidebar";
import { StatusBar } from "./components/Status-Bar";
import { ActionBar } from "./components/Action-Bar";
import { LanguageSelector } from "./components/LanguageSelector";
import { SUPPORTED_LANGUAGES, LanguageId } from "./lib/languages";

export default function App() {
  const [lang, setLang] = useState<LanguageId>("javascript");
  const [code, setCode] = useState("// Welcome to Code Companion Pro\nconsole.log('Hello World');");

  // Get current language extension
  const activeExtension = SUPPORTED_LANGUAGES.find((l) => l.id === lang)?.extension || [];

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Top Header Area */}
      <header className="flex items-center justify-between px-4 py-2 border-b bg-card/50 backdrop-blur">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-bold tracking-tighter text-primary uppercase">Accio Pro</h1>
          <LanguageSelector value={lang} onChange={(val) => setLang(val as LanguageId)} />
        </div>
        <ActionBar onSave={() => console.log("Saving...")} />
      </header>

      {/* Main Workspace */}
      <main className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Panel 1: The Editor */}
          <Panel defaultSize={40} minSize={20}>
            <CodeMirror
              value={code}
              height="100%"
              theme={oneDark}
              extensions={[activeExtension]}
              onChange={(value) => setCode(value)}
              className="h-full text-[14px]"
            />
          </Panel>

          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/40 transition-colors" />

          {/* Panel 2: Live Preview */}
          <Panel defaultSize={35} minSize={20}>
            <Previewer code={code} language={lang} />
          </Panel>

          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/40 transition-colors" />

          {/* Panel 3: AI Companion */}
          <Panel defaultSize={25} minSize={15}>
            <ChatSidebar activeCode={code} />
          </Panel>
        </PanelGroup>
      </main>

      {/* Bottom Bar */}
      <StatusBar lang={lang} charCount={code.length} />
    </div>
  );
}
