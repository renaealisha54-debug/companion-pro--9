import { saveAs } from "file-saver";
import { Language } from "./languages";

export function exportAsDocument(code: string, language: Language, projectName: string) {
  const header = `=== ${projectName} ===\nLanguage: ${language.name}\nExported: ${new Date().toLocaleString()}\n${"=".repeat(40)}\n\n`;
  const content = header + code;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${projectName}.txt`);
}

export function exportAsSourceFile(code: string, language: Language, projectName: string) {
  const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${projectName}${language.extension}`);
}
