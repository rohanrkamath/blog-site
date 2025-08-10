'use client'

import React, { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
  children: Heading[]
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const extractHeadings = () => {
      // Parse the HTML content to extract headings
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, 'text/html')
      const headingElements = doc.querySelectorAll('h2, h3, h4')
      
      const seenTexts = new Set<string>()
      const flatHeadings: Heading[] = Array.from(headingElements)
        .filter(el => {
          const text = el.textContent?.trim() || ''
          if (!text || seenTexts.has(text)) return false
          seenTexts.add(text)
          return true
        })
        .map((el, index) => {
          const text = el.textContent?.trim() || ''
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
          
          return {
            id,
            text,
            level: parseInt(el.tagName[1]),
            children: [],
          }
        })

      // Build hierarchy (h2 -> h3 -> h4)
      const root: Heading[] = []
      let currentH2: Heading | null = null
      let currentH3: Heading | null = null

      flatHeadings.forEach((heading) => {
        if (heading.level === 2) {
          currentH2 = heading
          currentH3 = null
          root.push(heading)
        } else if (heading.level === 3 && currentH2) {
          currentH3 = heading
          currentH2.children.push(heading)
        } else if (heading.level === 4 && currentH3) {
          currentH3.children.push(heading)
        }
      })

      return root
    }

    const headingsList = extractHeadings()
    setHeadings(headingsList)

    // Add IDs to actual DOM headings after component mounts
    setTimeout(() => {
      const actualHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      headingsList.forEach((heading) => {
        const actualHeading = Array.from(actualHeadings).find(
          el => el.textContent?.trim() === heading.text
        )
        if (actualHeading && !actualHeading.id) {
          actualHeading.id = heading.id
        }
      })
    }, 100)
  }, [content])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4'))
      let currentActiveId = ''
      
      for (const element of headingElements) {
        const rect = element.getBoundingClientRect()
        if (rect.top - 80 <= 0) {
          currentActiveId = element.id
        } else {
          break
        }
      }
      
      // Handle case when we're at the bottom of the page
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 50) {
        const lastVisible = headingElements.filter(element => {
          const rect = element.getBoundingClientRect()
          return rect.top <= window.innerHeight
        }).pop()
        if (lastVisible) {
          currentActiveId = lastVisible.id
        }
      }

      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeId])

  const isActiveSection = (heading: Heading): boolean => {
    if (activeId === heading.id) return true
    return heading.children.some(child => child.id === activeId)
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const renderHeading = (heading: Heading) => {
    const isActive = activeId === heading.id
    const isSectionActive = isActiveSection(heading)
    const hasChildren = heading.children.length > 0

    return (
      <div key={heading.id}>
        <li style={{
          position: 'relative',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            position: 'absolute',
            left: '-16px',
            top: 0,
            bottom: 0,
            width: '3px',
            backgroundColor: isActive ? 'var(--link-color)' : 'transparent',
            borderRadius: '0 4px 4px 0'
          }} />
          <button
            onClick={() => scrollToHeading(heading.id)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              padding: '0.5rem 0',
              color: isActive ? 'var(--link-color)' : 'var(--text-primary)',
              fontWeight: isActive ? '500' : '400',
              fontSize: '0.85rem',
              lineHeight: '1.4',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--link-color)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--text-primary)'
              }
            }}
          >
            {heading.text}
          </button>
        </li>
        {hasChildren && isSectionActive && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginLeft: '1rem' }}>
            {heading.children.map(child => (
              <li key={child.id} style={{
                position: 'relative',
                marginBottom: '0.25rem'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-16px',
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  backgroundColor: child.id === activeId ? 'var(--link-color)' : 'transparent',
                  borderRadius: '0 4px 4px 0'
                }} />
                <button
                  onClick={() => scrollToHeading(child.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: '0.4rem 0',
                    color: child.id === activeId ? 'var(--link-color)' : 'var(--text-secondary)',
                    fontWeight: child.id === activeId ? '500' : '400',
                    fontSize: '0.8rem',
                    lineHeight: '1.4',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (child.id !== activeId) {
                      e.currentTarget.style.color = 'var(--link-color)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (child.id !== activeId) {
                      e.currentTarget.style.color = 'var(--text-secondary)'
                    }
                  }}
                >
                  {child.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  if (headings.length === 0 || isMobile) return null

  return (
    <div style={{
      position: 'sticky',
      top: '2rem',
      alignSelf: 'flex-start',
      maxHeight: 'calc(100vh - 4rem)',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingLeft: '1rem',
      paddingRight: '0.5rem',
      borderLeft: '2px solid var(--border-color)',
      marginTop: '2rem',
      scrollbarWidth: 'thin',
      scrollbarColor: 'var(--border-color) transparent',
      zIndex: 10
    }}>
      <h4 style={{
        margin: '0 0 1.5rem 0',
        fontSize: '0.95rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Table of Contents
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {headings.map(heading => renderHeading(heading))}
      </ul>
    </div>
  )
} 