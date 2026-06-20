"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Users } from "lucide-react";
import { format, addDays } from "date-fns";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface RoutePricingProps {
  routeSlug: string;
  pricePerPerson: number;
  duration: number;
  maxGroupSize: number;
  locale: string;
}

export function RoutePricing({
  routeSlug,
  pricePerPerson,
  duration,
  maxGroupSize,
  locale,
}: RoutePricingProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [travelers, setTravelers] = useState(1);

  const totalPrice = pricePerPerson * travelers;
  const endDate = date ? addDays(date, duration) : undefined;

  const handleBook = () => {
    if (!date) return;
    const params = new URLSearchParams();
    params.set("route", routeSlug);
    params.set("startDate", format(date, "yyyy-MM-dd"));
    params.set("travelers", travelers.toString());
    router.push(`/${locale}/booking?${params.toString()}`);
  };

  return (
    <div className="bg-card rounded-xl border p-6 space-y-5 sticky top-24">
      {/* Price */}
      <div>
        <span className="text-3xl font-bold text-primary">
          {CURRENCY_SYMBOL}{pricePerPerson.toLocaleString()}
        </span>
        <span className="text-muted-foreground text-sm">
          {" "}
          {locale === "zh" ? "/人" : "/person"}
        </span>
      </div>

      {/* Date Picker */}
      <div className="space-y-2">
        <Label>{locale === "zh" ? "开始日期" : "Start Date"}</Label>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "MMM dd, yyyy")
              ) : (
                <span className="text-muted-foreground">
                  {locale === "zh" ? "选择日期" : "Select date"}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
        {endDate && (
          <p className="text-xs text-muted-foreground">
            {locale === "zh" ? "结束：" : "End: "}
            {format(endDate, "MMM dd, yyyy")}
          </p>
        )}
      </div>

      {/* Traveler Count */}
      <div className="space-y-2">
        <Label>{locale === "zh" ? "出行人数" : "Number of Travelers"}</Label>
        <Select
          value={travelers.toString()}
          onValueChange={(v) => setTravelers(parseInt(v || "1"))}
        >
          <SelectTrigger>
            <Users className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: maxGroupSize }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n} {locale === "zh" ? "人" : n === 1 ? "traveler" : "travelers"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Total */}
      <div className="border-t pt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-muted-foreground">
            {CURRENCY_SYMBOL}{pricePerPerson.toLocaleString()} × {travelers}
          </span>
          <span className="text-sm">
            {CURRENCY_SYMBOL}{(pricePerPerson * travelers).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>{locale === "zh" ? "总计" : "Total"}</span>
          <span className="text-primary">
            {CURRENCY_SYMBOL}{totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Book Button */}
      <Button className="w-full" size="lg" onClick={handleBook} disabled={!date}>
        {locale === "zh" ? "立即预订" : "Book Now"}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        {locale === "zh"
          ? "无需预付全款，72小时内免费取消"
          : "No full prepayment required. Free cancellation within 72 hours."}
      </p>
    </div>
  );
}
