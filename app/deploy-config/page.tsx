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
  ArrowRight,
  Database,
  Activity,
  Play,
  Sparkles,
  RefreshCw,
  Box,
  Cloud
} from "lucide-react";
import { getAllSystems, getSystemBySlug } from "@/data/systems";

type DeployTarget = "docker-compose" | "k8s-helm" | "vercel-edge" | "aws-ecs";
type EnvMode = "production" | "staging" | "local";
type DbProvider = "postgresql" | "supabase" | "neon" | "redis";
type ConfigTab = "manifest" | "env" | "script";

export default function DeployConfigPage() {
  const allSystems = getAllSystems();

  // State
  const [selectedSystemSlug, setSelectedSystemSlug] = useState<string>("telemetry-matrix");
  const [deployTarget, setDeployTarget] = useState<DeployTarget>("docker-compose");
  const [envMode, setEnvMode] = useState<EnvMode>("production");
  const [dbProvider, setDbProvider] = useState<DbProvider>("supabase");
  const [enableMonitoring, setEnableMonitoring] = useState<boolean>(true);
  const [enableOwasp, setEnableOwasp] = useState<boolean>(true);
  const [enableAutoSsl, setEnableAutoSsl] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<ConfigTab>("manifest");
  const [copied, setCopied] = useState<boolean>(false);

  const selectedSystem = useMemo(() => {
    return getSystemBySlug(selectedSystemSlug) || allSystems[0];
  }, [selectedSystemSlug, allSystems]);

  const sysSlug = selectedSystem.slug;
  const sysNameSafe = selectedSystem.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

  // Tab label resolution based on deployment target
  const manifestFileName = useMemo(() => {
    switch (deployTarget) {
      case "docker-compose":
        return "docker-compose.yml";
      case "k8s-helm":
        return "k8s-deployment.yaml";
      case "vercel-edge":
        return "vercel.json";
      case "aws-ecs":
        return "ecs-task-def.json";
    }
  }, [deployTarget]);

  const envFileName = useMemo(() => {
    switch (envMode) {
      case "production":
        return ".env.production";
      case "staging":
        return ".env.staging";
      case "local":
        return ".env.local";
    }
  }, [envMode]);

  // Dynamic Generator Logic
  const generatedCode = useMemo(() => {
    // -------------------------------------------------------------
    // TAB 1: MANIFEST (Docker Compose / K8s / Vercel / ECS)
    // -------------------------------------------------------------
    if (activeTab === "manifest") {
      if (deployTarget === "docker-compose") {
        return `# ==============================================================================
# SUTRA / NEXUS ENTERPRISE DOCKER COMPOSE ORCHESTRATION
# System: ${selectedSystem.name} (${selectedSystem.slug})
# Mode: ${envMode.toUpperCase()} | Database: ${dbProvider.toUpperCase()} | Monitoring: ${enableMonitoring ? "ENABLED" : "DISABLED"}
# ==============================================================================

version: '3.8'

services:
  ${sysSlug}-app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_SYSTEM_SLUG: "${sysSlug}"
        NODE_ENV: "${envMode}"
    image: nexus-registry/${sysSlug}:${envMode}
    container_name: nexus-${sysSlug}-node
    restart: always
    ports:
      - "3000:3000"
    env_file:
      - ${envFileName}
    environment:
      - NODE_ENV=${envMode}
      - PORT=3000
      - OWASP_HARDENED=${enableOwasp ? "true" : "false"}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/contact"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s
    depends_on:
      ${dbProvider === "postgresql" ? "- postgres-db\n      - postgres-pooler" : ""}${dbProvider === "redis" ? "- redis-cache" : ""}
    networks:
      - nexus-mesh-network

${dbProvider === "postgresql" ? `  postgres-db:
    image: postgres:16-alpine
    container_name: nexus-${sysSlug}-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: nexus_${sysSlug.replace(/-/g, "_")}
      POSTGRES_USER: postgres_admin
      POSTGRES_PASSWORD: \${POSTGRES_MASTER_PASSWORD:-nexus_ultra_secret_2026}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - nexus-mesh-network

  postgres-pooler:
    image: pgbouncer/pgbouncer:latest
    container_name: nexus-${sysSlug}-pgbouncer
    restart: always
    environment:
      DATABASES: "* = host=postgres-db port=5432 user=postgres_admin password=\${POSTGRES_MASTER_PASSWORD:-nexus_ultra_secret_2026}"
      LISTEN_PORT: 5432
      POOL_MODE: transaction
      MAX_CLIENT_CONN: 250
      DEFAULT_POOL_SIZE: 25
    depends_on:
      - postgres-db
    networks:
      - nexus-mesh-network
` : ""}${dbProvider === "redis" ? `  redis-cache:
    image: redis:7-alpine
    container_name: nexus-${sysSlug}-redis
    restart: always
    command: redis-server --appendonly yes --requirepass \${REDIS_PASSWORD:-nexus_vector_hex_2026}
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - nexus-mesh-network
` : ""}${enableMonitoring ? `  # TELEMETRY SUITE: PROMETHEUS & GRAFANA
  prometheus:
    image: prom/prometheus:v2.48.0
    container_name: nexus-${sysSlug}-prometheus
    restart: always
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
    ports:
      - "9090:9090"
    networks:
      - nexus-mesh-network

  grafana:
    image: grafana/grafana:latest
    container_name: nexus-${sysSlug}-grafana
    restart: always
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=\${GRAFANA_PASSWORD:-admin_nexus_2026}
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus
    networks:
      - nexus-mesh-network
` : ""}${enableAutoSsl ? `  # REVERSE PROXY & AUTOMATED TLS CERTIFICATE GENERATOR
  traefik:
    image: traefik:v2.10
    container_name: nexus-${sysSlug}-gateway
    command:
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
      - "--certificatesresolvers.myresolver.acme.email=architect@nexus-systems.in"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "traefik_certs:/letsencrypt"
    networks:
      - nexus-mesh-network
` : ""}
networks:
  nexus-mesh-network:
    driver: bridge
    ipam:
      driver: default

volumes:
${dbProvider === "postgresql" ? "  postgres_data:\n" : ""}${dbProvider === "redis" ? "  redis_data:\n" : ""}${enableMonitoring ? "  grafana_data:\n" : ""}${enableAutoSsl ? "  traefik_certs:\n" : ""}`;
      }

      if (deployTarget === "k8s-helm") {
        return `# ==============================================================================
# KUBERNETES HIGH-AVAILABILITY CLUSTER MANIFEST
# System: ${selectedSystem.name}
# Target Namespace: nexus-${envMode}
# ==============================================================================

apiVersion: v1
kind: Namespace
metadata:
  name: nexus-${envMode}
  labels:
    tier: enterprise-mesh
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${sysSlug}-deployment
  namespace: nexus-${envMode}
  labels:
    app.kubernetes.io/name: ${sysSlug}
    app.kubernetes.io/part-of: nexus-systems
spec:
  replicas: ${envMode === "production" ? 3 : 1}
  revisionHistoryLimit: 5
  selector:
    matchLabels:
      app: ${sysSlug}
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: ${sysSlug}
      annotations:
        prometheus.io/scrape: "${enableMonitoring ? "true" : "false"}"
        prometheus.io/path: "/api/metrics"
        prometheus.io/port: "3000"
    spec:
      containers:
        - name: app
          image: nexus-registry/${sysSlug}:${envMode}
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 3000
              name: http
          envFrom:
            - secretRef:
                name: ${sysSlug}-env-secrets
          resources:
            requests:
              cpu: "250m"
              memory: "512Mi"
            limits:
              cpu: "1000m"
              memory: "1024Mi"
          readinessProbe:
            httpGet:
              path: /api/contact
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /api/contact
              port: 3000
            initialDelaySeconds: 20
            periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: ${sysSlug}-service
  namespace: nexus-${envMode}
spec:
  type: ClusterIP
  selector:
    app: ${sysSlug}
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
      name: http
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${sysSlug}-ingress
  namespace: nexus-${envMode}
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
    - hosts:
        - ${sysSlug}.${envMode}.nexus-systems.in
      secretName: ${sysSlug}-tls-cert
  rules:
    - host: ${sysSlug}.${envMode}.nexus-systems.in
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ${sysSlug}-service
                port:
                  number: 80
`;
      }

      if (deployTarget === "vercel-edge") {
        return `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "name": "nexus-${sysSlug}",
  "framework": "nextjs",
  "cleanUrls": true,
  "trailingSlash": false,
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "regions": ["bom1", "iad1"],
  "env": {
    "NODE_ENV": "${envMode}",
    "NEXT_PUBLIC_SYSTEM_SLUG": "${sysSlug}",
    "OWASP_FIREWALL_ENABLED": "${enableOwasp ? "true" : "false"}"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/inquiry",
      "schedule": "0 0 * * *"
    }
  ]
}
`;
      }

      // AWS ECS Fargate
      return `{
  "family": "nexus-${sysSlug}-${envMode}",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/nexusAppTaskRole",
  "containerDefinitions": [
    {
      "name": "${sysSlug}-app",
      "image": "123456789012.dkr.ecr.ap-south-1.amazonaws.com/nexus/${sysSlug}:${envMode}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        { "name": "NODE_ENV", "value": "${envMode}" },
        { "name": "PORT", "value": "3000" },
        { "name": "NEXT_PUBLIC_SYSTEM_SLUG", "value": "${sysSlug}" },
        { "name": "OWASP_FIREWALL_ENABLED", "value": "${enableOwasp ? "true" : "false"}" }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:ap-south-1:123456789012:secret:nexus/${sysSlug}/db_url"
        },
        {
          "name": "RAZORPAY_KEY_SECRET",
          "valueFrom": "arn:aws:secretsmanager:ap-south-1:123456789012:secret:nexus/${sysSlug}/rzp_secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/nexus-${sysSlug}-${envMode}",
          "awslogs-region": "ap-south-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/api/contact || exit 1"],
        "interval": 15,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 30
      }
    }
  ]
}
`;
    }

    // -------------------------------------------------------------
    // TAB 2: ENVIRONMENT CONFIG (.env.production / staging / local)
    // -------------------------------------------------------------
    if (activeTab === "env") {
      let dbUrl = "";
      let dbNotes = "";

      switch (dbProvider) {
        case "postgresql":
          dbUrl = `postgresql://postgres_admin:nexus_ultra_secret_2026@${deployTarget === "docker-compose" ? "postgres-pooler:5432" : "127.0.0.1:5432"}/nexus_${sysSlug.replace(/-/g, "_")}?sslmode=disable`;
          dbNotes = "# DIRECT POSTGRESQL CONNECTION (PGBOUNCER TRANSACTION POOLER)";
          break;
        case "supabase":
          dbUrl = `postgresql://postgres.nexus:${sysNameSafe}_db_secret@ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`;
          dbNotes = "# SUPABASE POSTGRES MULTI-TENANT RLS (PORT 6543 TRANSACTION POOLER)";
          break;
        case "neon":
          dbUrl = `postgres://neondb_owner:npg_secret_hex_token@ep-cool-fog-123456.ap-southeast-1.aws.neon.tech/nexus_${sysSlug.replace(/-/g, "_")}?sslmode=require`;
          dbNotes = "# NEON SERVERLESS POSTGRESQL (AUTO-SCALING COMPUTE WITH POINT-IN-TIME RECOVERY)";
          break;
        case "redis":
          dbUrl = `postgresql://postgres_admin:secret@127.0.0.1:5432/nexus_${sysSlug.replace(/-/g, "_")}`;
          dbNotes = "# PRIMARY DATABASE + UPSTASH/REDIS VECTOR ACCELERATOR";
          break;
      }

      return `# ==============================================================================
# SUTRA / NEXUS ENVIRONMENT SPECIFICATION
# System: ${selectedSystem.name} (${selectedSystem.slug})
# Mode: ${envMode.toUpperCase()} | Generated for ${deployTarget.toUpperCase()}
# ==============================================================================

NODE_ENV=${envMode}
NEXT_PUBLIC_SITE_URL=https://${sysSlug}.${envMode === "production" ? "" : envMode + "."}nexus-systems.in
NEXT_PUBLIC_SYSTEM_SLUG=${sysSlug}

${dbNotes}
DATABASE_URL="${dbUrl}"
${dbProvider === "supabase" ? `NEXT_PUBLIC_SUPABASE_URL="https://${sysSlug}-cloud.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXByYWJhc2UiLCJleHAiOjE5ODM1MDQ1MTN9.anon_key_hex_sample"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXByYWJhc2UiLCJleHAiOjE5ODM1MDQ1MTN9.service_role_key_hex_sample"
` : ""}
# COMMERCIAL PAYMENT RAILS & TAXATION ENGINE
RAZORPAY_KEY_ID="rzp_${envMode === "production" ? "live" : "test"}_${sysNameSafe.toUpperCase().replace(/-/g, "_")}_KEY"
RAZORPAY_KEY_SECRET="${envMode === "production" ? "live_secret_hex_" : "test_secret_hex_"}${selectedSystem.id.substring(0, 8)}"
NEXT_PUBLIC_UPI_ID="9771596801@okbizaxis"
GSTIN_REGISTERED_NO="10AAAAA0000A1Z5"

# REDIS VECTOR CACHE & SESSION MEMORY
${dbProvider === "redis" || deployTarget === "docker-compose" ? `UPSTASH_REDIS_REST_URL="${deployTarget === "docker-compose" ? "http://redis-cache:6379" : "https://apn1-nexus-vector.upstash.io"}"
UPSTASH_REDIS_REST_TOKEN="AXXXX_token_${sysSlug}_vector_hex"
REDIS_TTL_SECONDS=86400
` : "# REDIS_DISABLED=true\n"}
# OWASP TOP 10 GUARDRAILS & HONEYPOT CONTROLS
OWASP_FIREWALL_ENABLED=${enableOwasp ? "true" : "false"}
CSRF_HONEYPOT_SALT="salt_${selectedSystem.id}_${envMode}_2026"
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=${envMode === "production" ? "120" : "600"}
STRICT_CORS_ORIGINS="https://${sysSlug}.nexus-systems.in"

# DISPATCH TELEMETRY & ESCALATION WEBHOOKS
${enableMonitoring ? `PROMETHEUS_METRICS_ENABLED=true
PROMETHEUS_METRICS_PATH="/api/metrics"
GRAFANA_TELEMETRY_PORT=3001
` : "# TELEMETRY_DISABLED=true\n"}WHATSAPP_TARGET_PHONE="+919771596801"
SUPPORT_ESCALATION_EMAIL="architect@nexus-systems.in"
`;
    }

    // -------------------------------------------------------------
    // TAB 3: QUICKSTART DEPLOY SCRIPT (deploy.sh)
    // -------------------------------------------------------------
    return `#!/usr/bin/env bash
# ==============================================================================
# SUTRA / NEXUS DEPLOYMENT DISPATCH SCRIPT
# System: ${selectedSystem.name} (${selectedSystem.slug})
# Mode: ${envMode.toUpperCase()} | Target: ${deployTarget.toUpperCase()}
# ==============================================================================

set -euo pipefail

CYAN='\\033[0;36m'
GREEN='\\033[0;32m'
RED='\\033[0;31m'
NC='\\033[0m'

echo -e "\${CYAN}[NEXUS.OS] INITIATING ORCHESTRATION SEQUENCE FOR ${selectedSystem.name}...\${NC}"

# 1. VERIFY SYSTEM PREREQUISITES
echo -e "\${CYAN}[CHECK 1/4] Verifying runtime dependencies...\${NC}"
${deployTarget === "docker-compose" ? `command -v docker >/dev/null 2>&1 || { echo -e "\${RED}[FATAL]: Docker engine not installed.\${NC}" >&2; exit 1; }
command -v docker-compose >/dev/null 2>&1 || docker compose version >/dev/null 2>&1 || { echo -e "\${RED}[FATAL]: Docker Compose v2 required.\${NC}" >&2; exit 1; }` : ""}${deployTarget === "k8s-helm" ? `command -v kubectl >/dev/null 2>&1 || { echo -e "\${RED}[FATAL]: kubectl binary not found in PATH.\${NC}" >&2; exit 1; }
kubectl cluster-info >/dev/null 2>&1 || { echo -e "\${RED}[FATAL]: Unable to connect to Kubernetes cluster context.\${NC}" >&2; exit 1; }` : ""}${deployTarget === "vercel-edge" ? `command -v vercel >/dev/null 2>&1 || { echo -e "\${RED}[FATAL]: Vercel CLI required. Run: npm i -g vercel\${NC}" >&2; exit 1; }` : ""}${deployTarget === "aws-ecs" ? `command -v aws >/dev/null 2>&1 || { echo -e "\${RED}[FATAL]: AWS CLI v2 required.\${NC}" >&2; exit 1; }
aws sts get-caller-identity >/dev/null 2>&1 || { echo -e "\${RED}[FATAL]: AWS credentials invalid.\${NC}" >&2; exit 1; }` : ""}

# 2. VALIDATE ENVIRONMENT CONFIGURATION
echo -e "\${CYAN}[CHECK 2/4] Validating ${envFileName}...\${NC}"
if [ ! -f "${envFileName}" ]; then
  echo -e "\${RED}[ERROR]: ${envFileName} missing. Generating from vault template...\${NC}"
  cp .env.example "${envFileName}" 2>/dev/null || touch "${envFileName}"
fi

# 3. DISPATCH DEPLOYMENT WORKLOAD
echo -e "\${CYAN}[STEP 3/4] Dispatching ${selectedSystem.name} to [${deployTarget.toUpperCase()}]...\${NC}"
${deployTarget === "docker-compose" ? `# Clean build with buildkit acceleration
DOCKER_BUILDKIT=1 docker compose -f docker-compose.yml build --pull
docker compose -f docker-compose.yml up -d --remove-orphans` : ""}${deployTarget === "k8s-helm" ? `# Apply Kubernetes namespace & workload specifications
kubectl apply -f k8s-deployment.yaml
echo -e "\${CYAN}Waiting for pod rollout in namespace nexus-${envMode}...\${NC}"
kubectl rollout status deployment/${sysSlug}-deployment -n nexus-${envMode} --timeout=120s` : ""}${deployTarget === "vercel-edge" ? `# Deploy directly to Vercel Edge Runtime
vercel deploy ${envMode === "production" ? "--prod" : ""} --confirm` : ""}${deployTarget === "aws-ecs" ? `# Register ECS task and update service
aws ecs register-task-definition --cli-input-json file://ecs-task-def.json
aws ecs update-service --cluster nexus-cluster-${envMode} --service nexus-${sysSlug}-service --force-new-deployment` : ""}

# 4. HEALTH CHECK & AUDIT VALIDATION
echo -e "\${CYAN}[STEP 4/4] Conducting zero-trust health check ping...\${NC}"
sleep 5
${deployTarget === "docker-compose" ? `STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/contact || echo "000")
if [ "$STATUS" = "200" ]; then
  echo -e "\${GREEN}[SUCCESS]: ${selectedSystem.name} deployed successfully on port 3000!\${NC}"
  echo -e "\${GREEN}[OBSERVABILITY]: Active telemetry stream established.\${NC}"
else
  echo -e "\${RED}[WARN]: Endpoint responded with status $STATUS. Inspecting container logs...\${NC}"
  docker compose logs --tail=30 ${sysSlug}-app
fi` : `echo -e "\${GREEN}[SUCCESS]: ${selectedSystem.name} workload dispatched to ${deployTarget.toUpperCase()} cluster!\${NC}"`}
`;
  }, [selectedSystem, sysSlug, sysNameSafe, deployTarget, envMode, dbProvider, enableMonitoring, enableOwasp, enableAutoSsl, activeTab, manifestFileName, envFileName]);

  // Syntax line parser with line numbers
  const codeLines = useMemo(() => {
    return generatedCode.split("\n");
  }, [generatedCode]);

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedCode);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadFile = () => {
    const filename =
      activeTab === "manifest"
        ? manifestFileName
        : activeTab === "env"
        ? envFileName
        : "deploy.sh";

    const blob = new Blob([generatedCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden font-sans">
      {/* Structural Neo-Brutalist Grid Lines & Scanline Overlay */}
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent blur-[1px] animate-scanline pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* ========================================================= */}
        {/* PAGE HEADER */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-xs font-mono font-bold text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
            <Sliders className="w-4 h-4 text-[#00F0FF]" />
            <span>[NEXUS.OS // INFRASTRUCTURE_CONFIGURATOR]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-mono">
            DEPLOYMENT CONFIG &amp; INFRA GENERATOR
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            Configure, validate, and generate production Docker Compose files, Kubernetes manifests, secure environment blueprints, and one-click shell dispatchers across all 6 enterprise systems.
          </p>
        </div>

        {/* ========================================================= */}
        {/* SYSTEM SELECTOR PILLS */}
        {/* ========================================================= */}
        <div className="bg-[#0D111A] border-2 border-[#1A2234] p-3 sm:p-4 shadow-[4px_4px_0px_0px_#1A2234]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1A2234] text-xs font-mono">
            <span className="text-[#00F0FF] font-bold uppercase flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#00F0FF]" />
              <span>[01. SELECT ENTERPRISE SYSTEM MODULE]:</span>
            </span>
            <span className="text-slate-400 hidden sm:inline">
              SELECTED: <span className="text-white font-bold">{selectedSystem.name}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 font-mono text-xs">
            {allSystems.map((sys) => {
              const isSelected = sys.slug === selectedSystemSlug;
              return (
                <button
                  key={sys.id}
                  onClick={() => setSelectedSystemSlug(sys.slug)}
                  className={`p-2.5 rounded-none border-2 text-left transition-all cursor-pointer min-h-[52px] flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[3px_3px_0px_0px_#8B5CF6] font-bold"
                      : "bg-[#07090E] border-[#1A2234] text-slate-300 hover:text-white hover:border-[#00F0FF]"
                  }`}
                >
                  <div className="truncate text-[11px] font-bold uppercase">{sys.name}</div>
                  <div
                    className={`text-[9px] uppercase tracking-wider ${
                      isSelected ? "text-slate-900 font-semibold" : "text-[#00F0FF]"
                    }`}
                  >
                    [{sys.category}]
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN CONFIGURATION ENGINE & CODE TERMINAL */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ------------------------------------------------------- */}
          {/* LEFT COLUMN: PARAMETER BUILDER (5 COLS) */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-5 sm:p-7 space-y-6 shadow-[4px_4px_0px_0px_#1A2234]">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#1A2234]">
              <div className="flex items-center space-x-2">
                <Box className="w-5 h-5 text-[#00F0FF]" />
                <h2 className="text-xs sm:text-sm font-mono font-black text-white tracking-wider uppercase">
                  [INFRA_PARAMETERS]
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#07090E] text-[#8B5CF6] border border-[#8B5CF6]">
                V2.4 SPEC
              </span>
            </div>

            {/* Target Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#00F0FF] uppercase block tracking-wider">
                [02. DEPLOYMENT TARGET RUNTIME]:
              </label>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {[
                  { id: "docker-compose", label: "Docker Compose", icon: Box },
                  { id: "k8s-helm", label: "Kubernetes / Helm", icon: ShieldCheck },
                  { id: "vercel-edge", label: "Vercel / Cloudflare Edge", icon: Cloud },
                  { id: "aws-ecs", label: "AWS ECS Fargate", icon: Server },
                ].map((target) => {
                  const IconComp = target.icon;
                  const isSelected = deployTarget === target.id;
                  return (
                    <button
                      key={target.id}
                      type="button"
                      onClick={() => setDeployTarget(target.id as DeployTarget)}
                      className={`p-2.5 rounded-none border-2 text-left flex items-center space-x-2 transition-all cursor-pointer min-h-[44px] ${
                        isSelected
                          ? "bg-[#00F0FF]/15 border-[#00F0FF] text-white shadow-[2px_2px_0px_0px_#00F0FF] font-bold"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white hover:border-[#1A2234]"
                      }`}
                    >
                      <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#00F0FF]" : "text-slate-500"}`} />
                      <span className="truncate text-[11px]">{target.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Environment Mode Toggle */}
            <div className="space-y-2 pt-1 border-t border-[#1A2234]">
              <label className="text-xs font-mono font-bold text-[#8B5CF6] uppercase block tracking-wider">
                [03. ENVIRONMENT MODE]:
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {(["production", "staging", "local"] as EnvMode[]).map((mode) => {
                  const isSelected = envMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setEnvMode(mode)}
                      className={`py-2 px-2.5 rounded-none border-2 text-center uppercase tracking-wider transition-all cursor-pointer font-bold ${
                        isSelected
                          ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[2px_2px_0px_0px_#8B5CF6]"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white hover:border-[#8B5CF6]/50"
                      }`}
                    >
                      {mode}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Database Provider Picker */}
            <div className="space-y-2 pt-1 border-t border-[#1A2234]">
              <label className="text-xs font-mono font-bold text-emerald-400 uppercase block tracking-wider">
                [04. DATABASE &amp; CACHE PROVIDER]:
              </label>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {[
                  { id: "supabase", label: "Supabase Postgres RLS" },
                  { id: "postgresql", label: "Self-Hosted Postgres 16" },
                  { id: "neon", label: "Neon Serverless" },
                  { id: "redis", label: "Redis Vector Cache" },
                ].map((db) => {
                  const isSelected = dbProvider === db.id;
                  return (
                    <button
                      key={db.id}
                      type="button"
                      onClick={() => setDbProvider(db.id as DbProvider)}
                      className={`p-2 rounded-none border-2 text-left flex items-center space-x-2 transition-all cursor-pointer min-h-[40px] ${
                        isSelected
                          ? "bg-emerald-500/15 border-emerald-400 text-white shadow-[2px_2px_0px_0px_#10B981] font-bold"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white hover:border-emerald-500/50"
                      }`}
                    >
                      <Database className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-emerald-400" : "text-slate-500"}`} />
                      <span className="truncate text-[11px]">{db.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Architectural Feature Checkboxes */}
            <div className="space-y-2.5 pt-2 border-t border-[#1A2234]">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase block tracking-wider">
                [05. EXTENDED PLATFORM RULES]:
              </label>

              {/* Monitoring Toggle */}
              <button
                type="button"
                onClick={() => setEnableMonitoring(!enableMonitoring)}
                className="w-full flex items-center space-x-3 text-xs font-mono text-left text-slate-300 hover:text-white p-2.5 rounded-none bg-[#07090E] border-2 border-[#1A2234] hover:border-[#00F0FF] cursor-pointer transition-colors"
              >
                {enableMonitoring ? (
                  <CheckSquare className="w-4 h-4 text-[#00F0FF] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <div className="truncate">
                  <div className="font-bold text-white">Prometheus + Grafana Telemetry</div>
                  <div className="text-[10px] text-slate-400">Scrapes /api/metrics stream &amp; visualizes RPS</div>
                </div>
              </button>

              {/* OWASP Guardrails */}
              <button
                type="button"
                onClick={() => setEnableOwasp(!enableOwasp)}
                className="w-full flex items-center space-x-3 text-xs font-mono text-left text-slate-300 hover:text-white p-2.5 rounded-none bg-[#07090E] border-2 border-[#1A2234] hover:border-[#8B5CF6] cursor-pointer transition-colors"
              >
                {enableOwasp ? (
                  <CheckSquare className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <div className="truncate">
                  <div className="font-bold text-white">OWASP Guardrails &amp; Honeypot</div>
                  <div className="text-[10px] text-slate-400">Rate limiting, strict CORS &amp; CSRF honeypots</div>
                </div>
              </button>

              {/* Automated SSL Traefik */}
              <button
                type="button"
                onClick={() => setEnableAutoSsl(!enableAutoSsl)}
                className="w-full flex items-center space-x-3 text-xs font-mono text-left text-slate-300 hover:text-white p-2.5 rounded-none bg-[#07090E] border-2 border-[#1A2234] hover:border-emerald-500 cursor-pointer transition-colors"
              >
                {enableAutoSsl ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <div className="truncate">
                  <div className="font-bold text-white">Automated Let&apos;s Encrypt TLS / SSL</div>
                  <div className="text-[10px] text-slate-400">Reverse proxy with automatic certificate renewal</div>
                </div>
              </button>
            </div>

            {/* Quick Link to Acquire System License */}
            <div className="pt-2 border-t border-[#1A2234]">
              <Link
                href={`/checkout?system=${selectedSystem.slug}`}
                className="w-full py-3 px-4 rounded-none text-xs font-black uppercase tracking-wider font-mono text-black bg-[#00F0FF] hover:bg-white border-2 border-[#00F0FF] hover:border-white shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <span>[ACQUIRE PERPETUAL REPO &amp; LICENSE]</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT COLUMN: REAL-TIME INTERACTIVE CODE TERMINAL (7 COLS) */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-7 rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#00F0FF] overflow-hidden relative flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent pointer-events-none" />

            {/* Terminal Header & File Tabs */}
            <div className="bg-[#07090E] border-b-2 border-[#1A2234] p-3 flex flex-wrap items-center justify-between gap-2">
              
              {/* File Tabs */}
              <div className="flex items-center space-x-1.5 font-mono text-xs overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("manifest")}
                  className={`px-3 py-1.5 rounded-none font-bold transition-all cursor-pointer border-2 min-h-[38px] flex items-center space-x-1.5 ${
                    activeTab === "manifest"
                      ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]"
                      : "text-slate-400 hover:text-white border-transparent hover:border-[#1A2234]"
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span>{manifestFileName}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("env")}
                  className={`px-3 py-1.5 rounded-none font-bold transition-all cursor-pointer border-2 min-h-[38px] flex items-center space-x-1.5 ${
                    activeTab === "env"
                      ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[2px_2px_0px_0px_#8B5CF6]"
                      : "text-slate-400 hover:text-white border-transparent hover:border-[#1A2234]"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{envFileName}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("script")}
                  className={`px-3 py-1.5 rounded-none font-bold transition-all cursor-pointer border-2 min-h-[38px] flex items-center space-x-1.5 ${
                    activeTab === "script"
                      ? "bg-emerald-500 text-black border-emerald-500 shadow-[2px_2px_0px_0px_#10B981]"
                      : "text-slate-400 hover:text-white border-transparent hover:border-[#1A2234]"
                  }`}
                >
                  <Play className="w-3.5 h-3.5 shrink-0" />
                  <span>deploy.sh</span>
                </button>
              </div>

              {/* Actions: Copy & Download */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-none bg-[#07090E] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border-2 border-[#00F0FF] text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] min-h-[38px]"
                  title="Copy generated configuration"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">[CONFIG_COPIED_TO_CLIPBOARD]</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>[COPY CONFIG]</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="px-3 py-1.5 rounded-none bg-[#07090E] text-slate-300 hover:text-white hover:bg-[#1A2234] border-2 border-[#1A2234] text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer min-h-[38px]"
                  title="Download configuration file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">[DOWNLOAD]</span>
                </button>
              </div>

            </div>

            {/* Terminal Code Viewport with Line Numbers */}
            <div className="bg-[#07090E] p-0 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto min-h-[460px] max-h-[620px] overflow-y-auto leading-relaxed selection:bg-[#00F0FF]/30 selection:text-white flex">
              
              {/* Line Numbers Gutter */}
              <div className="select-none py-4 px-3 bg-[#0A0E17] border-r border-[#1A2234] text-[#64748B] text-right font-mono text-xs space-y-0.5">
                {codeLines.map((_, i) => (
                  <div key={i} className="leading-6">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                ))}
              </div>

              {/* Code Content */}
              <div className="py-4 px-4 flex-1 overflow-x-auto font-mono text-xs leading-6">
                <pre className="text-slate-200">
                  {codeLines.map((line, idx) => {
                    const isComment = line.trim().startsWith("#");
                    const isKeyVal = line.includes("=") && !isComment;
                    const isYamlKey = line.trim().endsWith(":") && !isComment;

                    return (
                      <div key={idx} className="whitespace-pre">
                        {isComment ? (
                          <span className="text-[#64748B] italic">{line}</span>
                        ) : isKeyVal ? (
                          <span>
                            <span className="text-[#00F0FF] font-bold">{line.split("=")[0]}</span>
                            <span className="text-slate-400">=</span>
                            <span className="text-[#F1F5F9]">{line.slice(line.indexOf("=") + 1)}</span>
                          </span>
                        ) : isYamlKey ? (
                          <span className="text-[#8B5CF6] font-bold">{line}</span>
                        ) : (
                          <span className="text-slate-200">{line}</span>
                        )}
                      </div>
                    );
                  })}
                </pre>
              </div>

            </div>

            {/* Terminal Footer */}
            <div className="px-4 sm:px-6 py-2.5 bg-[#07090E] border-t-2 border-[#1A2234] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
                <span className="font-bold text-slate-300">
                  [SYSTEM: {selectedSystem.name.toUpperCase()} // RUNTIME: {deployTarget.toUpperCase()}]
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-500">{codeLines.length} LINES</span>
                <span className="text-[#00F0FF] font-bold">
                  [{activeTab === "manifest" ? manifestFileName : activeTab === "env" ? envFileName : "deploy.sh"}]
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* QUICK CLI COMMAND DISPATCH SECTION */}
        {/* ========================================================= */}
        <div className="bg-[#0D111A] border-2 border-[#1A2234] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#1A2234] space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#00F0FF] font-bold uppercase flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-[#00F0FF]" />
              <span>[06. DIRECT BASH INITIALIZATION SNIPPET]:</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">[RUN IN ROOT REPO]</span>
          </div>

          <div className="p-3.5 bg-[#07090E] border border-[#1A2234] text-xs text-slate-200 flex flex-wrap items-center justify-between gap-3">
            <code className="text-[#00F0FF] font-bold select-all">
              {deployTarget === "docker-compose"
                ? `chmod +x deploy.sh && ./deploy.sh`
                : deployTarget === "k8s-helm"
                ? `kubectl apply -f k8s-deployment.yaml -n nexus-${envMode}`
                : deployTarget === "vercel-edge"
                ? `vercel deploy ${envMode === "production" ? "--prod" : ""}`
                : `aws ecs register-task-definition --cli-input-json file://ecs-task-def.json`}
            </code>
            <button
              onClick={() => {
                const cmd =
                  deployTarget === "docker-compose"
                    ? `chmod +x deploy.sh && ./deploy.sh`
                    : deployTarget === "k8s-helm"
                    ? `kubectl apply -f k8s-deployment.yaml -n nexus-${envMode}`
                    : deployTarget === "vercel-edge"
                    ? `vercel deploy ${envMode === "production" ? "--prod" : ""}`
                    : `aws ecs register-task-definition --cli-input-json file://ecs-task-def.json`;
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(cmd);
                }
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-2.5 py-1 text-[11px] bg-[#0D111A] text-slate-300 hover:text-white border border-[#1A2234] hover:border-[#00F0FF] uppercase transition-colors"
            >
              [COPY CLI COMMAND]
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
