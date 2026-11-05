import Link from 'next/link'
import { Typography } from '@/components/ui/typography'

export interface CTASectionProps {
  eyebrow?: string
  heading: string
  description?: string
  primaryLink?: { href: string; label: string }
  secondaryLink?: { href: string; label: string }
  className?: string
}

export const CTASection: React.FC<CTASectionProps> = ({
  eyebrow,
  heading,
  description,
  primaryLink,
  secondaryLink,
  className,
}) => {
  return (
    <section className={`cta-section ${className || ''}`}>
      <div className="container cta-section__inner">
        <div className="cta-section__content">
          {eyebrow && (
            <p className="eyebrow">
              <span className="eyebrow__rule"></span>
              {eyebrow}
            </p>
          )}
          <Typography variant="h2">{heading}</Typography>
          {description && <Typography variant="body-large">{description}</Typography>}
          <div className="cta-section__actions">
            {primaryLink && (
              <a href={primaryLink.href} className="button button--primary">
                {primaryLink.label} <span aria-hidden="true">↗</span>
              </a>
            )}
            {secondaryLink && (
              <a href={secondaryLink.href} className="button button--outline">
                {secondaryLink.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

CTASection.displayName = 'CTASection'