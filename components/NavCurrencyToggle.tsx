"use client";

import React from "react";
import { useCurrency } from "@/context/CurrencyContext";

export default function NavCurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="p-1 rounded-xl bg-[#0D111A]/90 border border-[#00F0FF]/40 backdrop-blur-md inline-flex items-center text-xs font-mono-tabular shadow-[0_0_15px_rgba(0,240,255,0.2)]">
      <button
        type="button"
        onClick={() => setCurrency("INR")}
        className={`px-2.5 py-1 rounded-lg transition-all font-bold cursor-pointer ${
          currency === "INR"
            ? "bg-[#00F0FF] text-black shadow-md"
            : "text-slate-400 hover:text-white"
        }`}
        title="Switch to INR ₹"
      >
        ₹ INR
      </button>
      <button
        type="button"
        onClick={() => setCurrency("USD")}
        className={`px-2.5 py-1 rounded-lg transition-all font-bold cursor-pointer ${
          currency === "USD"
            ? "bg-[#8B5CF6] text-white shadow-md"
            : "text-slate-400 hover:text-white"
        }`}
        title="Switch to USD $"
      >
        $ USD
      </button>
    </div>
  );
}
