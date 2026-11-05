import { Typography } from '@/components/ui/typography'

export interface SectionHeadingProps {
  eyebrow?: string
  heading: string
  description?: string
  className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  heading,
  description,
  className,
}) => {
  return (
    <div className={`section-heading ${className || ''}`}>
      {eyebrow && (
        <Typography variant="eyebrow">
          <span className="eyebrow__rule"></span>
          {eyebrow}
        </Typography>
      )}
      <Typography variant="h2">{heading}</Typography>
      {description && <Typography variant="body-large">{description}</Typography>}
    </div>
  )
}

SectionHeading.displayName = 'SectionHeading'