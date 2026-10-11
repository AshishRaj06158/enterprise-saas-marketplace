import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, Home, Search, Activity, AlertTriangle, ArrowRight, ShieldAlert, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "SYSTEM_DESYNC // 404 — Route Not Found",
  description: "The requested route vector or kernel node could not be resolved in the routing table.",
};

export default function NotFound() {
  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 sm:px-6 py-20 bg-[#07090E] relative overflow-hidden font-sans">
      {/* Structural Neo-Brutalist Grid Matrix & Scanlines */}
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#EF4444]/60 to-transparent blur-[1px] animate-scanline pointer-events-none" />

      {/* Atmospheric Ambient Red Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/05 rounded-full blur-[140px] pointer-events-none" />

      {/* Centered Cybernetic Error Card */}
      <div className="max-w-xl w-full p-6 sm:p-10 rounded-none bg-[#0D111A] border-2 border-[#EF4444] shadow-[8px_8px_0px_0px_#EF4444] font-mono space-y-7 relative z-10 text-slate-100">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-4">
          <div className="flex items-center space-x-2.5">
            <ShieldAlert className="w-5 h-5 text-[#EF4444] animate-pulse" />
            <span className="text-xs text-[#EF4444] font-black uppercase tracking-wider">
              [SYSTEM_DESYNC // KERNEL_PANIC_0x404]
            </span>
          </div>

          <span className="text-[10px] px-2 py-0.5 bg-[#07090E] text-[#EF4444] border border-[#EF4444] font-bold">
            SEV-1 FAULT
          </span>
        </div>

        {/* Glitch Headline & Explanation */}
        <div className="space-y-3">
          <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-wider flex items-center gap-3">
            <span className="text-[#EF4444]">[404]</span>
            <span className="text-lg sm:text-xl text-slate-400 font-bold uppercase tracking-tight">
              DESYNC DETECTED
            </span>
          </div>

          <h1 className="text-sm sm:text-base font-black text-[#EF4444] uppercase tracking-wide">
            [ERR_ROUTE_NOT_FOUND // 0x404]
          </h1>

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            The target execution vector, microservice route, or product specification node does not exist in the active routing registry or has been purged from memory.
          </p>
        </div>

        {/* Monospace Telemetry Diagnostics Box */}
        <div className="p-4 bg-[#07090E] border-2 border-[#1A2234] text-xs space-y-1.5 leading-relaxed text-slate-300">
          <div className="text-[10px] text-slate-500 font-bold border-b border-[#1A2234] pb-1 uppercase tracking-wider">
            [KERNEL_TELEMETRY_DIAGNOSTICS]:
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">TARGET_VECTOR:</span>
            <span className="text-[#EF4444] font-bold">UNRESOLVED</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">MEMORY_ALLOCATION:</span>
            <span className="text-[#00F0FF] font-bold">PURGED</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">STATUS:</span>
            <span className="text-[#EF4444] font-bold">KERNEL_HALTED</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-[#1A2234]">
            <span>ROUTING_TABLE_LOOKUP:</span>
            <span className="text-slate-400">0 MATCHES FOUND</span>
          </div>
        </div>

        {/* Recovery Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            [AUTOMATED RECOVERY PROTOCOLS]:
          </div>

          <div className="flex flex-col sm:flex-col gap-2.5">
            {/* Action 1: Return to Base */}
            <Link
              href="/"
              className="py-3 px-4 rounded-none bg-[#00F0FF] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] hover:border-white shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] flex items-center justify-between transition-all min-h-[44px]"
            >
              <div className="flex items-center space-x-2">
                <Home className="w-4 h-4 shrink-0" />
                <span>[RETURN_TO_BASE // /]</span>
              </div>
              <span className="text-[10px] opacity-75 font-bold tracking-normal">REDIRECT_HOME &rarr;</span>
            </Link>

            {/* Action 2: Search Systems */}
            <Link
              href="/systems"
              className="py-3 px-4 rounded-none bg-[#07090E] hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-[#8B5CF6] shadow-[4px_4px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#8B5CF6] flex items-center justify-between transition-all min-h-[44px]"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 shrink-0" />
                <span>[SEARCH_SYSTEMS // /systems]</span>
              </div>
              <span className="text-[10px] opacity-75 font-bold tracking-normal">SYSTEM_CATALOG &rarr;</span>
            </Link>

            {/* Action 3: System Operations */}
            <Link
              href="/operations"
              className="py-3 px-4 rounded-none bg-[#07090E] hover:bg-emerald-400 text-emerald-400 hover:text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-emerald-400 shadow-[4px_4px_0px_0px_#10B981] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#10B981] flex items-center justify-between transition-all min-h-[44px]"
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 shrink-0" />
                <span>[SYSTEM_OPERATIONS // /operations]</span>
              </div>
              <span className="text-[10px] opacity-75 font-bold tracking-normal">NOC_STATUS &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Footer Audit Trace */}
        <div className="pt-2 border-t border-[#1A2234] flex items-center justify-between text-[10px] text-slate-500">
          <span>ORIGIN: NEXUS.OS // INGRESS_GATEWAY</span>
          <span className="text-[#00F0FF]">FAILSAFE: ACTIVE</span>
        </div>

      </div>
    </div>
  );
}
