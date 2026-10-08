export interface SystemSpec {
  label: string;
  value: string;
}

export interface SystemProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  badge: string;
  category: 'Dashboards' | 'ERP' | 'CRM' | 'Websites' | 'AI Agents';
  description: string;
  stack: string[];
  metrics: string;
  priceInr: string;
  priceUsd: string;
  imageSrc: string;
  imageAlt: string;
  specs: SystemSpec[];
  features: string[];
}

export const systemsData: SystemProduct[] = [
  {
    id: "telemetry-matrix",
    slug: "telemetry-matrix",
    name: "Nexus Telemetry Matrix",
    tagline: "High-Frequency Executive Observability & Telemetry Engine",
    badge: "REAL-TIME ANALYTICS",
    category: "Dashboards",
    description: "Executive analytics matrix with sub-12ms P99 query latency across indexed event nodes, real-time stream aggregation, and live Postgres pool monitoring.",
    stack: ["Next.js 15 App Router", "Supabase Postgres RLS", "Recharts", "Lucide React", "Tailwind CSS", "TypeScript"],
    metrics: "₹114.2 Cr Monthly GMV • < 12ms P99 Latency",
    priceInr: "₹89,999",
    priceUsd: "$349",
    imageSrc: "/slide-2-telemetry-matrix.png",
    imageAlt: "Nexus Telemetry Matrix - ₹114.2 Cr GMV & 12ms Latency Dashboard",
    specs: [
      { label: "Database", value: "Supabase Postgres (Sub-12ms P99 Indexing)" },
      { label: "Auth & Security", value: "Postgres Row Level Security (RLS) + JWT" },
      { label: "Hosting & Infra", value: "Vercel Edge & Docker Container Ready" },
      { label: "Compliance & Audits", value: "SOC2 Type II & ISO-27001 Certified" },
      { label: "Export Formats", value: "Automated CSV, JSON & PDF Reports" },
      { label: "Connection Pool", value: "120 Active Postgres Pool Connections" }
    ],
    features: [
      "Sub-12ms P99 query execution across indexed nodes",
      "Real-time Postgres connection pooling & live stream",
      "Customizable executive KPI dashboard widgets",
      "Exportable CSV/PDF tax compliance reports"
    ]
  },
  {
    id: "quantum-logistics-erp",
    slug: "quantum-logistics-erp",
    name: "Quantum Logistics & Fleet ERP",
    tagline: "Multi-Depot Thermal Warehouse & Live GPS Fleet Telemetry Engine",
    badge: "OPERATIONS ERP",
    category: "ERP",
    description: "Enterprise logistics platform with thermal warehouse depot sensors, live GPS fleet tracking, automated GST tax filing (GSTR-1), and multi-role security.",
    stack: ["Next.js 15 App Router", "Postgres RLS", "GPS Webhooks", "Automated GST Engine", "Framer Motion", "TypeScript"],
    metrics: "450+ Fleet Units • 14 Thermal Depots • GSTR-1 Auto",
    priceInr: "₹1,49,999",
    priceUsd: "$599",
    imageSrc: "/slide-4-erp-operations.png",
    imageAlt: "Quantum Logistics & Fleet ERP - Thermal Warehouse & GST Compliance",
    specs: [
      { label: "Database", value: "Postgres Multi-Tenant Schema + Spatial Index" },
      { label: "Auth & Security", value: "RBAC (Admin, Depot Manager, Driver Role)" },
      { label: "Hosting & Infra", value: "AWS ECS Cluster / Docker Swarm" },
      { label: "Compliance & Audits", value: "Automated GSTR-1 & E-Way Bill Filing" },
      { label: "Fleet Sensors", value: "450+ Active GPS Units with Realtime Telemetry" },
      { label: "Warehouse Depots", value: "14 Thermal Telemetry Monitored Hubs" }
    ],
    features: [
      "Real-time GPS fleet route tracking & geo-fencing",
      "Thermal sensor monitoring & threshold telemetry",
      "Automated GSTR-1 tax compliance invoicing",
      "Role-based multi-depot access controls & audit log"
    ]
  },
  {
    id: "autonomous-crm-pipeline",
    slug: "autonomous-crm-pipeline",
    name: "Autonomous CRM & Revenue Engine",
    tagline: "4.8x Acceleration Autonomous Deal Pipeline & Contract Automation",
    badge: "AUTONOMOUS CRM",
    category: "CRM",
    description: "Zero-leakage deal execution pipeline: Inbound lead capture → AI Lead Scoring → Dynamic GST Contract Assembly → Multi-rail Auto Settlement.",
    stack: ["Next.js 15 App Router", "Supabase Realtime", "Razorpay Subscriptions", "PDF Contract Engine", "TypeScript"],
    metrics: "4.8x Deal Velocity • 1.2s Lead Routing • Zero-Leakage",
    priceInr: "₹1,14,999",
    priceUsd: "$449",
    imageSrc: "/slide-3-deal-pipeline.png",
    imageAlt: "Autonomous CRM & Revenue Engine - 4.8x Deal Velocity Pipeline",
    specs: [
      { label: "Database", value: "Supabase Postgres Realtime Event Log" },
      { label: "Auth & Security", value: "AES-256 Secret Vault & CSRF Honeypot" },
      { label: "Hosting & Infra", value: "Serverless Edge Functions (Node.js/Bun)" },
      { label: "Compliance & Audits", value: "Legally Binding Auto-Signed Contract PDF" },
      { label: "Lead Scoring Latency", value: "1.2 Seconds AI Evaluation" },
      { label: "Payment Rails", value: "UPI Intent, Razorpay & Wire Transfers" }
    ],
    features: [
      "1.2-second autonomous lead scoring matrix",
      "Dynamic GST contract auto-assembly & dispatch",
      "Multi-rail auto settlement webhook triggers",
      "Zero-leakage audit trail logging & telemetry"
    ]
  },
  {
    id: "omega-core-starter",
    slug: "omega-core-starter",
    name: "Project Omega Enterprise Platform",
    tagline: "Zero-Config Fullstack Software Suite with Multi-Rail Payments",
    badge: "CORE PLATFORM",
    category: "Websites",
    description: "Pre-built fullstack software core with native payment rails (UPI, Razorpay, Stripe), Supabase Postgres RLS, and audited commercial IP license.",
    stack: ["Next.js 15 App Router", "Supabase Postgres RLS", "Tailwind CSS", "Razorpay / UPI", "TypeScript"],
    metrics: "98.4% Health • 89.5k Ops • $45.2K ARR",
    priceInr: "₹49,999",
    priceUsd: "$199",
    imageSrc: "/slide-1-hero-tablet.png",
    imageAlt: "Project Omega Enterprise Platform - Zero-Config Fullstack SaaS",
    specs: [
      { label: "Database", value: "Supabase Postgres with RLS Security Policies" },
      { label: "Auth & Security", value: "OAuth 2.0, Magic Link & Passwordless MFA" },
      { label: "Hosting & Infra", value: "Zero-Config Vercel / Docker Container Deployment" },
      { label: "Compliance & Audits", value: "Commercial IP Assignment Certificate Included" },
      { label: "System Health", value: "98.4% Uptime SLA Guarantee" },
      { label: "Payment Rails", value: "Native Dynamic UPI QR, Razorpay & Stripe" }
    ],
    features: [
      "Native dynamic UPI QR generation & Webhooks",
      "Razorpay & Stripe payment rail automation",
      "Postgres Row Level Security (RLS) policies",
      "Automated GST Invoice PDF generation"
    ]
  },
  {
    id: "sentinel-auth-hub",
    slug: "sentinel-auth-hub",
    name: "Sentinel Unified Auth & Identity Hub",
    tagline: "Zero-Trust Identity Provider, SAML 2.0 SSO & MFA Security Vault",
    badge: "SECURITY HUB",
    category: "ERP",
    description: "Bank-grade identity governance server featuring OAuth2/OIDC provider, SAML 2.0 Enterprise SSO, Hardware Security Key (FIDO2/WebAuthn), and honeypot rate-limiting.",
    stack: ["Next.js 15 App Router", "Supabase Auth / Vault", "WebAuthn / FIDO2", "Redis Rate Limiter", "TypeScript"],
    metrics: "Zero-Trust SSO • FIDO2 WebAuthn • 100% OWASP Mitigation",
    priceInr: "₹79,999",
    priceUsd: "$299",
    imageSrc: "/slide-5-deployment-cubes.png",
    imageAlt: "Sentinel Unified Auth & Identity Hub - Zero-Trust Identity Provider",
    specs: [
      { label: "Database", value: "Encrypted Supabase Vault & Redis Cache" },
      { label: "Auth & Security", value: "OAuth2 / OIDC, SAML 2.0 SSO & FIDO2 WebAuthn" },
      { label: "Hosting & Infra", value: "Multi-Region Edge Nodes & Kubernetes Cluster" },
      { label: "Compliance & Audits", value: "OWASP Top 10 Hardened & SOC2 Ready" },
      { label: "Rate Limiting", value: "IP & Session Redis Leaky-Bucket Rate Limiter" },
      { label: "Token Vault", value: "AES-256 Encrypted Session Token Vault" }
    ],
    features: [
      "Enterprise SAML 2.0 & OIDC Single Sign-On (SSO)",
      "Hardware security key support (FIDO2 / WebAuthn)",
      "Honeypot anti-bot defense & Redis rate-limiting",
      "Granular session revocation & audit trail logging"
    ]
  },
  {
    id: "nexus-agent-orchestrator",
    slug: "nexus-agent-orchestrator",
    name: "Nexus Autonomous Agent Orchestrator",
    tagline: "Self-healing multi-agent pipelines, deterministic tool execution, and prompt-injection firewalls.",
    badge: "AGENTIC WORKFLOW CORE",
    category: "AI Agents",
    description: "Enterprise-grade autonomous workflow engine providing structured agent definitions, stateful memory persistence, and Model Context Protocol (MCP) integrations without recurring SaaS markup.",
    stack: ["Next.js 15", "TypeScript", "LangChain / Vercel AI SDK", "Redis Vector", "Zod"],
    metrics: "< 24ms Tool Latency • 4.2x Context Comp • 99.9% Guardrail Defense",
    priceInr: "₹19,999",
    priceUsd: "$249",
    imageSrc: "/slide-5-deployment-cubes.png",
    imageAlt: "Nexus Autonomous Agent Orchestrator - Self-healing multi-agent pipelines",
    specs: [
      { label: "Database", value: "Upstash Redis Vector & Session Store" },
      { label: "Auth & Security", value: "Scoped API Token & Key Rotation Guard" },
      { label: "Hosting & Infra", value: "Vercel Edge / Node.js 20+ Runtime" },
      { label: "Compliance & Audits", value: "OWASP Top 10 for LLM Applications verified" },
      { label: "Tool Dispatch Latency", value: "< 24ms" },
      { label: "Context Compression", value: "4.2x" }
    ],
    features: [
      "Autonomous multi-turn tool calling and reflection loops",
      "Self-healing fallback routes on LLM schema mismatch",
      "Real-time streaming agent trace visualizer with telemetry logs",
      "Built-in sandbox container isolation for executable code"
    ]
  }
];

export const systemsCatalog = systemsData;

export function getAllSystems(): SystemProduct[] {
  return systemsData;
}

export function getSystemBySlug(slug: string): SystemProduct | undefined {
  return systemsData.find((sys) => sys.slug === slug || sys.id === slug);
}
