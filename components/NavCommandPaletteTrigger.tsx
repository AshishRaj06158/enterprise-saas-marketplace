"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function NavCommandPaletteTrigger() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="px-3 py-1.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] hover:border-[#00F0FF] shadow-[3px_3px_0px_0px_#1A2234] hover:shadow-[3px_3px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] transition-all text-xs font-mono-tabular text-[#00F0FF] flex items-center space-x-1.5 cursor-pointer min-h-[44px]"
      title="Open Command Palette (Cmd+K / Ctrl+K)"
    >
      <Search className="w-3.5 h-3.5 text-[#00F0FF]" />
      <span className="font-bold tracking-wider">[{isMac ? "⌘K" : "CTRL+K"}]</span>
    </button>
  );
}
