'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/schools', label: 'Our Schools', hasDropdown: true },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/school-life', label: 'School Life' },
  { href: '/news', label: 'News & Events' },
  { href: '/contact', label: 'Contact Us' },
]

export interface DesktopNavProps {
  className?: string
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ className }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRefs = useRef<Record<string, HTMLElement>>({})

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdown && !dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdown])

  return (
    <nav className={`desktop-nav ${className || ''}`} aria-label="Main navigation">
      {navLinks.map((link) => {
        if (link.hasDropdown) {
          return (
            <div
              key={link.href}
              className="relative group"
              ref={(el) => {
                if (el) dropdownRefs.current[link.href] = el
              }}
            >
              <button
                onMouseEnter={() => setOpenDropdown(link.href)}
                onMouseLeave={() => setOpenDropdown(null)}
                onFocus={() => setOpenDropdown(link.href)}
                onBlur={() => setOpenDropdown(null)}
                className="desktop-nav__link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                {link.label} <span aria-hidden="true">⌄</span>
              </button>
              {openDropdown === link.href && (
                <div className="nav-dropdown__menu">
                  <Link href="/schools">All Schools</Link>
                  <Link href="/nursery">Nursery School</Link>
                  <Link href="/primary">Primary School</Link>
                  <Link href="/secondary">Secondary School</Link>
                </div>
              )}
            </div>
          )
        }
        return (
          <Link
            key={link.href}
            href={link.href}
            className="desktop-nav__link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

DesktopNav.displayName = 'DesktopNav'