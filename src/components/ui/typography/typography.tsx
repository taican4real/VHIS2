import React from 'react'

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body-large'
  | 'body'
  | 'body-small'
  | 'caption'
  | 'label'
  | 'eyebrow'

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  variant?: TypographyVariant
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<TypographyVariant, string> = {
  display:
    'text-display font-display font-extrabold leading-[1.08] text-text-primary',
  h1: 'text-h1 font-display font-extrabold leading-[1.12] text-text-primary',
  h2: 'text-h2 font-display font-extrabold leading-[1.15] text-text-primary',
  h3: 'text-h3 font-display font-bold leading-[1.3] text-text-primary',
  h4: 'text-h4 font-display font-semibold leading-[1.4] text-text-primary',
  'body-large':
    'text-body-large font-body font-normal leading-[1.65] text-text-primary',
  body: 'text-body font-body font-normal leading-[1.7] text-text-primary',
  'body-small':
    'text-body-small font-body font-normal leading-[1.65] text-text-secondary',
  caption:
    'text-caption font-body font-medium leading-[1.5] text-text-muted',
  label:
    'text-label font-body font-semibold leading-[1.4] text-text-primary',
  eyebrow:
    'flex items-center gap-2 text-label font-body font-semibold uppercase tracking-wider text-text-secondary',
}

const elementMap: Record<TypographyVariant, 'h1' | 'h2' | 'h3' | 'h4' | 'p'> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  'body-large': 'p',
  body: 'p',
  'body-small': 'p',
  caption: 'p',
  label: 'p',
  eyebrow: 'p',
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  as: overrideAs,
  className,
  children,
  ...props
}) => {
  const Component = (overrideAs || elementMap[variant]) as
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'p'

  return (
    <Component
      className={[variantStyles[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
}

Typography.displayName = 'Typography'