"use client";

import React, { useEffect, useRef } from "react";
import { Search, X, Filter, Sparkles, Terminal } from "lucide-react";

interface SystemFilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  totalResults: number;
  maxResults: number;
  categories: string[];
}

export default function SystemFilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  totalResults,
  maxResults,
  categories,
}: SystemFilterBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey: Press '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "All Systems";

  return (
    <div className="space-y-6 mb-12">
      {/* Search & Counter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Cybernetic Search Input */}
        <div className="lg:col-span-8 relative">
          <div className="relative rounded-2xl bg-[#0D111A]/90 border border-[#00F0FF]/30 focus-within:border-[#00F0FF] focus-within:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#00F0FF]">
              <Search className="w-5 h-5 group-focus-within:animate-pulse" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tech stack (Next.js, Postgres...), keywords, or tagline..."
              className="w-full bg-transparent pl-12 pr-28 py-3.5 text-sm text-white placeholder-[#94A3B8] font-mono-tabular focus:outline-none"
            />

            {/* Clear Button & Keyboard Shortcut Hint */}
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center space-x-2">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#1A2234] transition-colors"
                  title="Clear search query"
                >
                  <X className="w-4 h-4 text-[#00F0FF]" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono-tabular text-[#94A3B8] bg-[#07090E] border border-[#1A2234]">
                  Press &apos;/&apos; to focus search
                </kbd>
              )}
            </div>
          </div>
        </div>

        {/* Live Results Counter Badge */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <div className="px-4 py-3 rounded-2xl bg-[#0D111A]/90 border border-[#1A2234] text-xs font-mono-tabular backdrop-blur-md flex items-center space-x-2.5 shadow-lg w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isFiltered ? "bg-[#00F0FF]" : "bg-emerald-400"} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isFiltered ? "bg-[#00F0FF]" : "bg-emerald-400"}`} />
              </span>
              <span className="text-white font-semibold">
                Showing <span className="text-[#00F0FF]">{totalResults}</span> of {maxResults} Systems
              </span>
            </div>

            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#07090E] text-[#8B5CF6] border border-[#8B5CF6]/30">
              MATRIX FILTER: {isFiltered ? "ACTIVE" : "ALL"}
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs text-[#94A3B8] font-mono-tabular mr-2 hidden sm:inline-flex items-center space-x-1">
          <Filter className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>CATEGORY:</span>
        </span>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-tabular transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
                isActive
                  ? "bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-transparent scale-[1.02]"
                  : "bg-[#0D111A]/80 text-[#94A3B8] hover:text-white hover:bg-[#1A2234] border border-[#1A2234]"
              }`}
            >
              {isActive && <Sparkles className="w-3.5 h-3.5 text-black animate-spin-slow" />}
              <span>{cat}</span>
            </button>
          );
        })}

        {isFiltered && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Systems");
            }}
            className="ml-auto text-xs font-mono-tabular text-[#00F0FF] hover:underline flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Matrix</span>
          </button>
        )}
      </div>
    </div>
  );
}
