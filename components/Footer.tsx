import Link from "next/link";
import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#07090E] border-t border-[#1A2234] text-[#94A3B8] pt-16 pb-12 relative overflow-hidden">
      {/* Background Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-dot-matrix opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1A2234]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] p-[1px]">
                <div className="w-full h-full bg-[#0D111A] rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-[#00F0FF]" />
                </div>
              </div>
              <span className="font-bold text-lg text-white tracking-wider">
                SUTRA <span className="text-[#00F0FF]">/</span> NEXUS
              </span>
            </Link>

            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Audited production-grade software marketplace. Zero per-user fees, perpetual commercial source code transfer, and native payment rails.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs font-mono-tabular text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>All Systems Operational (P99 &lt; 12ms)</span>
            </div>
          </div>

          {/* Software Systems */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tabular text-white uppercase tracking-wider">Software Systems</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/systems/telemetry-matrix" className="hover:text-[#00F0FF] transition-colors">Nexus Telemetry Matrix</Link></li>
              <li><Link href="/systems/quantum-logistics-erp" className="hover:text-[#00F0FF] transition-colors">Quantum Logistics ERP</Link></li>
              <li><Link href="/systems/autonomous-crm-pipeline" className="hover:text-[#00F0FF] transition-colors">Autonomous CRM Engine</Link></li>
              <li><Link href="/systems/nexus-agent-orchestrator" className="hover:text-[#00F0FF] transition-colors">Nexus AI Agent Orchestrator</Link></li>
              <li><Link href="/systems/omega-core-starter" className="hover:text-[#00F0FF] transition-colors">Project Omega Platform</Link></li>
              <li><Link href="/systems/sentinel-auth-hub" className="hover:text-[#00F0FF] transition-colors">Sentinel Unified Auth</Link></li>
            </ul>
          </div>

          {/* Platform & Stack */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tabular text-white uppercase tracking-wider">Platform & Architecture</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/playground" className="hover:text-[#00F0FF] transition-colors text-[#00F0FF] font-semibold">Live Sandbox Playground ⚡</Link></li>
              <li><Link href="/systems" className="hover:text-[#00F0FF] transition-colors">Full Systems Catalog</Link></li>
              <li><Link href="/compare" className="hover:text-[#00F0FF] transition-colors">Compare & Benchmark Matrix</Link></li>
              <li><Link href="/deploy-config" className="hover:text-[#00F0FF] transition-colors">Deploy Config Generator</Link></li>
              <li><Link href="/pipelines" className="hover:text-[#00F0FF] transition-colors">Architecture Pipelines</Link></li>
              <li><Link href="/docs" className="hover:text-[#00F0FF] transition-colors">API & System Docs</Link></li>
            </ul>
          </div>

          {/* Legal & SLA */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tabular text-white uppercase tracking-wider">Licensing & Status</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/vault" className="hover:text-[#00F0FF] transition-colors text-[#00F0FF] font-semibold">Customer License Vault</Link></li>
              <li><Link href="/changelog" className="hover:text-[#00F0FF] transition-colors text-[#00F0FF] font-semibold">Release Changelog v2.4</Link></li>
              <li><Link href="/verify" className="hover:text-[#00F0FF] transition-colors">License Verification Portal</Link></li>
              <li><Link href="/checkout" className="hover:text-[#00F0FF] transition-colors">Checkout & IP Acquisition</Link></li>
              <li><Link href="/operations" className="hover:text-[#00F0FF] transition-colors">System Operational Status</Link></li>
              <li><Link href="/terms" className="hover:text-[#00F0FF] transition-colors">Commercial License Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00F0FF] transition-colors">Privacy & Data Governance</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tabular text-[11px]">
          <div>
            © {new Date().getFullYear()} SUTRA / NEXUS ENTERPRISE MARKETPLACE. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-[#94A3B8]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/sitemap.ts" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
