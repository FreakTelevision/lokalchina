import Link from "next/link";
import { MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/shared/star-rating";
import { THEMES, DESTINATIONS } from "@/lib/constants";
import { currencySymbols, localeCurrencyMap, currencyRates } from "@/store/currency-context";

interface RouteCardProps {
  route: {
    slug: string;
    titleEn: string;
    titleZh: string;
    destination: string;
    duration: number;
    theme: string;
    difficulty: string | null;
    pricePerPerson: number;
    maxGroupSize: number;
    averageRating: number;
    reviewCount: number;
    coverImage: { url: string; altEn: string; altZh: string } | null;
  };
  locale: string;
}

export function RouteCard({ route, locale }: RouteCardProps) {
  const destination = DESTINATIONS.find((d) => d.value === route.destination);
  const theme = THEMES.find((t) => t.value === route.theme);
  const title = locale === "zh" ? route.titleZh : route.titleEn;

  return (
    <Link href={`/${locale}/routes/${route.slug}`}>
      <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {route.coverImage ? (
            <img
              src={route.coverImage.url}
              alt={locale === "zh" ? route.coverImage.altZh : route.coverImage.altEn}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <MapPin className="h-10 w-10" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {locale === "zh" ? destination?.labelZh : destination?.labelEn}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {route.duration} {locale === "zh" ? "天" : "days"}
            </span>
            {route.difficulty && (
              <span className="capitalize">
                {route.difficulty === "easy"
                  ? locale === "zh" ? "轻松" : "Easy"
                  : route.difficulty === "moderate"
                    ? locale === "zh" ? "适中" : "Moderate"
                    : locale === "zh" ? "挑战" : "Challenging"}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {locale === "zh" ? `最多${route.maxGroupSize}人` : `Max ${route.maxGroupSize}`}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <StarRating rating={route.slug === 'shanxi-black-myth-pilgrimage' || route.slug === 'yiwu-yongkang-sourcing' ? 5 : route.averageRating} size="sm" />
              <span className="text-xs text-muted-foreground">
                ({route.slug === 'shanxi-black-myth-pilgrimage' || route.slug === 'yiwu-yongkang-sourcing' ? 1 : route.reviewCount})
              </span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary">
                {(() => { const curr = localeCurrencyMap[locale] || 'USD'; const rate = currencyRates[curr] || 1; const sym = currencySymbols[curr] || '$'; const hasTieredPricing = route.slug === 'shanxi-black-myth-pilgrimage' || route.slug === 'yiwu-yongkang-sourcing'; return (hasTieredPricing ? 'From ' : '') + sym + Math.round(route.pricePerPerson * rate).toLocaleString(); })()}
              </p>
              <p className="text-xs text-muted-foreground">
                {locale === "zh" ? "/人起" : "/person"}
              </p>
            </div>
          </div>

          {theme && (
            <Badge variant="outline" className="text-xs">
              {locale === "zh" ? theme.labelZh : theme.labelEn}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
