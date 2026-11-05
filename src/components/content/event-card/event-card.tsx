'use client'

import Link from 'next/link'

export interface EventCardProps {
  title: string
  date: string
  location: string
  description: string
  href: string
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  description,
  href,
}) => {
  return (
    <article className="event-card">
      <div className="event-card__body">
        <time className="event-card__date">{date}</time>
        <span className="event-card__location">{location}</span>
        <h3 className="event-card__title">{title}</h3>
        <p className="event-card__description">{description}</p>
        <Link href={href} className="event-card__link">
          View event <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}

EventCard.displayName = 'EventCard'