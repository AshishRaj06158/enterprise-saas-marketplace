"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Terminal, SearchX, RotateCcw } from "lucide-react";
import { SystemProduct } from "@/data/systems";
import TelemetryModal from "@/components/TelemetryModal";
import SystemFilterBar from "@/components/SystemFilterBar";
import { useCurrency } from "@/context/CurrencyContext";

interface SystemsCatalogGridProps {
  systems: SystemProduct[];
}

const CATEGORIES = [
  "All Systems",
  "AI Agents",
  "Dashboards",
  "Fintech / Payments",
  "Developer Tools",
];

export default function SystemsCatalogGrid({ systems }: SystemsCatalogGridProps) {
  const [selectedSystem, setSelectedSystem] = useState<SystemProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Systems");

  const { currency } = useCurrency();

  // Filter systems based on search query and category
  const filteredSystems = useMemo(() => {
    return systems.filter((sys) => {
      // Category Filter
      let matchesCat = true;
      if (selectedCategory === "AI Agents") {
        matchesCat =
          sys.category === "AI Agents" ||
          sys.name.toLowerCase().includes("agent") ||
          sys.stack.some((s) => s.toLowerCase().includes("ai") || s.toLowerCase().includes("agent"));
      } else if (selectedCategory === "Dashboards") {
        matchesCat =
          sys.category === "Dashboards" ||
          sys.name.toLowerCase().includes("matrix") ||
          sys.name.toLowerCase().includes("telemetry");
      } else if (selectedCategory === "Fintech / Payments") {
        matchesCat =
          sys.category === "Websites" ||
          sys.category === "CRM" ||
          sys.stack.some((s) =>
            /upi|razorpay|stripe|payment|credit/i.test(s)
          ) ||
          sys.features.some((f) => /upi|razorpay|stripe|payment|gst/i.test(f));
      } else if (selectedCategory === "Developer Tools") {
        matchesCat =
          sys.category === "ERP" ||
          sys.name.toLowerCase().includes("auth") ||
          sys.name.toLowerCase().includes("sentinel") ||
          sys.stack.some((s) => /auth|security|redis|vault|saml/i.test(s));
      }

      if (!matchesCat) return false;

      // Search Query Filter
      if (!searchQuery.trim()) return true;
      const term = searchQuery.toLowerCase();

      return (
        sys.name.toLowerCase().includes(term) ||
        sys.tagline.toLowerCase().includes(term) ||
        sys.description.toLowerCase().includes(term) ||
        sys.badge.toLowerCase().includes(term) ||
        sys.stack.some((s) => s.toLowerCase().includes(term)) ||
        sys.features.some((f) => f.toLowerCase().includes(term)) ||
        sys.specs.some(
          (sp) =>
            sp.label.toLowerCase().includes(term) ||
            sp.value.toLowerCase().includes(term)
        )
      );
    });
  }, [systems, searchQuery, selectedCategory]);

  return (
    <>
      {/* Search & Category Filter Matrix */}
      <SystemFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        totalResults={filteredSystems.length}
        maxResults={systems.length}
        categories={CATEGORIES}
      />

      {/* Systems Grid */}
      {filteredSystems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSystems.map((sys) => {
            const displayPrice = currency === "INR" ? sys.priceInr : sys.priceUsd;
            const secondaryPrice = currency === "INR" ? sys.priceUsd : sys.priceInr;

            return (
              <div
                key={sys.id}
                id={sys.id}
                className="rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 p-8 flex flex-col justify-between hover:border-[#00F0FF]/60 hover:shadow-[0_10px_35px_-5px_rgba(0,240,255,0.2)] transition-all duration-300 shadow-2xl relative overflow-hidden group hover:-translate-y-1"
              >
                {/* Scanline Overlay */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30" />

                <div>
                  {/* Badge & Name */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono-tabular tracking-wider uppercase px-3 py-1 rounded bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]/30">
                      {sys.badge}
                    </span>
                    <span className="text-xs font-mono-tabular text-emerald-400 flex items-center space-x-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span>IP AUDITED</span>
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    <Link href={"/systems/" + sys.slug}>{sys.name}</Link>
                  </h2>
                  <p className="text-xs font-mono-tabular text-[#8B5CF6] mt-0.5 mb-3">
                    {sys.tagline}
                  </p>

                  {/* System Preview Image */}
                  <Link
                    href={"/systems/" + sys.slug}
                    className="block relative w-full overflow-hidden rounded-xl border border-[#1A2234] my-4 shadow-lg bg-[#07090E]"
                  >
                    <Image
                      src={sys.imageSrc}
                      alt={sys.imageAlt}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </Link>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {sys.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {sys.stack.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono-tabular px-2.5 py-1 rounded-lg bg-[#07090E] text-slate-300 border border-[#1A2234]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Key Features List */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#1A2234]">
                    <div className="text-xs font-mono-tabular text-[#94A3B8] uppercase">
                      CORE FEATURES:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sys.features.map((f, i) => (
                        <li key={i} className="flex items-center space-x-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom: Metrics, Sandbox & CTA */}
                <div className="pt-6 border-t border-[#1A2234] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-[#94A3B8] font-mono-tabular">COMMERCIAL TIER</div>
                    <div className="text-xl font-bold text-white font-mono-tabular">
                      {displayPrice} <span className="text-xs font-normal text-slate-400">({secondaryPrice})</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                    <Link
                      href={"/playground?system=" + sys.slug}
                      className="px-3 py-2 rounded-xl text-xs font-mono-tabular text-[#00F0FF] bg-[#07090E] border border-[#00F0FF]/40 hover:bg-[#00F0FF]/10 transition-colors flex items-center space-x-1.5 cursor-pointer min-h-[44px]"
                      title="Test Live Sandbox Playground"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Sandbox ⚡</span>
                    </Link>

                    <Link
                      href={"/checkout?system=" + sys.slug}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center space-x-1.5 min-h-[44px]"
                    >
                      <span>Acquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Futuristic Empty State Card */
        <div className="rounded-2xl bg-[#0D111A]/90 border border-[#00F0FF]/40 p-12 text-center space-y-6 shadow-[0_0_40px_rgba(0,240,255,0.15)] relative overflow-hidden my-8">
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

          <div className="mx-auto w-16 h-16 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/40 flex items-center justify-center">
            <SearchX className="w-8 h-8 text-[#00F0FF]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-white tracking-wide font-mono-tabular">
              NO SYSTEM MATCHES THE SPECIFIED QUERY PARAMETERS
            </h3>
            <p className="text-xs text-[#94A3B8] font-mono-tabular">
              Zero systems matched search term{" "}
              {searchQuery && <span className="text-[#00F0FF]">&quot;{searchQuery}&quot;</span>}{" "}
              under category <span className="text-[#8B5CF6]">&quot;{selectedCategory}&quot;</span>.
            </p>
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Systems");
            }}
            className="px-6 py-3 rounded-xl text-xs font-bold font-mono-tabular text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] inline-flex items-center space-x-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>[ CLEAR FILTER / RESET QUERY ]</span>
          </button>
        </div>
      )}

      {/* Telemetry Modal */}
      {selectedSystem && (
        <TelemetryModal
          isOpen={!!selectedSystem}
          onClose={() => setSelectedSystem(null)}
          systemName={selectedSystem.name}
          systemSlug={selectedSystem.slug}
          stack={selectedSystem.stack}
          specs={selectedSystem.specs}
        />
      )}
    </>
  );
}
