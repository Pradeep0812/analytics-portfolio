import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL || 'https://uppalapradeep.netlify.app'),
  title: {
    default: 'Analytics Platform | Enterprise Analytics Knowledge System',
    template: '%s | Analytics Platform',
  },
  description: 'Enterprise analytics knowledge platform documenting case studies, methodologies, and data-driven insights across Power BI, Tableau, and Excel.',
  keywords: ['Analytics', 'Power BI', 'Tableau', 'Excel', 'Business Intelligence', 'Data Visualization', 'Case Studies', 'Enterprise Analytics'],
  authors: [{ name: 'Pradeep Uppala' }],
  creator: 'Pradeep Uppala',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Analytics Platform',
    title: 'Analytics Platform | Enterprise Analytics Knowledge System',
    description: 'Enterprise analytics knowledge platform with case studies and insights.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Analytics Platform | Enterprise Analytics Knowledge System',
    description: 'Enterprise analytics knowledge platform with case studies and insights.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Dark mode initialization - prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored === 'dark' || (!stored && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Netlify Identity Widget for CMS auth */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Google Analytics - Only runs if ID is present */}
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />

        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-surface-900 text-white px-4 py-2 rounded z-50">
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </div>

        {/* Netlify Identity redirect */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on('init', user => {
                  if (!user) {
                    window.netlifyIdentity.on('login', () => {
                      document.location.href = '/admin/';
                    });
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
