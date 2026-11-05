import Link from 'next/link'
import { Typography } from '@/components/ui/typography'
import { Grid } from '@/components/layout/grid'

export interface FeatureItem {
  title: string
  description: string
  icon?: string
  href?: string
}

export interface FeatureGridProps {
  title?: string
  description?: string
  items: FeatureItem[]
  cols?: 'mobile' | 'tablet' | 'desktop'
  className?: string
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  description,
  items,
  cols = 'desktop',
  className,
}) => {
  return (
    <section className={`feature-grid ${className || ''}`}>
      <div className="container feature-grid__inner">
        {title || description ? (
          <div className="feature-grid__intro">
            {title && <Typography variant="h2">{title}</Typography>}
            {description && <Typography variant="body-large">{description}</Typography>}
          </div>
        ) : null}
        <Grid cols={cols} gap="desktop">
          {items.map((item, index) => (
            <article key={item.title || index} className="feature-grid__item">
              {item.icon && <div className="feature-grid__item-icon">{item.icon}</div>}
              <Typography variant="h4">{item.title}</Typography>
              <Typography variant="body">{item.description}</Typography>
              {item.href && (
                <Link href={item.href} className="feature-grid__item-link">
                  Learn more <span aria-hidden="true">↗</span>
                </Link>
              )}
            </article>
          ))}
        </Grid>
      </div>
    </section>
  )
}

FeatureGrid.displayName = 'FeatureGrid'