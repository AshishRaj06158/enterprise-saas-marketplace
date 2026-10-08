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
    <div>
      <div className="text-xs text-[#94A3B8] font-mono-tabular">COMMERCIAL TIER PRICE</div>
      <div className="text-2xl font-bold text-white font-mono-tabular">
        {primaryPrice} <span className="text-sm font-normal text-slate-400">({secondaryPrice})</span>
      </div>
    </div>
  );
}
