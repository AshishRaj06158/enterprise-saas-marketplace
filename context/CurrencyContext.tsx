"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "INR" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (inr: string, usd: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sutra_currency");
    if (saved === "INR" || saved === "USD") {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("sutra_currency", c);
    } catch (e) {
      console.error("Failed to write currency to localStorage:", e);
    }
  };

  const toggleCurrency = () => {
    const next = currency === "INR" ? "USD" : "INR";
    setCurrency(next);
  };

  const formatPrice = (inr: string, usd: string) => {
    if (!mounted) return inr;
    return currency === "INR" ? inr : usd;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: mounted ? currency : "INR",
        setCurrency,
        toggleCurrency,
        formatPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
