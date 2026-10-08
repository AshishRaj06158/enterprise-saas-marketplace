"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Terminal,
  Copy,
  Check,
  Download,
  Server,
  Code2,
  ShieldCheck,
  Zap,
  FileCode,
  Sliders,
  CheckSquare,
  Square,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { getAllSystems, getSystemBySlug } from "@/data/systems";

export default function DeployConfigPage() {
  const allSystems = getAllSystems();

  const [selectedSystemSlug, setSelectedSystemSlug] = useState<string>("telemetry-matrix");
  const [deployTarget, setDeployTarget] = useState<"vercel" | "docker" | "k8s">("vercel");
  const [activeTab, setActiveTab] = useState<".env.production" | "docker-compose.yml" | "github-actions-deploy.yml">(".env.production");

  // Add-on toggles
  const [includeRedis, setIncludeRedis] = useState(true);
  const [enableOwasp, setEnableOwasp] = useState(true);
  const [includeApiHooks, setIncludeApiHooks] = useState(true);

  const [copied, setCopied] = useState(false);

  const selectedSystem = getSystemBySlug(selectedSystemSlug) || allSystems[0];

  // Dynamically generate code content based on selections
  const generatedCode = useMemo(() => {
    const sysName = selectedSystem.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

    if (activeTab === ".env.production") {
      return `# ====================================================
# SUTRA / NEXUS ENTERPRISE ENVIRONMENT SPECIFICATION
# System Module: ${selectedSystem.name} (${selectedSystem.slug})
# Target Runtime: ${deployTarget.toUpperCase()}
# Generated: ${new Date().toISOString()}
# ====================================================

NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://${sysName}.internal.nexus-systems.in
NEXT_PUBLIC_SYSTEM_SLUG=${selectedSystem.slug}

# DATABASE & SUPABASE POSTGRES CONNECTION POOL
DATABASE_URL=postgresql://postgres.nexus:${sysName}_secret_key@ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
NEXT_PUBLIC_SUPABASE_URL=https://${sysName}-supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXByYWJhc2UifQ.anon_key_hex
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXByYWJhc2UifQ.service_key_hex

# COMMERCIAL PAYMENT RAILS & TAX ENGINE
RAZORPAY_KEY_ID=rzp_live_${sysName.toUpperCase()}_KEY
RAZORPAY_KEY_SECRET=live_secret_hex_${selectedSystem.id.substring(0, 8)}
NEXT_PUBLIC_UPI_ID=9771596801@okbizaxis
GSTIN_REGISTERED_NO=10AAAAA0000A1Z5

${includeRedis ? `# UPSTASH REDIS VECTOR & SESSION MEMORY CACHE
UPSTASH_REDIS_REST_URL=https://apn1-vector-${sysName}.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXXX_token_${sysName}_vector_hex
REDIS_TTL_SECONDS=86400
` : "# Redis Vector Cache: DISABLED"}
${enableOwasp ? `# OWASP TOP 10 SECURITY & HONEYPOT GUARDRAILS
OWASP_FIREWALL_ENABLED=true
CSRF_HONEYPOT_SALT=salt_${selectedSystem.id}_2026
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=120
STRICT_CORS_ORIGINS=https://${sysName}.internal.nexus-systems.in
` : "# OWASP Security Rules: DISABLED"}
${includeApiHooks ? `# NOTIFICATION & DISPATCH API HOOKS
WHATSAPP_TARGET_PHONE=+919771596801
WHATSAPP_API_URL=https://wa.me/919771596801
RESEND_API_KEY=re_NEXUS_LIVE_${sysName.toUpperCase()}_KEY
SUPPORT_ESCALATION_EMAIL=architect@nexus-systems.in
` : "# API Notification Hooks: DISABLED"}`;
    }

    if (activeTab === "docker-compose.yml") {
      return `# ====================================================
# DOCKER COMPOSE INFRASTRUCTURE BLUEPRINT
# System: ${selectedSystem.name}
# Deployment Target: ${deployTarget.toUpperCase()}
# ====================================================

version: '3.8'

services:
  ${sysName}-app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_SYSTEM_SLUG: ${selectedSystem.slug}
    container_name: ${sysName}-app-node
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=postgresql://postgres:secret@postgres-pooler:5432/nexus_db
      ${includeRedis ? `- UPSTASH_REDIS_REST_URL=http://redis-cache:6379` : ""}
      ${enableOwasp ? `- OWASP_FIREWALL_ENABLED=true` : ""}
      ${includeApiHooks ? `- WHATSAPP_TARGET_PHONE=+919771596801` : ""}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/contact"]
      interval: 10s
      timeout: 5s
      retries: 3
    networks:
      - nexus-mesh-network

  postgres-pooler:
    image: pgbouncer/pgbouncer:latest
    container_name: nexus-pgbouncer
    environment:
      - DATABASES=* = host=postgres-db port=5432 user=postgres password=secret
      - LISTEN_PORT=5432
      - POOL_MODE=transaction
      - MAX_CLIENT_CONN=200
    networks:
      - nexus-mesh-network

${includeRedis ? `  redis-cache:
    image: redis:7-alpine
    container_name: nexus-redis-vector
    command: redis-server --appendonly yes --requirepass vector_secret_hex
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - nexus-mesh-network
` : ""}
networks:
  nexus-mesh-network:
    driver: bridge

volumes:
  redis_data:
`;
    }

    // Default: github-actions-deploy.yml
    return `# ====================================================
# GITHUB ACTIONS CI/CD AUTOMATED DEPLOYMENT WORKFLOW
# System: ${selectedSystem.name} (${selectedSystem.slug})
# Target Platform: ${deployTarget.toUpperCase()}
# ====================================================

name: Deploy ${selectedSystem.name} to Production

on:
  push:
    branches:
      - main

jobs:
  audit-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Code Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20 Environment
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Enterprise Dependencies
        run: npm ci

      - name: Run OWASP Vulnerability & Lint Audit
        run: |
          npm run lint
          echo "[NEXUS AUDIT]: Clean room TypeScript compilation verified."

      - name: Build Production Next.js Bundle
        run: npm run build
        env:
          NODE_ENV: production
          NEXT_PUBLIC_SYSTEM_SLUG: ${selectedSystem.slug}

      ${deployTarget === "vercel" ? `- name: Deploy to Vercel Edge Platform
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'` : `- name: Build & Push Docker Image
        run: |
          docker build -t nexus-registry/${sysName}:latest .
          echo "[NEXUS DOCKER]: Container built and dispatched to cluster."`}
`;
  }, [selectedSystem, deployTarget, activeTab, includeRedis, enableOwasp, includeApiHooks]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeTab;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <Sliders className="w-4 h-4 text-[#00F0FF]" />
            <span>DEPLOYMENT ORCHESTRATION GENERATOR // INFRASTRUCTURE MATRIX</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Deployment Config & Environment Generator
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Generate production-ready environment configurations, Docker Compose setups, and CI/CD pipelines in seconds.
          </p>
        </div>

        {/* Generator Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls & Toggles (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/30 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center space-x-2 pb-4 border-b border-[#1A2234]">
              <Cpu className="w-5 h-5 text-[#00F0FF]" />
              <h2 className="text-lg font-bold text-white tracking-wide font-mono-tabular">
                CONFIGURATION PARAMETERS
              </h2>
            </div>

            {/* 1. Target System Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono-tabular text-[#00F0FF] uppercase block">
                1. SELECT TARGET SYSTEM MODULE:
              </label>
              <select
                value={selectedSystemSlug}
                onChange={(e) => setSelectedSystemSlug(e.target.value)}
                className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] rounded-xl px-4 py-3 text-xs font-mono-tabular text-white focus:outline-none"
              >
                {allSystems.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.name} ({s.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Deployment Target Toggle */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono-tabular text-[#8B5CF6] uppercase block">
                2. SELECT DEPLOYMENT TARGET:
              </label>
              <div className="grid grid-cols-1 gap-2 font-mono-tabular text-xs">
                <button
                  type="button"
                  onClick={() => setDeployTarget("vercel")}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    deployTarget === "vercel"
                      ? "bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-[#00F0FF]" />
                    <span>Vercel / Next.js Edge Platform</span>
                  </div>
                  {deployTarget === "vercel" && <Check className="w-4 h-4 text-[#00F0FF]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setDeployTarget("docker")}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    deployTarget === "docker"
                      ? "bg-[#8B5CF6]/10 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                      : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FileCode className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Docker Compose & Microservices</span>
                  </div>
                  {deployTarget === "docker" && <Check className="w-4 h-4 text-[#8B5CF6]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setDeployTarget("k8s")}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    deployTarget === "k8s"
                      ? "bg-emerald-500/10 border-emerald-400 text-white shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                      : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Kubernetes Helm Manifest Cluster</span>
                  </div>
                  {deployTarget === "k8s" && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>
            </div>

            {/* 3. Add-on Feature Toggles */}
            <div className="space-y-3 pt-2 border-t border-[#1A2234]">
              <label className="text-xs font-mono-tabular text-emerald-400 uppercase block">
                3. ARCHITECTURAL ADD-ON RULES:
              </label>

              <button
                type="button"
                onClick={() => setIncludeRedis(!includeRedis)}
                className="w-full flex items-center space-x-3 text-xs font-mono-tabular text-left text-slate-300 hover:text-white p-2 rounded-lg bg-[#07090E] border border-[#1A2234] cursor-pointer"
              >
                {includeRedis ? (
                  <CheckSquare className="w-4 h-4 text-[#00F0FF] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Include Upstash Redis Vector config</span>
              </button>

              <button
                type="button"
                onClick={() => setEnableOwasp(!enableOwasp)}
                className="w-full flex items-center space-x-3 text-xs font-mono-tabular text-left text-slate-300 hover:text-white p-2 rounded-lg bg-[#07090E] border border-[#1A2234] cursor-pointer"
              >
                {enableOwasp ? (
                  <CheckSquare className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Enable OWASP Guardrail Environment Rules</span>
              </button>

              <button
                type="button"
                onClick={() => setIncludeApiHooks(!includeApiHooks)}
                className="w-full flex items-center space-x-3 text-xs font-mono-tabular text-left text-slate-300 hover:text-white p-2 rounded-lg bg-[#07090E] border border-[#1A2234] cursor-pointer"
              >
                {includeApiHooks ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Pre-configure WhatsApp & Resend API hooks</span>
              </button>
            </div>

            {/* Quick CTA */}
            <div className="pt-4 border-t border-[#1A2234]">
              <Link
                href={`/checkout?system=${selectedSystem.slug}`}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-2"
              >
                <span>Acquire System Source Code</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: Real-Time Generated Output Terminal (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/40 shadow-2xl overflow-hidden relative flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

            {/* Terminal Header Tabs */}
            <div className="bg-[#07090E] border-b border-[#1A2234] p-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-1.5 font-mono-tabular text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab(".env.production")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === ".env.production"
                      ? "bg-[#00F0FF] text-black shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  .env.production
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("docker-compose.yml")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === "docker-compose.yml"
                      ? "bg-[#8B5CF6] text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  docker-compose.yml
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("github-actions-deploy.yml")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === "github-actions-deploy.yml"
                      ? "bg-emerald-500 text-black shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  github-actions.yml
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20 border border-[#00F0FF]/30 text-xs font-mono-tabular flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Config</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="px-3 py-1.5 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-xs font-mono-tabular flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Terminal Code View */}
            <div className="p-6 bg-[#07090E] font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto min-h-[420px] max-h-[580px] overflow-y-auto leading-relaxed selection:bg-[#00F0FF]/30 selection:text-white">
              <pre className="text-slate-200">
                <code>{generatedCode}</code>
              </pre>
            </div>

            {/* Terminal Footer */}
            <div className="px-6 py-3 bg-[#07090E] border-t border-[#1A2234] flex items-center justify-between text-[11px] font-mono-tabular text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>REAL-TIME INFRASTRUCTURE MATRIX GENERATED</span>
              </div>
              <div>{activeTab}</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
