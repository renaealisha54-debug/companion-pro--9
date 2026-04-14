import { Button } from "@/components/ui/button";
import { Sparkles, Code2, Eraser, Play } from "lucide-react";

export const ActionBar = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-background/80 backdrop-blur-md border rounded-full shadow-2xl">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Sparkles className="h-5 w-5 text-blue-500" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button variant="secondary" className="gap-2 rounded-full">
        <Code2 className="h-4 w-4" />
        Explain Code
      </Button>
      <Button variant="secondary" className="gap-2 rounded-full">
        <Eraser className="h-4 w-4" />
        Fix Bugs
      </Button>
      <Button size="icon" className="rounded-full bg-primary shadow-lg">
        <Play className="h-4 w-4 fill-current" />
      </Button>
    </div>
  );
};
