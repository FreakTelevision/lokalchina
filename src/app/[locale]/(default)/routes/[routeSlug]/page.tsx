import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getRouteBySlug } from "@/lib/queries";
import { RouteGallery } from "@/components/routes/route-gallery";
import ShanxiRouteHero from "@/components/routes/ShanxiRouteHero";
import ShanxiBookingSidebar from "@/components/routes/ShanxiBookingSidebar";
import { RouteItinerary } from "@/components/routes/route-itinerary";
import { RoutePricing } from "@/components/routes/route-pricing";
import { StarRating } from "@/components/shared/star-rating";
import { Star, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { DESTINATIONS, THEMES } from "@/lib/constants";
import { MapPin, Clock, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

interface RouteDetailPageProps {
  params: Promise<{ locale: string; routeSlug: string }>;
}

export default async function RouteDetailPage({ params }: RouteDetailPageProps) {
  const { locale, routeSlug } = await params;
  const route = await getRouteBySlug(routeSlug);

  if (!route) notFound();

  const isShanxi = routeSlug === "shanxi-black-myth-pilgrimage";
  const destination = DESTINATIONS.find((d) => d.value === route.destination);
  const theme = THEMES.find((t) => t.value === route.theme);
  const t = await getTranslations("RouteDetail");

  const difficultyLabel = {
    easy: locale === "zh" ? "轻松" : "Easy",
    moderate: locale === "zh" ? "适中" : "Moderate",
    challenging: locale === "zh" ? "挑战" : "Challenging",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb-like nav */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}/routes`} className="hover:text-primary">
          {locale === "zh" ? "所有路线" : "All Routes"}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">
          {locale === "zh" ? route.titleZh : route.titleEn}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          {isShanxi ? (
            <ShanxiRouteHero />
          ) : (
            <RouteGallery images={route.images} locale={locale} />
          )}

          {/* Title & Meta */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3 items-center">
              {destination && (
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {locale === "zh" ? destination.labelZh : destination.labelEn}
                </Badge>
              )}
              {theme && (
                <Badge variant="outline">
                  {locale === "zh" ? theme.labelZh : theme.labelEn}
                </Badge>
              )}
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-1.5 bg-[#f5f5f7] hover:bg-[#e8e8ec] px-3 py-1.5 rounded-full text-[11px] text-gray-700 font-medium transition-colors ml-2">
                <Settings2 className="h-3.5 w-3.5" />
                <span>Customize this route</span>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === "zh" ? route.titleZh : route.titleEn}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <StarRating rating={isShanxi ? 5 : route.averageRating} size="md" showValue />
              <span>({isShanxi ? "1" : route.reviewCount} review{isShanxi ? "" : "s"})</span>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>
                  <strong>{route.duration}</strong>{" "}
                  {locale === "zh" ? "天" : "days"}
                </span>
              </div>
              {route.difficulty && (
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>{difficultyLabel[route.difficulty as keyof typeof difficultyLabel] || route.difficulty}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                <span>
                  {locale === "zh" ? "最多" : "Max"} <strong>{isShanxi ? "4" : route.maxGroupSize}</strong>{" "}
                  {locale === "zh" ? "人" : "people"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Featured Review (Shanxi only) */}
          {isShanxi && (
            <div className="bg-[#f9f9fb] rounded-xl p-5 border border-gray-100 space-y-3">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-[#c5a880] stroke-none" />))}
                <span className="text-xs font-semibold text-gray-800 ml-1">5.0</span>
                <span className="text-[11px] text-gray-400 font-light">(Verified Explorer)</span>
              </div>
              <p className="text-[12px] md:text-[13px] text-gray-700 font-normal leading-relaxed italic">
                &ldquo;An incredible pilgrimage. Our guide provided a masterclass breakdown, seamlessly overlaying the exact shrines and architectural masterpieces featured in Black Myth: Wukong with their real Tang and Song Dynasty history.&rdquo;
              </p>
              <div className="text-[10px] tracking-widest text-[#c5a880] uppercase font-light">&mdash; Edward, United Kingdom</div>
            </div>
          )}

          {/* Tabs Section */}
          <Tabs defaultValue="itinerary">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="itinerary">{t("itinerary")}</TabsTrigger>
              <TabsTrigger value="included">
                {locale === "zh" ? "费用" : "Included/Excluded"}
              </TabsTrigger>
              <TabsTrigger value="faqs">FAQ</TabsTrigger>
              <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
            </TabsList>

            {/* Itinerary Tab */}
            <TabsContent value="itinerary" className="mt-6">
              <RouteItinerary itinerary={route.itinerary} locale={locale} />
            </TabsContent>

            {/* Included/Excluded Tab */}
            <TabsContent value="included" className="mt-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-5">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                    ✅ {t("included")}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {route.includedItems.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 rounded-xl p-5">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                    ❌ {t("excluded")}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {route.excludedItems.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides" className="mt-6">
              {route.guides.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {locale === "zh" ? "暂无指定向导" : "No guides assigned yet"}
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {route.guides.map((guide) => (
                    <Link
                      key={guide.id}
                      href={`/${locale}/guides/${guide.slug}`}
                      className="flex items-start gap-4 p-4 rounded-xl border hover:border-primary/50 hover:bg-accent/30 transition-all"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {guide.name?.charAt(0)?.toUpperCase() || "G"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{guide.name}</h4>
                          {guide.isVerified && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              ✓ Verified
                            </Badge>
                          )}
                          {guide.isFeatured && (
                            <Badge className="text-[10px] px-1.5 py-0">Featured</Badge>
                          )}
                        </div>
                        <StarRating rating={guide.averageRating} size="sm" className="mt-0.5" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {guide.languages.join(", ").toUpperCase()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs" className="mt-6">
              {route.faqs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {locale === "zh" ? "暂无常见问题" : "No FAQs available"}
                </p>
              ) : (
                <Accordion className="w-full">
                  {route.faqs.map((faq: { question: string; answer: string }, i: number) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6">
              {route.reviews.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {locale === "zh" ? "暂无评价" : "No reviews yet"}
                </p>
              ) : (
                <div className="space-y-4">
                  {route.reviews.map((review) => (
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
                      {review.title && (
                        <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                      )}
                      {review.content && (
                        <p className="text-sm text-muted-foreground">{review.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Overview (below tabs) */}
          <Separator />
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-bold mb-3">{t("overview")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {locale === "zh" ? route.descriptionZh : route.descriptionEn}
            </p>
          </div>
        </div>

        {/* Sidebar: Booking Widget */}
        <div className="lg:col-span-1">
          {isShanxi ? (
            <ShanxiBookingSidebar />
          ) : (
          <RoutePricing
            routeSlug={route.slug}
            pricePerPerson={route.pricePerPerson}
            duration={route.duration}
            maxGroupSize={route.maxGroupSize}
            locale={locale}
          />
          )}
        </div>
      </div>
    </div>
  );
}
