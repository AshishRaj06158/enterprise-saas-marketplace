"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Cpu,
  Server,
  Database,
  ShieldCheck,
  Terminal,
  Code2,
  Key,
  Webhook,
  Send,
  Copy,
  Check,
  ExternalLink,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Radio,
  Zap,
  Plus,
  X,
  Eye,
  EyeOff,
  ChevronRight,
  Activity
} from "lucide-react";
import { getAllSystems, getSystemBySlug, SystemProduct } from "@/data/systems";
import { useCurrency } from "@/context/CurrencyContext";

type DeveloperTab = "blueprint" | "explorer" | "keys" | "webhooks";
type CodeLanguage = "curl" | "typescript" | "python";
type ApiEndpointType = "auth" | "ingest" | "webhooks" | "health";

interface HldNode {
  id: string;
  tier: "Client / Edge" | "API Gateway" | "Worker / Cache" | "Database / Storage";
  title: string;
  component: string;
  description: string;
  latency: string;
  protocol: string;
  cacheTtl: string;
  security: string;
  throughput: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  type: "production" | "test";
  scopes: string[];
  created: string;
  lastUsed: string;
}

const initialKeys: ApiKey[] = [
  {
    id: "key-1",
    name: "Production Marketplace Integration",
    key: "nx_live_98a142f82026e6e4d261e7dd4348f1",
    maskedKey: "nx_live_98a...48f1",
    type: "production",
    scopes: ["Read Catalog", "Verify License", "Dispatch Webhooks"],
    created: "2026-09-15",
    lastUsed: "2 mins ago"
  },
  {
    id: "key-2",
    name: "Staging Test Sandbox Token",
    key: "nx_test_41c099b28891a2e450ad80eb344b99b2",
    maskedKey: "nx_test_41c...99b2",
    type: "test",
    scopes: ["Read Catalog", "Dispatch Webhooks"],
    created: "2026-10-01",
    lastUsed: "Just now"
  }
];

export default function DeveloperConsolePage() {
  const allSystems = getAllSystems();
  const [selectedSystemSlug, setSelectedSystemSlug] = useState<string>("telemetry-matrix");
  const selectedSystem: SystemProduct =
    getSystemBySlug(selectedSystemSlug) || allSystems[0];

  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<DeveloperTab>("blueprint");

  // Blueprint Architecture HLD State
  const [selectedNodeId, setSelectedNodeId] = useState<string>("edge");

  // API Explorer State
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpointType>("ingest");
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>("curl");
  const [copiedCodeNotice, setCopiedCodeNotice] = useState(false);

  // API Keys state
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyType, setNewKeyType] = useState<"production" | "test">("production");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Read Catalog",
    "Verify License"
  ]);

  // Webhook State
  const [webhookUrl, setWebhookUrl] = useState(
    "https://api.yourdomain.com/webhooks/nexus"
  );
  const [signingSecret] = useState(
    "whsec_99a8b7c6d5e4f3a210fedcba9876543210"
  );
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<any | null>(null);

  // Generate HLD nodes customized for each system
  const getSystemHldNodes = (sys: SystemProduct): HldNode[] => {
    switch (sys.slug) {
      case "telemetry-matrix":
        return [
          {
            id: "edge",
            tier: "Client / Edge",
            title: "Global Edge Nodes",
            component: "Vercel Edge Network (300+ PoPs)",
            description: "Terminates TLS 1.3, executes geo-routing, and performs pre-flight JWT auth check.",
            latency: "< 2.8ms",
            protocol: "HTTP/3 & QUIC",
            cacheTtl: "30s (Stale-While-Revalidate)",
            security: "DDoS Mitigation & TLS 1.3 Strict",
            throughput: "150,000 req/sec"
          },
          {
            id: "gateway",
            tier: "API Gateway",
            title: "Observability Gateway",
            component: "Next.js 15 App Router Edge Middleware",
            description: "Enforces OWASP Top 10 honeypots, rate-limiting tokens, and request schema parsing.",
            latency: "< 3.5ms",
            protocol: "gRPC / REST",
            cacheTtl: "Zero-Cache (Real-Time Pass)",
            security: "OWASP Top 10 Hardened",
            throughput: "85,000 req/sec"
          },
          {
            id: "worker",
            tier: "Worker / Cache",
            title: "Telemetry Stream Aggregator",
            component: "Upstash Redis Ring Buffer & Vector Stream",
            description: "High-frequency metric sliding-window rollup, P99 calculating workers, and Kafka stream sync.",
            latency: "< 4.1ms",
            protocol: "Redis RESP3 / TCP",
            cacheTtl: "60s Window Buffer",
            security: "VPC Peered & Encrypted at Rest",
            throughput: "120,000 ops/sec"
          },
          {
            id: "database",
            tier: "Database / Storage",
            title: "Multi-Tenant Postgres RLS",
            component: "Supabase Postgres + Connection Pooler (120 Slots)",
            description: "Sub-12ms indexed event nodes, strict tenant isolation via Postgres Row Level Security.",
            latency: "< 11.2ms (P99)",
            protocol: "PostgreSQL Wire Protocol",
            cacheTtl: "Buffer Cache 99.8% Hit",
            security: "Row Level Security (RLS) + SOC2 Type II",
            throughput: "28,500 req/sec"
          }
        ];
      case "nexus-agent-orchestrator":
        return [
          {
            id: "edge",
            tier: "Client / Edge",
            title: "Agent Host & MCP Client",
            component: "Desktop / Browser MCP Client Gateway",
            description: "Initiates Model Context Protocol (MCP) tool sessions and WebSocket streaming channels.",
            latency: "< 5.2ms",
            protocol: "WebSocket (WSS) / JSON-RPC",
            cacheTtl: "Ephemeral Session Lifetime",
            security: "Mutual TLS + Ephemeral Session Keys",
            throughput: "45,000 conn/sec"
          },
          {
            id: "gateway",
            tier: "API Gateway",
            title: "Prompt Injection Firewall",
            component: "OWASP LLM01 Security Shield Gateway",
            description: "Scans inbound agent prompts for jailbreak patterns, jailbreak injection vectors, and honeypot traps.",
            latency: "< 6.8ms",
            protocol: "gRPC / HTTPS",
            cacheTtl: "10s Prompt Hash Deduplication",
            security: "100% OWASP for LLM Mitigation",
            throughput: "60,000 req/sec"
          },
          {
            id: "worker",
            tier: "Worker / Cache",
            title: "Reflection & Vector Search Engine",
            component: "Upstash Redis Vector & Tool Dispatcher",
            description: "Deterministic tool routing loop, 1536-dim semantic context compression, and state management.",
            latency: "< 18.0ms",
            protocol: "Redis RESP3 & HTTP/2",
            cacheTtl: "Session Stateful Vector Store",
            security: "Scoped API Key Auto-Rotator",
            throughput: "80,000 ops/sec"
          },
          {
            id: "database",
            tier: "Database / Storage",
            title: "Execution Ledger & Vault",
            component: "Postgres Realtime Ledger + SHA-256 Hashes",
            description: "Immutable agent execution traces, tool output audits, and cryptographically locked states.",
            latency: "< 14.5ms",
            protocol: "PostgreSQL Wire / RLS",
            cacheTtl: "Persistent Audit Log",
            security: "SHA-256 Merkle Ledger Signatures",
            throughput: "24,100 req/sec"
          }
        ];
      case "quantum-logistics-erp":
        return [
          {
            id: "edge",
            tier: "Client / Edge",
            title: "Depot Sensors & GPS Telemetry",
            component: "IoT MQTT Broker & Thermal Depot Probes",
            description: "Ingests real-time GPS locations from 450+ fleet units and -20°C warehouse thermal probes.",
            latency: "< 8.4ms",
            protocol: "MQTT over TLS / HTTPS",
            cacheTtl: "15s Sensor Sliding Window",
            security: "Device X.509 Certificate Auth",
            throughput: "65,000 msg/sec"
          },
          {
            id: "gateway",
            tier: "API Gateway",
            title: "Fleet Gateway & Webhook Relay",
            component: "Next.js 15 Gateway + Geo-Fencing Engine",
            description: "Parses boundary deviations, triggers GSTR-1 e-way bill generation, and dispatches driver webhooks.",
            latency: "< 9.2ms",
            protocol: "REST & Webhook Dispatch",
            cacheTtl: "No Cache (Real-Time Safety)",
            security: "RBAC (Depot Manager, Driver, Admin)",
            throughput: "40,000 req/sec"
          },
          {
            id: "worker",
            tier: "Worker / Cache",
            title: "Spatial Event Processor",
            component: "BullMQ Distributed Workers & Redis Cluster",
            description: "Thermal breach alert notifications, route calculation, and automated delivery manifest assembly.",
            latency: "< 12.0ms",
            protocol: "Redis Cluster / Celery Queue",
            cacheTtl: "Active Shift Buffer",
            security: "ISO-27001 Audited Pipeline",
            throughput: "50,000 ops/sec"
          },
          {
            id: "database",
            tier: "Database / Storage",
            title: "PostGIS Spatial Database",
            component: "PostgreSQL Multi-Tenant Spatial Index",
            description: "Stores multi-depot inventory states, thermal audit trails, and automated GSTR-1 tax compliance files.",
            latency: "< 24.0ms",
            protocol: "PostgreSQL Spatial Indexing",
            cacheTtl: "Buffer Cache 99.2%",
            security: "Row Level Security + Daily GCS Sync",
            throughput: "16,200 req/sec"
          }
        ];
      default:
        return [
          {
            id: "edge",
            tier: "Client / Edge",
            title: "Edge Client Tier",
            component: "Vercel Edge Global Mesh",
            description: "Distributed reverse proxy and static asset delivery with zero-config CDN caching.",
            latency: "< 3.0ms",
            protocol: "HTTP/3 & TLS 1.3",
            cacheTtl: "Edge Cache Enabled",
            security: "DDoS Shield & HTTPS Enforced",
            throughput: "100,000 req/sec"
          },
          {
            id: "gateway",
            tier: "API Gateway",
            title: "Payment & App Gateway",
            component: "Next.js 15 App Router API Core",
            description: "Unified router verifying UPI Intent, Razorpay webhooks, and session bearer tokens.",
            latency: "< 6.5ms",
            protocol: "REST / HTTPS",
            cacheTtl: "No-Cache (Transactional)",
            security: "AES-256 Vault & CSRF Honeypot",
            throughput: "70,000 req/sec"
          },
          {
            id: "worker",
            tier: "Worker / Cache",
            title: "Async Settlement Worker",
            component: "Redis Queue & Background Job Engine",
            description: "Dispatches tax-compliant PDF invoices, sends email alerts, and syncs payment states.",
            latency: "< 8.5ms",
            protocol: "Redis RESP3 / Background Worker",
            cacheTtl: "Job Queue TTL",
            security: "HMAC Signed Webhooks",
            throughput: "55,000 ops/sec"
          },
          {
            id: "database",
            tier: "Database / Storage",
            title: "Supabase Postgres Store",
            component: "Postgres RLS Database & Vault",
            description: "Stores relational schema entities, licenses, and GSTR-1 tax invoices with RLS policies.",
            latency: "< 16.0ms",
            protocol: "PostgreSQL Wire Protocol",
            cacheTtl: "Transaction Isolation Level 3",
            security: "100% OWASP Top 10 RLS Policies",
            throughput: "22,400 req/sec"
          }
        ];
    }
  };

  const hldNodes = getSystemHldNodes(selectedSystem);
  const activeNode = hldNodes.find((n) => n.id === selectedNodeId) || hldNodes[0];

  // API Code snippets for the selected endpoint & language
  const getApiSnippet = (
    endpoint: ApiEndpointType,
    lang: CodeLanguage,
    sys: SystemProduct
  ): string => {
    const baseUrl = "https://nexuslab.vercel.app/api";
    const apiKeyHeader = "Authorization: Bearer nx_live_98a142f82026e6e4d261e7dd4348f1";

    if (endpoint === "auth") {
      if (lang === "curl") {
        return `curl -X POST "${baseUrl}/v2/${sys.slug}/auth" \\
  -H "Content-Type: application/json" \\
  -H "${apiKeyHeader}" \\
  -d '{
    "client_id": "nexus_enterprise_portal",
    "scope": "systems:execute telemetry:stream",
    "environment": "production"
  }'`;
      }
      if (lang === "typescript") {
        return `// TypeScript Next.js 15 / Fetch Client
const res = await fetch("${baseUrl}/v2/${sys.slug}/auth", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.NEXUS_API_KEY!
  },
  body: JSON.stringify({
    client_id: "nexus_enterprise_portal",
    scope: "systems:execute telemetry:stream",
    environment: "production"
  })
});

const session = await res.json();
console.log("[NEXUS_AUTH_SUCCESS]: Session Token Issued:", session.token);`;
      }
      return `# Python 3.10+ requests
import requests
import os

url = "${baseUrl}/v2/${sys.slug}/auth"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {os.environ.get('NEXUS_API_KEY')}"
}
payload = {
    "client_id": "nexus_enterprise_portal",
    "scope": "systems:execute telemetry:stream",
    "environment": "production"
}

response = requests.post(url, json=payload, headers=headers)
session = response.json()
print(f"[AUTH_OK]: Session Token: {session.get('token')}")`;
    }

    if (endpoint === "ingest") {
      if (lang === "curl") {
        return `curl -X POST "${baseUrl}/v2/${sys.slug}/events" \\
  -H "Content-Type: application/json" \\
  -H "${apiKeyHeader}" \\
  -H "X-Idempotency-Key: idemp_${Date.now()}" \\
  -d '{
    "system_slug": "${sys.slug}",
    "event_type": "telemetry.ingest.p99",
    "metrics": {
      "latency_target_ms": 11.2,
      "nodes_active": 4,
      "concurrency_limit": "${sys.concurrency}"
    },
    "compliance_mode": "SOC2_TYPE_II"
  }'`;
      }
      if (lang === "typescript") {
        return `// High-frequency Ingestion Engine
import { v4 as uuidv4 } from "uuid";

interface TelemetryPayload {
  system_slug: string;
  event_type: string;
  metrics: Record<string, number | string>;
  compliance_mode: string;
}

const payload: TelemetryPayload = {
  system_slug: "${sys.slug}",
  event_type: "telemetry.ingest.p99",
  metrics: {
    latency_target_ms: 11.2,
    nodes_active: 4,
    concurrency_limit: "${sys.concurrency}"
  },
  compliance_mode: "SOC2_TYPE_II"
};

const response = await fetch("${baseUrl}/v2/${sys.slug}/events", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.NEXUS_API_KEY!,
    "X-Idempotency-Key": uuidv4()
  },
  body: JSON.stringify(payload)
});

const data = await response.json();
console.log("[EVENT_COMMITTED]: SHA-256 Hash:", data.ledger_hash);`;
      }
      return `# Python Ingestion Client
import requests
import uuid

url = "${baseUrl}/v2/${sys.slug}/events"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {os.environ.get('NEXUS_API_KEY')}",
    "X-Idempotency-Key": str(uuid.uuid4())
}
payload = {
    "system_slug": "${sys.slug}",
    "event_type": "telemetry.ingest.p99",
    "metrics": {
        "latency_target_ms": 11.2,
        "nodes_active": 4,
        "concurrency_limit": "${sys.concurrency}"
    },
    "compliance_mode": "SOC2_TYPE_II"
}

resp = requests.post(url, json=payload, headers=headers)
print("Response:", resp.json())`;
    }

    if (endpoint === "webhooks") {
      if (lang === "curl") {
        return `curl -X POST "${baseUrl}/v2/${sys.slug}/webhooks" \\
  -H "Content-Type: application/json" \\
  -H "X-Nexus-Signature: t=1791483492,v1=9a8b7c6d5e4f3a210fedcba9876543210" \\
  -d '{
    "event": "license.activated",
    "system": "${sys.slug}",
    "license_id": "NEXUS-COMM-99A1-2026",
    "timestamp": "${new Date().toISOString()}"
  }'`;
      }
      if (lang === "typescript") {
        return `// Next.js 15 Route Handler for Inbound Nexus Webhook
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const signature = req.headers.get("x-nexus-signature") || "";

  // 1. Verify HMAC-SHA256 signature
  const hmac = crypto
    .createHmac("sha256", process.env.NEXUS_WEBHOOK_SECRET!)
    .update(bodyText)
    .digest("hex");

  if (!signature.includes(hmac)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(bodyText);
  console.log("[WEBHOOK_VERIFIED]:", payload.event, "for", payload.system);

  return NextResponse.json({ received: true, status: 200 });
}`;
      }
      return `# Flask / FastAPI Webhook Handler
from fastapi import FastAPI, Header, HTTPException, Request
import hmac
import hashlib
import os

app = FastAPI()
SECRET = os.environ.get("NEXUS_WEBHOOK_SECRET", "").encode()

@app.post("/webhooks/nexus")
async def handle_nexus_webhook(request: Request, x_nexus_signature: str = Header(...)):
    raw_body = await request.body()
    computed_sig = hmac.new(SECRET, raw_body, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(x_nexus_signature, computed_sig):
        raise HTTPException(status_code=401, detail="Signature verification failed")

    data = await request.json()
    return {"status": "verified", "event": data.get("event")}`;
    }

    // Health
    if (lang === "curl") {
      return `curl -X GET "${baseUrl}/v2/${sys.slug}/health" \\
  -H "${apiKeyHeader}"`;
    }
    if (lang === "typescript") {
      return `// Health Diagnostics Query
const res = await fetch("${baseUrl}/v2/${sys.slug}/health", {
  headers: { Authorization: "Bearer " + process.env.NEXUS_API_KEY! },
  cache: "no-store"
});
const health = await res.json();
console.log("[STATUS]:", health.status, "P99:", health.latency_ms + "ms");`;
    }
    return `# Python Health Query
import requests

url = "${baseUrl}/v2/${sys.slug}/health"
headers = {"Authorization": f"Bearer {os.environ.get('NEXUS_API_KEY')}"}
res = requests.get(url, headers=headers)
print("Health Status:", res.json())`;
  };

  const handleCopyCode = () => {
    const code = getApiSnippet(selectedEndpoint, selectedLanguage, selectedSystem);
    navigator.clipboard.writeText(code);
    setCopiedCodeNotice(true);
    setTimeout(() => setCopiedCodeNotice(false), 2000);
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const randomHash = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    const prefix = newKeyType === "production" ? "nx_live_" : "nx_test_";
    const fullKey = `${prefix}${randomHash}`;
    const masked = `${prefix}${randomHash.slice(0, 3)}...${randomHash.slice(-4)}`;

    const createdItem: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      key: fullKey,
      maskedKey: masked,
      type: newKeyType,
      scopes: [...selectedScopes],
      created: "Just now",
      lastUsed: "Never"
    };

    setKeys((prev) => [createdItem, ...prev]);
    setNewKeyName("");
    setIsModalOpen(false);
  };

  const copySigningSecret = () => {
    navigator.clipboard.writeText(signingSecret);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const toggleRevealKey = (id: string) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const displayPrice = formatPrice(selectedSystem.priceInr, selectedSystem.priceUsd);

  return (
    <div className="pt-28 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden flex flex-col justify-between">
      {/* Background Matrix Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-r from-[#00F0FF]/10 via-[#8B5CF6]/10 to-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-8">
        
        {/* HEADER BADGE & TITLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#1A2234] pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#0D111A] border-2 border-[#00F0FF] text-xs font-mono text-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
              </span>
              <span className="font-bold tracking-wider">[NEXUS.OS // DEVELOPER CONSOLE &amp; ARCHITECTURE VIEWER]</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
              Architecture Blueprints &amp; Technical API Vault
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-mono">
              Inspect multi-tier High-Level Design (HLD) pipelines, test SDK snippets, and manage production API tokens.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href={`/playground?system=${selectedSystem.slug}`}
              className="px-3.5 py-2.5 rounded-none text-xs font-mono font-bold text-slate-300 bg-[#0D111A] border-2 border-[#1A2234] hover:text-white hover:border-[#00F0FF] shadow-[2px_2px_0px_0px_#1A2234] transition-all flex items-center space-x-1.5"
            >
              <Terminal className="w-4 h-4 text-[#00F0FF]" />
              <span>[LIVE SANDBOX]</span>
            </Link>

            <Link
              href={`/checkout?system=${selectedSystem.slug}`}
              className="px-5 py-2.5 rounded-none text-xs font-mono font-bold uppercase text-black bg-[#00F0FF] border-2 border-black hover:bg-[#00F0FF]/90 shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all flex items-center space-x-1.5"
            >
              <span>[ACQUIRE ({displayPrice})]</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 1. DYNAMIC SYSTEM SELECTOR: 6 HARD-EDGED TAB PILLS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] uppercase">
            <span>// SELECT SYSTEM SPECIFICATION BLUEPRINT:</span>
            <span>ACTIVE: [{selectedSystem.name.toUpperCase()}]</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {allSystems.map((sys) => {
              const isSelected = selectedSystemSlug === sys.slug;
              return (
                <button
                  key={sys.slug}
                  onClick={() => setSelectedSystemSlug(sys.slug)}
                  className={`p-3 rounded-none text-left font-mono transition-all border-2 cursor-pointer flex flex-col justify-between min-h-[76px] ${
                    isSelected
                      ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] -translate-y-0.5"
                      : "bg-[#07090E] text-slate-300 border-[#1A2234] hover:border-[#00F0FF] hover:text-white shadow-[2px_2px_0px_0px_#1A2234] active:translate-x-[1px] active:translate-y-[1px]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 border ${
                        isSelected
                          ? "bg-black/10 border-black/40 text-black"
                          : "bg-[#0D111A] border-[#1A2234] text-[#00F0FF]"
                      }`}
                    >
                      {sys.category}
                    </span>
                    {isSelected && <Zap className="w-3.5 h-3.5 text-black fill-black" />}
                  </div>

                  <div className="mt-2">
                    <div className="text-xs font-black uppercase truncate leading-tight">
                      {sys.name}
                    </div>
                    <div
                      className={`text-[10px] truncate mt-0.5 ${
                        isSelected ? "text-slate-800 font-semibold" : "text-slate-400"
                      }`}
                    >
                      {sys.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. DEVELOPER MODULE NAVIGATION TABS */}
        <div className="flex flex-wrap items-center justify-start gap-2 border-b-2 border-[#1A2234] pb-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab("blueprint")}
            className={`px-4 py-2.5 rounded-none transition-all cursor-pointer flex items-center space-x-2 font-bold min-h-[44px] ${
              activeTab === "blueprint"
                ? "bg-[#00F0FF] text-black border-2 border-black shadow-[4px_4px_0px_0px_#00F0FF]"
                : "bg-[#0D111A] text-slate-400 border-2 border-[#1A2234] hover:text-white shadow-[2px_2px_0px_0px_#1A2234]"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>[HLD ARCHITECTURE BLUEPRINT]</span>
          </button>

          <button
            onClick={() => setActiveTab("explorer")}
            className={`px-4 py-2.5 rounded-none transition-all cursor-pointer flex items-center space-x-2 font-bold min-h-[44px] ${
              activeTab === "explorer"
                ? "bg-[#00F0FF] text-black border-2 border-black shadow-[4px_4px_0px_0px_#00F0FF]"
                : "bg-[#0D111A] text-slate-400 border-2 border-[#1A2234] hover:text-white shadow-[2px_2px_0px_0px_#1A2234]"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>[API EXPLORER &amp; CODE VAULT]</span>
          </button>

          <button
            onClick={() => setActiveTab("keys")}
            className={`px-4 py-2.5 rounded-none transition-all cursor-pointer flex items-center space-x-2 font-bold min-h-[44px] ${
              activeTab === "keys"
                ? "bg-[#00F0FF] text-black border-2 border-black shadow-[4px_4px_0px_0px_#00F0FF]"
                : "bg-[#0D111A] text-slate-400 border-2 border-[#1A2234] hover:text-white shadow-[2px_2px_0px_0px_#1A2234]"
            }`}
          >
            <Key className="w-4 h-4" />
            <span>[API ACCESS KEYS ({keys.length})]</span>
          </button>

          <button
            onClick={() => setActiveTab("webhooks")}
            className={`px-4 py-2.5 rounded-none transition-all cursor-pointer flex items-center space-x-2 font-bold min-h-[44px] ${
              activeTab === "webhooks"
                ? "bg-[#00F0FF] text-black border-2 border-black shadow-[4px_4px_0px_0px_#00F0FF]"
                : "bg-[#0D111A] text-slate-400 border-2 border-[#1A2234] hover:text-white shadow-[2px_2px_0px_0px_#1A2234]"
            }`}
          >
            <Webhook className="w-4 h-4" />
            <span>[OUTBOUND WEBHOOK RELAYS]</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: INTERACTIVE HLD ARCHITECTURE BLUEPRINT
           ======================================================== */}
        {activeTab === "blueprint" && (
          <div className="space-y-6">
            
            {/* System Title Banner */}
            <div className="p-6 rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-[#00F0FF] font-bold uppercase tracking-widest">
                  // ENTERPRISE HIGH-LEVEL DESIGN (HLD) PIPELINE // [SPEC_V2.4]
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-mono uppercase mt-1">
                  {selectedSystem.name}
                </h2>
                <p className="text-xs text-[#94A3B8] font-mono mt-1">
                  {selectedSystem.tagline}
                </p>
              </div>

              <div className="flex items-center space-x-3 text-xs font-mono">
                <div className="p-3 bg-[#07090E] border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234]">
                  <div className="text-[10px] text-slate-400 uppercase">[P99 LATENCY]</div>
                  <div className="text-emerald-400 font-bold">{selectedSystem.latency}</div>
                </div>
                <div className="p-3 bg-[#07090E] border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234]">
                  <div className="text-[10px] text-slate-400 uppercase">[CONCURRENCY]</div>
                  <div className="text-[#00F0FF] font-bold">{selectedSystem.concurrency}</div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE HLD ARCHITECTURE FLOW DIAGRAM */}
            <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#1A2234] relative overflow-hidden space-y-8">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-mono border-b-2 border-[#1A2234] pb-4">
                <span className="text-[#00F0FF] font-bold uppercase flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-[#00F0FF]" />
                  <span>[INTERACTIVE PIPELINE FLOW: CLICK ANY NODE TO INSPECT MICRO-SPECS]</span>
                </span>
                <span className="text-slate-400 text-[11px]">[PIPELINE HEALTH: 100% OPERATIONAL]</span>
              </div>

              {/* 4-TIER FLOW DIAGRAM WITH CONNECTORS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {hldNodes.map((node, index) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <div key={node.id} className="relative flex flex-col justify-between">
                      {/* Node Box */}
                      <button
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`w-full text-left p-5 rounded-none transition-all cursor-pointer border-2 font-mono flex flex-col justify-between min-h-[175px] ${
                          isSelected
                            ? "bg-[#07090E] border-[#00F0FF] shadow-[5px_5px_0px_0px_#00F0FF] -translate-y-1"
                            : "bg-[#07090E] border-[#1A2234] hover:border-[#8B5CF6] shadow-[3px_3px_0px_0px_#1A2234] active:translate-x-[1px] active:translate-y-[1px]"
                        }`}
                      >
                        <div>
                          {/* Tier Badge */}
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                                isSelected
                                  ? "bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]"
                                  : "bg-[#1A2234] text-slate-300 border-slate-700"
                              }`}
                            >
                              [0{index + 1} // {node.tier}]
                            </span>
                            {isSelected && (
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm font-black text-white uppercase tracking-tight">
                            {node.title}
                          </h3>
                          <div className="text-[11px] text-[#00F0FF] font-semibold mt-1 truncate">
                            {node.component}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#1A2234] flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">LATENCY:</span>
                          <span className="text-emerald-400 font-bold">{node.latency}</span>
                        </div>
                      </button>

                      {/* Directional Connector Arrow (Visible on desktop between cards) */}
                      {index < hldNodes.length - 1 && (
                        <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                          <div className="w-6 h-6 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF] flex items-center justify-center text-[#00F0FF]">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* MICRO-SPECS INSPECTOR PANEL */}
              <div className="p-6 bg-[#07090E] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] font-mono space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1A2234] pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="p-1 bg-[#00F0FF]/10 text-[#00F0FF]">
                      <Server className="w-4 h-4" />
                    </span>
                    <span className="text-white font-bold text-sm uppercase">
                      [NODE MICRO-SPECS INSPECTOR: {activeNode.title.toUpperCase()}]
                    </span>
                  </div>
                  <span className="text-[11px] text-[#00F0FF] uppercase">
                    TIER: [{activeNode.tier}]
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {activeNode.description}
                </p>

                {/* Micro-specs grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                  <div className="p-3 bg-[#0D111A] border border-[#1A2234]">
                    <div className="text-[10px] text-slate-400 uppercase">[WIRE PROTOCOL]:</div>
                    <div className="text-xs font-bold text-[#00F0FF] mt-1">{activeNode.protocol}</div>
                  </div>

                  <div className="p-3 bg-[#0D111A] border border-[#1A2234]">
                    <div className="text-[10px] text-slate-400 uppercase">[LATENCY SLA]:</div>
                    <div className="text-xs font-bold text-emerald-400 mt-1">{activeNode.latency}</div>
                  </div>

                  <div className="p-3 bg-[#0D111A] border border-[#1A2234]">
                    <div className="text-[10px] text-slate-400 uppercase">[CACHE TTL / BUFFER]:</div>
                    <div className="text-xs font-bold text-[#8B5CF6] mt-1">{activeNode.cacheTtl}</div>
                  </div>

                  <div className="p-3 bg-[#0D111A] border border-[#1A2234]">
                    <div className="text-[10px] text-slate-400 uppercase">[SECURITY AUDIT]:</div>
                    <div className="text-xs font-bold text-slate-200 mt-1 truncate">{activeNode.security}</div>
                  </div>

                  <div className="p-3 bg-[#0D111A] border border-[#1A2234]">
                    <div className="text-[10px] text-slate-400 uppercase">[THROUGHPUT PEAK]:</div>
                    <div className="text-xs font-bold text-white mt-1">{activeNode.throughput}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: TECHNICAL API EXPLORER & CODE VAULT
           ======================================================== */}
        {activeTab === "explorer" && (
          <div className="space-y-6">
            
            {/* API Explorer Header */}
            <div className="p-6 rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2 font-mono uppercase">
                  <Code2 className="w-5 h-5 text-[#00F0FF]" />
                  <span>[INTERACTIVE API EXPLORER &amp; CODE VAULT]</span>
                </h2>
                <p className="text-xs text-[#94A3B8] font-mono mt-1">
                  Test and copy production integration snippets across cURL, TypeScript, and Python.
                </p>
              </div>

              {/* Endpoint selection tabs */}
              <div className="flex flex-wrap gap-1 font-mono text-xs">
                {(
                  [
                    { id: "ingest", label: "Core Ingestion", method: "POST" },
                    { id: "auth", label: "Auth Token", method: "POST" },
                    { id: "webhooks", label: "Webhook Handler", method: "POST" },
                    { id: "health", label: "Health SLA", method: "GET" }
                  ] as const
                ).map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => setSelectedEndpoint(ep.id)}
                    className={`px-3 py-2 rounded-none transition-all cursor-pointer font-bold border ${
                      selectedEndpoint === ep.id
                        ? "bg-[#00F0FF] text-black border-black shadow-[2px_2px_0px_0px_#00F0FF]"
                        : "bg-[#07090E] text-slate-400 border-[#1A2234] hover:text-white"
                    }`}
                  >
                    <span className="text-[10px] opacity-75 mr-1">[{ep.method}]</span>
                    <span>{ep.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Code Snippet Box with Language Switcher */}
            <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[6px_6px_0px_0px_#1A2234] overflow-hidden">
              
              {/* Code Bar Header */}
              <div className="bg-[#07090E] border-b-2 border-[#1A2234] p-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                {/* Language pills */}
                <div className="flex items-center space-x-2">
                  {(["curl", "typescript", "python"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1.5 rounded-none font-bold uppercase transition-all cursor-pointer border ${
                        selectedLanguage === lang
                          ? "bg-[#8B5CF6] text-white border-white shadow-[2px_2px_0px_0px_#8B5CF6]"
                          : "bg-[#0D111A] text-slate-400 border-[#1A2234] hover:text-white"
                      }`}
                    >
                      {lang === "curl" ? "cURL" : lang === "typescript" ? "TypeScript (fetch)" : "Python (requests)"}
                    </button>
                  ))}
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 rounded-none bg-[#00F0FF] text-black border-2 border-black font-bold uppercase text-xs flex items-center space-x-1.5 shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer min-h-[38px]"
                >
                  {copiedCodeNotice ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>[COPIED_TO_CLIPBOARD]</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>[COPY CODE SNIPPET]</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code display */}
              <div className="p-6 bg-[#07090E] font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed max-h-[500px]">
                <pre>
                  <code>{getApiSnippet(selectedEndpoint, selectedLanguage, selectedSystem)}</code>
                </pre>
              </div>

              {/* Response Schema Preview Footer */}
              <div className="p-4 bg-[#0D111A] border-t-2 border-[#1A2234] font-mono text-xs flex flex-wrap items-center justify-between text-slate-400 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">[HTTP 200 OK]</span>
                  <span>Response Format: application/json</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Latency SLA: Sub-12ms across Vercel Edge PoPs
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            TAB 3: API ACCESS KEYS
           ======================================================== */}
        {activeTab === "keys" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] hover:border-[#00F0FF] transition-all">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2 font-mono uppercase">
                  <Lock className="w-5 h-5 text-[#00F0FF]" />
                  <span>[PRODUCTION &amp; SANDBOX API TOKENS]</span>
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">
                  Use bearer tokens to authenticate HTTP requests against the SUTRA / NEXUS Gateway. Keep secret keys safe.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2.5 rounded-none bg-[#00F0FF] text-black font-mono font-bold text-xs uppercase border-2 border-black hover:bg-[#00F0FF]/90 transition-all flex items-center space-x-2 shrink-0 min-h-[44px] cursor-pointer shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF]"
              >
                <Plus className="w-4 h-4" />
                <span>[GENERATE SCOPED SECRET]</span>
              </button>
            </div>

            {/* Keys Table */}
            <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] overflow-hidden shadow-[4px_4px_0px_0px_#1A2234]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#07090E] text-slate-400 border-b-2 border-[#1A2234] uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-6">Token Identifier &amp; Type</th>
                      <th className="py-3.5 px-6">Secret Bearer Key</th>
                      <th className="py-3.5 px-6">Allowed Scopes</th>
                      <th className="py-3.5 px-6">Last Used</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#1A2234] text-slate-200">
                    {keys.map((k) => {
                      const isRevealed = !!revealedKeys[k.id];
                      const isCopied = copiedKeyId === k.id;

                      return (
                        <tr key={k.id} className="hover:bg-[#1A2234]/30 transition-colors">
                          <td className="py-4 px-6 space-y-1">
                            <div className="font-bold text-white text-sm flex items-center space-x-2">
                              <span>{k.name}</span>
                              <span
                                className={`text-[10px] uppercase px-2 py-0.5 rounded-none border ${
                                  k.type === "production"
                                    ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]"
                                    : "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]"
                                }`}
                              >
                                [{k.type}]
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500">Created: {k.created}</div>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2 bg-[#07090E] px-3 py-1.5 rounded-none border-2 border-[#1A2234] w-fit shadow-[2px_2px_0px_0px_#1A2234]">
                              <span className="font-mono text-[#00F0FF]">
                                {isRevealed ? k.key : k.maskedKey}
                              </span>
                              <button
                                onClick={() => toggleRevealKey(k.id)}
                                className="text-slate-400 hover:text-white p-1 cursor-pointer"
                                title={isRevealed ? "Hide Key" : "Reveal Key"}
                              >
                                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1">
                              {k.scopes.map((s) => (
                                <span
                                  key={s}
                                  className="text-[10px] bg-[#1A2234] text-slate-300 px-2 py-0.5 rounded-none border border-slate-700"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-4 px-6 text-slate-400">{k.lastUsed}</td>

                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => copyToClipboard(k.key, k.id)}
                              className="px-3 py-1.5 rounded-none bg-[#07090E] border-2 border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors inline-flex items-center space-x-1.5 cursor-pointer min-h-[36px] font-mono shadow-[2px_2px_0px_0px_#00F0FF]"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">COPIED!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>[COPY]</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: OUTBOUND WEBHOOK RELAYS
           ======================================================== */}
        {activeTab === "webhooks" && (
          <div className="space-y-6">
            <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-6 shadow-[4px_4px_0px_0px_#1A2234] hover:border-[#00F0FF] transition-all">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2 font-mono uppercase">
                  <Webhook className="w-5 h-5 text-[#00F0FF]" />
                  <span>[OUTBOUND WEBHOOK RELAY CONFIGURATION]</span>
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">
                  SUTRA / NEXUS dispatches HMAC-SHA256 signed POST payloads to your designated HTTPS callback URL upon system events.
                </p>
              </div>

              {/* Target URL Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                  [TARGET ENDPOINT CALLBACK URL (HTTPS)]:
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://api.yourdomain.com/webhooks/nexus"
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-4 py-3 text-xs text-white font-mono focus:outline-none shadow-[2px_2px_0px_0px_#1A2234]"
                />
              </div>

              {/* Signing Secret Box */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                  [HMAC SIGNING SECRET KEY]:
                </label>
                <div className="flex items-center space-x-3 bg-[#07090E] p-4 rounded-none border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234]">
                  <span className="font-mono text-xs text-[#00F0FF] flex-1 break-all">
                    {signingSecret}
                  </span>
                  <button
                    onClick={copySigningSecret}
                    className="px-3 py-1.5 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10 text-xs font-mono flex items-center space-x-1.5 cursor-pointer shrink-0 min-h-[36px] shadow-[2px_2px_0px_0px_#00F0FF]"
                  >
                    {copiedSecret ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>[COPY SECRET]</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Signatures are passed in header <code className="text-[#00F0FF]">x-nexus-signature</code> to verify payload authenticity.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* NEW KEY MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0D111A] border-2 border-[#00F0FF] rounded-none p-6 sm:p-8 max-w-md w-full space-y-6 shadow-[6px_6px_0px_0px_#00F0FF] relative font-mono">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2 uppercase">
                  <Key className="w-5 h-5 text-[#00F0FF]" />
                  <span>[GENERATE SCOPED SECRET KEY]</span>
                </h3>
                <p className="text-xs text-[#94A3B8]">Create a new bearer token with restricted API permissions.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase">[TOKEN DESCRIPTOR NAME]:</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. CI/CD Deployment Runner"
                    className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3 py-2.5 text-white focus:outline-none shadow-[2px_2px_0px_0px_#1A2234]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase">[TOKEN ENVIRONMENT]:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewKeyType("production")}
                      className={`py-2 rounded-none border-2 text-center font-bold cursor-pointer ${
                        newKeyType === "production"
                          ? "bg-[#00F0FF]/10 border-[#00F0FF] text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400"
                      }`}
                    >
                      Production (nx_live_)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewKeyType("test")}
                      className={`py-2 rounded-none border-2 text-center font-bold cursor-pointer ${
                        newKeyType === "test"
                          ? "bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#8B5CF6] shadow-[2px_2px_0px_0px_#8B5CF6]"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400"
                      }`}
                    >
                      Sandbox (nx_test_)
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase">[GRANTED SCOPES]:</label>
                  <div className="space-y-2">
                    {["Read Catalog", "Verify License", "Dispatch Webhooks"].map((scope) => (
                      <label
                        key={scope}
                        className="flex items-center space-x-2 text-slate-200 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedScopes.includes(scope)}
                          onChange={() => toggleScope(scope)}
                          className="accent-[#00F0FF]"
                        />
                        <span>{scope}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-none bg-[#07090E] text-slate-400 border-2 border-[#1A2234] hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  className="px-5 py-2 rounded-none bg-[#00F0FF] text-black border-2 border-black font-bold text-xs uppercase hover:bg-[#00F0FF]/90 transition-all shadow-[2px_2px_0px_0px_#00F0FF] cursor-pointer"
                >
                  [GENERATE TOKEN]
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
