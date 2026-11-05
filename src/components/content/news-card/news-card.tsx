'use client'

import Image from 'next/image'
import Link from 'next/link'

export interface NewsCardProps {
  title: string
  excerpt: string
  date: string
  href: string
  image?: string
  imageAlt?: string
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  date,
  href,
  image,
  imageAlt,
}) => {
  return (
    <article className="news-card">
      {image && (
        <div className="news-card__image">
          <Image
            src={image}
            alt={imageAlt || title}
            width={400}
            height={250}
            className="news-card__image-img"
            loading="lazy"
          />
        </div>
      )}
      <div className="news-card__body">
        <time className="news-card__date">{date}</time>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__excerpt">{excerpt}</p>
        <Link href={href} className="news-card__link">
          Read more <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}

NewsCard.displayName = 'NewsCard'