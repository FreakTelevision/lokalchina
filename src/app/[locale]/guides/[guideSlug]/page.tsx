import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getGuideBySlug } from "@/lib/queries";
import { StarRating } from "@/components/shared/star-rating";
import { LanguageBadge } from "@/components/shared/language-badge";
import { RouteCard } from "@/components/routes/route-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Award, MessageCircle } from "lucide-react";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface GuideDetailPageProps {
  params: Promise<{ locale: string; guideSlug: string }>;
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { locale, guideSlug } = await params;
  const guide = await getGuideBySlug(guideSlug);

  if (!guide) notFound();

  const t = await getTranslations("GuideDetail");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}/guides`} className="hover:text-primary">
          {locale === "zh" ? "所有向导" : "All Guides"}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{guide.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-3xl">
                {guide.name?.charAt(0)?.toUpperCase() || "G"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{guide.name}</h1>
                {guide.isVerified && (
                  <Badge variant="secondary" className="gap-1">
                    ✓ {t("verifiedBadge")}
                  </Badge>
                )}
              </div>
              <StarRating rating={guide.averageRating} size="md" showValue className="mb-2" />
              <p className="text-sm text-muted-foreground">
                ({guide.reviewCount} reviews)
              </p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {guide.yearsExperience} {t("yearsExperience")}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {guide.regions.join(", ")}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* About */}
          <div>
            <h2 className="text-xl font-bold mb-4">{t("about")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {locale === "zh" ? guide.bioZh || guide.bio : guide.bioEn || guide.bio}
            </p>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xl font-bold mb-3">{t("languages")}</h2>
            <div className="flex flex-wrap gap-2">
              {guide.languages.map((lang: { language: string; proficiency: string }) => (
                <LanguageBadge
                  key={lang.language}
                  language={lang.language}
                  proficiency={lang.proficiency}
                />
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div>
            <h2 className="text-xl font-bold mb-3">{t("expertise")}</h2>
            <div className="flex flex-wrap gap-2">
              {guide.expertise.map((exp: string) => (
                <Badge key={exp} variant="outline">
                  {exp.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Reviews */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              {t("reviews")} ({guide.reviewCount})
            </h2>
            {guide.reviews.length === 0 ? (
              <p className="text-muted-foreground">
                {locale === "zh" ? "暂无评价" : "No reviews yet"}
              </p>
            ) : (
              <div className="space-y-4">
                {guide.reviews.map((review: { id: string; rating: number; title?: string | null; content?: string | null; user: { name: string | null; image: string | null } }) => (
                  <div key={review.id} className="p-4 rounded-xl border">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {review.user.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{review.user.name}</p>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                    </div>
                    {review.content && (
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Associated Routes */}
          {guide.routes.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="text-xl font-bold mb-4">{t("associatedRoutes")}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {guide.routes.map((route: { id: string; slug: string; titleEn: string; titleZh: string; destination: string; duration: number; theme: string; difficulty: string | null; pricePerPerson: number; maxGroupSize: number; averageRating: number; reviewCount: number; coverImage: { url: string; id: string; routeId: string; altEn: string; altZh: string; order: number; isCover: boolean } | null }) => (
                    <RouteCard key={route.id} route={route} locale={locale} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              {/* Pricing */}
              <div>
                <span className="text-3xl font-bold text-primary">
                  {CURRENCY_SYMBOL}{guide.dailyRate.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-sm"> {t("dailyRate")}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {CURRENCY_SYMBOL}{guide.hourlyRate.toLocaleString()} {t("hourlyRate")}
              </p>

              <Separator />

              {/* Quick Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {guide.yearsExperience} {t("yearsExperience")}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {guide.regions.join(", ")}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4" />
                  {guide.isVerified ? t("verifiedBadge") : locale === "zh" ? "未认证" : "Not verified"}
                </div>
              </div>

              {/* CTA Buttons */}
              <Link href={`/${locale}/booking?guide=${guide.slug}`}>
                <Button className="w-full" size="lg">
                  {t("bookThisGuide")}
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard/messages`}>
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="h-4 w-4" />
                  {t("contactGuide")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
