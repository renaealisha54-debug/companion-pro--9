import { useState, useCallback } from "react";

export interface Project {
  id: string;
  name: string;
  languageId: string;
  code: string;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "codeforge-projects";

function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(loadProjects);

  const addProject = useCallback((project: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setProjects((prev) => {
      const updated = [newProject, ...prev];
      saveProjects(updated);
      return updated;
    });
    return newProject;
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Pick<Project, "name" | "code" | "languageId">>) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p
      );
      saveProjects(updated);
      return updated;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveProjects(updated);
      return updated;
    });
  }, []);

  return { projects, addProject, updateProject, deleteProject };
}
