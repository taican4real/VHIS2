'use client'

import Image from 'next/image'
import Link from 'next/link'

export interface HeroProps {
  eyebrow?: string
  heading: string
  subheading?: string
  description: string
  primaryCta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
  image?: string
  imageAlt?: string
  className?: string
}

export const Hero: React.FC<HeroProps> = ({
  eyebrow,
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  className,
}) => {
  return (
    <section className={`hero ${className || ''}`} aria-labelledby="hero-heading">
      <div className="container hero__grid">
        <div className="hero__copy">
          {eyebrow && (
            <p className="eyebrow">
              <span className="eyebrow__rule"></span>
              {eyebrow}
            </p>
          )}
          <h1 id="hero-heading">{heading}</h1>
          {subheading && <p className="hero__subheading">{subheading}</p>}
          <p className="hero__intro">{description}</p>
          <div className="hero__actions">
            {primaryCta && (
              <a href={primaryCta.href} className="button button--primary">
                {primaryCta.label} <span aria-hidden="true">↗</span>
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryCta.href} className="button button--outline">
                {secondaryCta.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
        <div className="hero__image">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || heading}
              width={800}
              height={600}
              className="hero__image-img"
              priority
            />
          ) : (
            <div className="hero__image-placeholder" />
          )}
        </div>
      </div>
    </section>
  )
}

Hero.displayName = 'Hero'