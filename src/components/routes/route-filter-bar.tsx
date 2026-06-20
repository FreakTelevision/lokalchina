"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { DESTINATIONS, THEMES } from "@/lib/constants";
import { useDebouncedCallback } from "use-debounce";

export function RouteFilterBar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentDest = searchParams.get("destination") || "";
  const currentTheme = searchParams.get("theme") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sort") || "price_asc";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset page on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = useDebouncedCallback(
    (value: string) => updateParams("search", value),
    300
  );

  const clearAll = () => {
    router.push(pathname);
  };

  const hasFilters = currentDest || currentTheme || currentSearch;

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={locale === "zh" ? "搜索路线..." : "Search routes..."}
          defaultValue={currentSearch}
          onChange={(e) => debouncedSearch(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Destination */}
        <Select value={currentDest} onValueChange={(v) => updateParams("destination", (v ?? "") === "all" ? "" : (v ?? ""))}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={locale === "zh" ? "目的地" : "Destination"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{locale === "zh" ? "全部目的地" : "All Destinations"}</SelectItem>
            {DESTINATIONS.map((d) => (
              <SelectItem key={d.value} value={d.value}>
                {locale === "zh" ? d.labelZh : d.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Theme */}
        <Select value={currentTheme} onValueChange={(v) => updateParams("theme", (v ?? "") === "all" ? "" : (v ?? ""))}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={locale === "zh" ? "主题" : "Theme"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{locale === "zh" ? "全部主题" : "All Themes"}</SelectItem>
            {THEMES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {locale === "zh" ? t.labelZh : t.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={currentSort} onValueChange={(v) => updateParams("sort", v ?? "price_asc")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={locale === "zh" ? "排序" : "Sort by"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">{locale === "zh" ? "价格：低到高" : "Price: Low to High"}</SelectItem>
            <SelectItem value="price_desc">{locale === "zh" ? "价格：高到低" : "Price: High to Low"}</SelectItem>
            <SelectItem value="duration_asc">{locale === "zh" ? "天数：短到长" : "Duration: Short to Long"}</SelectItem>
            <SelectItem value="duration_desc">{locale === "zh" ? "天数：长到短" : "Duration: Long to Short"}</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
            <X className="h-4 w-4 mr-1" />
            {locale === "zh" ? "清除筛选" : "Clear Filters"}
          </Button>
        )}
      </div>
    </div>
  );
}
