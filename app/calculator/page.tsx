"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Zap,
  ShieldCheck,
  Users,
  TrendingDown,
  FileText
} from "lucide-react";
import { getAllSystems, SystemProduct } from "@/data/systems";
import { useCurrency } from "@/context/CurrencyContext";

export default function RoiCalculatorPage() {
  const systems = getAllSystems();
  const { currency, toggleCurrency } = useCurrency();

  // State controls
  const [selectedSlug, setSelectedSlug] = useState<string>(systems[0]?.slug || "telemetry-matrix");
  const [teamSize, setTeamSize] = useState<number>(4);
  const [runwayMonths, setRunwayMonths] = useState<number>(4);

  // Compensation state (INR vs USD default values)
  const [monthlyCompInr, setMonthlyCompInr] = useState<number>(180000);
  const [monthlyCompUsd, setMonthlyCompUsd] = useState<number>(4500);

  // Selected system item
  const selectedSystem: SystemProduct = useMemo(() => {
    return systems.find((s) => s.slug === selectedSlug) || systems[0];
  }, [systems, selectedSlug]);

  // Parse numerical license cost
  const nexusLicenseCost = useMemo(() => {
    if (currency === "INR") {
      const parsed = parseInt(selectedSystem.priceInr.replace(/[^0-9]/g, ""), 10);
      return isNaN(parsed) ? 89999 : parsed;
    } else {
      const parsed = parseInt(selectedSystem.priceUsd.replace(/[^0-9]/g, ""), 10);
      return isNaN(parsed) ? 349 : parsed;
    }
  }, [selectedSystem, currency]);

  // Active monthly compensation rate
  const activeMonthlyComp = currency === "INR" ? monthlyCompInr : monthlyCompUsd;

  // Custom build math calculations
  const baseSalaryBurn = teamSize * activeMonthlyComp * runwayMonths;
  const qaInfraOverhead = baseSalaryBurn * 0.20; // 20% overhead
  const totalCustomBuildCost = Math.round(baseSalaryBurn + qaInfraOverhead);

  // Net Savings & Acceleration
  const netCapitalSaved = Math.max(0, totalCustomBuildCost - nexusLicenseCost);
  const savingsPercent = totalCustomBuildCost > 0 
    ? ((netCapitalSaved / totalCustomBuildCost) * 100).toFixed(1)
    : "98.5";
  const daysSaved = runwayMonths * 30;

  // Formatting helpers
  const formatCurrencyVal = (val: number) => {
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `$${val.toLocaleString("en-US")}`;
  };

  const handleDownloadReport = () => {
    const reportText = `====================================================
SUTRA / NEXUS CAPITAL EFFICIENCY & ROI REPORT
====================================================
Date Generated: ${new Date().toLocaleDateString("en-US", { dateStyle: "full" })}
Target System: ${selectedSystem.name}

DEVELOPER BURN & RUNWAY PARAMETERS:
- Engineering Team Size: ${teamSize} Senior Fullstack Engineers
- Monthly Comp (Per Developer): ${formatCurrencyVal(activeMonthlyComp)}
- Estimated Build Runway: ${runwayMonths} Months (${daysSaved} Days)

MATHEMATICAL COST COMPARISON:
1. TRADITIONAL IN-HOUSE CUSTOM BUILD:
   - Base Salary Burn: ${formatCurrencyVal(baseSalaryBurn)}
   - QA, Security & DevOps Overhead (20%): ${formatCurrencyVal(qaInfraOverhead)}
   - TOTAL CUSTOM BUILD COST: ${formatCurrencyVal(totalCustomBuildCost)}

2. NEXUS INSTANT COMMERCIAL LICENSE:
   - One-time License Acquisition: ${formatCurrencyVal(nexusLicenseCost)}
   - Time to Deployment: < 24 Hours

CAPITAL SAVINGS & ACCELERATION IMPACT:
- NET CAPITAL SAVED: ${formatCurrencyVal(netCapitalSaved)}
- TOTAL ROI EFFICIENCY SAVINGS: ${savingsPercent}%
- MARKET TIME ACCELERATION: ~${daysSaved} Days Saved

====================================================
Verified by SUTRA / NEXUS Architecture Engine
https://nexus-systems.in/calculator
====================================================`;

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedSystem.slug}-roi-feasibility-report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0D111A] border-2 border-[#00F0FF] text-xs font-mono-tabular text-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF]">
            <Calculator className="w-4 h-4 text-[#00F0FF]" />
            <span className="uppercase font-bold tracking-widest">[CAPITAL EFFICIENCY // ROI CALCULATOR]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono-tabular uppercase">
            Developer ROI &amp; Savings Engine
          </h1>

          <p className="text-sm text-[#94A3B8] font-mono-tabular leading-relaxed">
            Simulate custom in-house engineering burn rate against instant verified deployment licenses.
          </p>
        </div>

        {/* HERO HIGHLIGHT SAVINGS BANNER (NEO-BRUTALIST) */}
        <div className="p-8 rounded-none bg-[#0D111A] border-2 border-emerald-500 shadow-[6px_6px_0px_0px_#10B981] text-center space-y-3 relative overflow-hidden font-mono-tabular">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-[1px] animate-scanline" />
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#07090E] border border-emerald-500 text-emerald-400 text-xs font-bold uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>// SIMULATED CAPITAL SAVINGS IMPACT</span>
          </div>

          <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-emerald-400 tracking-tight uppercase">
            NET CAPITAL SAVED: {formatCurrencyVal(netCapitalSaved)}{" "}
            <span className="text-white text-xl sm:text-3xl font-extrabold">({savingsPercent}% SAVINGS)</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center justify-center gap-3">
            <span className="text-[#00F0FF] font-bold">[ACCELERATION: ~{daysSaved} DAYS SAVED]</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-white font-semibold">[TIME-TO-MARKET: &lt; 24 HOURS]</span>
          </div>
        </div>

        {/* INPUT PARAMETER CONTROLS & OUTPUT CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE SLIDERS */}
          <div className="lg:col-span-5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_#1A2234] font-mono-tabular">
            
            <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-4">
              <h2 className="text-sm font-bold text-white flex items-center space-x-2 uppercase tracking-wider">
                <Users className="w-4 h-4 text-[#00F0FF]" />
                <span>// BURN PARAMETERS</span>
              </h2>

              <button
                onClick={toggleCurrency}
                className="px-3 py-1.5 rounded-none bg-[#07090E] border-2 border-[#00F0FF] text-[#00F0FF] text-xs font-bold hover:bg-[#00F0FF]/10 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
              >
                UNIT: {currency} ({currency === "INR" ? "₹" : "$"})
              </button>
            </div>

            {/* Slider 1: Target System Dropdown */}
            <div className="space-y-2 text-xs">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                [1] SELECT TARGET ARCHITECTURE:
              </label>
              <select
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3.5 py-3 text-white focus:outline-none cursor-pointer text-xs min-h-[44px]"
              >
                {systems.map((sys) => (
                  <option key={sys.slug} value={sys.slug}>
                    {sys.name} ({currency === "INR" ? sys.priceInr : sys.priceUsd})
                  </option>
                ))}
              </select>
            </div>

            {/* Slider 2: Engineering Team Size */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <label className="font-bold uppercase tracking-wider">[2] TEAM SIZE:</label>
                <span className="text-[#00F0FF] font-bold text-sm">{teamSize} Engineers</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
                className="w-full accent-[#00F0FF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 uppercase">
                <span>1 Dev (Solo)</span>
                <span>5 Devs</span>
                <span>10 Devs (Squad)</span>
              </div>
            </div>

            {/* Slider 3: Average Monthly Compensation */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <label className="font-bold uppercase tracking-wider">[3] MONTHLY COMP / DEV:</label>
                <span className="text-[#00F0FF] font-bold text-sm">
                  {formatCurrencyVal(activeMonthlyComp)} / mo
                </span>
              </div>

              {currency === "INR" ? (
                <input
                  type="range"
                  min="60000"
                  max="350000"
                  step="10000"
                  value={monthlyCompInr}
                  onChange={(e) => setMonthlyCompInr(parseInt(e.target.value, 10))}
                  className="w-full accent-[#00F0FF] cursor-pointer"
                />
              ) : (
                <input
                  type="range"
                  min="1000"
                  max="12000"
                  step="500"
                  value={monthlyCompUsd}
                  onChange={(e) => setMonthlyCompUsd(parseInt(e.target.value, 10))}
                  className="w-full accent-[#00F0FF] cursor-pointer"
                />
              )}

              <div className="flex justify-between text-[10px] text-slate-500 uppercase">
                <span>{currency === "INR" ? "₹60k" : "$1.0k"}</span>
                <span>{currency === "INR" ? "₹1.8L" : "$4.5k"}</span>
                <span>{currency === "INR" ? "₹3.5L" : "$12k"}</span>
              </div>
            </div>

            {/* Slider 4: Estimated Build Runway */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <label className="font-bold uppercase tracking-wider">[4] ESTIMATED BUILD RUNWAY:</label>
                <span className="text-[#00F0FF] font-bold text-sm">{runwayMonths} Months ({daysSaved} Days)</span>
              </div>
              <input
                type="range"
                min="2"
                max="9"
                step="1"
                value={runwayMonths}
                onChange={(e) => setRunwayMonths(parseInt(e.target.value, 10))}
                className="w-full accent-[#00F0FF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 uppercase">
                <span>2 Months</span>
                <span>5 Months</span>
                <span>9 Months</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: MATHEMATICAL COMPARISON CARDS */}
          <div className="lg:col-span-7 space-y-6 font-mono-tabular">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* CARD A: TRADITIONAL CUSTOM BUILD */}
              <div className="rounded-none bg-[#0D111A] border-2 border-red-500/50 p-6 space-y-4 shadow-[4px_4px_0px_0px_#EF4444] relative overflow-hidden">
                <div className="flex items-center justify-between text-xs border-b border-[#1A2234] pb-3">
                  <span className="text-red-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <TrendingDown className="w-4 h-4" />
                    <span>[IN-HOUSE BUILD]</span>
                  </span>
                  <span className="text-red-400 font-bold text-[10px] uppercase">// HIGH RISK</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {formatCurrencyVal(totalCustomBuildCost)}
                  </div>
                  <div className="text-[11px] text-slate-400 uppercase">Total estimated in-house burn</div>
                </div>

                <div className="space-y-2 text-xs border-t border-[#1A2234] pt-3 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Salary Burn:</span>
                    <span>{formatCurrencyVal(baseSalaryBurn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">QA &amp; Infra (+20%):</span>
                    <span>{formatCurrencyVal(qaInfraOverhead)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Runway to Alpha:</span>
                    <span className="text-red-400 font-bold">~{daysSaved} Days</span>
                  </div>
                </div>
              </div>

              {/* CARD B: NEXUS INSTANT DEPLOYMENT */}
              <div className="rounded-none bg-[#0D111A] border-2 border-[#00F0FF] p-6 space-y-4 shadow-[4px_4px_0px_0px_#00F0FF] relative overflow-hidden">
                <div className="flex items-center justify-between text-xs border-b border-[#1A2234] pb-3">
                  <span className="text-[#00F0FF] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <Zap className="w-4 h-4" />
                    <span>[NEXUS LICENSE]</span>
                  </span>
                  <span className="text-emerald-400 font-bold text-[10px] uppercase">// ZERO RISK</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-[#00F0FF]">
                    {formatCurrencyVal(nexusLicenseCost)}
                  </div>
                  <div className="text-[11px] text-slate-400 uppercase">One-time commercial IP transfer</div>
                </div>

                <div className="space-y-2 text-xs border-t border-[#1A2234] pt-3 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Perpetual Fees:</span>
                    <span className="text-emerald-400 font-bold">₹0 / $0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Source Rights:</span>
                    <span className="text-white font-bold">100% Unencumbered</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time-to-Market:</span>
                    <span className="text-emerald-400 font-bold">&lt; 24 Hours</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ACTION CTA BOX */}
            <div className="p-8 rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[6px_6px_0px_0px_#1A2234] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              <div className="space-y-1">
                <h3 className="text-base font-black text-white flex items-center space-x-2 uppercase tracking-wider">
                  <ShieldCheck className="w-5 h-5 text-[#00F0FF]" />
                  <span>// Ready to bypass {daysSaved} days of development burn?</span>
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Acquire perpetual source code for <strong className="text-white">{selectedSystem.name}</strong> instantly.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={handleDownloadReport}
                  className="px-4 py-3 rounded-none bg-[#07090E] border-2 border-[#1A2234] text-slate-200 hover:text-[#00F0FF] hover:border-[#00F0FF] shadow-[3px_3px_0px_0px_#1A2234] active:translate-x-[2px] active:translate-y-[2px] transition-all text-xs font-bold flex items-center space-x-2 min-h-[44px] cursor-pointer uppercase"
                >
                  <FileText className="w-4 h-4" />
                  <span>[DOWNLOAD REPORT]</span>
                </button>

                <Link
                  href={`/checkout?system=${selectedSystem.slug}`}
                  className="px-6 py-3 rounded-none bg-[#00F0FF] border-2 border-[#00F0FF] text-black font-bold text-xs shadow-[4px_4px_0px_0px_#8B5CF6] hover:shadow-[6px_6px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center space-x-2 min-h-[44px] uppercase"
                >
                  <span>ACQUIRE LICENSE ➔</span>
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
