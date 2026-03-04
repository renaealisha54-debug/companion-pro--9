import { LANGUAGES, Language } from "@/lib/languages";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  value: string;
  onChange: (id: string) => void;
}

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[160px] h-8 text-xs bg-secondary border-border">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.id} value={lang.id} className="text-xs">
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
