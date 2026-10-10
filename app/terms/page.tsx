import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial Source License & IP Terms | SUTRA / NEXUS",
  description: "Unencumbered commercial source code ownership terms, GST tax credit rules, and non-perpetual royalty guarantees.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#8B5CF6] bg-[#8B5CF6]/10 text-xs font-mono font-bold text-[#8B5CF6] shadow-[2px_2px_0px_0px_#8B5CF6]">
            <FileCheck className="w-3.5 h-3.5" />
            <span>[COMMERCIAL IP AGREEMENT // UNENCUMBERED TRANSFER]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-mono uppercase tracking-tight">Commercial Source Licensing Terms</h1>
          <p className="text-xs font-mono text-[#94A3B8]">[EFFECTIVE DATE: OCTOBER 2026 • REVISION 2.4.0]</p>
        </div>

        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-6 text-sm text-[#94A3B8] leading-relaxed font-mono shadow-[4px_4px_0px_0px_#1A2234]">
          <h2 className="text-base font-bold text-white uppercase">[1. COMMERCIAL IP OWNERSHIP &amp; ASSIGNMENT]</h2>
          <p>
            Upon acquiring a Core, Growth, or Enterprise tier license from SUTRA / NEXUS, the purchaser receives an unencumbered, perpetual right to deploy, modify, and distribute the target fullstack source code. No recurring perpetual royalty fees are charged.
          </p>

          <h2 className="text-base font-bold text-white uppercase">[2. DEPLOYMENT BOUNDARIES BY TIER]</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Core Launch Tier:</strong> Single production app deployment license.</li>
            <li><strong>Growth Stack Tier:</strong> Multi-project commercial license (Up to 5 production deployments).</li>
            <li><strong>Enterprise Engine Tier:</strong> Unlimited production, staging, and client deployments with dedicated IP assignment.</li>
          </ul>

          <h2 className="text-base font-bold text-white uppercase">[3. B2B GST TAX INVOICING]</h2>
          <p>
            All domestic transactions include automated GST tax invoices with valid GSTR-1 input credit routing for registered Indian business entities.
          </p>

          <div className="pt-4 border-t-2 border-[#1A2234]">
            <Link href="/" className="text-xs font-bold text-[#00F0FF] hover:underline uppercase">
              [← RETURN TO MARKETPLACE BASE]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
