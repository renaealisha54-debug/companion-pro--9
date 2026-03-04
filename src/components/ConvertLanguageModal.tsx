import { useState } from "react";
import { LANGUAGES } from "@/lib/languages";
import { X, ArrowRightLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConvertLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguageId: string;
  onConvert: (targetLanguageId: string) => void;
}

export default function ConvertLanguageModal({ isOpen, onClose, currentLanguageId, onConvert }: ConvertLanguageModalProps) {
  const [targetLang, setTargetLang] = useState("");

  if (!isOpen) return null;

  const currentLang = LANGUAGES.find((l) => l.id === currentLanguageId);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Convert Language</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-secondary text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Convert code from <span className="text-foreground font-medium">{currentLang?.name}</span> to another language.
          Note: This creates a structural template — manual review is recommended.
        </p>
        <Select value={targetLang} onValueChange={setTargetLang}>
          <SelectTrigger className="w-full bg-secondary border-border">
            <SelectValue placeholder="Select target language" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {LANGUAGES.filter((l) => l.id !== currentLanguageId).map((lang) => (
              <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground hover:bg-border">Cancel</button>
          <button
            onClick={() => { onConvert(targetLang); onClose(); }}
            disabled={!targetLang}
            className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}
