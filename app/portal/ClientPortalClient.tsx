"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  ShieldCheck,
  Key,
  Download,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Layers,
  Cpu,
  Package,
  HardDrive,
  FileCode2,
  Clock,
  ArrowRight,
  LogOut,
  Sliders,
  CheckCircle2,
  Shield,
  Activity,
  ChevronRight,
} from "lucide-react";

interface ClientPortalClientProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
    companyName?: string | null;
  };
  licenses: any[];
}

export default function ClientPortalClient({ user, licenses }: ClientPortalClientProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [copiedPullCmd, setCopiedPullCmd] = useState<string | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"artifacts" | "secrets" | "quickstart">("artifacts");

  const copyToClipboard = (text: string, type: "key" | "hash" | "cmd", id: string) => {
    navigator.clipboard.writeText(text);
    if (type === "key") {
      setCopiedKey(id);
      setTimeout(() => setCopiedKey(null), 2000);
    } else if (type === "hash") {
      setCopiedHash(id);
      setTimeout(() => setCopiedHash(null), 2000);
    } else {
      setCopiedPullCmd(id);
      setTimeout(() => setCopiedPullCmd(null), 2000);
    }
  };

  const triggerDownload = (filename: string) => {
    setDownloadToast(`Initiating secure payload download: ${filename}`);
    setTimeout(() => {
      // Mock download file creation
      const element = document.createElement("a");
      const file = new Blob(
        [
          `// NEXUS ENTERPRISE SOURCE ARTIFACT: ${filename}\n// LICENSED TO: ${user.email}\n// CRYPTOGRAPHIC SHA-256 INTEGRITY GUARANTEED\n// BUILD STATUS: PRODUCTION_VERIFIED\n\nconsole.log("Enterprise payload mounted successfully.");\n`
        ],
        { type: "text/plain" }
      );
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => setDownloadToast(null), 3000);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans pb-24 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1A2234 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Download Alert Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00F0FF] text-[#07090E] font-mono text-xs px-4 py-3 border-2 border-black shadow-[4px_4px_0px_#000] flex items-center gap-3 animate-bounce">
          <Terminal className="w-4 h-4" />
          <span className="font-bold">{downloadToast}</span>
        </div>
      )}

      {/* Top Telemetry Bar */}
      <header className="border-b-2 border-[#1A2234] bg-[#0D111A]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#07090E] border-2 border-[#00F0FF] flex items-center justify-center shadow-[3px_3px_0px_#00F0FF]">
              <Package className="w-5 h-5 text-[#00F0FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
                  [CLIENT_PORTAL // SECURE_VAULT]
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              </div>
              <h1 className="text-lg font-bold font-mono tracking-wider text-slate-100 uppercase">
                ENTERPRISE WORKSPACE CONSOLE
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-slate-400 text-[11px] font-bold">
                {user.companyName || "CYBER_ENTERPRISE_CORP"}
              </span>
              <span className="text-[#00F0FF] text-[10px]">{user.email}</span>
            </div>

            <span className="px-2.5 py-1 bg-[#10B981]/10 border border-[#10B981] text-[#10B981] font-bold uppercase text-[10px]">
              ROLE: {user.role || "CLIENT"}
            </span>

            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="px-3 py-1.5 bg-[#EF4444] text-white border-2 border-black font-bold uppercase text-[10px] hover:bg-red-600 transition-all shadow-[2px_2px_0px_#000]"
              >
                [ADMIN_MATRIX]
              </Link>
            )}

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-3 py-1.5 bg-[#07090E] border-2 border-[#1A2234] text-slate-300 hover:text-[#EF4444] hover:border-[#EF4444] transition-all flex items-center gap-1.5 uppercase font-bold text-[10px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8 relative z-10">
        {/* Telemetry KPI Ribbon */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0D111A] border-2 border-[#1A2234] p-4 shadow-[4px_4px_0px_#1A2234]">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                ACTIVE_LICENSES
              </span>
              <Key className="w-4 h-4 text-[#00F0FF]" />
            </div>
            <div className="text-2xl font-mono font-bold text-slate-100">{licenses.length}</div>
            <div className="text-[10px] font-mono text-[#10B981] mt-1">
              COMMERCIAL_IP_ENTITLEMENT
            </div>
          </div>

          <div className="bg-[#0D111A] border-2 border-[#1A2234] p-4 shadow-[4px_4px_0px_#1A2234]">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                INTEGRITY_STATUS
              </span>
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="text-2xl font-mono font-bold text-[#10B981]">100% VERIFIED</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              SHA-256 IMMUTABLE CHECKSUMS
            </div>
          </div>

          <div className="bg-[#0D111A] border-2 border-[#1A2234] p-4 shadow-[4px_4px_0px_#1A2234]">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                SOURCE_ACCESS
              </span>
              <FileCode2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-slate-100">FULL REPO</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              CLEAN-ROOM TYPESCRIPT & DEVOPS
            </div>
          </div>

          <div className="bg-[#0D111A] border-2 border-[#1A2234] p-4 shadow-[4px_4px_0px_#1A2234]">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                NOC_OPERATIONS
              </span>
              <Activity className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-yellow-400">99.98% SLA</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              ZERO-DOWNTIME ROLLOUT ENGINE
            </div>
          </div>
        </section>

        {/* Tab Selector */}
        <section className="flex flex-wrap items-center gap-2 border-b-2 border-[#1A2234] pb-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab("artifacts")}
            className={`px-4 py-2 border-2 transition-all font-bold uppercase ${
              activeTab === "artifacts"
                ? "bg-[#00F0FF] text-[#07090E] border-[#00F0FF] shadow-[3px_3px_0px_#000]"
                : "bg-[#0D111A] text-slate-300 border-[#1A2234] hover:border-slate-500"
            }`}
          >
            [1. LICENSED_SYSTEMS_&_ARTIFACTS]
          </button>
          <button
            onClick={() => setActiveTab("secrets")}
            className={`px-4 py-2 border-2 transition-all font-bold uppercase ${
              activeTab === "secrets"
                ? "bg-[#00F0FF] text-[#07090E] border-[#00F0FF] shadow-[3px_3px_0px_#000]"
                : "bg-[#0D111A] text-slate-300 border-[#1A2234] hover:border-slate-500"
            }`}
          >
            [2. API_KEYS_&_REGISTRY_TOKENS]
          </button>
          <button
            onClick={() => setActiveTab("quickstart")}
            className={`px-4 py-2 border-2 transition-all font-bold uppercase ${
              activeTab === "quickstart"
                ? "bg-[#00F0FF] text-[#07090E] border-[#00F0FF] shadow-[3px_3px_0px_#000]"
                : "bg-[#0D111A] text-slate-300 border-[#1A2234] hover:border-slate-500"
            }`}
          >
            [3. DEPLOYMENT_ORCHESTRATION]
          </button>
        </section>

        {/* Tab 1: Licensed Systems & Code Artifacts */}
        {activeTab === "artifacts" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-mono tracking-wider text-slate-100 uppercase">
                  ACTIVE SOFTWARE ENTITLEMENTS
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Cryptographically issued commercial source distributions. Click to download pre-built tarballs or copy container pull commands.
                </p>
              </div>

              <Link
                href="/verify"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D111A] border-2 border-[#1A2234] text-xs font-mono text-[#00F0FF] hover:border-[#00F0FF] transition-all shadow-[2px_2px_0px_#000]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>INDEPENDENT_VERIFIER</span>
              </Link>
            </div>

            {licenses.length === 0 ? (
              <div className="bg-[#0D111A] border-2 border-[#1A2234] p-12 text-center space-y-4">
                <Package className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold font-mono text-slate-200 uppercase">
                  NO ACTIVE SOFTWARE LICENSES FOUND
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto font-mono">
                  Explore our verified enterprise SaaS systems and procure an exclusive commercial production license.
                </p>
                <Link
                  href="/systems"
                  className="inline-block mt-2 px-4 py-2 bg-[#00F0FF] text-[#07090E] font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_#000]"
                >
                  [BROWSE_SYSTEMS_CATALOG]
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {licenses.map((lic) => {
                  const sysTitle = lic.system?.title || lic.system?.name || "Enterprise Core System";
                  const sysSlug = lic.system?.slug || "system-core";
                  const sysCategory = lic.system?.category || "Infrastructure";
                  const tarballName = `nexus-${sysSlug}-v2.4.2-enterprise.tar.gz`;
                  const pullCmd = `docker pull ghcr.io/nexus-enterprise/${sysSlug}:v2.4.2-prod`;

                  return (
                    <div
                      key={lic.id}
                      className="bg-[#0D111A] border-2 border-[#1A2234] hover:border-[#00F0FF]/60 transition-all p-6 shadow-[5px_5px_0px_#0A0D14]"
                    >
                      {/* Top Header of License Card */}
                      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#1A2234]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-[#00F0FF]/10 border border-[#00F0FF] text-[#00F0FF] text-[10px] font-mono font-bold uppercase">
                              {sysCategory}
                            </span>
                            <span className="px-2 py-0.5 bg-[#10B981]/10 border border-[#10B981] text-[#10B981] text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              {lic.status || "ACTIVE"}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold font-mono text-slate-100 uppercase">
                            {sysTitle}
                          </h3>
                          {lic.system?.tagline && (
                            <p className="text-xs text-slate-400 font-mono">
                              {lic.system.tagline}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/systems/${sysSlug}`}
                            className="px-3 py-1.5 bg-[#07090E] border border-[#1A2234] hover:border-slate-400 text-slate-300 font-mono text-xs flex items-center gap-1.5"
                          >
                            <span>VIEW_SPECS</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                          <Link
                            href={`/verify?key=${encodeURIComponent(lic.key)}`}
                            className="px-3 py-1.5 bg-[#07090E] border border-[#10B981] text-[#10B981] font-mono text-xs flex items-center gap-1.5 hover:bg-[#10B981]/10"
                          >
                            <Shield className="w-3 h-3" />
                            <span>VERIFY_SIGNATURE</span>
                          </Link>
                        </div>
                      </div>

                      {/* Cryptographic License & Hash Box */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 font-mono text-xs">
                        {/* License Key */}
                        <div className="bg-[#07090E] border border-[#1A2234] p-3 space-y-1">
                          <div className="flex items-center justify-between text-slate-500 text-[10px]">
                            <span>CRYPTOGRAPHIC_LICENSE_KEY</span>
                            <button
                              onClick={() => copyToClipboard(lic.key, "key", lic.id)}
                              className="text-[#00F0FF] hover:underline flex items-center gap-1"
                            >
                              {copiedKey === lic.id ? (
                                <>
                                  <Check className="w-3 h-3" /> COPIED
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" /> COPY_KEY
                                </>
                              )}
                            </button>
                          </div>
                          <div className="text-yellow-400 font-bold select-all break-all">
                            {lic.key}
                          </div>
                        </div>

                        {/* SHA-256 Build Hash */}
                        <div className="bg-[#07090E] border border-[#1A2234] p-3 space-y-1">
                          <div className="flex items-center justify-between text-slate-500 text-[10px]">
                            <span>SHA-256_INTEGRITY_BUILD_HASH</span>
                            <button
                              onClick={() => copyToClipboard(lic.buildHash, "hash", lic.id)}
                              className="text-[#10B981] hover:underline flex items-center gap-1"
                            >
                              {copiedHash === lic.id ? (
                                <>
                                  <Check className="w-3 h-3" /> COPIED
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" /> COPY_HASH
                                </>
                              )}
                            </button>
                          </div>
                          <div className="text-[#10B981] text-[11px] select-all break-all font-mono">
                            {lic.buildHash}
                          </div>
                        </div>
                      </div>

                      {/* Download Artifacts & Registry Strip */}
                      <div className="pt-2 border-t border-[#1A2234] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => triggerDownload(tarballName)}
                            className="px-4 py-2 bg-[#00F0FF] text-[#07090E] font-bold uppercase flex items-center gap-2 hover:bg-[#38bdf8] transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>DOWNLOAD_SOURCE_TARBALL (.TAR.GZ)</span>
                          </button>

                          <button
                            onClick={() => triggerDownload(`${sysSlug}-helm-chart.tgz`)}
                            className="px-3 py-2 bg-[#07090E] border border-[#1A2234] hover:border-slate-500 text-slate-300 flex items-center gap-1.5"
                          >
                            <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                            <span>HELM_CHART (.TGZ)</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2 bg-[#07090E] border border-[#1A2234] px-3 py-1.5 text-[11px]">
                          <span className="text-slate-500">OCI_IMAGE:</span>
                          <code className="text-slate-300 font-mono">{pullCmd}</code>
                          <button
                            onClick={() => copyToClipboard(pullCmd, "cmd", lic.id)}
                            className="text-[#00F0FF] hover:underline ml-2"
                            title="Copy Docker pull command"
                          >
                            {copiedPullCmd === lic.id ? (
                              <Check className="w-3 h-3 text-[#10B981]" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Tab 2: API Keys & Secrets */}
        {activeTab === "secrets" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-mono tracking-wider text-slate-100 uppercase">
                ENTERPRISE CREDENTIALS & SECRETS
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Configure your CI/CD pipelines to pull authenticated modules from Nexus Private Registries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0D111A] border-2 border-[#1A2234] p-6 space-y-4 shadow-[4px_4px_0px_#1A2234]">
                <div className="flex items-center justify-between border-b border-[#1A2234] pb-3">
                  <h3 className="font-mono font-bold text-sm text-slate-100 uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#00F0FF]" />
                    NPM PRIVATE REGISTRY TOKEN
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]">
                    READ_ONLY
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Append to your root <code className="text-[#00F0FF]">.npmrc</code> to pull proprietary UI & SDK packages:
                </p>
                <div className="bg-[#07090E] border border-[#1A2234] p-3 font-mono text-xs space-y-1">
                  <div className="text-slate-500 text-[10px]"># .npmrc configuration</div>
                  <div className="text-slate-200">@nexus:registry=https://npm.nexus-enterprise.io/</div>
                  <div className="text-slate-200">
                    //npm.nexus-enterprise.io/:_authToken=nx_sec_live_99a842f10dce
                  </div>
                </div>
              </div>

              <div className="bg-[#0D111A] border-2 border-[#1A2234] p-6 space-y-4 shadow-[4px_4px_0px_#1A2234]">
                <div className="flex items-center justify-between border-b border-[#1A2234] pb-3">
                  <h3 className="font-mono font-bold text-sm text-slate-100 uppercase flex items-center gap-2">
                    <Key className="w-4 h-4 text-yellow-400" />
                    OCI CONTAINER REGISTRY SECRET
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400">
                    K8S_PULL_SECRET
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Create a Kubernetes secret to authenticate Helm deployments:
                </p>
                <div className="bg-[#07090E] border border-[#1A2234] p-3 font-mono text-xs overflow-x-auto text-slate-300">
                  <code>kubectl create secret docker-registry nexus-creds \<br/>
                  &nbsp;&nbsp;--docker-server=ghcr.io \<br/>
                  &nbsp;&nbsp;--docker-username={user.email?.split("@")[0] || "enterprise"} \<br/>
                  &nbsp;&nbsp;--docker-password=nx_oci_tok_8849201bcde
                  </code>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Orchestration & Deployment */}
        {activeTab === "quickstart" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-mono tracking-wider text-slate-100 uppercase">
                PRODUCTION DEPLOYMENT RUNBOOKS
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Zero-downtime execution guides for Docker Compose, Kubernetes, and Cloudflare/Vercel Edge.
              </p>
            </div>

            <div className="bg-[#0D111A] border-2 border-[#1A2234] p-6 space-y-4 shadow-[4px_4px_0px_#1A2234]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A2234] pb-3">
                <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase">
                  [QUICKSTART // 3-STEP ZERO-DOWNTIME ROLLOUT]
                </span>
                <Link
                  href="/deploy-config"
                  className="text-xs font-mono text-[#00F0FF] hover:underline flex items-center gap-1"
                >
                  <span>LAUNCH_INTERACTIVE_DEPLOY_CONFIGURATOR</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-[#07090E] border border-[#1A2234] p-4 space-y-2">
                  <div className="text-[#00F0FF] font-bold">01. UNPACK TARBALL</div>
                  <code className="text-slate-300 block bg-[#0D111A] p-2 border border-[#1A2234]">
                    tar -xzf nexus-*.tar.gz<br />cd enterprise-release
                  </code>
                  <p className="text-slate-500 text-[11px]">
                    Extract validated release artifact and cd into root directory.
                  </p>
                </div>

                <div className="bg-[#07090E] border border-[#1A2234] p-4 space-y-2">
                  <div className="text-yellow-400 font-bold">02. SEED ENVIRONMENT</div>
                  <code className="text-slate-300 block bg-[#0D111A] p-2 border border-[#1A2234]">
                    cp .env.example .env.production<br />npm run secrets:validate
                  </code>
                  <p className="text-slate-500 text-[11px]">
                    Populate your database credentials and execute pre-flight audit.
                  </p>
                </div>

                <div className="bg-[#07090E] border border-[#1A2234] p-4 space-y-2">
                  <div className="text-[#10B981] font-bold">03. EXECUTE CLUSTER UP</div>
                  <code className="text-slate-300 block bg-[#0D111A] p-2 border border-[#1A2234]">
                    docker compose up -d --build
                  </code>
                  <p className="text-slate-500 text-[11px]">
                    Boots frontend, backend API, Redis caching, and health telemetry probes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
