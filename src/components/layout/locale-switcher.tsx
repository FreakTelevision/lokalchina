"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const locales = ["en", "fr", "de", "nl"];
const labels: Record<string, string> = { en: "EN", fr: "FR", de: "DE", nl: "NL" };

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const idx = locales.indexOf(locale);
    const newLocale = locales[(idx + 1) % locales.length];
    const segments = pathname.split("/").filter(Boolean);
    if (locales.includes(segments[0])) {
      segments[0] = newLocale;
    }
    router.push("/" + segments.join("/"));
  };

  return (
    <Button variant="ghost" size="sm" onClick={switchLocale} className="gap-1.5">
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline text-xs font-medium">
        {labels[locale] || "EN"}
      </span>
    </Button>
  );
}
