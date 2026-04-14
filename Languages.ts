import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { json } from "@codemirror/lang-json";

export const SUPPORTED_LANGUAGES = [
  { id: "javascript", label: "JavaScript", extension: javascript({ jsx: true }) },
  { id: "python", label: "Python", extension: python() },
  { id: "java", label: "Java", extension: java() },
  { id: "cpp", label: "C++", extension: cpp() },
  { id: "json", label: "JSON", extension: json() },
];

export type LanguageId = "javascript" | "python" | "java" | "cpp" | "json";
