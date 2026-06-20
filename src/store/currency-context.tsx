"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Currency = "USD" | "EUR";

export const localeCurrencyMap: Record<string, Currency> = {
  en: "USD",
  fr: "EUR",
  de: "EUR",
  nl: "EUR",
};

export const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
};

export const currencyRates: Record<Currency, number> = {
  USD: 1,       // base
  EUR: 0.92,    // 1 USD ≈ 0.92 EUR
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
