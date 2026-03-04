import { Language } from "./languages";

const PISTON_API = "https://emkc.org/api/v2/piston";

export interface RunResult {
  output: string;
  error: string;
  exitCode: number;
}

export async function runCode(code: string, language: Language): Promise<RunResult> {
  if (!language.pistonLang) {
    return {
      output: "",
      error: `Language "${language.name}" cannot be executed directly. It is a configuration/markup language.`,
      exitCode: 1,
    };
  }

  try {
    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: language.pistonLang,
        version: language.pistonVersion,
        files: [{ name: `main${language.extension}`, content: code }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.status}`);
    }

    const data = await response.json();
    const run = data.run || {};
    return {
      output: run.stdout || "",
      error: run.stderr || "",
      exitCode: run.code ?? 0,
    };
  } catch (err: any) {
    return {
      output: "",
      error: `Execution failed: ${err.message}`,
      exitCode: 1,
    };
  }
}
