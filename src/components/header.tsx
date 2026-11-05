'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/schools', label: 'Our Schools', dropdown: true },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/school-life', label: 'School Life' },
  { href: '/news', label: 'News &amp; Events' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const menuToggle = useRef<HTMLButtonElement>(null)
  const primaryNav = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
    if (menuToggle.current) {
      menuToggle.current.setAttribute('aria-expanded', 'false')
    }
  }

  return (
    <header className="site-header">
      <div className="container header__inner">
        <Link href="/" className="brand" aria-label="Victory Heritage International School home">
          <img className="brand__logo" src="/assets/vhis-logo.png" alt="Victory Heritage International School" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          ref={menuToggle}
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="menu-toggle__lines" aria-hidden="true"></span>
          <span className="sr-only">Open navigation menu</span>
        </button>
        <nav className={`primary-nav ${isOpen ? 'is-open' : ''}`} ref={primaryNav} id="primary-nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <details key={link.href} className="nav-dropdown">
                  <summary>
                    {link.label} <span aria-hidden="true">⌄</span>
                  </summary>
                  <div className="nav-dropdown__menu">
                    <Link href="/schools">All Schools</Link>
                    <Link href="/nursery">Nursery School</Link>
                    <Link href="/primary">Primary School</Link>
                    <Link href="/secondary">Secondary School</Link>
                  </div>
                </details>
              )
            }
            return (
              <Link key={link.href} href={link.href} className={link.href === '/' ? 'aria-current' : undefined}>
                {link.label}
              </Link>
            )
          })}
          <Link href="/admissions#enquiry" className="button button--small button--nav">
            Enquire now <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}