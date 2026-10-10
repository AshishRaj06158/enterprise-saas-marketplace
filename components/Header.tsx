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
  BarChart3,
  Sliders,
  Activity,
  Key,
  GitCommit,
  Code2,
  Calculator
} from "lucide-react";
import NavCurrencyToggle from "./NavCurrencyToggle";
import NavCommandPaletteTrigger from "./NavCommandPaletteTrigger";

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
    { name: "Vault", href: "/vault", icon: Key },
    { name: "ROI Calc", href: "/calculator", icon: Calculator },
    { name: "Developer", href: "/developer", icon: Code2 },
    { name: "Changelog", href: "/changelog", icon: GitCommit },
    { name: "Compare", href: "/compare", icon: BarChart3 },
    { name: "Deploy Config", href: "/deploy-config", icon: Sliders },
    { name: "Operations", href: "/operations", icon: Activity },
    { name: "Telemetry", href: "/systems/telemetry-matrix", icon: Terminal },
    { name: "Pipelines", href: "/pipelines", icon: Zap },
    { name: "Pricing", href: "/pricing", icon: ShieldCheck },
    { name: "Verify SLA", href: "/verify", icon: ShieldCheck },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#07090E]/95 backdrop-blur-md border-b-2 border-[#1A2234] shadow-[0_4px_0px_0px_#1A2234] py-3"
          : "bg-[#07090E]/80 border-b border-[#1A2234]/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group min-h-[44px]">
            <div className="w-10 h-10 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] p-[2px] transition-transform duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-[3px_3px_0px_0px_#00F0FF]">
              <div className="w-full h-full bg-[#07090E] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-[#00F0FF] transition-colors group-hover:text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5 font-mono-tabular">
                SUTRA <span className="text-[#00F0FF] font-light">/</span> NEXUS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-mono-tabular flex items-center space-x-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00F0FF]" />
                </span>
                <span>[SYS_V2.4 // NEO-BRUTAL]</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[#0D111A] border-2 border-[#1A2234] shadow-[3px_3px_0px_0px_#1A2234] px-3 py-1 font-mono-tabular">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-2.5 py-1.5 text-xs font-semibold transition-all duration-150 flex items-center space-x-1.5 min-h-[36px] uppercase ${
                    isActive
                      ? "text-black bg-[#00F0FF] font-bold border border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]"
                      : "text-[#94A3B8] hover:text-white hover:bg-[#1A2234]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2.5">
            <NavCommandPaletteTrigger />
            <NavCurrencyToggle />
            <Link
              href="/playground"
              className="px-3 py-1.5 rounded-none text-xs font-bold font-mono-tabular text-[#00F0FF] bg-[#07090E] border-2 border-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF] hover:bg-[#00F0FF]/10 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#00F0FF] transition-all flex items-center space-x-1.5 min-h-[44px]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
              </span>
              <span>[SANDBOX ⚡]</span>
            </Link>
            <Link
              href="/systems"
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-bold font-mono-tabular text-black bg-[#00F0FF] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#8B5CF6] hover:shadow-[5px_5px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#8B5CF6] transition-all group overflow-hidden min-h-[44px] uppercase"
            >
              <span className="relative z-10 flex items-center space-x-1">
                <span>CATALOG</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-[#00F0FF] shadow-[3px_3px_0px_0px_#1A2234] hover:border-[#00F0FF] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D111A] border-b-2 border-x-2 border-[#1A2234] px-4 pt-4 pb-6 mt-3 space-y-4 shadow-[0_6px_0px_0px_#1A2234]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A2234]">
            <span className="text-xs font-mono-tabular text-[#94A3B8] uppercase">[CURRENCY MATRIX]:</span>
            <NavCurrencyToggle />
          </div>
          <div className="grid grid-cols-2 gap-1.5 font-mono-tabular text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 border border-[#1A2234] bg-[#07090E] text-[#94A3B8] hover:text-[#00F0FF] hover:border-[#00F0FF] min-h-[44px] flex items-center justify-center uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-[#1A2234] flex flex-col space-y-2 font-mono-tabular">
            <Link
              href="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-xs uppercase font-bold text-[#00F0FF] border-2 border-[#00F0FF] bg-[#07090E] shadow-[3px_3px_0px_0px_#00F0FF] min-h-[44px] flex items-center justify-center"
            >
              [TEST LIVE SANDBOX]
            </Link>
            <Link
              href="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-xs uppercase font-bold text-black bg-[#00F0FF] border-2 border-[#00F0FF] shadow-[3px_3px_0px_0px_#8B5CF6] min-h-[44px] flex items-center justify-center"
            >
              [PROCEED TO CHECKOUT]
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
