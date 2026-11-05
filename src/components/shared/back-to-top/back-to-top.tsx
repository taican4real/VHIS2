'use client'

import { useEffect, useState } from 'react'

export interface BackToTopProps {
  className?: string
}

export const BackToTop: React.FC<BackToTopProps> = ({ className }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      className={`back-to-top ${className || ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <span aria-hidden="true">↑</span>
      <span className="sr-only">Back to top</span>
    </button>
  )
}

BackToTop.displayName = 'BackToTop'