import type { Metadata } from 'next'
import React from 'react'
import { SITE_CONFIG } from '@/config'
import ThemeToggle from '@/components/ThemeToggle'
import MobileNav from '@/components/MobileNav'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: '@rohanrkamath',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = savedTheme || systemTheme;
                  document.documentElement.setAttribute('data-theme', theme);
                  
                  // Force a repaint to ensure CSS variables are applied
                  document.documentElement.style.display = 'none';
                  document.documentElement.offsetHeight; // Trigger reflow
                  document.documentElement.style.display = '';
                } catch (e) {
                  // Fallback to light theme if there's an error
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}>
          <header className="site-header">
            <div className="header-container">
              <nav className="header-nav">
                <a href="/" className="site-title">
                  {SITE_CONFIG.title}
                </a>
                <div className="nav-links desktop-nav">
                  <a href="/blog" className="nav-link">
                    Blog
                  </a>
                  <a href="/about" className="nav-link">
                    About
                  </a>
                  <a href="/hobby-projects" className="nav-link">
                    Hobby Projects
                  </a>
                  <ThemeToggle />
                </div>
                <div className="mobile-nav-toggle">
                  <MobileNav />
                </div>
              </nav>
            </div>
          </header>
          <main className="main-content">
            {children}
          </main>
          <footer className="site-footer">
            <div className="footer-container">
              <p>&copy; 2024 {SITE_CONFIG.author}. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 