'use client'

import { useCallback, useState } from 'react'

export interface DivisionSlide {
  division: string
  title: string
  description: string
  link: string
  linkText: string
  image: string
  alt: string
}

export interface DivisionCarouselProps {
  slides: DivisionSlide[]
  className?: string
}

export const DivisionCarousel: React.FC<DivisionCarouselProps> = ({
  slides,
  className,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const showSlide = useCallback((index: number) => {
    setCurrentSlide(((index % slides.length) + slides.length) % slides.length)
  }, [slides.length])

  const nextSlide = useCallback(() => showSlide(currentSlide + 1), [currentSlide, showSlide])
  const previousSlide = useCallback(() => showSlide(currentSlide - 1), [currentSlide, showSlide])

  const current = slides[currentSlide]

  return (
    <section
      className={`division-carousel ${className || ''}`}
      aria-label="School divisions"
    >
      <div className="division-carousel__viewport">
        <div className="division-carousel__track">
          {slides.map((slide, index) => (
            <div
              key={slide.link}
              className={`division-carousel__slide ${index === currentSlide ? 'is-active' : ''}`}
              hidden={index !== currentSlide}
            >
              <div className="division-carousel__image" role="img" aria-label={slide.alt} />
              <div className="division-carousel__content">
                <p className="division-carousel__division">{slide.division}</p>
                <h2 className="division-carousel__title">{slide.title}</h2>
                <p className="division-carousel__description">{slide.description}</p>
                <a
                  href={slide.link}
                  className="division-carousel__link button button--small"
                >
                  {slide.linkText} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="division-carousel__controls">
        <button
          onClick={previousSlide}
          aria-label="Previous division slide"
          className="division-carousel__button division-carousel__button--prev"
        >
          ←
        </button>

        <div className="division-carousel__indicators" role="tablist" aria-label="Division slides">
          {slides.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === currentSlide}
              aria-controls={`division-slide-${index}`}
              className={`division-carousel__dot ${index === currentSlide ? 'is-active' : ''}`}
              onClick={() => showSlide(index)}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next division slide"
          className="division-carousel__button division-carousel__button--next"
        >
          →
        </button>
      </div>

      <div className="division-carousel__count">
        <span id="division-carousel-current">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className="division-carousel__count-separator">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}

DivisionCarousel.displayName = 'DivisionCarousel'