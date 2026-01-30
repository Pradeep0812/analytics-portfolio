import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL || 'https://analytics-portfolio.netlify.app'),
  title: {
    default: 'Analytics Portfolio | Data Analyst & Power BI Developer',
    template: '%s | Analytics Portfolio',
  },
  description: 'Professional analytics portfolio showcasing Power BI, Tableau, and Excel projects. Data visualization, business intelligence, and financial modeling solutions.',
  keywords: ['Power BI', 'Tableau', 'Excel', 'Data Analyst', 'Business Intelligence', 'Data Visualization', 'Dashboard', 'Analytics'],
  authors: [{ name: 'Data Analyst' }],
  creator: 'Data Analyst',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Analytics Portfolio',
    title: 'Analytics Portfolio | Data Analyst & Power BI Developer',
    description: 'Professional analytics portfolio showcasing Power BI, Tableau, and Excel projects.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Analytics Portfolio | Data Analyst & Power BI Developer',
    description: 'Professional analytics portfolio showcasing Power BI, Tableau, and Excel projects.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Netlify Identity Widget for CMS auth redirect */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* Netlify Identity redirect script */}
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
