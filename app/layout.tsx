import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter, Schibsted_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import RevealObserver from '@/components/site/RevealObserver';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import { profile } from '@/content/profile';
import { siteUrl } from '@/lib/site';
import '@/styles/globals.css';

// Headings only use weight 600, so a single static file keeps the LCP font small.
const display = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-display',
  display: 'swap',
});

// Body text loads after the headline; next/font's size-adjusted fallback keeps
// the swap from moving layout.
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
});

// Labels re-wrap if this font swaps late, so it's preloaded (one ~10 KB file).
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
});

const title = `${profile.name} — ${profile.role}`;
const description =
  'Shahriar Mahmud is a Senior Software Engineer in Dhaka, Bangladesh, building backend systems, microservices and AI features for fintech and multi-tenant SaaS products.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    firstName: profile.givenName,
    lastName: profile.familyName,
    username: 'shahriar-ruet14',
    url: '/',
    siteName: profile.name,
    locale: 'en_US',
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: { telephone: false },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#f4f2ec',
  colorScheme: 'light dark',
};

// Runs before first paint so the saved theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div id="top" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-accent-fg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
