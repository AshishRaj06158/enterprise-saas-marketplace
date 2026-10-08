import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Cpu, Terminal } from 'lucide-react';
import Footer from '@/components/Footer';
import MatrixBackground from '@/components/MatrixBackground';
import { CurrencyProvider } from '@/context/CurrencyContext';
import NavCurrencyToggle from '@/components/NavCurrencyToggle';
import CommandPalette from '@/components/CommandPalette';
import NavCommandPaletteTrigger from '@/components/NavCommandPaletteTrigger';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nexus-systems.in'),
  title: {
    default: 'NEXUS Systems — Production-Ready Business Software & ERP Marketplace',
    template: '%s | NEXUS Systems',
  },
  description:
    'Deploy audited, production-ready Next.js 15, Supabase, and TypeScript systems in minutes. Pre-integrated with native UPI, Razorpay, and automated GST compliance.',
  openGraph: {
    title: 'NEXUS Systems — Enterprise Digital Infrastructure Marketplace',
    description: 'Pre-built CRMs, operational ERPs, and telemetry dashboards ready for production deployment.',
    url: 'https://nexus-systems.in',
    siteName: 'NEXUS Systems',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NEXUS Systems — Enterprise Production Software Marketplace',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS Systems — Ready-to-Launch Business Software',
    description: 'High-performance Next.js & Supabase software systems with instant licensing.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${mono.variable} dark`}>
      <body
        suppressHydrationWarning
        className="bg-[#07090E] text-slate-200 antialiased font-sans selection:bg-[#00F0FF]/20 selection:text-[#00F0FF] min-h-screen flex flex-col justify-between relative"
      >
        <CurrencyProvider>
          <MatrixBackground />
          {/* Top Sticky Navigation */}
          <header className="sticky top-0 z-50 w-full border-b border-[#1A2234] bg-[#07090E]/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded border border-[#00F0FF]/40 bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] group-hover:border-[#00F0FF] transition-colors">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="font-semibold tracking-wider text-sm font-mono text-slate-100">
                  NEXUS<span className="text-[#00F0FF]">.OS</span>
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                <Link href="/systems" className="hover:text-slate-100 transition-colors">Systems</Link>
                <Link href="/compare" className="hover:text-slate-100 transition-colors">Compare</Link>
                <Link href="/deploy-config" className="hover:text-slate-100 transition-colors">Deploy Config</Link>
                <Link href="/systems/telemetry-matrix" className="hover:text-slate-100 transition-colors">Telemetry</Link>
                <Link href="/systems/autonomous-crm-pipeline" className="hover:text-slate-100 transition-colors">Pipelines</Link>
                <Link href="/systems/quantum-logistics-erp" className="hover:text-slate-100 transition-colors">Operations</Link>
                <Link href="/pricing" className="hover:text-slate-100 transition-colors">Licensing</Link>
              </nav>

              <div className="flex items-center gap-3">
                <NavCommandPaletteTrigger />
                <NavCurrencyToggle />

                <Link
                  href="/docs"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Docs
                </Link>
                <Link
                  href="/systems"
                  className="px-4 py-2 text-xs font-semibold rounded bg-slate-100 text-slate-950 hover:bg-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  Explore Catalog
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-grow">{children}</main>

          <Footer />
          <CommandPalette />
        </CurrencyProvider>
      </body>
    </html>
  );
}
