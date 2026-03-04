import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { useMemo } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  languageId: string;
  height?: string;
}

function getExtensions(languageId: string) {
  switch (languageId) {
    case "python": return [python()];
    case "java": return [java()];
    case "c":
    case "cpp": return [cpp()];
    case "javascript": return [javascript()];
    case "typescript": return [javascript({ typescript: true })];
    case "json": return [json()];
    case "gradle": return [java()];
    case "firebase": return [javascript()];
    default: return [];
  }
}

export default function CodeEditor({ value, onChange, languageId, height = "100%" }: CodeEditorProps) {
  const extensions = useMemo(() => getExtensions(languageId), [languageId]);

  return (
    <CodeMirror
      value={value}
      height={height}
      theme={oneDark}
      extensions={extensions}
      onChange={onChange}
      className="h-full text-sm"
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightActiveLine: true,
        foldGutter: true,
        autocompletion: true,
        bracketMatching: true,
        closeBrackets: true,
        indentOnInput: true,
      }}
    />
  );
}
