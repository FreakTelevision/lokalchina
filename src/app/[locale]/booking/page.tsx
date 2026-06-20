"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useBooking } from "@/store/booking-context";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const steps = [
  { label: "Select" },
  { label: "Details" },
  { label: "Confirm" },
];

export default function BookingStep1Page() {
  const locale = useLocale();
  const t = useTranslations("Booking");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { booking, setBooking } = useBooking();

  // Pre-fill from URL params (when coming from route/guide pages)
  useEffect(() => {
    const route = searchParams.get("route");
    const guide = searchParams.get("guide");
    if (route) setBooking({ routeSlug: route });
    if (guide) setBooking({ guideSlug: guide });
  }, [searchParams, setBooking]);

  const canProceed = booking.routeSlug;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <BookingStepper currentStep={0} steps={steps} locale={locale} />

      <h1 className="text-3xl font-bold text-center mb-8">{t("step1")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("selectRoute")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            {locale === "zh"
              ? "请先浏览路线，选择一条你感兴趣的路线，然后返回此页面继续预订。"
              : "Please browse routes first, select one you're interested in, then come back here to continue."}
          </p>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push(`/${locale}/routes`)}>
              {locale === "zh" ? "浏览路线" : "Browse Routes"}
            </Button>
            <Button variant="outline" onClick={() => router.push(`/${locale}/guides`)}>
              {locale === "zh" ? "浏览向导" : "Browse Guides"}
            </Button>
          </div>

          {booking.routeSlug && (
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm">
                <span className="font-medium">
                  {locale === "zh" ? "已选路线：" : "Selected route: "}
                </span>
                {booking.routeSlug}
              </p>
              {booking.guideSlug && (
                <p className="text-sm mt-1">
                  <span className="font-medium">
                    {locale === "zh" ? "已选向导：" : "Selected guide: "}
                  </span>
                  {booking.guideSlug}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button
          size="lg"
          disabled={!canProceed}
          onClick={() => router.push(`/${locale}/booking/details`)}
        >
          {t("next")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
