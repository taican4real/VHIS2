'use client'

import Image from 'next/image'
import Link from 'next/link'

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/schools', label: 'Our Schools' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
]

const schoolLinks = [
  { href: '/nursery', label: 'Nursery School' },
  { href: '/primary', label: 'Primary School' },
  { href: '/secondary', label: 'Secondary School' },
  { href: '/school-life', label: 'School Life' },
]

const socialLinks = [
  { href: '#', label: 'Facebook', icon: 'facebook' },
  { href: '#', label: 'Instagram', icon: 'instagram' },
  { href: '#', label: 'Twitter', icon: 'twitter' },
  { href: '#', label: 'LinkedIn', icon: 'linkedin' },
]

export interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`site-footer ${className || ''}`}>
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" className="brand brand--footer" aria-label="Victory Heritage International School home">
            <Image
              src="/assets/vhis-logo.png"
              alt="Victory Heritage International School"
              width={160}
              height={48}
              className="brand__logo"
            />
          </Link>
          <p className="footer__description">
            One school community for every stage of the learning journey.
          </p>
          <div className="footer__social">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="footer__social-link"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h2 className="footer__heading">Quick Links</h2>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer__link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h2 className="footer__heading">Our Schools</h2>
          {schoolLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer__link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-column footer-column--contact">
          <h2 className="footer__heading">Get in touch</h2>
          <p className="footer__contact-item">[School address to be confirmed]</p>
          <p className="footer__contact-item">[Telephone to be confirmed]</p>
          <p className="footer__contact-item">[Email to be confirmed]</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer__copyright">
          © {currentYear} Victory Heritage International School
        </p>
        <p className="footer__disclaimer">
          Website design preview · School details to be verified by VHIS
        </p>
        <Link href="#main" className="footer__back-to-top">
          Back to top ↑
        </Link>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'