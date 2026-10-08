"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Terminal, 
  Zap, 
  Menu, 
  X, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import NavCurrencyToggle from "./NavCurrencyToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Systems", href: "/systems", icon: Layers },
    { name: "Telemetry", href: "/#telemetry", icon: Terminal },
    { name: "Pipeline", href: "/#pipeline", icon: Zap },
    { name: "ERP", href: "/#erp", icon: Cpu },
    { name: "Pricing", href: "/pricing", icon: ShieldCheck },
    { name: "Verify SLA", href: "/verify", icon: ShieldCheck },
    { name: "Demos", href: "/demos" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090E]/90 backdrop-blur-md border-b border-[#00F0FF]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] p-[1px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <div className="w-full h-full bg-[#0D111A] rounded-[11px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-[#00F0FF] transition-colors group-hover:text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wider text-white flex items-center gap-1.5">
                SUTRA <span className="text-[#00F0FF] font-light">/</span> NEXUS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-mono-tabular flex items-center space-x-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00F0FF]" />
                </span>
                <span>ENTERPRISE MARKETPLACE v2.4</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#0D111A]/80 border border-[#00F0FF]/20 rounded-full px-4 py-1.5 backdrop-blur-md shadow-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? "text-white bg-[#1A2234] shadow-sm border border-[#00F0FF]/40 text-[#00F0FF]"
                      : "text-[#94A3B8] hover:text-white hover:bg-[#1A2234]/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <NavCurrencyToggle />
            <Link
              href="/demos"
              className="px-3.5 py-2 text-xs font-semibold text-[#94A3B8] hover:text-[#00F0FF] transition-colors flex items-center space-x-1"
            >
              <span>Sandbox</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href="/systems"
              className="relative inline-flex items-center justify-center px-4.5 py-2 text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-1">
                <span>Explore Catalog</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0D111A] border border-[#1A2234] text-[#94A3B8] hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D111A] border-b border-[#1A2234] px-4 pt-3 pb-6 mt-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#1A2234]">
            <span className="text-xs font-mono-tabular text-[#94A3B8]">Currency:</span>
            <NavCurrencyToggle />
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-[#1A2234]"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-[#1A2234] flex flex-col space-y-2">
            <Link
              href="/demos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm text-[#00F0FF] border border-[#00F0FF]/30 rounded-lg"
            >
              Live Sandbox Demos
            </Link>
            <Link
              href="/systems"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm font-semibold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] rounded-lg"
            >
              Explore Systems Catalog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
