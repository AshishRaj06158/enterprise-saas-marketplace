"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Command,
  ShieldCheck,
  Layers,
  Terminal,
  Cpu,
  DollarSign,
  MessageCircle,
  ExternalLink,
  Zap,
  X,
  Sparkles,
  ArrowRight,
  BarChart3,
  Sliders,
  Activity,
  Key,
  GitCommit,
  Code2,
  Calculator,
  Mail,
  RotateCcw,
  Check,
  Copy,
  CornerDownLeft
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { getAllSystems } from "@/data/systems";

interface CommandAction {
  id: string;
  title: string;
  subtitle: string;
  category: "Systems" | "Navigation" | "Actions";
  keywords: string[];
  icon: React.ElementType;
  badge?: string;
  shortcut?: string;
  onSelect: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  const router = useRouter();
  const { currency, toggleCurrency } = useCurrency();
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // 2. Global hotkey listener (Cmd+K on Mac, Ctrl+K on Windows/Linux, and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // 3. Auto focus input on modal open & reset selection
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
      setCopiedNotice(null);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 4. Scroll selected item into view
  useEffect(() => {
    if (isOpen && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex, isOpen]);

  const systems = getAllSystems();

  // 5. Build full command catalog
  const allActions: CommandAction[] = useMemo(() => {
    const actions: CommandAction[] = [
      // Quick Actions (Top priority utilities)
      {
        id: "act-toggle-currency",
        title: `Switch Currency to ${currency === "INR" ? "USD ($)" : "INR (₹)"}`,
        subtitle: `Current active currency is [${currency}]. Toggles all pricing tiers across the catalog.`,
        category: "Actions",
        keywords: ["currency", "inr", "usd", "rupee", "dollar", "switch", "toggle", "price"],
        icon: DollarSign,
        badge: `ACTIVE: ${currency}`,
        shortcut: "ENTER TO TOGGLE",
        onSelect: () => {
          toggleCurrency();
          setCopiedNotice(`Currency switched to ${currency === "INR" ? "USD ($)" : "INR (₹)"}`);
          setTimeout(() => setIsOpen(false), 600);
        },
      },
      {
        id: "act-copy-email",
        title: "Copy Support Email (contact@nexuslab.vercel.app)",
        subtitle: "1-Click copy to clipboard for architectural inquiries and enterprise SLAs.",
        category: "Actions",
        keywords: ["email", "support", "contact", "copy", "architect", "help", "inquiry"],
        icon: Mail,
        badge: "SUPPORT",
        shortcut: "COPY",
        onSelect: () => {
          const email = "contact@nexuslab.vercel.app";
          if (navigator.clipboard) {
            navigator.clipboard.writeText(email);
          }
          setCopiedNotice("[COPIED: contact@nexuslab.vercel.app]");
          setTimeout(() => {
            setIsOpen(false);
          }, 900);
        },
      },
      {
        id: "act-reset-filters",
        title: "Reset Filters & Clear Catalog Search",
        subtitle: "Revert category selection back to 'All Systems' and clear any active search queries.",
        category: "Actions",
        keywords: ["reset", "filter", "clear", "catalog", "search", "all systems"],
        icon: RotateCcw,
        badge: "CATALOG",
        shortcut: "RESET",
        onSelect: () => {
          window.dispatchEvent(new CustomEvent("reset-system-filters"));
          router.push("/systems");
          setIsOpen(false);
        },
      },

      // Core Systems (All 6 from data/systems.ts)
      ...systems.map((sys) => ({
        id: `sys-${sys.slug}`,
        title: sys.name,
        subtitle: `${sys.tagline} • ${sys.stack.slice(0, 3).join(", ")}`,
        category: "Systems" as const,
        keywords: [
          sys.name.toLowerCase(),
          sys.slug.toLowerCase(),
          sys.category.toLowerCase(),
          sys.tagline.toLowerCase(),
          sys.description.toLowerCase(),
          ...sys.stack.map((s) => s.toLowerCase()),
          sys.metrics.toLowerCase(),
        ],
        icon: Cpu,
        badge: sys.category.toUpperCase(),
        shortcut: currency === "INR" ? sys.priceInr : sys.priceUsd,
        onSelect: () => {
          router.push(`/systems/${sys.slug}`);
          setIsOpen(false);
        },
      })),

      // Core Navigation Routes
      {
        id: "nav-systems",
        title: "Systems Catalog (/systems)",
        subtitle: "Browse all 6 production-ready business software codebases with commercial IP rights.",
        category: "Navigation",
        keywords: ["systems", "catalog", "browse", "products", "software", "codebase"],
        icon: Layers,
        badge: "CATALOG",
        shortcut: "GOTO /systems",
        onSelect: () => {
          router.push("/systems");
          setIsOpen(false);
        },
      },
      {
        id: "nav-playground",
        title: "Interactive Live Playground (/playground)",
        subtitle: "Real-time telemetry streams, AI agent reasoning traces, and fintech ledger simulator.",
        category: "Navigation",
        keywords: ["playground", "sandbox", "telemetry", "ai agent", "fintech", "mock", "console", "terminal"],
        icon: Terminal,
        badge: "SANDBOX",
        shortcut: "GOTO /playground",
        onSelect: () => {
          router.push("/playground");
          setIsOpen(false);
        },
      },
      {
        id: "nav-developer",
        title: "Architecture Blueprint & API Console (/developer)",
        subtitle: "High-Level Design (HLD) flow diagrams, micro-specs, and cURL / TypeScript / Python snippets.",
        category: "Navigation",
        keywords: ["developer", "architecture", "blueprint", "api", "console", "hld", "curl", "tokens"],
        icon: Code2,
        badge: "DEV CONSOLE",
        shortcut: "GOTO /developer",
        onSelect: () => {
          router.push("/developer");
          setIsOpen(false);
        },
      },
      {
        id: "nav-compare",
        title: "Systems Comparison Matrix & Benchmarks (/compare)",
        subtitle: "Side-by-side architectural specs, P99 latencies, concurrency, and compliance comparison.",
        category: "Navigation",
        keywords: ["compare", "matrix", "benchmark", "latency", "throughput", "versus", "specs"],
        icon: BarChart3,
        badge: "BENCHMARK",
        shortcut: "GOTO /compare",
        onSelect: () => {
          router.push("/compare");
          setIsOpen(false);
        },
      },
      {
        id: "nav-calculator",
        title: "Engineering ROI & Savings Calculator (/calculator)",
        subtitle: "Simulate in-house engineering team burn rate vs perpetual codebase acquisition savings.",
        category: "Navigation",
        keywords: ["calculator", "roi", "savings", "engineering", "burn rate", "cost", "investment"],
        icon: Calculator,
        badge: "ROI SIMULATOR",
        shortcut: "GOTO /calculator",
        onSelect: () => {
          router.push("/calculator");
          setIsOpen(false);
        },
      },
      {
        id: "nav-operations",
        title: "Operational Status & Node Health (/operations)",
        subtitle: "Edge node latencies, database connection pool telemetry, and active incident status.",
        category: "Navigation",
        keywords: ["operations", "status", "health", "nodes", "uptime", "telemetry", "infrastructure"],
        icon: Activity,
        badge: "INFRA",
        shortcut: "GOTO /operations",
        onSelect: () => {
          router.push("/operations");
          setIsOpen(false);
        },
      },
      {
        id: "nav-deploy-config",
        title: "Deployment Config & Docker Blueprint (/deploy-config)",
        subtitle: "Generate production docker-compose.yml, .env.production, and CI/CD workflow matrices.",
        category: "Navigation",
        keywords: ["deploy", "config", "docker", "compose", "env", "production", "kubernetes", "ci/cd"],
        icon: Sliders,
        badge: "CONFIG",
        shortcut: "GOTO /deploy-config",
        onSelect: () => {
          router.push("/deploy-config");
          setIsOpen(false);
        },
      },
      {
        id: "nav-pricing",
        title: "Commercial Licensing & SLA Tiers (/pricing)",
        subtitle: "Perpetual source code ownership, enterprise SLA tiers, and custom customization retainer.",
        category: "Navigation",
        keywords: ["pricing", "license", "commercial", "sla", "tiers", "enterprise", "cost"],
        icon: Zap,
        badge: "LICENSING",
        shortcut: "GOTO /pricing",
        onSelect: () => {
          router.push("/pricing");
          setIsOpen(false);
        },
      },
      {
        id: "nav-vault",
        title: "Customer License Vault & Key Hub (/vault)",
        subtitle: "Cryptographic SHA-256 license key generation, GitHub access tokens, and asset bundles.",
        category: "Navigation",
        keywords: ["vault", "license key", "github", "tokens", "sha-256", "customer", "assets"],
        icon: Key,
        badge: "SECURITY",
        shortcut: "GOTO /vault",
        onSelect: () => {
          router.push("/vault");
          setIsOpen(false);
        },
      },
      {
        id: "nav-changelog",
        title: "Platform Changelog & Security Stream (/changelog)",
        subtitle: "Audit release notes, vulnerability mitigations, and framework dependency updates.",
        category: "Navigation",
        keywords: ["changelog", "release", "notes", "security", "updates", "v2.4.0", "patches"],
        icon: GitCommit,
        badge: "STREAM",
        shortcut: "GOTO /changelog",
        onSelect: () => {
          router.push("/changelog");
          setIsOpen(false);
        },
      },
      {
        id: "nav-demos",
        title: "Live Sandbox Demos (/demos)",
        subtitle: "Explore interactive telemetry nodes and pre-rendered system sandbox interfaces.",
        category: "Navigation",
        keywords: ["demos", "sandbox", "live", "preview", "telemetry"],
        icon: Terminal,
        badge: "DEMOS",
        shortcut: "GOTO /demos",
        onSelect: () => {
          router.push("/demos");
          setIsOpen(false);
        },
      },
      {
        id: "nav-verify",
        title: "License & SLA Verification Portal (/verify)",
        subtitle: "Verify authentic commercial IP entitlements and validate SHA-256 signatures.",
        category: "Navigation",
        keywords: ["verify", "license", "sla", "authenticity", "sha-256", "signature"],
        icon: ShieldCheck,
        badge: "VERIFY",
        shortcut: "GOTO /verify",
        onSelect: () => {
          router.push("/verify");
          setIsOpen(false);
        },
      },
      {
        id: "nav-checkout",
        title: "Checkout & License Acquisition (/checkout)",
        subtitle: "Instant Razorpay/UPI checkout with automated GST invoice and repository dispatch.",
        category: "Navigation",
        keywords: ["checkout", "buy", "acquire", "razorpay", "upi", "gst", "invoice"],
        icon: ShieldCheck,
        badge: "CHECKOUT",
        shortcut: "GOTO /checkout",
        onSelect: () => {
          router.push("/checkout");
          setIsOpen(false);
        },
      },
      {
        id: "nav-portal",
        title: "Client Portal & Source Code Vault (/portal)",
        subtitle: "Access licensed source distributions, SHA-256 build checksums, and Docker pull commands.",
        category: "Navigation",
        keywords: ["portal", "client", "license", "source code", "download", "artifacts", "sha-256", "docker"],
        icon: Key,
        badge: "CLIENT VAULT",
        shortcut: "GOTO /portal",
        onSelect: () => {
          router.push("/portal");
          setIsOpen(false);
        },
      },
      {
        id: "nav-admin",
        title: "Enterprise Admin Control Matrix (/admin)",
        subtitle: "Manage live systems, deploy new architecture models, and mint commercial licenses.",
        category: "Navigation",
        keywords: ["admin", "control room", "matrix", "manage", "deploy", "systems", "licenses", "audit"],
        icon: Cpu,
        badge: "ADMIN CLEARANCE",
        shortcut: "GOTO /admin",
        onSelect: () => {
          router.push("/admin");
          setIsOpen(false);
        },
      },
      {
        id: "nav-auth-login",
        title: "Security Clearance // Login Gateway (/auth/login)",
        subtitle: "Authenticate with credentials or load instant demo admin/client profiles.",
        category: "Navigation",
        keywords: ["login", "auth", "authenticate", "clearance", "session", "sign in", "admin", "client"],
        icon: Terminal,
        badge: "AUTHENTICATE",
        shortcut: "GOTO /auth/login",
        onSelect: () => {
          router.push("/auth/login");
          setIsOpen(false);
        },
      },
      {
        id: "nav-auth-register",
        title: "Client Node Registration (/auth/register)",
        subtitle: "Register new enterprise client identity for commercial licensing and artifact downloads.",
        category: "Navigation",
        keywords: ["register", "sign up", "client", "node", "new account", "join"],
        icon: ShieldCheck,
        badge: "REGISTER",
        shortcut: "GOTO /auth/register",
        onSelect: () => {
          router.push("/auth/register");
          setIsOpen(false);
        },
      },
    ];

    return actions;
  }, [systems, currency, toggleCurrency, router]);

  // 6. Fast fuzzy search scoring
  const filteredActions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allActions;

    const scored = allActions
      .map((action) => {
        let score = 0;
        const titleLower = action.title.toLowerCase();
        const subtitleLower = action.subtitle.toLowerCase();

        // Exact / start matches
        if (titleLower === q) score += 100;
        else if (titleLower.startsWith(q)) score += 60;
        else if (titleLower.includes(q)) score += 40;

        // Subtitle match
        if (subtitleLower.includes(q)) score += 20;

        // Keywords match
        for (const kw of action.keywords) {
          if (kw === q) score += 50;
          else if (kw.startsWith(q)) score += 30;
          else if (kw.includes(q)) score += 15;
        }

        // Category match
        if (action.category.toLowerCase().includes(q)) score += 10;

        return { action, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.action);

    return scored;
  }, [allActions, searchQuery]);

  // 7. Keyboard navigation within filtered list
  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].onSelect();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Nexus Command Palette HUD"
    >
      {/* Click Backdrop to close */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sharp-edged Neo-Brutalist modal window */}
      <div className="relative w-full max-w-2xl bg-[#0D111A] border-2 border-[#00F0FF] rounded-none shadow-[8px_8px_0px_0px_#07090E] overflow-hidden z-10 text-slate-100 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Cybernetic Scanline Accent Beam */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

        {/* Modal Header & Search Bar */}
        <div className="relative border-b-2 border-[#1A2234] flex items-center px-4 py-3.5 bg-[#07090E]">
          <Search className="w-5 h-5 text-[#00F0FF] shrink-0 mr-3 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInInput}
            placeholder="Type a command, route, or system (e.g. 'telemetry', 'currency', 'compare', 'api')..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 font-mono focus:outline-none tracking-wide uppercase"
          />

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-none text-slate-400 hover:text-[#00F0FF] hover:bg-[#1A2234] border border-transparent hover:border-[#00F0FF] mr-1.5 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="px-2 py-1 rounded-none bg-[#0D111A] text-slate-400 hover:text-white hover:bg-[#1A2234] border border-[#1A2234] hover:border-[#00F0FF] transition-colors text-[10px] font-mono font-bold"
            title="Close (Esc)"
          >
            ESC
          </button>
        </div>

        {/* Transient Action Notice (e.g., Copied Email / Switched Currency) */}
        {copiedNotice && (
          <div className="px-4 py-2 bg-[#00F0FF]/15 border-b-2 border-[#00F0FF] flex items-center justify-between text-xs font-mono text-[#00F0FF] animate-in fade-in duration-100">
            <span className="flex items-center space-x-2 font-bold">
              <Check className="w-4 h-4 text-[#00F0FF]" />
              <span>{copiedNotice}</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">[DISPATCHED]</span>
          </div>
        )}

        {/* Action List Section */}
        <div className="overflow-y-auto p-2 space-y-1 font-mono flex-1 divide-y divide-[#1A2234]/40">
          {filteredActions.length > 0 ? (
            filteredActions.map((action, idx) => {
              const IconComp = action.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onClick={action.onSelect}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-none transition-all flex items-center justify-between cursor-pointer border-2 ${
                    isSelected
                      ? "bg-[#00F0FF]/15 border-[#00F0FF] text-white shadow-[2px_2px_0px_0px_#00F0FF]"
                      : "text-slate-300 hover:bg-[#1A2234]/50 border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate mr-3">
                    <div
                      className={`p-2 rounded-none border-2 shrink-0 ${
                        isSelected
                          ? "bg-[#00F0FF] text-black border-[#00F0FF]"
                          : "bg-[#07090E] text-slate-400 border-[#1A2234]"
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="truncate">
                      <div className="text-xs font-bold text-white tracking-wide truncate flex items-center gap-2">
                        <span>{action.title}</span>
                        {action.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-none border font-bold ${
                              action.category === "Systems"
                                ? "bg-[#07090E] text-[#8B5CF6] border-[#8B5CF6]"
                                : action.category === "Actions"
                                ? "bg-[#07090E] text-[#00F0FF] border-[#00F0FF]"
                                : "bg-[#07090E] text-slate-400 border-[#1A2234]"
                            }`}
                          >
                            [{action.badge}]
                          </span>
                        )}
                      </div>
                      {action.subtitle && (
                        <div className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
                          {action.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 text-xs">
                    {action.shortcut && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-none text-[10px] bg-[#07090E] text-[#00F0FF] border border-[#1A2234] font-mono font-bold">
                        {action.shortcut}
                      </span>
                    )}
                    <CornerDownLeft
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "text-[#00F0FF] translate-x-0.5" : "text-slate-600"
                      }`}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-slate-400 font-mono space-y-2">
              <div className="text-[#00F0FF] font-bold">[NO COMMANDS MATCHED]</div>
              <div>No results found for &quot;{searchQuery}&quot;. Try &apos;Systems&apos;, &apos;Currency&apos;, or &apos;Compare&apos;.</div>
            </div>
          )}
        </div>

        {/* Footer HUD Shortcut Legend */}
        <div className="px-4 py-2.5 bg-[#07090E] border-t-2 border-[#1A2234] flex items-center justify-between text-[11px] text-slate-400 font-mono shrink-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded-none bg-[#0D111A] text-slate-200 border border-[#1A2234] font-bold text-[10px]">
                ↑↓
              </kbd>
              <span className="hidden sm:inline">Navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded-none bg-[#0D111A] text-slate-200 border border-[#1A2234] font-bold text-[10px]">
                ↵
              </kbd>
              <span>Execute</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded-none bg-[#0D111A] text-slate-200 border border-[#1A2234] font-bold text-[10px]">
                ESC
              </kbd>
              <span>Close</span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-[#00F0FF] font-bold uppercase text-[10px] tracking-wider">
            <Command className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">[NEXUS.OS // COMMAND_PALETTE]</span>
            <span className="sm:hidden">[NEXUS.OS]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
