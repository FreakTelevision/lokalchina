import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow_Condensed, Montserrat, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/layout/session-provider";
import { BookingProvider } from "@/store/booking-context";
import { CurrencyProvider } from "@/store/currency-context";
import Footer from "@/components/Footer";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const mtMontserrat = Montserrat({
  variable: "--font-mt-title",
  subsets: ["latin"],
  weight: ["600"],
});

const mtBodySans = Plus_Jakarta_Sans({
  variable: "--font-mt-body",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const locales = ["en", "fr", "de", "ja", "ko", "nl"];

export const metadata: Metadata = {
  title: {
    default: "LokalChina — Go Local in China",
    template: "%s | ChinaTravel",
  },
  description:
    "Discover China with private local guides. Personalized travel routes, expert guides, and authentic experiences. No rigid group tours — just you and your private guide.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} ${mtMontserrat.variable} ${mtBodySans.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SessionProvider>
            <TooltipProvider>
              <CurrencyProvider locale={locale}>
              <BookingProvider>
                <main className="flex-1">{children}</main>
                <Footer locale={locale} />
              </BookingProvider>
            </CurrencyProvider>
              <Toaster />
              <Analytics />
            </TooltipProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
