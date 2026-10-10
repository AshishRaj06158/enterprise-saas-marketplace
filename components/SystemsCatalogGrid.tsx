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

export default function SystemsCatalogGrid({ systems }: SystemsCatalogGridProps) {
  const [selectedSystem, setSelectedSystem] = useState<SystemProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Systems");

  const { currency } = useCurrency();

  // Dynamically extract categories from datasets with "All Systems" fallback
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(systems.map((s) => s.category).filter(Boolean)));
    return ["All Systems", ...uniqueCats];
  }, [systems]);

  // Real-time case-insensitive trimmed filtering evaluating title/name, tagline, overview/description, category, and techStack/stack
  const filteredSystems = useMemo(() => {
    const trimmedTerm = searchQuery.trim().toLowerCase();

    return systems.filter((sys) => {
      // Dynamic Category match
      if (selectedCategory !== "All Systems" && sys.category !== selectedCategory) {
        return false;
      }

      // If no search query, return match
      if (!trimmedTerm) return true;

      // Safe evaluation supporting title, tagline, overview, techStack and existing properties
      const title = (sys as any).title || sys.name || "";
      const tagline = sys.tagline || "";
      const overview = (sys as any).overview || sys.description || "";
      const stack = (sys as any).techStack || sys.stack || [];

      const matchesTitle = title.toLowerCase().includes(trimmedTerm);
      const matchesTagline = tagline.toLowerCase().includes(trimmedTerm);
      const matchesOverview = overview.toLowerCase().includes(trimmedTerm);
      const matchesCategory = (sys.category || "").toLowerCase().includes(trimmedTerm);
      const matchesBadge = (sys.badge || "").toLowerCase().includes(trimmedTerm);
      const matchesStack = Array.isArray(stack) && stack.some((tech: string) => tech.toLowerCase().includes(trimmedTerm));
      const matchesFeatures = Array.isArray(sys.features) && sys.features.some((feat: string) => feat.toLowerCase().includes(trimmedTerm));
      const matchesSpecs = Array.isArray(sys.specs) && sys.specs.some(
        (sp) => sp.label.toLowerCase().includes(trimmedTerm) || sp.value.toLowerCase().includes(trimmedTerm)
      );

      return (
        matchesTitle ||
        matchesTagline ||
        matchesOverview ||
        matchesCategory ||
        matchesBadge ||
        matchesStack ||
        matchesFeatures ||
        matchesSpecs
      );
    });
  }, [systems, searchQuery, selectedCategory]);

  return (
    <>
      {/* Search & Dynamic Category Filter Matrix */}
      <SystemFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        totalResults={filteredSystems.length}
        maxResults={systems.length}
        categories={categories}
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
                className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 flex flex-col justify-between hover:border-[#00F0FF] shadow-[4px_4px_0px_0px_#1A2234] hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] relative overflow-hidden group"
              >
                {/* Scanline Overlay */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30" />

                <div>
                  {/* Badge & Name */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono-tabular tracking-wider uppercase px-2.5 py-1 bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]">
                      [{sys.badge}]
                    </span>
                    <span className="text-xs font-mono-tabular text-emerald-400 flex items-center space-x-1.5 font-bold">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span>[IP AUDITED // VERIFIED]</span>
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-white group-hover:text-[#00F0FF] transition-colors tracking-tight font-mono-tabular">
                    <Link href={"/systems/" + sys.slug}>{sys.name}</Link>
                  </h2>
                  <p className="text-xs font-mono-tabular text-[#8B5CF6] mt-1 mb-4 uppercase tracking-wider font-semibold">
                    // {sys.tagline}
                  </p>

                  {/* System Preview Image */}
                  <Link
                    href={"/systems/" + sys.slug}
                    className="block relative w-full overflow-hidden rounded-none border-2 border-[#1A2234] my-4 shadow-[4px_4px_0px_0px_#07090E] bg-[#07090E] group-hover:border-[#00F0FF] transition-colors"
                  >
                    <Image
                      src={sys.imageSrc}
                      alt={sys.imageAlt}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-cover rounded-none transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </Link>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-sans">
                    {sys.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {sys.stack.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono-tabular px-2.5 py-1 bg-[#07090E] text-slate-300 border border-[#1A2234] uppercase"
                      >
                        [{t}]
                      </span>
                    ))}
                  </div>

                  {/* Key Features List */}
                  <div className="space-y-2 mb-6 pt-4 border-t-2 border-[#1A2234]">
                    <div className="text-xs font-mono-tabular text-[#94A3B8] uppercase font-bold tracking-wider">
                      // ARCHITECTURAL CAPABILITIES:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sys.features.map((f, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-200 font-mono-tabular">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom: Metrics, Sandbox & CTA */}
                <div className="pt-6 border-t-2 border-[#1A2234] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-[#94A3B8] font-mono-tabular uppercase tracking-wider">[COMMERCIAL TIER]</div>
                    <div className="text-2xl font-black text-white font-mono-tabular">
                      {displayPrice} <span className="text-xs font-normal text-slate-400">({secondaryPrice})</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                    <Link
                      href={"/playground?system=" + sys.slug}
                      className="px-3.5 py-2.5 rounded-none text-xs font-bold font-mono-tabular text-[#00F0FF] bg-[#07090E] border-2 border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF] hover:bg-[#00F0FF]/10 active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center space-x-1.5 cursor-pointer min-h-[44px] uppercase"
                      title="Test Live Sandbox Playground"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>[SANDBOX ⚡]</span>
                    </Link>

                    <Link
                      href={"/checkout?system=" + sys.slug}
                      className="px-4 py-2.5 rounded-none text-xs font-bold font-mono-tabular text-black bg-[#00F0FF] border-2 border-[#00F0FF] shadow-[3px_3px_0px_0px_#8B5CF6] hover:shadow-[4px_4px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center space-x-1.5 min-h-[44px] uppercase"
                    >
                      <span>ACQUIRE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Cybernetic Neo-Brutalism Empty State Card */
        <div className="rounded-none bg-[#0D111A] border-2 border-[#00F0FF] p-12 text-center space-y-6 shadow-[6px_6px_0px_0px_#00F0FF] relative overflow-hidden my-8">
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

          <div className="mx-auto w-16 h-16 rounded-none bg-[#07090E] border-2 border-[#00F0FF] flex items-center justify-center shadow-[3px_3px_0px_0px_#00F0FF]">
            <SearchX className="w-8 h-8 text-[#00F0FF]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl font-black text-white tracking-wider font-mono-tabular uppercase">
              // ZERO SYSTEMS MATCH THE SPECIFIED QUERY PARAMETERS
            </h3>
            <p className="text-xs text-[#94A3B8] font-mono-tabular leading-relaxed">
              No registry records found matching search query{" "}
              {searchQuery && <span className="text-[#00F0FF] font-bold">&quot;{searchQuery}&quot;</span>}{" "}
              under category <span className="text-[#8B5CF6] font-bold">&quot;{selectedCategory}&quot;</span>.
            </p>
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Systems");
            }}
            className="px-6 py-3.5 rounded-none text-xs font-bold font-mono-tabular text-black bg-[#00F0FF] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#8B5CF6] hover:shadow-[6px_6px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] inline-flex items-center space-x-2 cursor-pointer uppercase min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>[RESET FILTER]</span>
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
