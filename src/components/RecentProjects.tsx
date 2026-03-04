import { Project } from "@/hooks/useProjects";
import { getLanguageById } from "@/lib/languages";
import { FolderOpen, Trash2, Clock } from "lucide-react";

interface RecentProjectsProps {
  projects: Project[];
  onOpen: (project: Project) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecentProjects({ projects, onOpen, onDelete, isOpen, onClose }: RecentProjectsProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full mt-1 z-40 w-80 bg-popover border border-border rounded-lg shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-xs font-medium text-foreground">Recent Projects</span>
        <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground">Close</button>
      </div>
      <div className="max-h-64 overflow-auto">
        {projects.length === 0 && (
          <div className="px-3 py-4 text-xs text-muted-foreground text-center">No recent projects</div>
        )}
        {projects.map((project) => {
          const lang = getLanguageById(project.languageId);
          return (
            <div
              key={project.id}
              className="flex items-center justify-between px-3 py-2 hover:bg-secondary cursor-pointer group"
              onClick={() => { onOpen(project); onClose(); }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <FolderOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">{project.name}</div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span>{lang.name}</span>
                    <span>·</span>
                    <Clock className="w-2.5 h-2.5" />
                    <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-destructive text-muted-foreground hover:text-destructive-foreground transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
