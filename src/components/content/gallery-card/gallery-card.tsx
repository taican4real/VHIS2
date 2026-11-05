'use client'

import Image from 'next/image'

export interface GalleryCardProps {
  title: string
  image: string
  imageAlt: string
  caption?: string
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  title,
  image,
  imageAlt,
  caption,
}) => {
  return (
    <article className="gallery-card">
      <div className="gallery-card__image">
        <Image
          src={image}
          alt={imageAlt}
          width={400}
          height={400}
          className="gallery-card__image-img"
          loading="lazy"
        />
      </div>
      <div className="gallery-card__body">
        <h3 className="gallery-card__title">{title}</h3>
        {caption && <p className="gallery-card__caption">{caption}</p>}
      </div>
    </article>
  )
}

GalleryCard.displayName = 'GalleryCard'