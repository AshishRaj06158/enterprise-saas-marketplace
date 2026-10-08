"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Calculator
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { getAllSystems } from "@/data/systems";

interface ActionItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Systems" | "Utilities";
  icon: React.ElementType;
  shortcut?: string;
  onSelect: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();
  const { currency, toggleCurrency } = useCurrency();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey listener (Cmd+K / Ctrl+K & Escape) & custom window event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
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
  }, []);

  // Auto focus search input on modal open
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const systems = getAllSystems();

  // Define available command palette actions
  const allActions: ActionItem[] = [
    // Navigation
    {
      id: "nav-calculator",
      title: "Calculate Engineering ROI & Savings",
      subtitle: "Simulate team burn rate vs instant perpetual deployment savings",
      category: "Navigation",
      icon: Calculator,
      onSelect: () => {
        router.push("/calculator");
        setIsOpen(false);
      },
    },
    {
      id: "nav-developer",
      title: "Open Developer Console & Webhooks",
      subtitle: "Manage API access tokens, configure webhooks & test HTTP payloads",
      category: "Navigation",
      icon: Code2,
      onSelect: () => {
        router.push("/developer");
        setIsOpen(false);
      },
    },
    {
      id: "nav-changelog",
      title: "View Platform Changelog & Release Notes",
      subtitle: "Version stream v2.4.0, zero-trust security patches & dependency matrix",
      category: "Navigation",
      icon: GitCommit,
      onSelect: () => {
        router.push("/changelog");
        setIsOpen(false);
      },
    },
    {
      id: "nav-playground",
      title: "Launch Live Component Playground",
      subtitle: "Interactive in-browser canvas, server code & payload inspector",
      category: "Navigation",
      icon: Terminal,
      onSelect: () => {
        router.push("/playground");
        setIsOpen(false);
      },
    },
    {
      id: "nav-vault",
      title: "Open Customer License Vault & Asset Hub",
      subtitle: "Manage entitled production keys, source bundles & GitHub access",
      category: "Navigation",
      icon: Key,
      onSelect: () => {
        router.push("/vault");
        setIsOpen(false);
      },
    },
    {
      id: "nav-home",
      title: "Home / Enterprise Platform Overview",
      subtitle: "Return to Sutra Nexus home landing page",
      category: "Navigation",
      icon: Cpu,
      onSelect: () => {
        router.push("/");
        setIsOpen(false);
      },
    },
    {
      id: "nav-systems",
      title: "View Full Systems Catalog",
      subtitle: "Browse all 6 production-ready software codebases",
      category: "Navigation",
      icon: Layers,
      onSelect: () => {
        router.push("/systems");
        setIsOpen(false);
      },
    },
    {
      id: "nav-telemetry",
      title: "Telemetry / Nexus Telemetry Matrix",
      subtitle: "Executive observability matrix with sub-12ms query latency",
      category: "Navigation",
      icon: Terminal,
      onSelect: () => {
        router.push("/systems/telemetry-matrix");
        setIsOpen(false);
      },
    },
    {
      id: "nav-crm",
      title: "CRM / Autonomous CRM & Revenue Engine",
      subtitle: "4.8x deal velocity pipeline & contract automation",
      category: "Navigation",
      icon: Zap,
      onSelect: () => {
        router.push("/systems/autonomous-crm-pipeline");
        setIsOpen(false);
      },
    },
    {
      id: "nav-erp",
      title: "ERP / Quantum Logistics & Operations",
      subtitle: "Multi-depot thermal warehouse & live GPS fleet telemetry",
      category: "Navigation",
      icon: Activity,
      onSelect: () => {
        router.push("/systems/quantum-logistics-erp");
        setIsOpen(false);
      },
    },
    {
      id: "nav-ai-agents",
      title: "AI Agents / Nexus Agent Orchestrator",
      subtitle: "Self-healing multi-agent pipelines & MCP tool execution",
      category: "Navigation",
      icon: Cpu,
      onSelect: () => {
        router.push("/systems/nexus-agent-orchestrator");
        setIsOpen(false);
      },
    },
    {
      id: "nav-compare",
      title: "Compare Systems & Benchmark Matrix",
      subtitle: "Side-by-side spec evaluation & empirical benchmarks",
      category: "Navigation",
      icon: BarChart3,
      onSelect: () => {
        router.push("/compare");
        setIsOpen(false);
      },
    },
    {
      id: "nav-deploy-config",
      title: "Generate Deploy Config & Environment Blueprint",
      subtitle: "Build docker-compose, .env.production & GitHub Actions",
      category: "Navigation",
      icon: Sliders,
      onSelect: () => {
        router.push("/deploy-config");
        setIsOpen(false);
      },
    },
    {
      id: "nav-pipelines",
      title: "View Pipeline Topology & Agent Flow",
      subtitle: "Interactive step-through visualizer & execution log stream",
      category: "Navigation",
      icon: Zap,
      onSelect: () => {
        router.push("/pipelines");
        setIsOpen(false);
      },
    },
    {
      id: "nav-operations",
      title: "Check Operational Health & System Status",
      subtitle: "Real-time edge node telemetry & incident audit logs",
      category: "Navigation",
      icon: Activity,
      onSelect: () => {
        router.push("/operations");
        setIsOpen(false);
      },
    },
    {
      id: "nav-verify",
      title: "Go to License Verification Portal",
      subtitle: "Validate SHA-256 commercial IP entitlements & SLA tier",
      category: "Navigation",
      icon: ShieldCheck,
      onSelect: () => {
        router.push("/verify");
        setIsOpen(false);
      },
    },
    {
      id: "nav-checkout",
      title: "Checkout & Commercial Licensing Portal",
      subtitle: "Acquire perpetual source code license & dispatch repository",
      category: "Navigation",
      icon: ShieldCheck,
      onSelect: () => {
        router.push("/checkout");
        setIsOpen(false);
      },
    },
    {
      id: "nav-pricing",
      title: "View Commercial Pricing Tiers",
      subtitle: "Explore single system, suite, and SLA proposals",
      category: "Navigation",
      icon: Zap,
      onSelect: () => {
        router.push("/pricing");
        setIsOpen(false);
      },
    },
    {
      id: "nav-demos",
      title: "View Live Sandbox Demos",
      subtitle: "Interactive telemetry and system previews",
      category: "Navigation",
      icon: Terminal,
      onSelect: () => {
        router.push("/demos");
        setIsOpen(false);
      },
    },
    {
      id: "nav-docs",
      title: "API & System Documentation",
      subtitle: "Read integration guides, RLS rules, and API specs",
      category: "Navigation",
      icon: ExternalLink,
      onSelect: () => {
        router.push("/docs");
        setIsOpen(false);
      },
    },

    // Systems Direct Jumps
    ...systems.map((sys) => ({
      id: `sys-${sys.slug}`,
      title: sys.name,
      subtitle: sys.tagline,
      category: "Systems" as const,
      icon: Cpu,
      onSelect: () => {
        router.push(`/systems/${sys.slug}`);
        setIsOpen(false);
      },
    })),

    // Utilities
    {
      id: "util-currency",
      title: `Toggle Currency (Active: ${currency})`,
      subtitle: `Switch between INR ₹ and USD $ globally`,
      category: "Utilities",
      icon: DollarSign,
      shortcut: "Click to Switch",
      onSelect: () => {
        toggleCurrency();
        setIsOpen(false);
      },
    },
    {
      id: "util-telemetry",
      title: "Launch Live Telemetry Sandbox",
      subtitle: "View real-time event node latency stream",
      category: "Utilities",
      icon: Terminal,
      onSelect: () => {
        router.push("/demos");
        setIsOpen(false);
      },
    },
    {
      id: "util-whatsapp",
      title: "Open WhatsApp Enterprise Advisory (+91 9771596801)",
      subtitle: "Direct 1-on-1 architect lead consultation",
      category: "Utilities",
      icon: MessageCircle,
      onSelect: () => {
        window.open(
          "https://wa.me/919771596801?text=Hello%2C%20I%20want%20to%20inquire%20about%20SUTRA%20NEXUS%20enterprise%20systems.",
          "_blank"
        );
        setIsOpen(false);
      },
    },
  ];

  // Filter actions matching search query
  const filteredActions = allActions.filter((act) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      act.title.toLowerCase().includes(q) ||
      (act.subtitle && act.subtitle.toLowerCase().includes(q)) ||
      act.category.toLowerCase().includes(q)
    );
  });

  // Handle arrow key navigation inside palette
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
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Click Backdrop to close */}
      <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

      {/* Palette HUD Container */}
      <div className="relative w-full max-w-2xl bg-[#0D111A] border border-[#00F0FF]/50 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden z-10 space-y-0 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Scanline effect */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

        {/* Input Field */}
        <div className="relative border-b border-[#1A2234] flex items-center px-4 py-3.5 bg-[#07090E]">
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
            placeholder="Type a command or search systems (e.g. 'Verify', 'ERP', 'Currency')..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 font-mono focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#1A2234] transition-colors ml-2"
          >
            <X className="w-5 h-5 text-[#00F0FF]" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 font-mono-tabular">
          {filteredActions.length > 0 ? (
            filteredActions.map((action, idx) => {
              const IconComp = action.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  onClick={action.onSelect}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                      : "text-slate-300 hover:bg-[#1A2234]/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate mr-3">
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-[#00F0FF]/20 text-[#00F0FF]" : "bg-[#07090E] text-slate-400 border border-[#1A2234]"}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white tracking-wide truncate flex items-center gap-2">
                        <span>{action.title}</span>
                        {action.category === "Systems" && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#07090E] text-[#8B5CF6] border border-[#8B5CF6]/30">
                            SYSTEM
                          </span>
                        )}
                      </div>
                      {action.subtitle && (
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {action.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 text-xs">
                    {action.shortcut && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]/30 font-mono">
                        {action.shortcut}
                      </span>
                    )}
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[#00F0FF] translate-x-1" : "text-slate-600"}`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 font-mono">
              No matching commands found for &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="px-4 py-2.5 bg-[#07090E] border-t border-[#1A2234] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#0D111A] text-slate-200 border border-[#1A2234]">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#0D111A] text-slate-200 border border-[#1A2234]">↵</kbd>
              <span>Select</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#0D111A] text-slate-200 border border-[#1A2234]">Esc</kbd>
              <span>Close</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-1 text-[#00F0FF]">
            <Command className="w-3.5 h-3.5" />
            <span>NEXUS HUD COMMAND PALETTE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
