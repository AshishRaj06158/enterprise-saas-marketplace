"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function NavCommandPaletteTrigger() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="px-3 py-1.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] hover:border-[#00F0FF] shadow-[3px_3px_0px_0px_#1A2234] hover:shadow-[3px_3px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] transition-all text-xs font-mono-tabular text-[#00F0FF] flex items-center space-x-1.5 cursor-pointer min-h-[44px] group"
      title="Open Command Palette (Cmd+K / Ctrl+K)"
      aria-label="Open Command Palette HUD"
    >
      <Search className="w-3.5 h-3.5 text-[#00F0FF] group-hover:scale-110 transition-transform shrink-0" />
      <span className="font-bold tracking-wider text-slate-200 group-hover:text-white hidden sm:inline">
        [{isMac ? "⌘K" : "CTRL+K"} <span className="text-[#00F0FF]">// SEARCH_CONSOLE</span>]
      </span>
      <span className="font-bold tracking-wider text-[#00F0FF] sm:hidden">
        [{isMac ? "⌘K" : "CTRL+K"}]
      </span>
    </button>
  );
}
