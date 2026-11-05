'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const mobileLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/schools', label: 'Our Schools' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/school-life', label: 'School Life' },
  { href: '/news', label: 'News & Events' },
  { href: '/contact', label: 'Contact Us' },
]

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      menuRef.current?.focus()
    } else {
      document.body.style.overflow = ''
      lastFocusedRef.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className={`mobile-menu fixed inset-0 z-[60] ${className || ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      tabIndex={-1}
    >
      <div className="mobile-menu__overlay bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="mobile-menu__panel bg-surface border-b border-border p-6 shadow-navigation">
        <div className="flex items-center justify-between mb-8">
          <span className="sr-only">Navigation menu</span>
          <button onClick={onClose} className="mobile-menu__close">
            <span aria-hidden="true">✕</span>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <ul className="mobile-menu__list space-y-1">
          {mobileLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="mobile-menu__link block py-4 px-2 text-label font-semibold text-text-primary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-6 pt-6 border-t border-border">
            <a
              href="/admissions#enquiry"
              onClick={onClose}
              className="mobile-menu__cta block py-4 px-2 text-center button--primary"
            >
              Enquire now
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

MobileMenu.displayName = 'MobileMenu'