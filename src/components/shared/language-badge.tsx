import { Badge } from "@/components/ui/badge";
import { LANGUAGES } from "@/lib/constants";

interface LanguageBadgeProps {
  language: string;
  proficiency?: string;
}

export function LanguageBadge({ language, proficiency }: LanguageBadgeProps) {
  const lang = LANGUAGES.find((l) => l.value === language);
  const label = lang?.label || language.toUpperCase();

  return (
    <Badge variant="secondary" className="text-xs">
      {label}
      {proficiency && proficiency !== "native" && (
        <span className="ml-1 opacity-60">
          ({proficiency === "fluent" ? "Fluent" : "Conv."})
        </span>
      )}
    </Badge>
  );
}
