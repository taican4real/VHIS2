'use client'

import Image from 'next/image'
import Link from 'next/link'

export interface DivisionCardProps {
  number: string
  kicker: string
  title: string
  description: string
  href: string
  image?: string
  imageAlt?: string
}

export const DivisionCard: React.FC<DivisionCardProps> = ({
  number,
  kicker,
  title,
  description,
  href,
  image,
  imageAlt,
}) => {
  return (
    <article className="division-card">
      {image && (
        <div className="division-card__image">
          <Image
            src={image}
            alt={imageAlt || title}
            width={400}
            height={300}
            className="division-card__image-img"
            loading="lazy"
          />
        </div>
      )}
      <div className="division-card__body">
        <span className="division-card__number">{number}</span>
        <p className="division-card__kicker">{kicker}</p>
        <h3 className="division-card__title">{title}</h3>
        <p className="division-card__description">{description}</p>
        <Link href={href} className="division-card__link">
          Explore {title.split(' ')[0]} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}

DivisionCard.displayName = 'DivisionCard'