"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { LANGUAGES, EXPERTISE_AREAS, REGIONS } from "@/lib/constants";
import { useDebouncedCallback } from "use-debounce";

export function GuideFilterBar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentRegion = searchParams.get("region") || "";
  const currentLang = searchParams.get("language") || "";
  const currentExpertise = searchParams.get("expertise") || "";
  const currentSearch = searchParams.get("search") || "";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = useDebouncedCallback(
    (value: string) => updateParams("search", value),
    300
  );

  const clearAll = () => router.push(pathname);
  const hasFilters = currentRegion || currentLang || currentExpertise || currentSearch;

  return (
    <div className="space-y-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={locale === "zh" ? "搜索向导..." : "Search guides..."}
          defaultValue={currentSearch}
          onChange={(e) => debouncedSearch(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Select value={currentRegion} onValueChange={(v) => updateParams("region", (v ?? "") === "all" ? "" : (v ?? ""))}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={locale === "zh" ? "地区" : "Region"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{locale === "zh" ? "全部地区" : "All Regions"}</SelectItem>
            {REGIONS.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {locale === "zh" ? r.labelZh : r.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentLang} onValueChange={(v) => updateParams("language", (v ?? "") === "all" ? "" : (v ?? ""))}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={locale === "zh" ? "语言" : "Language"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{locale === "zh" ? "全部语言" : "All Languages"}</SelectItem>
            {LANGUAGES.map((l) => (
              <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentExpertise} onValueChange={(v) => updateParams("expertise", (v ?? "") === "all" ? "" : (v ?? ""))}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={locale === "zh" ? "专长" : "Expertise"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{locale === "zh" ? "全部专长" : "All"}</SelectItem>
            {EXPERTISE_AREAS.map((e) => (
              <SelectItem key={e} value={e}>
                {e.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
            <X className="h-4 w-4 mr-1" />
            {locale === "zh" ? "清除" : "Clear"}
          </Button>
        )}
      </div>
    </div>
  );
}
