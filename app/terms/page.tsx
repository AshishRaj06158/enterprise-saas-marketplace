import Metadata from "next";
import Link from "next/link";
import { ShieldCheck, FileCheck } from "lucide-react";

export const metadata = {
  title: "Commercial Source License & IP Terms | SUTRA / NEXUS",
  description: "Unencumbered commercial source code ownership terms, GST tax credit rules, and non-perpetual royalty guarantees.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-xs font-mono-tabular text-[#8B5CF6]">
            <FileCheck className="w-3.5 h-3.5" />
            <span>COMMERCIAL IP AGREEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Commercial Source Licensing Terms</h1>
          <p className="text-xs font-mono-tabular text-[#94A3B8]">Effective Date: October 2026 • Revision 2.4</p>
        </div>

        <div className="rounded-2xl bg-[#0D111A] border border-[#1A2234] p-8 space-y-6 text-sm text-[#94A3B8] leading-relaxed">
          <h2 className="text-lg font-bold text-white">1. Commercial IP Ownership & Assignment</h2>
          <p>
            Upon acquiring a Core, Growth, or Enterprise tier license from SUTRA / NEXUS, the purchaser receives an unencumbered, perpetual right to deploy, modify, and distribute the target fullstack source code. No recurring perpetual royalty fees are charged.
          </p>

          <h2 className="text-lg font-bold text-white">2. Deployment Boundaries by Tier</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Core Launch Tier:</strong> Single production app deployment license.</li>
            <li><strong>Growth Stack Tier:</strong> Multi-project commercial license (Up to 5 production deployments).</li>
            <li><strong>Enterprise Engine Tier:</strong> Unlimited production, staging, and client deployments with dedicated IP assignment.</li>
          </ul>

          <h2 className="text-lg font-bold text-white">3. B2B GST Tax Invoicing</h2>
          <p>
            All domestic transactions include automated GST tax invoices with valid GSTR-1 input credit routing for registered Indian business entities.
          </p>

          <div className="pt-4 border-t border-[#1A2234]">
            <Link href="/" className="text-xs font-bold text-[#00F0FF] hover:underline">
              ← Return to Marketplace Base
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
