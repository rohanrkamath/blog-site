import type { Metadata } from 'next'
import React from 'react'
import { SITE_CONFIG } from '@/config'
import ThemeToggle from '@/components/ThemeToggle'
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
          <header style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-primary)'
          }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0.75rem 2rem' }}>
              <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <a href="/" style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  color: 'var(--text-primary)',
                  textDecoration: 'none'
                }}>
                  {SITE_CONFIG.title}
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <a href="/blog" style={{ 
                    color: 'var(--text-secondary)', 
                    textDecoration: 'none',
                    transition: 'var(--transition)',
                    fontSize: '0.9rem'
                  }}>
                    Blog
                  </a>
                  <a href="/about" style={{ 
                    color: 'var(--text-secondary)', 
                    textDecoration: 'none',
                    transition: 'var(--transition)',
                    fontSize: '0.9rem'
                  }}>
                    About
                  </a>
                  <a href="/hobby-projects" style={{ 
                    color: 'var(--text-secondary)', 
                    textDecoration: 'none',
                    transition: 'var(--transition)',
                    fontSize: '0.9rem'
                  }}>
                    Hobby Projects
                  </a>
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          </header>
          <main style={{ 
            maxWidth: '1000px', 
            margin: '0 auto', 
            padding: '2rem 2rem',
            paddingTop: 'calc(2rem + 60px)',
            minHeight: 'calc(100vh - 60px)'
          }}>
            {children}
          </main>
          <footer style={{ 
            borderTop: '1px solid var(--border-color)', 
            marginTop: '4rem',
            backgroundColor: 'var(--bg-secondary)'
          }}>
                          <div style={{ 
                maxWidth: '1000px', 
                margin: '0 auto', 
                padding: '1rem 2rem', 
                textAlign: 'center', 
                color: 'var(--text-secondary)'
              }}>
              <p>&copy; 2024 {SITE_CONFIG.author}. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 