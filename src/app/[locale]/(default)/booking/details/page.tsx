"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useBooking } from "@/store/booking-context";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { z } from "zod";

const travelerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  specialRequests: z.string().optional(),
});

const steps = [
  { label: "Select" },
  { label: "Details" },
  { label: "Confirm" },
];

export default function BookingDetailsPage() {
  const locale = useLocale();
  const t = useTranslations("Booking");
  const router = useRouter();
  const { booking, setBooking } = useBooking();

  const [startDate, setStartDate] = useState<Date | undefined>(
    booking.startDate ? new Date(booking.startDate) : undefined
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!booking.routeSlug) {
    router.push(`/${locale}/booking`);
    return null;
  }

  const isValid =
    startDate &&
    booking.travelerInfo.name &&
    booking.travelerInfo.email.includes("@") &&
    booking.travelerInfo.nationality;

  const updateTraveler = (field: string, value: string) => {
    setBooking({
      travelerInfo: { ...booking.travelerInfo, [field]: value },
    });
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateAndProceed = () => {
    const result = travelerSchema.safeParse(booking.travelerInfo);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!startDate) {
      setErrors({ startDate: locale === "zh" ? "请选择日期" : "Please select a date" });
      return;
    }

    setBooking({ startDate: format(startDate, "yyyy-MM-dd") });
    router.push(`/${locale}/booking/confirmation`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <BookingStepper currentStep={1} steps={steps} locale={locale} />

      <h1 className="text-3xl font-bold text-center mb-8">{t("step2")}</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{locale === "zh" ? "出行信息" : "Travel Details"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Date */}
          <div className="space-y-2">
            <Label>{t("startDate")}</Label>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "MMM dd, yyyy") : t("startDate")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && (
              <p className="text-xs text-red-500">{errors.startDate}</p>
            )}
          </div>

          {/* Travelers */}
          <div className="space-y-2">
            <Label>{t("numberOfTravelers")}</Label>
            <Select
              value={booking.travelers.toString()}
              onValueChange={(v) => setBooking({ travelers: parseInt(v || "1") })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{locale === "zh" ? "旅客信息" : "Traveler Information"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("travelerName")}</Label>
              <Input
                value={booking.travelerInfo.name}
                onChange={(e) => updateTraveler("name", e.target.value)}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label>{t("travelerEmail")}</Label>
              <Input
                type="email"
                value={booking.travelerInfo.email}
                onChange={(e) => updateTraveler("email", e.target.value)}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label>{t("travelerPhone")}</Label>
              <Input
                value={booking.travelerInfo.phone}
                onChange={(e) => updateTraveler("phone", e.target.value)}
                placeholder="+1 234 567 8900"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("travelerNationality")}</Label>
              <Input
                value={booking.travelerInfo.nationality}
                onChange={(e) => updateTraveler("nationality", e.target.value)}
                placeholder="USA"
              />
              {errors.nationality && (
                <p className="text-xs text-red-500">{errors.nationality}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t("specialRequests")}</Label>
            <Textarea
              value={booking.travelerInfo.specialRequests}
              onChange={(e) => updateTraveler("specialRequests", e.target.value)}
              placeholder={
                locale === "zh"
                  ? "饮食要求、过敏信息、特别需求..."
                  : "Dietary requirements, allergies, special needs..."
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>
        <Button size="lg" onClick={validateAndProceed} disabled={!isValid}>
          {t("next")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
