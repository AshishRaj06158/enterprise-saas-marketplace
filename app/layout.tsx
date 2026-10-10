import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MatrixBackground from '@/components/MatrixBackground';
import { CurrencyProvider } from '@/context/CurrencyContext';
import CommandPalette from '@/components/CommandPalette';

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
          <Header />
          <main className="flex-grow">{children}</main>

          <Footer />
          <CommandPalette />
        </CurrencyProvider>
      </body>
    </html>
  );
}
