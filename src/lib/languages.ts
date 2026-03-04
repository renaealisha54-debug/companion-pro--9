export type Language = {
  id: string;
  name: string;
  extension: string;
  pistonLang: string;
  pistonVersion: string;
  template: string;
};

export const LANGUAGES: Language[] = [
  {
    id: "python",
    name: "Python",
    extension: ".py",
    pistonLang: "python",
    pistonVersion: "3.10.0",
    template: '# Python\nprint("Hello, World!")\n',
  },
  {
    id: "javascript",
    name: "JavaScript",
    extension: ".js",
    pistonLang: "javascript",
    pistonVersion: "18.15.0",
    template: '// JavaScript\nconsole.log("Hello, World!");\n',
  },
  {
    id: "typescript",
    name: "TypeScript",
    extension: ".ts",
    pistonLang: "typescript",
    pistonVersion: "5.0.3",
    template: '// TypeScript\nconst greeting: string = "Hello, World!";\nconsole.log(greeting);\n',
  },
  {
    id: "java",
    name: "Java",
    extension: ".java",
    pistonLang: "java",
    pistonVersion: "15.0.2",
    template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n',
  },
  {
    id: "c",
    name: "C",
    extension: ".c",
    pistonLang: "c",
    pistonVersion: "10.2.0",
    template: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n',
  },
  {
    id: "cpp",
    name: "C++",
    extension: ".cpp",
    pistonLang: "c++",
    pistonVersion: "10.2.0",
    template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}\n',
  },
  {
    id: "json",
    name: "JSON",
    extension: ".json",
    pistonLang: "",
    pistonVersion: "",
    template: '{\n  "name": "my-app",\n  "version": "1.0.0"\n}\n',
  },
  {
    id: "gradle",
    name: "Gradle",
    extension: ".gradle",
    pistonLang: "",
    pistonVersion: "",
    template: 'plugins {\n    id "java"\n}\n\nrepositories {\n    mavenCentral()\n}\n\ndependencies {\n    implementation "com.google.guava:guava:31.1-jre"\n}\n',
  },
  {
    id: "firebase",
    name: "Firebase Rules",
    extension: ".rules",
    pistonLang: "",
    pistonVersion: "",
    template: 'rules_version = \'2\';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if request.auth != null;\n    }\n  }\n}\n',
  },
];

export function detectLanguage(code: string, filename?: string): Language {
  if (filename) {
    const ext = filename.substring(filename.lastIndexOf("."));
    const found = LANGUAGES.find((l) => l.extension === ext);
    if (found) return found;
  }
  if (code.includes("#include") && code.includes("cout")) return LANGUAGES.find((l) => l.id === "cpp")!;
  if (code.includes("#include") && code.includes("printf")) return LANGUAGES.find((l) => l.id === "c")!;
  if (code.includes("public class") || code.includes("System.out")) return LANGUAGES.find((l) => l.id === "java")!;
  if (code.includes("def ") || code.includes("print(")) return LANGUAGES.find((l) => l.id === "python")!;
  if (code.includes("console.log") || code.includes("const ") || code.includes("let ")) return LANGUAGES.find((l) => l.id === "javascript")!;
  if (code.includes("rules_version") || code.includes("firestore")) return LANGUAGES.find((l) => l.id === "firebase")!;
  return LANGUAGES[0];
}

export function getLanguageById(id: string): Language {
  return LANGUAGES.find((l) => l.id === id) || LANGUAGES[0];
}
