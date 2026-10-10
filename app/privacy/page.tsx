import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & Data Security Policy | SUTRA / NEXUS",
  description: "Enterprise privacy policy covering encrypted contact transmission, honeypot verification, and zero data selling commitments.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-xs font-mono font-bold text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>[DATA SECURITY SPECIFICATION // TLS 1.3]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-mono uppercase tracking-tight">Privacy Policy &amp; Telemetry Handling</h1>
          <p className="text-xs font-mono text-[#94A3B8]">[EFFECTIVE DATE: OCTOBER 2026 • REVISION 2.4.0]</p>
        </div>

        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-6 text-sm text-[#94A3B8] leading-relaxed font-mono shadow-[4px_4px_0px_0px_#1A2234]">
          <h2 className="text-base font-bold text-white uppercase">[1. INFORMATION COLLECTION &amp; HONEYPOT PROTECTION]</h2>
          <p>
            When submitting inquiries via SUTRA / NEXUS forms, we collect your Full Name, Work Email, Company GSTIN (for tax invoicing), and system requirements. Hidden honeypot fields silently reject automated bot spam.
          </p>

          <h2 className="text-base font-bold text-white uppercase">[2. AES-256 ENCRYPTION &amp; DATA STORAGE]</h2>
          <p>
            All submitted payloads are encrypted in transit using TLS 1.3 and stored in isolated database vaults with AES-256 encryption at rest. We never sell, lease, or distribute enterprise inquiry records.
          </p>

          <h2 className="text-base font-bold text-white uppercase">[3. B2B GST COMPLIANCE]</h2>
          <p>
            Company GSTIN numbers provided during commercial licensing transactions are utilized solely for issuing valid GSTR-1 input tax credit documentation.
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
