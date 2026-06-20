import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getRoutes } from "@/lib/queries";
import { RouteCard } from "@/components/routes/route-card";
import { RouteFilterBar } from "@/components/routes/route-filter-bar";
import { Pagination } from "@/components/shared/pagination";
import { RoutesPagination } from "./pagination-wrapper";
import { EmptyState } from "@/components/shared/empty-state";
import { SearchX } from "lucide-react";

interface RoutesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RoutesPage({
  params,
  searchParams: searchParamsPromise,
}: RoutesPageProps) {
  const { locale } = await params;
  const sp = await searchParamsPromise;
  const t = await getTranslations("RouteListing");

  const destination = typeof sp.destination === "string" ? sp.destination : undefined;
  const theme = typeof sp.theme === "string" ? sp.theme : undefined;
  const search = typeof sp.search === "string" ? sp.search : undefined;
  const sort = (typeof sp.sort === "string" ? sp.sort : "price_asc") as
    | "price_asc"
    | "price_desc"
    | "duration_asc"
    | "duration_desc";
  const page = typeof sp.page === "string" ? parseInt(sp.page) || 1 : 1;

  const data = await getRoutes({
    destination,
    theme,
    search,
    sort,
    page,
    pageSize: 12,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">
          {data.totalCount} {locale === "zh" ? "条路线" : "routes found"}
        </p>
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-24 animate-pulse bg-muted rounded-lg" />}>
        <RouteFilterBar />
      </Suspense>

      {/* Results */}
      {data.routes.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={locale === "zh" ? "未找到路线" : "No routes found"}
          description={
            locale === "zh"
              ? "尝试调整筛选条件，或清除筛选查看全部路线。"
              : "Try adjusting your filters, or clear all filters to see all routes."
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.routes.map((route) => (
              <RouteCard key={route.id} route={route} locale={locale} />
            ))}
          </div>

          <RoutesPagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
          />
        </>
      )}
    </div>
  );
}
