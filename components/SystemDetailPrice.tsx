"use client";

import React from "react";
import { useCurrency } from "@/context/CurrencyContext";

interface SystemDetailPriceProps {
  priceInr: string;
  priceUsd: string;
}

export default function SystemDetailPrice({ priceInr, priceUsd }: SystemDetailPriceProps) {
  const { currency } = useCurrency();
  const primaryPrice = currency === "INR" ? priceInr : priceUsd;
  const secondaryPrice = currency === "INR" ? priceUsd : priceInr;

  return (
    <div className="font-mono-tabular">
      <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-bold">
        [COMMERCIAL PERPETUAL TIER]
      </div>
      <div className="text-3xl font-black text-white tracking-tight mt-1">
        {primaryPrice} <span className="text-xs font-normal text-slate-400">({secondaryPrice})</span>
      </div>
      <div className="text-[10px] text-[#00F0FF] uppercase tracking-wider mt-1.5 font-bold">
        [TAX_EXCLUSIVE: FINAL PAYABLE CALCULATED AT CHECKOUT]
      </div>
    </div>
  );
}
