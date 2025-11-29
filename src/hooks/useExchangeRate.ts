"use client";
import { useEffect, useMemo, useState } from "react";
import { loadExpenses, saveExpenses } from "../lib/storage";

const RATES_CACHE_KEY = "ai-expat-rates";

const mockRates: Record<string, Record<string, number>> = {
  USD: { EUR: 0.92, GBP: 0.79, JPY: 151.2, AUD: 1.5 },
  EUR: { USD: 1.08, GBP: 0.86, JPY: 164.3, AUD: 1.63 },
  GBP: { USD: 1.26, EUR: 1.16, JPY: 191.3, AUD: 1.89 },
  JPY: { USD: 0.0066, EUR: 0.0061, GBP: 0.0052, AUD: 0.0099 },
  AUD: { USD: 0.67, EUR: 0.61, GBP: 0.53, JPY: 101.4 },
};

const currencies = Object.keys(mockRates);

export const useExchangeRate = () => {
  const [rates, setRates] = useState<Record<string, Record<string, number>> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cached = localStorage.getItem(RATES_CACHE_KEY);
    if (cached) {
      setRates(JSON.parse(cached));
      return;
    }
    const table: Record<string, Record<string, number>> = {};
    currencies.forEach((from) => {
      table[from] = {};
      currencies.forEach((to) => {
        if (from === to) {
          table[from][to] = 1;
        } else {
          const direct = mockRates[from]?.[to];
          const inverse = mockRates[to]?.[from];
          table[from][to] = direct ?? (inverse ? 1 / inverse : 1);
        }
      });
    });
    localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(table));
    setRates(table);
  }, []);

  const convertToHomeCurrency = (amount: number, fromCurrency: string, toCurrency: string) => {
    if (!rates) return amount;
    const rate = rates[fromCurrency]?.[toCurrency] ?? 1;
    return amount * rate;
  };

  const getDisplayRate = (from: string, to: string) => {
    if (!rates) return "1";
    const rate = rates[from]?.[to] ?? 1;
    return rate.toFixed(3);
  };

  return {
    rates,
    convertToHomeCurrency,
    getDisplayRate,
  };
};
