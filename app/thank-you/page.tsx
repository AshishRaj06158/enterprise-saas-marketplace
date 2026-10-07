import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inquiry Received — NEXUS Systems',
  description: 'Your deployment inquiry has been assigned to our principal engineering advisory.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-[#07090E]">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-[#0D111A] border border-[#1A2234]">
        <div className="w-14 h-14 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mx-auto shadow-[0_0_30px_rgba(0,240,255,0.2)]">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-[#00F0FF] tracking-wider uppercase">INQUIRY DISPATCHED</span>
          <h1 className="text-2xl font-bold text-slate-100">Advisory Pipeline Assigned</h1>
          <p className="text-sm text-slate-400">
            Our systems architecture team will review your specifications and get in touch within 4 business hours.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-white text-slate-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            Return to Marketplace Home
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/docs"
            className="w-full py-2.5 rounded-lg border border-[#1A2234] hover:bg-[#161F30] text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Explore Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
