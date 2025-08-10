'use client'

import React, { useState } from 'react'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="hamburger-button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`}></div>
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`}></div>
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`}></div>
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="mobile-nav-overlay" onClick={closeMenu}>
          <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <span className="mobile-nav-title">Menu</span>
              <button className="close-button" onClick={closeMenu}>
                ×
              </button>
            </div>
            <nav className="mobile-nav-links">
              <a href="/" className="mobile-nav-link" onClick={closeMenu}>
                Home
              </a>
              <a href="/blog" className="mobile-nav-link" onClick={closeMenu}>
                Blog
              </a>
              <a href="/about" className="mobile-nav-link" onClick={closeMenu}>
                About
              </a>
              <a href="/hobby-projects" className="mobile-nav-link" onClick={closeMenu}>
                Hobby Projects
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileNav 