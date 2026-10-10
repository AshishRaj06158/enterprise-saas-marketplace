"use client";

import React, { useEffect, useRef } from "react";
import { Search, X, Filter, Sparkles } from "lucide-react";

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
          <div className="relative rounded-none bg-[#0D111A] border-2 border-[#1A2234] focus-within:border-[#00F0FF] shadow-[4px_4px_0px_0px_#1A2234] focus-within:shadow-[4px_4px_0px_0px_#00F0FF] transition-all duration-150 overflow-hidden group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#00F0FF]">
              <Search className="w-5 h-5 group-focus-within:text-[#00F0FF]" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH SYSTEMS (PRESS '/' TO FOCUS // EVALUATES NAME, STACK, SPECS, CATEGORY)..."
              className="w-full bg-transparent pl-12 pr-28 py-4 text-xs uppercase tracking-wider text-white placeholder-[#94A3B8] font-mono-tabular focus:outline-none"
            />

            {/* Clear Button & Keyboard Shortcut Hint */}
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center space-x-2">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 rounded-none text-slate-400 hover:text-white hover:bg-[#1A2234] border border-[#1A2234] transition-colors"
                  title="Clear search query"
                >
                  <X className="w-4 h-4 text-[#00F0FF]" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-none text-[10px] font-mono-tabular text-[#94A3B8] bg-[#07090E] border border-[#1A2234]">
                  [/] SEARCH
                </kbd>
              )}
            </div>
          </div>
        </div>

        {/* Live Results Counter Badge */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <div className="px-4 py-3.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-xs font-mono-tabular flex items-center space-x-2.5 shadow-[4px_4px_0px_0px_#1A2234] w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isFiltered ? "bg-[#00F0FF]" : "bg-emerald-400"} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isFiltered ? "bg-[#00F0FF]" : "bg-emerald-400"}`} />
              </span>
              <span className="text-white font-bold uppercase tracking-wider">
                SHOWING <span className="text-[#00F0FF]">{totalResults}</span> OF {maxResults} SYSTEMS
              </span>
            </div>

            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border ${
              isFiltered
                ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/40"
                : "bg-[#07090E] text-[#8B5CF6] border-[#8B5CF6]/40"
            }`}>
              FILTER: {isFiltered ? "ACTIVE" : "ALL"}
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-tabular">
        <span className="text-xs text-[#94A3B8] mr-2 hidden sm:inline-flex items-center space-x-1 uppercase tracking-wider font-bold">
          <Filter className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>[CATEGORY]:</span>
        </span>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-none text-xs font-bold transition-all duration-100 cursor-pointer flex items-center space-x-1.5 uppercase tracking-wider min-h-[44px] ${
                isActive
                  ? "bg-[#00F0FF] text-black border-2 border-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-[#0D111A] text-[#94A3B8] hover:text-white hover:border-[#00F0FF] border-2 border-[#1A2234] shadow-[3px_3px_0px_0px_#1A2234]"
              } active:translate-x-[2px] active:translate-y-[2px]`}
            >
              {isActive && <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />}
              <span>[{cat}]</span>
            </button>
          );
        })}

        {isFiltered && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Systems");
            }}
            className="sm:ml-auto text-xs font-mono-tabular text-black bg-[#8B5CF6] border-2 border-[#8B5CF6] shadow-[3px_3px_0px_0px_#8B5CF6] hover:bg-[#8B5CF6]/90 flex items-center space-x-1.5 px-3.5 py-2.5 cursor-pointer uppercase font-bold min-h-[44px] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <X className="w-3.5 h-3.5" />
            <span>[RESET FILTER MATRIX]</span>
          </button>
        )}
      </div>
    </div>
  );
}
