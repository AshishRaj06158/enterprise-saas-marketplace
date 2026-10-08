"use client";

import React, { useEffect, useState } from "react";
import { Command, Search } from "lucide-react";

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
      className="px-2.5 py-1.5 rounded-xl bg-[#0D111A]/90 border border-[#00F0FF]/30 hover:border-[#00F0FF]/70 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all text-xs font-mono-tabular text-[#00F0FF] flex items-center space-x-1.5 cursor-pointer backdrop-blur-md"
      title="Open Command Palette (Cmd+K / Ctrl+K)"
    >
      <Search className="w-3.5 h-3.5 text-[#00F0FF]" />
      <span className="font-bold">{isMac ? "⌘K" : "Ctrl+K"}</span>
    </button>
  );
}
