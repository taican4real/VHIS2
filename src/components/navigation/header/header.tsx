'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { DesktopNav } from '@/components/navigation/desktop-nav'
import { MobileMenu } from '@/components/navigation/mobile-menu'

export interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        headerRef.current?.classList.add('header--scrolled')
      } else {
        headerRef.current?.classList.remove('header--scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function toggleMenu() {
    setIsOpen((prev) => !prev)
    if (menuToggleRef.current) {
      menuToggleRef.current.setAttribute('aria-expanded', String(!isOpen))
    }
  }

  return (
    <header
      ref={headerRef}
      className={`site-header ${className || ''}`}
    >
      <div className="container header__inner">
        <Link href="/" className="brand" aria-label="Victory Heritage International School home">
          <Image
            src="/assets/vhis-logo.png"
            alt="Victory Heritage International School"
            width={200}
            height={60}
            priority
            className="brand__logo"
          />
        </Link>

        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <span className="menu-toggle__lines" aria-hidden="true"></span>
          <span className="sr-only">Open navigation menu</span>
        </button>

        <DesktopNav className="desktop-nav" />

        <a
          href="/admissions#enquiry"
          className="button button--primary button--nav button--small"
        >
          Enquire now
        </a>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  )
}

Header.displayName = 'Header'