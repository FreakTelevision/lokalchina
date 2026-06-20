import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getGuides } from "@/lib/queries";
import { GuideCard } from "@/components/guides/guide-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Users } from "lucide-react";

// Client-side filter bar (same pattern as routes)
import { GuideFilterBar } from "./filter-wrapper";

interface GuidesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GuidesPage({
  params,
  searchParams: searchParamsPromise,
}: GuidesPageProps) {
  const { locale } = await params;
  const sp = await searchParamsPromise;
  const t = await getTranslations("GuideListing");

  const region = typeof sp.region === "string" ? sp.region : undefined;
  const language = typeof sp.language === "string" ? sp.language : undefined;
  const expertise = typeof sp.expertise === "string" ? sp.expertise : undefined;
  const search = typeof sp.search === "string" ? sp.search : undefined;
  const page = typeof sp.page === "string" ? parseInt(sp.page) || 1 : 1;

  const data = await getGuides({
    region,
    language,
    expertise,
    search,
    page,
    pageSize: 12,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">
          {data.totalCount} {locale === "zh" ? "位向导" : "guides"}
        </p>
      </div>

      <Suspense fallback={<div className="h-24 animate-pulse bg-muted rounded-lg" />}>
        <GuideFilterBar />
      </Suspense>

      {data.guides.length === 0 ? (
        <EmptyState
          icon={Users}
          title={locale === "zh" ? "未找到向导" : "No guides found"}
          description={
            locale === "zh"
              ? "尝试调整筛选条件。"
              : "Try adjusting your filters."
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
