import React from 'react';

export default function DynamicSystemPreview({ category, slug }: { category: string; slug: string }) {
  return (
    <div className="relative aspect-[16/9] w-full bg-[#05070B] border-2 border-[#1A2234] p-4 flex flex-col justify-between overflow-hidden rounded-none shadow-[4px_4px_0px_0px_#1A2234] group hover:border-[#00F0FF] hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all">
      {/* Cyber Scanline Micro-Animation */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

      {/* Background Matrix Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#00F0FF 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Mini Window Bar */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-[#1A2234] pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-none bg-rose-500" />
          <span className="w-2.5 h-2.5 rounded-none bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-none bg-emerald-500" />
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">[{slug}.production.tsx]</span>
      </div>

      {/* Category / Slug Specific Visual Content */}
      <div className="relative z-10 my-auto py-2">
        {slug.includes('agent') || category === 'AI Agents' ? (
          <div className="space-y-1.5 font-mono text-[10px]">
            <div className="flex justify-between bg-[#0D111A] px-2.5 py-1 rounded-none border-2 border-[#00F0FF] text-slate-300 shadow-[2px_2px_0px_0px_#00F0FF]">
              <span className="text-[#00F0FF] font-bold">[AGENTIC_WORKFLOW_PIPELINE]</span>
              <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span>MCP DISPATCH &lt; 24ms</span>
              </span>
            </div>
            <div className="flex justify-between bg-[#0D111A] px-2.5 py-1 rounded-none border-2 border-[#1A2234] text-slate-400">
              <span>SELF_HEAL_REFLECTION_LOOP</span>
              <span className="text-[#8B5CF6] font-bold">99.9% GUARDRAIL DEFENSE</span>
            </div>
          </div>
        ) : slug.includes('sentinel') ? (
          <div className="space-y-1.5 font-mono text-[10px]">
            <div className="flex justify-between bg-[#0D111A] px-2.5 py-1 rounded-none border-2 border-[#8B5CF6] text-slate-300 shadow-[2px_2px_0px_0px_#8B5CF6]">
              <span className="text-[#8B5CF6] font-bold">[ZERO_TRUST_IDENTITY_VAULT]</span>
              <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span>FIDO2 / WEBAUTHN ACTIVE</span>
              </span>
            </div>
            <div className="flex justify-between bg-[#0D111A] px-2.5 py-1 rounded-none border-2 border-[#1A2234] text-slate-400">
              <span>SAML_2.0_ENTERPRISE_SSO</span>
              <span className="text-[#00F0FF] font-bold">OAUTH2_OIDC_BOUND</span>
            </div>
          </div>
        ) : category === 'Dashboards' ? (
          <div className="space-y-2">
            <div className="flex items-end gap-2 h-16 pt-2">
              <div className="w-1/6 bg-[#00F0FF]/30 h-[40%] rounded-none" />
              <div className="w-1/6 bg-[#00F0FF]/60 h-[75%] rounded-none" />
              <div className="w-1/6 bg-[#00F0FF]/40 h-[50%] rounded-none" />
              <div className="w-1/6 bg-[#00F0FF] h-[95%] rounded-none" />
              <div className="w-1/6 bg-[#8B5CF6]/60 h-[65%] rounded-none" />
              <div className="w-1/6 bg-[#8B5CF6] h-[80%] rounded-none" />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase font-bold">
              <span>LATENCY: 11ms</span>
              <span className="text-[#00F0FF] flex items-center space-x-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[#00F0FF] opacity-75" />
                  <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-[#00F0FF]" />
                </span>
                <span>[LIVE TELEMETRY]</span>
              </span>
            </div>
          </div>
        ) : category === 'CRM' ? (
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-[9px] font-mono text-slate-400">
              <span className="text-[#00F0FF] font-bold">LEAD</span>
              <div className="h-1 bg-slate-800 rounded-none mt-1.5 w-3/4" />
            </div>
            <div className="p-2 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-[9px] font-mono text-slate-400">
              <span className="text-amber-400 font-bold">QUALIFIED</span>
              <div className="h-1 bg-slate-800 rounded-none mt-1.5 w-1/2" />
            </div>
            <div className="p-2 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] text-[9px] font-mono text-slate-300 shadow-[2px_2px_0px_0px_#00F0FF]">
              <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span>WON (₹1.4M)</span>
              </span>
              <div className="h-1 bg-emerald-500 rounded-none mt-1.5 w-full" />
            </div>
          </div>
        ) : category === 'ERP' ? (
          <div className="space-y-1.5 font-mono text-[10px]">
            <div className="flex justify-between bg-[#0D111A] px-2 py-1 rounded-none border-2 border-[#1A2234] text-slate-300">
              <span>DEPOT_01 HEATMAP</span>
              <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span>98.7% CAPACITY</span>
              </span>
            </div>
            <div className="flex justify-between bg-[#0D111A] px-2 py-1 rounded-none border-2 border-[#1A2234] text-slate-400">
              <span>GST_INVOICE_SYNC</span>
              <span className="text-[#00F0FF] font-bold">AUTO_SETTLED</span>
            </div>
          </div>
        ) : (
          <div className="font-mono text-[10px] text-slate-400 space-y-1">
            <p className="text-[#00F0FF]">&gt; next build --preset enterprise</p>
            <p className="text-slate-500">&gt; compiling 24 routes... done (1.2s)</p>
            <p className="text-emerald-400 flex items-center space-x-1 font-bold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span>&gt; [READY FOR EDGE DISTRIBUTION]</span>
            </p>
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-500 border-t-2 border-[#1A2234] pt-2">
        <span className="font-bold uppercase">[STATUS: VERIFIED]</span>
        <span className="font-bold uppercase">[NEXT.JS 15 + RLS]</span>
      </div>
    </div>
  );
}
