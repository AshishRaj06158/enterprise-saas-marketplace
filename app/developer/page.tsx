"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Key,
  Webhook,
  Send,
  Eye,
  EyeOff,
  Copy,
  Check,
  Plus,
  ShieldCheck,
  Terminal,
  RefreshCw,
  Code2,
  Lock,
  Layers,
  Sparkles,
  AlertTriangle,
  Zap,
  CheckCircle2,
  X,
  ExternalLink
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"keys" | "webhooks" | "dispatcher">("keys");

  // API Keys state
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  
  // New Key Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyType, setNewKeyType] = useState<"production" | "test">("production");
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["Read Catalog", "Verify License"]);
  const [keyCreatedNotice, setKeyCreatedNotice] = useState<string | null>(null);

  // Webhooks Config state
  const [webhookUrl, setWebhookUrl] = useState("https://api.yourdomain.com/webhooks/nexus");
  const [signingSecret] = useState("whsec_99a8b7c6d5e4f3a210fedcba9876543210");
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [subscribedEvents, setSubscribedEvents] = useState({
    licensePurchased: true,
    deploymentVerified: true,
    securityAlertTriggered: true,
  });
  const [configSavedNotice, setConfigSavedNotice] = useState(false);

  // Dispatcher Test Sandbox state
  const [selectedEvent, setSelectedEvent] = useState<"license.purchased" | "security.alert_triggered" | "deployment.verified">("license.purchased");
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<{
    status: number;
    statusText: string;
    latency: number;
    timestamp: string;
    payload: object;
    headers: Record<string, string>;
  } | null>(null);

  const toggleRevealKey = (id: string) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const copySigningSecret = () => {
    navigator.clipboard.writeText(signingSecret);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    const randomHash = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
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
    setKeyCreatedNotice(`Generated new ${newKeyType.toUpperCase()} token: ${masked}`);
    setTimeout(() => setKeyCreatedNotice(null), 4000);
  };

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleSaveWebhookConfig = () => {
    setConfigSavedNotice(true);
    setTimeout(() => setConfigSavedNotice(false), 3000);
  };

  const handleDispatchTestEvent = () => {
    setIsDispatching(true);
    setDispatchResult(null);

    setTimeout(() => {
      const now = new Date().toISOString();
      const mockPayloads = {
        "license.purchased": {
          event: "license.purchased",
          event_id: `evt_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: now,
          data: {
            license_key: "NEXUS-COMM-99A1-42F8-2026",
            system_slug: "nexus-agent-orchestrator",
            plan: "COMMERCIAL PERPETUAL",
            customer_email: "enterprise@client.internal",
            amount_paid_inr: 29999,
            gst_invoice_id: "INV-2026-90812"
          }
        },
        "security.alert_triggered": {
          event: "security.alert_triggered",
          event_id: `evt_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: now,
          data: {
            alert_type: "UNAUTHORIZED_SCHEMA_READ_ATTEMPT",
            severity: "HIGH",
            source_ip: "192.0.2.148",
            action_taken: "RLS_BLOCKED_AND_LOGGED",
            affected_table: "public.license_entitlements"
          }
        },
        "deployment.verified": {
          event: "deployment.verified",
          event_id: `evt_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: now,
          data: {
            deployment_id: "dep_01h9x82y7z",
            domain: "app.enterprise.internal",
            sha256_hash: "8f4c6e7a1b92019f8a32b0012c44ef89",
            status: "SLA_ACTIVE"
          }
        }
      };

      setDispatchResult({
        status: 200,
        statusText: "OK",
        latency: Math.floor(Math.random() * 15) + 18, // 18-32ms
        timestamp: now,
        payload: mockPayloads[selectedEvent],
        headers: {
          "content-type": "application/json",
          "x-nexus-signature": "t=1791483492,v1=9a8b7c6d5e4f3a210fedcba9876543210",
          "user-agent": "Nexus-Webhook-Relay/2.4.0",
          "x-nexus-node": "ap-south-1-mumbai-edge-01"
        }
      });
      setIsDispatching(false);
    }, 600);
  };

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-xs font-mono text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
            <Code2 className="w-4 h-4 text-[#00F0FF]" />
            <span>[DEVELOPER CONSOLE // API KEYS &amp; WEBHOOK DISPATCH]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Developer Settings &amp; Webhook Hub
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Manage secret deployment tokens, configure outbound webhook relays, and dispatch test payloads.
          </p>
        </div>

        {/* Global Key Created Notice Banner */}
        {keyCreatedNotice && (
          <div className="p-4 rounded-none bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 text-xs font-mono flex items-center justify-between shadow-[4px_4px_0px_0px_#10B981]">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{keyCreatedNotice}</span>
            </div>
            <button onClick={() => setKeyCreatedNotice(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* NAVIGATION TAB STRIP */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 border-b-2 border-[#1A2234] pb-4 font-mono text-xs">
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
            <span>[WEBHOOK ENDPOINTS]</span>
          </button>

          <button
            onClick={() => setActiveTab("dispatcher")}
            className={`px-4 py-2.5 rounded-none transition-all cursor-pointer flex items-center space-x-2 font-bold min-h-[44px] ${
              activeTab === "dispatcher"
                ? "bg-[#00F0FF] text-black border-2 border-black shadow-[4px_4px_0px_0px_#00F0FF]"
                : "bg-[#0D111A] text-slate-400 border-2 border-[#1A2234] hover:text-white shadow-[2px_2px_0px_0px_#1A2234]"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>[WEBHOOK TEST DISPATCHER]</span>
          </button>
        </div>

        {/* TAB 1: API ACCESS KEYS */}
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

            {/* Keys Table / List */}
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
                                className="text-slate-400 hover:text-white p-1"
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

        {/* TAB 2: WEBHOOK ENDPOINTS */}
        {activeTab === "webhooks" && (
          <div className="space-y-6">
            <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-6 shadow-[4px_4px_0px_0px_#1A2234] hover:border-[#00F0FF] transition-all">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2 font-mono uppercase">
                  <Webhook className="w-5 h-5 text-[#00F0FF]" />
                  <span>[OUTBOUND WEBHOOK RELAY CONFIGURATION]</span>
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">
                  SUTRA / NEXUS will dispatch HMAC-SHA256 signed POST payloads to your designated HTTPS callback URL upon system events.
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

              {/* Event Subscriptions Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                  [EVENT SUBSCRIPTIONS]:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  
                  <label className={`p-4 rounded-none border-2 cursor-pointer transition-all flex items-start space-x-3 ${
                    subscribedEvents.licensePurchased
                      ? "bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-[2px_2px_0px_0px_#00F0FF]"
                      : "bg-[#07090E] border-[#1A2234] text-slate-400 shadow-[2px_2px_0px_0px_#1A2234]"
                  }`}>
                    <input
                      type="checkbox"
                      checked={subscribedEvents.licensePurchased}
                      onChange={(e) => setSubscribedEvents((prev) => ({ ...prev, licensePurchased: e.target.checked }))}
                      className="mt-0.5 accent-[#00F0FF]"
                    />
                    <div>
                      <div className="font-bold text-[#00F0FF]">license.purchased</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Dispatched on new commercial license acquisition</div>
                    </div>
                  </label>

                  <label className={`p-4 rounded-none border-2 cursor-pointer transition-all flex items-start space-x-3 ${
                    subscribedEvents.deploymentVerified
                      ? "bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-[2px_2px_0px_0px_#00F0FF]"
                      : "bg-[#07090E] border-[#1A2234] text-slate-400 shadow-[2px_2px_0px_0px_#1A2234]"
                  }`}>
                    <input
                      type="checkbox"
                      checked={subscribedEvents.deploymentVerified}
                      onChange={(e) => setSubscribedEvents((prev) => ({ ...prev, deploymentVerified: e.target.checked }))}
                      className="mt-0.5 accent-[#00F0FF]"
                    />
                    <div>
                      <div className="font-bold text-[#00F0FF]">deployment.verified</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Dispatched when SHA-256 domain bind succeeds</div>
                    </div>
                  </label>

                  <label className={`p-4 rounded-none border-2 cursor-pointer transition-all flex items-start space-x-3 ${
                    subscribedEvents.securityAlertTriggered
                      ? "bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-[2px_2px_0px_0px_#00F0FF]"
                      : "bg-[#07090E] border-[#1A2234] text-slate-400 shadow-[2px_2px_0px_0px_#1A2234]"
                  }`}>
                    <input
                      type="checkbox"
                      checked={subscribedEvents.securityAlertTriggered}
                      onChange={(e) => setSubscribedEvents((prev) => ({ ...prev, securityAlertTriggered: e.target.checked }))}
                      className="mt-0.5 accent-[#00F0FF]"
                    />
                    <div>
                      <div className="font-bold text-[#00F0FF]">security.alert_triggered</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Dispatched on RLS policy bypass or honeypot hit</div>
                    </div>
                  </label>

                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center justify-between border-t-2 border-[#1A2234]">
                {configSavedNotice ? (
                  <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>[WEBHOOK ENDPOINT CONFIGURATION SAVED]</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500">
                    Endpoint active • HMAC-SHA256 signing enabled
                  </span>
                )}

                <button
                  onClick={handleSaveWebhookConfig}
                  className="px-6 py-2.5 rounded-none bg-[#00F0FF] text-black border-2 border-black font-mono font-bold text-xs uppercase hover:bg-[#00F0FF]/90 transition-all cursor-pointer min-h-[44px] shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF]"
                >
                  [SAVE CONFIGURATION]
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE WEBHOOK DISPATCHER / TEST SANDBOX */}
        {activeTab === "dispatcher" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Controls Column */}
              <div className="lg:col-span-4 rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 space-y-6 h-fit shadow-[4px_4px_0px_0px_#1A2234]">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2 font-mono uppercase">
                    <Send className="w-4 h-4 text-[#00F0FF]" />
                    <span>[TEST EVENT DISPATCHER]</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 font-mono">
                    Simulate real-time HTTP payload POST transmission to your configured webhook endpoint.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                    [SELECT TEST EVENT PAYLOAD]:
                  </label>
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value as any)}
                    className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3 py-2.5 text-xs text-white font-mono focus:outline-none cursor-pointer shadow-[2px_2px_0px_0px_#1A2234]"
                  >
                    <option value="license.purchased">license.purchased (Commercial Sale)</option>
                    <option value="security.alert_triggered">security.alert_triggered (RLS Alert)</option>
                    <option value="deployment.verified">deployment.verified (SLA Check)</option>
                  </select>
                </div>

                <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] space-y-2 text-xs font-mono shadow-[2px_2px_0px_0px_#1A2234]">
                  <div className="text-slate-400 text-[11px] uppercase">[TARGET CALLBACK URL]:</div>
                  <div className="text-[#00F0FF] font-mono truncate">{webhookUrl}</div>
                </div>

                <button
                  onClick={handleDispatchTestEvent}
                  disabled={isDispatching}
                  className="w-full py-3.5 rounded-none bg-[#00F0FF] text-black border-2 border-black font-mono font-bold text-xs uppercase hover:bg-[#00F0FF]/90 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] disabled:opacity-50 min-h-[44px]"
                >
                  {isDispatching ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>[TRANSMITTING PAYLOAD...]</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>[DISPATCH TEST EVENT ➔]</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Viewer Column */}
              <div className="lg:col-span-8 rounded-none bg-[#07090E] border-2 border-[#1A2234] overflow-hidden shadow-[4px_4px_0px_0px_#1A2234] flex flex-col min-h-[420px]">
                
                {/* Terminal Header */}
                <div className="bg-[#0D111A] px-4 py-3 border-b-2 border-[#1A2234] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-red-500 inline-block" />
                    <span className="w-3 h-3 bg-yellow-500 inline-block" />
                    <span className="w-3 h-3 bg-emerald-500 inline-block" />
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      webhook-dispatch-console.log
                    </span>
                  </div>

                  {dispatchResult && (
                    <div className="flex items-center space-x-3 text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-none bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                        {dispatchResult.status} {dispatchResult.statusText}
                      </span>
                      <span className="text-[#00F0FF]">
                        Latency: {dispatchResult.latency}ms
                      </span>
                    </div>
                  )}
                </div>

                {/* Terminal Content Body */}
                <div className="p-6 font-mono text-xs text-slate-300 space-y-4 overflow-y-auto flex-1">
                  {dispatchResult ? (
                    <>
                      <div className="text-slate-500 border-b border-[#1A2234] pb-2">
                        [SYSTEM RELAY]: HTTP POST transmitted to <span className="text-white">{webhookUrl}</span> at {dispatchResult.timestamp}
                      </div>

                      <div className="space-y-1">
                        <div className="text-[#00F0FF] font-bold uppercase text-[11px] tracking-wider">
                          // TRANSMITTED REQUEST HEADERS:
                        </div>
                        <pre className="bg-[#0D111A] p-3 rounded-none border border-[#1A2234] text-slate-300 text-[11px] overflow-x-auto">
                          {JSON.stringify(dispatchResult.headers, null, 2)}
                        </pre>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[#8B5CF6] font-bold uppercase text-[11px] tracking-wider">
                          // JSON EVENT PAYLOAD:
                        </div>
                        <pre className="bg-[#0D111A] p-4 rounded-none border border-[#00F0FF]/30 text-emerald-400 text-[11px] overflow-x-auto">
                          {JSON.stringify(dispatchResult.payload, null, 2)}
                        </pre>
                      </div>

                      <div className="text-emerald-400 text-[11px] flex items-center space-x-2 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Transmission round-trip complete. Signature hash verified successfully.</span>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 text-slate-500 space-y-3 font-mono">
                      <Terminal className="w-8 h-8 text-[#00F0FF]/40" />
                      <div>Ready to dispatch test webhooks. Select an event payload on the left and click &quot;[DISPATCH TEST EVENT]&quot;.</div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* NEW KEY CREATION MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0D111A] border-2 border-[#00F0FF] rounded-none p-6 sm:p-8 max-w-md w-full space-y-6 shadow-[6px_6px_0px_0px_#00F0FF] relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2 font-mono uppercase">
                  <Key className="w-5 h-5 text-[#00F0FF]" />
                  <span>[GENERATE SCOPED SECRET KEY]</span>
                </h3>
                <p className="text-xs text-[#94A3B8] font-mono">Create a new bearer token with restricted API permissions.</p>
              </div>

              <div className="space-y-4 text-xs font-mono">
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
                  className="px-4 py-2 rounded-none bg-[#07090E] text-slate-400 border-2 border-[#1A2234] hover:text-white text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  className="px-5 py-2 rounded-none bg-[#00F0FF] text-black border-2 border-black font-bold text-xs uppercase hover:bg-[#00F0FF]/90 transition-all font-mono shadow-[2px_2px_0px_0px_#00F0FF]"
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
