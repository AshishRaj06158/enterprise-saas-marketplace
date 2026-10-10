import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Code2, Database, ShieldCheck, Cpu, Terminal, Zap, ArrowRight, Layers, FileCode } from "lucide-react";

export const metadata = {
  title: "Architecture Documentation & Setup Guide | SUTRA / NEXUS",
  description: "Technical specifications, Next.js 15 App Router deployment, Supabase Postgres RLS policies, Razorpay webhook setup, and security specs.",
};

export default function DocsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#8B5CF6] bg-[#8B5CF6]/10 text-xs font-mono font-bold uppercase tracking-wider text-[#8B5CF6] shadow-[2px_2px_0px_0px_#8B5CF6]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>[ENTERPRISE SPECIFICATIONS]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            System Architecture &amp; Developer Documentation
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed font-mono text-xs sm:text-sm">
            Everything you need to deploy, configure, and scale SUTRA / NEXUS fullstack codebases in your infrastructure.
          </p>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Docs Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <div className="p-4 rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] space-y-2 text-xs font-mono">
              <div className="text-[#00F0FF] font-bold pb-2 border-b-2 border-[#1A2234] uppercase tracking-wider">
                [TABLE OF CONTENTS]
              </div>
              <a href="#next15" className="block text-slate-300 hover:text-[#00F0FF] py-1 border-l-2 border-transparent hover:border-[#00F0FF] pl-2 transition-colors">
                1. Next.js 15 Setup
              </a>
              <a href="#supabase" className="block text-slate-300 hover:text-[#00F0FF] py-1 border-l-2 border-transparent hover:border-[#00F0FF] pl-2 transition-colors">
                2. Supabase Postgres RLS
              </a>
              <a href="#payments" className="block text-slate-300 hover:text-[#00F0FF] py-1 border-l-2 border-transparent hover:border-[#00F0FF] pl-2 transition-colors">
                3. UPI &amp; Razorpay Webhooks
              </a>
              <a href="#security" className="block text-slate-300 hover:text-[#00F0FF] py-1 border-l-2 border-transparent hover:border-[#00F0FF] pl-2 transition-colors">
                4. Honeypot &amp; Rate Limiting
              </a>
              <a href="#deploy" className="block text-slate-300 hover:text-[#00F0FF] py-1 border-l-2 border-transparent hover:border-[#00F0FF] pl-2 transition-colors">
                5. Vercel &amp; Docker Deployment
              </a>
            </div>
          </div>

          {/* Main Docs Content */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Section 1: Next.js 15 Setup */}
            <section id="next15" className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-4 shadow-[4px_4px_0px_0px_#1A2234] hover:border-[#00F0FF] hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all">
              <div className="flex items-center space-x-3 text-white">
                <Code2 className="w-6 h-6 text-[#00F0FF]" />
                <h2 className="text-xl font-bold uppercase font-mono tracking-tight">1. Next.js 15 App Router &amp; Server Components</h2>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                All software stacks are built on Next.js 15 with React Server Components (RSC), TypeScript strict mode, and Tailwind CSS.
              </p>
              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] font-mono text-xs text-slate-300 space-y-1 overflow-x-auto shadow-[2px_2px_0px_0px_#1A2234]">
                <div className="text-[#94A3B8]"># Install dependencies and start local dev server</div>
                <div className="text-[#00F0FF] font-bold">npm install</div>
                <div className="text-[#00F0FF] font-bold">npm run dev</div>
              </div>
            </section>

            {/* Section 2: Supabase Postgres RLS */}
            <section id="supabase" className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-4 shadow-[4px_4px_0px_0px_#1A2234] hover:border-[#8B5CF6] hover:shadow-[4px_4px_0px_0px_#8B5CF6] transition-all">
              <div className="flex items-center space-x-3 text-white">
                <Database className="w-6 h-6 text-[#8B5CF6]" />
                <h2 className="text-xl font-bold uppercase font-mono tracking-tight">2. Supabase Postgres &amp; Row Level Security (RLS)</h2>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Database migrations are located in <code className="text-[#00F0FF] font-mono">[supabase/migrations]</code>. Every table includes strict RLS policies to prevent data leakage.
              </p>
              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] font-mono text-xs text-slate-300 space-y-1 overflow-x-auto shadow-[2px_2px_0px_0px_#1A2234]">
                <div className="text-[#94A3B8]">-- Example RLS Policy for Customer Orders</div>
                <div className="text-[#8B5CF6] font-bold">ALTER TABLE orders ENABLE ROW LEVEL SECURITY;</div>
                <div className="text-slate-200">CREATE POLICY &quot;Users can view own orders&quot; ON orders FOR SELECT USING (auth.uid() = user_id);</div>
              </div>
            </section>

            {/* Section 3: Payments */}
            <section id="payments" className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-4 shadow-[4px_4px_0px_0px_#1A2234] hover:border-[#00F0FF] hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all">
              <div className="flex items-center space-x-3 text-white">
                <Zap className="w-6 h-6 text-[#00F0FF]" />
                <h2 className="text-xl font-bold uppercase font-mono tracking-tight">3. Multi-Rail UPI &amp; Razorpay Webhook API</h2>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Native UPI QR intent strings are rendered dynamically on the client while Razorpay webhook signatures are verified on serverless routes.
              </p>
              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] font-mono text-xs text-slate-300 space-y-1 overflow-x-auto shadow-[2px_2px_0px_0px_#1A2234]">
                <div className="text-[#94A3B8]"># Webhook secret verification endpoint</div>
                <div className="text-emerald-400 font-bold">POST /api/webhooks/razorpay</div>
                <div className="text-slate-400">Headers: x-razorpay-signature</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/developer"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-none bg-[#00F0FF] text-black font-black uppercase tracking-wider font-mono text-xs border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all"
                >
                  <span>TEST IN DEVELOPER CONSOLE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* Section 4: Security */}
            <section id="security" className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-4 shadow-[4px_4px_0px_0px_#1A2234] hover:border-[#8B5CF6] hover:shadow-[4px_4px_0px_0px_#8B5CF6] transition-all">
              <div className="flex items-center space-x-3 text-white">
                <ShieldCheck className="w-6 h-6 text-[#8B5CF6]" />
                <h2 className="text-xl font-bold uppercase font-mono tracking-tight">4. Honeypot Anti-Spam &amp; Rate Limiting Handlers</h2>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Inbound contact forms utilize hidden honeypot fields (<code className="text-[#00F0FF] font-mono">[website_hp]</code>) alongside IP window rate limiters to silently drop automated bot spam.
              </p>
            </section>

            {/* Section 5: Deployment */}
            <section id="deploy" className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-4 shadow-[4px_4px_0px_0px_#1A2234] hover:border-[#00F0FF] hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all">
              <div className="flex items-center space-x-3 text-white">
                <Terminal className="w-6 h-6 text-[#00F0FF]" />
                <h2 className="text-xl font-bold uppercase font-mono tracking-tight">5. Vercel &amp; Docker Container Deployment</h2>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Deploy with zero configuration to Vercel or build standalone OCI Docker containers for on-premise Kubernetes clusters.
              </p>
              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] font-mono text-xs text-slate-300 space-y-1 overflow-x-auto shadow-[2px_2px_0px_0px_#1A2234]">
                <div className="text-[#94A3B8]"># Docker build &amp; launch</div>
                <div className="text-[#00F0FF] font-bold">docker build -t sutra-nexus-app .</div>
                <div className="text-[#00F0FF] font-bold">docker run -p 3000:3000 sutra-nexus-app</div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
