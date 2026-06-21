"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Currency = "USD" | "EUR" | "JPY" | "KRW" | "SAR";

export const localeCurrencyMap: Record<string, Currency> = {
  en: "USD",
  fr: "EUR",
  de: "EUR",
  ja: "JPY",
  ko: "KRW",
  ar: "SAR",
  nl: "EUR",
};

export const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  JPY: "¥",
  KRW: "₩",
  SAR: "﷼",
};

export const currencyRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  JPY: 150,
  KRW: 1350,
  SAR: 3.75,
};

const CurrencyContext = createContext<Currency>("USD");

export function CurrencyProvider({ locale, children }: { locale: string; children: ReactNode }) {
  const currency = localeCurrencyMap[locale] || "USD";
  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
