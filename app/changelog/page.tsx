"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  GitCommit,
  Tag,
  Search,
  Rss,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  FileCode,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Filter,
  Layers,
  Copy,
  Check,
  Code2,
  AlertOctagon,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Terminal,
  Activity,
  FileDiff
} from "lucide-react";
import { getAllSystems } from "@/data/systems";

type ReleaseCategory = "SECURITY PATCH" | "CORE FEATURE" | "PERFORMANCE P99" | "BREAKING CHANGE";

interface GitDiffLine {
  type: "add" | "del" | "ctx";
  content: string;
}

interface ReleaseItem {
  version: string;
  subBadge: string;
  commitHash: string;
  isoDate: string;
  category: ReleaseCategory;
  systemSlug: string; // or "all"
  systemName: string;
  title: string;
  description: string;
  highlights: string[];
  perfDelta: string;
  migrationGuide: string;
  diffSummary: string;
  diffLines: GitDiffLine[];
}

const changelogData: ReleaseItem[] = [
  {
    version: "v2.4.2",
    subBadge: "PROD_STABLE",
    commitHash: "git: 7b84c9f",
    isoDate: "2026-10-11T18:30:00Z",
    category: "PERFORMANCE P99",
    systemSlug: "telemetry-matrix",
    systemName: "Nexus Telemetry Matrix",
    title: "Kernel-Level PgBouncer Pipeline & Edge Telemetry Acceleration",
    description: "Re-engineered executive telemetry query pipelining with zero-copy stream decoders and connection pooler multiplexing.",
    highlights: [
      "Streamlined high-frequency metric ingestion with SIMD JSON deserializer.",
      "Optimized multi-tenant Postgres RLS query planner, eliminating sequential scans.",
      "Added automated cursor-spotlight canvas optimization with locked 60fps GPU compositing.",
      "Fixed sub-millisecond edge latency aggregation across APAC and EU PoPs."
    ],
    perfDelta: "P99 telemetry query latency reduced by 14% (from 14.1ms to 12.1ms). Connection pool memory footprint dropped by 22MB.",
    migrationGuide: "No breaking schema adjustments. Execute 'docker compose restart nexus-telemetry-app' for hot reload.",
    diffSummary: "+148 -32 lines in 6 files",
    diffLines: [
      { type: "ctx", content: "@@ -44,7 +44,11 @@ export async function ingestTelemetryStream(batch: MetricPayload[]) {" },
      { type: "del", content: "-  const rawResults = await db.query('SELECT * FROM telemetry_nodes WHERE active = true');" },
      { type: "add", content: "+  // Zero-copy pipelined batch execution with prepared transaction statement" },
      { type: "add", content: "+  const rawResults = await pooler.executePrepared('get_active_telemetry_batch', [batch.ids]);" },
      { type: "add", content: "+  telemetryCache.setMulti(batch.map(b => [b.id, b.value]), { ttl: 60 });" },
      { type: "ctx", content: "   return formatResponse(rawResults);" }
    ]
  },
  {
    version: "v2.4.0",
    subBadge: "ARCHITECTURE_UPGRADE",
    commitHash: "git: c1ffaf0",
    isoDate: "2026-10-08T14:22:00Z",
    category: "CORE FEATURE",
    systemSlug: "nexus-agent-orchestrator",
    systemName: "Nexus Agent Orchestrator",
    title: "Multi-Agent Orchestrator Shipped with Deterministic gVisor Sandboxes",
    description: "Initial production rollout of the self-healing multi-agent pipeline engine with isolated sandboxes, tool-calling verification, and MCP protocol compliance.",
    highlights: [
      "Autonomous reflection cycles: 450ms cycle with auto-rollback on contract violations.",
      "Upstash Redis vector memory integration for long-horizon session state persistence.",
      "Pre-integrated gRPC & REST tool bridges for external database interrogation.",
      "Interactive component playground released at /playground with mock telemetry terminal."
    ],
    perfDelta: "Agent execution throughput increased to 42,000 req/sec across 12 distributed worker nodes.",
    migrationGuide: "Ensure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are provisioned in your .env.production.",
    diffSummary: "+840 -115 lines in 18 files",
    diffLines: [
      { type: "ctx", content: "@@ -12,6 +12,18 @@ export class NexusAgentEngine {" },
      { type: "add", content: "+  private sandbox: GVisorSandboxCluster;" },
      { type: "add", content: "+  private vectorStore: UpstashVectorClient;" },
      { type: "add", content: "+" },
      { type: "add", content: "+  async dispatchGoal(objective: AgentGoal): Promise<ExecutionTrace> {" },
      { type: "add", content: "+    const plan = await this.planner.formulatePlan(objective);" },
      { type: "add", content: "+    return this.sandbox.executeIsolated(plan);" },
      { type: "add", content: "+  }" }
    ]
  },
  {
    version: "v2.3.4",
    subBadge: "SECURITY_LTS",
    commitHash: "git: ad80eb3",
    isoDate: "2026-09-26T09:15:00Z",
    category: "SECURITY PATCH",
    systemSlug: "all",
    systemName: "All Core Systems",
    title: "Cryptographic SHA-256 Vault Authority & OWASP Top 10 Mitigation",
    description: "Enterprise security audit patch introducing automated HMAC-SHA256 license attestation, CSRF honeypots, and strict Content-Security-Policy rules.",
    highlights: [
      "Zero-Knowledge public license verification terminal launched at /verify.",
      "Rotated all internal signing keys across edge clusters with automated TLS 1.3.",
      "Enforced row-level security (RLS) on all tenant-isolated Postgres tables.",
      "Strict Content-Security-Policy headers injected across Next.js 15 route handlers."
    ],
    perfDelta: "Zero measurable latency overhead (< 0.2ms cryptographic verification overhead).",
    migrationGuide: "No breaking API changes. Security patches are backward compatible with v2.x client SDKs.",
    diffSummary: "+320 -84 lines in 9 files",
    diffLines: [
      { type: "ctx", content: "@@ -88,6 +88,14 @@ export async function verifyLicenseKey(key: string): Promise<boolean> {" },
      { type: "del", content: "-  const isValid = legacyDatabaseLookup(key);" },
      { type: "add", content: "+  // Constant-time cryptographic HMAC comparison to prevent timing attacks" },
      { type: "add", content: "+  const calculatedHmac = crypto.createHmac('sha256', VAULT_SECRET).update(key).digest('hex');" },
      { type: "add", content: "+  return crypto.timingSafeEqual(Buffer.from(calculatedHmac), Buffer.from(storedSignature));" }
    ]
  },
  {
    version: "v2.3.0",
    subBadge: "FINTECH_RAILS",
    commitHash: "git: f1ef976",
    isoDate: "2026-09-12T11:45:00Z",
    category: "CORE FEATURE",
    systemSlug: "fintech-settlement-engine",
    systemName: "Apex Fintech Settlement Engine",
    title: "Dual-Entry Immutable Ledger with Native UPI & Automated GST Compliance",
    description: "Launched the sub-8ms immutable double-entry ledger engine with real-time Razorpay webhooks and automated 18% GST tax invoice dispatch.",
    highlights: [
      "Sub-8ms atomic transaction ledger verification with cryptographic audit trails.",
      "Automated Indian GSTR-1 compliant invoice generation with B2B GSTIN validation.",
      "Real-time webhook signature verification preventing idempotency replay attacks.",
      "Multi-currency conversion layer with persisted INR / USD state across the marketplace."
    ],
    perfDelta: "Throughput boosted to 48,000 transactions/sec with zero deadlock locks under concurrency tests.",
    migrationGuide: "Configure RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, and GSTIN_REGISTERED_NO in deploy settings.",
    diffSummary: "+612 -45 lines in 14 files",
    diffLines: [
      { type: "ctx", content: "@@ -1,5 +1,12 @@ export async function processLedgerTransaction(tx: Transaction) {" },
      { type: "add", content: "+  const ledgerEntry = await db.transaction(async (trx) => {" },
      { type: "add", content: "+    await trx.debitAccount(tx.sourceId, tx.amount);" },
      { type: "add", content: "+    await trx.creditAccount(tx.targetId, tx.amount);" },
      { type: "add", content: "+    return trx.recordImmutableAudit(tx);" },
      { type: "add", content: "+  });" }
    ]
  },
  {
    version: "v2.2.0",
    subBadge: "INFRA_BREAKING",
    commitHash: "git: 8891a2e",
    isoDate: "2026-08-30T16:00:00Z",
    category: "BREAKING CHANGE",
    systemSlug: "quantum-logistics-erp",
    systemName: "Quantum Logistics ERP",
    title: "Migration to Postgres PostGIS Geospatial Indexing & Thermal Fleet Telemetry",
    description: "Upgraded GPS fleet telemetry tracking to native PostGIS geometry columns, replacing legacy JSON coordinate arrays for 10x spatial search performance.",
    highlights: [
      "Replaced flat lat/lng columns with ST_Point PostGIS spatial indexes.",
      "Introduced live GPS fleet unit telemetry webhooks for 450+ multi-depot hubs.",
      "Thermal sensor thresholds with instant automated WhatsApp notification alerts.",
      "Upgraded WebSocket broker for sub-15ms live map location rebroadcasts."
    ],
    perfDelta: "Geofence radius spatial query execution dropped from 120ms to 4.2ms (28x speedup).",
    migrationGuide: "BREAKING: Database migration required. Run 'npx supabase db push' to apply PostGIS extensions and geometry column migrations.",
    diffSummary: "+420 -280 lines in 11 files",
    diffLines: [
      { type: "ctx", content: "@@ -14,7 +14,8 @@ CREATE TABLE fleet_telemetry_nodes (" },
      { type: "del", content: "-  latitude DOUBLE PRECISION NOT NULL," },
      { type: "del", content: "-  longitude DOUBLE PRECISION NOT NULL," },
      { type: "add", content: "+  location GEOMETRY(Point, 4326) NOT NULL," },
      { type: "add", content: "+  CREATE INDEX idx_fleet_geom ON fleet_telemetry_nodes USING GIST(location);" }
    ]
  },
  {
    version: "v2.0.0",
    subBadge: "INITIAL_PROD",
    commitHash: "git: 0012e87",
    isoDate: "2026-08-15T12:00:00Z",
    category: "CORE FEATURE",
    systemSlug: "all",
    systemName: "All Core Systems",
    title: "Project Omega Core Platform Release & Commercial Marketplace",
    description: "Initial public launch of the SUTRA / NEXUS enterprise marketplace with 6 audited production-grade systems and unencumbered commercial source IP.",
    highlights: [
      "Launched full Cybernetic Neo-Brutalism design system with Tailwind CSS & Lucide React.",
      "Clean-room Next.js 15 App Router architecture with zero external UI bloat.",
      "Interactive Architecture Blueprint viewer and API console at /developer.",
      "Commercial licensing portal with instant repository access."
    ],
    perfDelta: "Baseline established: 100% Lighthouse audit, sub-12ms edge query benchmarks.",
    migrationGuide: "Initial general availability release. No migration necessary.",
    diffSummary: "+14,200 lines across initial project repository",
    diffLines: [
      { type: "add", content: "+// SUTRA / NEXUS ENTERPRISE CORE V2.0 INITIAL COMMIT" },
      { type: "add", content: "+export const NEXUS_VERSION = '2.0.0';" }
    ]
  }
];

export default function ChangelogPage() {
  const allSystems = getAllSystems();

  // Filters state
  const [selectedSystem, setSelectedSystem] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedDiffs, setExpandedDiffs] = useState<Record<string, boolean>>({ "v2.4.2": true });
  const [copiedFeed, setCopiedFeed] = useState<boolean>(false);

  // Filtered changelog releases
  const filteredReleases = useMemo(() => {
    return changelogData.filter((item) => {
      // 1. System filter
      if (selectedSystem !== "all" && item.systemSlug !== "all" && item.systemSlug !== selectedSystem) {
        return false;
      }

      // 2. Category filter
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
        return false;
      }

      // 3. Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.version.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.systemName.toLowerCase().includes(q) ||
        item.highlights.some((h) => h.toLowerCase().includes(q)) ||
        item.commitHash.toLowerCase().includes(q)
      );
    });
  }, [selectedSystem, selectedCategory, searchQuery]);

  const toggleDiff = (ver: string) => {
    setExpandedDiffs((prev) => ({ ...prev, [ver]: !prev[ver] }));
  };

  const handleCopyFeedJson = () => {
    const feedJson = JSON.stringify(changelogData, null, 2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(feedJson);
    }
    setCopiedFeed(true);
    setTimeout(() => setCopiedFeed(false), 2200);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden font-sans">
      {/* Structural Neo-Brutalist Grid Lines & Scanlines */}
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent blur-[1px] animate-scanline pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">

        {/* ========================================================= */}
        {/* PAGE HEADER */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-xs font-mono font-bold text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
            <GitCommit className="w-4 h-4 text-[#00F0FF]" />
            <span>[ENGINEERING_STREAM // RELEASE_CHRONICLE]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-mono">
            ENGINEERING CHANGELOG &amp; TIMELINE
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            Chronological audit of platform commits, kernel security patches, P99 latency optimizations, and database migration guides.
          </p>

          {/* Quick Actions Feed Button */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={handleCopyFeedJson}
              className="px-4 py-2 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] min-h-[42px]"
            >
              <Code2 className="w-4 h-4" />
              <span>{copiedFeed ? "[JSON_FEED_COPIED_TO_CLIPBOARD]" : "[GET_CHANGELOG_FEED.JSON]"}</span>
            </button>

            <div className="px-3.5 py-2 rounded-none bg-[#0D111A] border-2 border-emerald-500 text-emerald-400 font-bold flex items-center space-x-2 shadow-[2px_2px_0px_0px_#10B981] min-h-[42px]">
              <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
              <span>[LATEST RELEASE: v2.4.2 // PROD_STABLE]</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 1. INTERACTIVE FILTER & VERSION MATRIX */}
        {/* ========================================================= */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#1A2234] space-y-5 font-mono">
          
          {/* Top Row: System Filter Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#00F0FF] font-bold uppercase flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>[FILTER BY SYSTEM MODULE]:</span>
              </span>
              <span className="text-slate-500 text-[10px] hidden sm:inline">6 FLAGSHIP SYSTEMS AVAILABLE</span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedSystem("all")}
                className={`px-3 py-1.5 rounded-none border-2 font-bold uppercase transition-all cursor-pointer ${
                  selectedSystem === "all"
                    ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]"
                    : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white hover:border-[#00F0FF]"
                }`}
              >
                [ALL SYSTEMS]
              </button>

              {allSystems.map((sys) => {
                const isSelected = selectedSystem === sys.slug;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setSelectedSystem(sys.slug)}
                    className={`px-3 py-1.5 rounded-none border-2 font-bold uppercase transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]"
                        : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white hover:border-[#00F0FF]"
                    }`}
                  >
                    [{sys.name.split(" ")[0]}]
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Category Tags & Search Input */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-3 border-t border-[#1A2234]">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] font-bold mr-1 hidden sm:inline">[CATEGORY]:</span>
              
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className={`px-2.5 py-1.5 rounded-none border-2 font-bold uppercase transition-all cursor-pointer text-[11px] ${
                  selectedCategory === "ALL"
                    ? "bg-white text-black border-white shadow-[2px_2px_0px_0px_#FFFFFF]"
                    : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white"
                }`}
              >
                ALL
              </button>

              {(["SECURITY PATCH", "CORE FEATURE", "PERFORMANCE P99", "BREAKING CHANGE"] as ReleaseCategory[]).map((cat) => {
                const isSelected = selectedCategory === cat;
                const activeColor =
                  cat === "SECURITY PATCH"
                    ? "bg-emerald-500 text-black border-emerald-500 shadow-[2px_2px_0px_0px_#10B981]"
                    : cat === "BREAKING CHANGE"
                    ? "bg-red-500 text-white border-red-500 shadow-[2px_2px_0px_0px_#EF4444]"
                    : cat === "PERFORMANCE P99"
                    ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]"
                    : "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[2px_2px_0px_0px_#8B5CF6]";

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1.5 rounded-none border-2 font-bold uppercase transition-all cursor-pointer text-[11px] ${
                      isSelected
                        ? activeColor
                        : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white"
                    }`}
                  >
                    [{cat}]
                  </button>
                );
              })}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-3.5 h-3.5 text-[#00F0FF] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commits, CVEs, tags..."
                className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none pl-9 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>

          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-[#1A2234]">
            <span>[DISPLAYING {filteredReleases.length} OF {changelogData.length} RELEASE ENTRIES]</span>
            <span className="text-[#00F0FF] font-bold">
              SYS: {selectedSystem.toUpperCase()} // CAT: {selectedCategory}
            </span>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 2. CHRONOLOGICAL RELEASE FEED WITH GLOWING SPINE */}
        {/* ========================================================= */}
        <div className="relative border-l-2 border-[#00F0FF]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          
          {filteredReleases.length > 0 ? (
            filteredReleases.map((rel) => {
              const isDiffOpen = !!expandedDiffs[rel.version];

              // Badge color scheme
              const badgeColors =
                rel.category === "SECURITY PATCH"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500"
                  : rel.category === "BREAKING CHANGE"
                  ? "bg-red-500/10 text-red-400 border-red-500"
                  : rel.category === "PERFORMANCE P99"
                  ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]"
                  : "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]";

              const spineDotColor =
                rel.category === "SECURITY PATCH"
                  ? "bg-emerald-400 border-emerald-400 shadow-[0_0_8px_#10B981]"
                  : rel.category === "BREAKING CHANGE"
                  ? "bg-red-500 border-red-500 shadow-[0_0_8px_#EF4444]"
                  : "bg-[#00F0FF] border-[#00F0FF] shadow-[0_0_8px_#00F0FF]";

              return (
                <div key={rel.version} className="relative group font-mono">
                  
                  {/* Glowing Neon Timeline Node */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[47px] top-2 w-6 h-6 rounded-none flex items-center justify-center border-2 text-black transition-all ${spineDotColor}`}
                  >
                    <GitCommit className="w-3.5 h-3.5" />
                  </div>

                  {/* Release Card Container */}
                  <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1A2234] group-hover:border-[#00F0FF] group-hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all space-y-5">
                    
                    {/* Top Bar: Version, Badge, Commit, ISO Date */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#1A2234] pb-4">
                      
                      {/* Left: Version & Badges */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          [{rel.version}]
                        </span>

                        <span className="text-[10px] px-2 py-0.5 bg-[#07090E] text-slate-300 border border-[#1A2234] font-bold">
                          {rel.subBadge}
                        </span>

                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-none border-2 uppercase ${badgeColors}`}>
                          [{rel.category}]
                        </span>
                      </div>

                      {/* Right: Commit Hash & ISO Monospace Date */}
                      <div className="flex items-center space-x-3 text-xs text-slate-400">
                        <span className="text-[#00F0FF] font-bold bg-[#07090E] px-2 py-1 border border-[#1A2234]">
                          {rel.commitHash}
                        </span>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <span className="text-slate-300 text-[11px] font-bold bg-[#07090E] px-2 py-1 border border-[#1A2234] select-all">
                          {rel.isoDate}
                        </span>
                      </div>

                    </div>

                    {/* Title & Target System Module */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] text-[#00F0FF] font-bold uppercase tracking-wider flex items-center space-x-2">
                        <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>MODULE: {rel.systemName}</span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors uppercase">
                        {rel.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                        {rel.description}
                      </p>
                    </div>

                    {/* Highlights Grid */}
                    <div className="space-y-2 pt-2 border-t border-[#1A2234]">
                      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                        [ENGINEERING HIGHLIGHTS]:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {rel.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="bg-[#07090E] p-2.5 border border-[#1A2234] text-slate-300 flex items-start space-x-2"
                          >
                            <span className="text-[#00F0FF] font-bold shrink-0">›</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Delta Callout */}
                    <div className="p-3 bg-[#07090E] border-2 border-[#1A2234] flex items-start space-x-3 text-xs">
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-emerald-400 font-bold uppercase mr-1">[PERFORMANCE DELTA]:</span>
                        <span className="text-slate-200">{rel.perfDelta}</span>
                      </div>
                    </div>

                    {/* Migration Guide Callout */}
                    <div className="p-3 bg-[#07090E] border-2 border-[#1A2234] flex items-start space-x-3 text-xs">
                      <Terminal className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#8B5CF6] font-bold uppercase mr-1">[MIGRATION GUIDE]:</span>
                        <span className="text-slate-300">{rel.migrationGuide}</span>
                      </div>
                    </div>

                    {/* Collapsible Git Commit Diff Summary */}
                    <div className="pt-2 border-t border-[#1A2234] space-y-2">
                      <button
                        type="button"
                        onClick={() => toggleDiff(rel.version)}
                        className="w-full py-2 px-3 bg-[#07090E] hover:bg-[#1A2234] border border-[#1A2234] hover:border-[#00F0FF] flex items-center justify-between text-xs transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <FileDiff className="w-4 h-4 text-[#00F0FF]" />
                          <span className="font-bold text-white uppercase">[COMMIT DIFF SUMMARY]:</span>
                          <span className="text-slate-400 text-[11px]">{rel.diffSummary}</span>
                        </div>
                        {isDiffOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#00F0FF]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {isDiffOpen && (
                        <div className="p-3 bg-[#07090E] border border-[#1A2234] overflow-x-auto text-xs leading-5">
                          <pre className="font-mono">
                            {rel.diffLines.map((line, lIdx) => (
                              <div
                                key={lIdx}
                                className={
                                  line.type === "add"
                                    ? "text-emerald-400 bg-emerald-500/10 px-1"
                                    : line.type === "del"
                                    ? "text-red-400 bg-red-500/10 px-1"
                                    : "text-slate-500"
                                }
                              >
                                {line.content}
                              </div>
                            ))}
                          </pre>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })
          ) : (
            <div className="p-10 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-center space-y-4 font-mono text-xs shadow-[4px_4px_0px_0px_#1A2234]">
              <div className="text-[#00F0FF] font-bold">[NO RELEASES MATCH ACTIVE FILTERS]</div>
              <p className="text-slate-400">Zero release notes found for the selected module and category criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSystem("all");
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="px-4 py-2 bg-[#00F0FF] text-black font-bold uppercase tracking-wider border-2 border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF] cursor-pointer"
              >
                [RESET ALL FILTERS]
              </button>
            </div>
          )}

        </div>

        {/* ========================================================= */}
        {/* BOTTOM ENTERPRISE CTA */}
        {/* ========================================================= */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#00F0FF] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#00F0FF] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black text-white uppercase">
              Need custom hotfixes or on-premise SLA deployment?
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Our lead systems architects provide private patches and dedicated enterprise git repos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/operations"
              className="px-5 py-3 rounded-none bg-[#07090E] hover:bg-[#1A2234] text-slate-300 hover:text-white border-2 border-[#1A2234] text-xs font-bold transition-all min-h-[44px] flex items-center justify-center"
            >
              <span>[CHECK SYSTEM NOC STATUS]</span>
            </Link>

            <Link
              href="/playground"
              className="px-6 py-3 rounded-none bg-[#00F0FF] hover:bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] hover:border-white shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] transition-all min-h-[44px] flex items-center justify-center"
            >
              <span>[LAUNCH SANDBOX ⚡]</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
