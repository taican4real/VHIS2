'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" className="brand brand--footer" aria-label="Victory Heritage International School home">
            <img className="brand__logo" src="/assets/vhis-logo.png" alt="Victory Heritage International School" />
          </Link>
          <p>One school community for every stage of the learning journey.</p>
          <span className="footer-placeholder">VHIS logo · original colors preserved</span>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <Link href="/about">About VHIS</Link>
          <Link href="/academics">Academics</Link>
          <Link href="/school-life">School life</Link>
          <Link href="/news">News &amp; events</Link>
        </div>

        <div className="footer-column">
          <h2>Our schools</h2>
          <Link href="/nursery">Nursery School</Link>
          <Link href="/primary">Primary School</Link>
          <Link href="/secondary">Secondary School</Link>
        </div>

        <div className="footer-column">
          <h2>Admissions</h2>
          <Link href="/admissions">How to apply</Link>
          <Link href="/admissions#enquiry">Make an enquiry</Link>
          <Link href="/application-form">Preview application form (draft)</Link>
          <Link href="/faq">Frequently asked questions</Link>
        </div>

        <div className="footer-column footer-column--contact">
          <h2>Get in touch</h2>
          <p>[School address to be confirmed]</p>
          <p>[Telephone to be confirmed]</p>
          <p>[Email to be confirmed]</p>
          <Link href="/contact">Contact VHIS <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © <span id="copyright-year">2026</span> Victory Heritage International School
        </p>
        <p>Website design preview · School details to be verified by VHIS</p>
        <Link href="#main">Back to top ↑</Link>
      </div>
    </footer>
  )
}