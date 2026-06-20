import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarRating } from "@/components/shared/star-rating";
import { LanguageBadge } from "@/components/shared/language-badge";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import { MapPin } from "lucide-react";

interface GuideCardProps {
  guide: {
    slug: string;
    name: string | null;
    image: string | null;
    bioEn?: string | null;
    bioZh?: string | null;
    yearsExperience: number;
    dailyRate: number;
    isVerified: boolean;
    averageRating: number;
    reviewCount: number;
    languages: { language: string; proficiency: string }[];
    expertise: string[];
    regions: string[];
  };
  locale: string;
}

export function GuideCard({ guide, locale }: GuideCardProps) {
  const bio = locale === "zh" ? guide.bioZh : guide.bioEn;

  return (
    <Link href={`/${locale}/guides/${guide.slug}`}>
      <Card className="group h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-lg">
                {guide.name?.charAt(0)?.toUpperCase() || "G"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                  {guide.name}
                </h3>
                {guide.isVerified && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    ✓
                  </Badge>
                )}
              </div>
              <StarRating rating={guide.averageRating} size="sm" className="mt-0.5" />
              <p className="text-xs text-muted-foreground mt-0.5">
                {guide.yearsExperience} {locale === "zh" ? "年经验" : "yrs exp"} · {guide.reviewCount} reviews
              </p>
            </div>
          </div>

          {/* Bio preview */}
          {bio && (
            <p className="text-sm text-muted-foreground line-clamp-2">{bio}</p>
          )}

          {/* Languages */}
          <div className="flex flex-wrap gap-1">
            {guide.languages.slice(0, 3).map((lang) => (
              <LanguageBadge
                key={lang.language}
                language={lang.language}
                proficiency={lang.proficiency}
              />
            ))}
            {guide.languages.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{guide.languages.length - 3}
              </Badge>
            )}
          </div>

          {/* Regions */}
          {guide.regions.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {guide.regions.join(", ")}
            </div>
          )}

          {/* Price */}
          <div className="flex justify-between items-center pt-2 border-t">
            <div>
              <span className="text-lg font-bold text-primary">
                {CURRENCY_SYMBOL}{guide.dailyRate.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">
                {locale === "zh" ? "/天" : "/day"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
