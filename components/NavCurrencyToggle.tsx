"use client";

import React from "react";
import { useCurrency } from "@/context/CurrencyContext";

export default function NavCurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[3px_3px_0px_0px_#1A2234] inline-flex items-center text-xs font-mono-tabular">
      <button
        type="button"
        onClick={() => setCurrency("INR")}
        className={`px-3 py-1.5 transition-all font-bold cursor-pointer min-h-[44px] flex items-center justify-center uppercase tracking-wider ${
          currency === "INR"
            ? "bg-[#00F0FF] text-black border-r-2 border-[#1A2234] shadow-[inset_0_0_0_1px_#000]"
            : "text-slate-400 hover:text-white border-r-2 border-[#1A2234]"
        } active:translate-x-[1px] active:translate-y-[1px]`}
        title="Switch to INR ₹"
      >
        [₹ INR]
      </button>
      <button
        type="button"
        onClick={() => setCurrency("USD")}
        className={`px-3 py-1.5 transition-all font-bold cursor-pointer min-h-[44px] flex items-center justify-center uppercase tracking-wider ${
          currency === "USD"
            ? "bg-[#8B5CF6] text-white shadow-[inset_0_0_0_1px_#000]"
            : "text-slate-400 hover:text-white"
        } active:translate-x-[1px] active:translate-y-[1px]`}
        title="Switch to USD $"
      >
        [$ USD]
      </button>
    </div>
  );
}
