import React from 'react'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: 'mobile' | 'tablet' | 'desktop' | 'none'
  className?: string
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({
  padding = 'desktop',
  className,
  children,
  ...props
}) => {
  const paddingClasses = {
    mobile: 'py-[24px]',
    tablet: 'py-[40px]',
    desktop: 'py-[64px]',
    none: '',
  }

  return (
    <section
      className={[
        'section',
        paddingClasses[padding],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </section>
  )
}

Section.displayName = 'Section'