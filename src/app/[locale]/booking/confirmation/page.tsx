"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useBooking } from "@/store/booking-context";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { CURRENCY_SYMBOL } from "@/lib/constants";

const steps = [
  { label: "Select" },
  { label: "Details" },
  { label: "Confirm" },
];

// Estimated pricing (would come from actual route/guide data in production)
const ESTIMATED_ROUTE_PRICE = 2400;
const ESTIMATED_GUIDE_PRICE = 800;

export default function BookingConfirmationPage() {
  const locale = useLocale();
  const t = useTranslations("Booking");
  const router = useRouter();
  const { data: session } = useSession();
  const { booking } = useBooking();
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!booking.routeSlug) {
    router.push(`/${locale}/booking`);
    return null;
  }

  if (!session?.user) {
    router.push(`/${locale}/auth/login?callbackUrl=/${locale}/booking/confirmation`);
    return null;
  }

  const days = 3; // Default, would come from route data
  const totalPrice = ESTIMATED_ROUTE_PRICE + ESTIMATED_GUIDE_PRICE * days;

  const handleConfirm = async () => {
    setLoading(true);
    // In production: create Stripe Checkout Session via server action
    // Then redirect to Stripe Checkout URL
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t("confirmation")}</h1>
        <p className="text-muted-foreground mb-6">{t("confirmationMessage")}</p>
        <Button onClick={() => router.push(`/${locale}/dashboard/bookings`)}>
          {t("viewBooking")}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <BookingStepper currentStep={2} steps={steps} locale={locale} />

      <h1 className="text-3xl font-bold text-center mb-8">{t("step3")}</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{locale === "zh" ? "预订摘要" : "Booking Summary"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Route */}
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              {locale === "zh" ? "路线" : "Route"}
            </span>
            <span className="text-sm font-medium">{booking.routeSlug}</span>
          </div>
          {booking.guideSlug && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {locale === "zh" ? "向导" : "Guide"}
              </span>
              <span className="text-sm font-medium">{booking.guideSlug}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t("startDate")}</span>
            <span className="text-sm font-medium">{booking.startDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t("numberOfTravelers")}</span>
            <span className="text-sm font-medium">{booking.travelers}</span>
          </div>

          <Separator />

          {/* Traveler info */}
          <div className="text-sm">
            <p className="font-medium mb-1">
              {locale === "zh" ? "旅客信息" : "Traveler"}
            </p>
            <p className="text-muted-foreground">{booking.travelerInfo.name}</p>
            <p className="text-muted-foreground">{booking.travelerInfo.email}</p>
            <p className="text-muted-foreground">{booking.travelerInfo.nationality}</p>
            {booking.travelerInfo.specialRequests && (
              <p className="text-muted-foreground mt-1">
                💬 {booking.travelerInfo.specialRequests}
              </p>
            )}
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">{t("priceBreakdown")}</h4>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("routePrice")}</span>
              <span>{CURRENCY_SYMBOL}{ESTIMATED_ROUTE_PRICE.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("guidePrice")} ({days} days)</span>
              <span>{CURRENCY_SYMBOL}{(ESTIMATED_GUIDE_PRICE * days).toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>{t("total")}</span>
              <span className="text-primary">{CURRENCY_SYMBOL}{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms + Pay */}
      <div className="flex items-start gap-3 mb-6">
        <Checkbox
          id="terms"
          checked={termsAgreed}
          onCheckedChange={(v) => setTermsAgreed(v === true)}
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
          {t("termsAgreement")}
        </label>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>
        <Button size="lg" onClick={handleConfirm} disabled={!termsAgreed || loading}>
          {loading ? (locale === "zh" ? "处理中..." : "Processing...") : t("payNow")}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        {t("acceptedCards")}
      </p>
    </div>
  );
}
