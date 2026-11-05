'use client'

import NextLink from 'next/link'
import React, {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from 'react'

export type LinkVariant = 'primary' | 'secondary' | 'text' | 'ghost'

export interface LinkProps
  extends Omit<
    DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    'size' | 'variant' | 'href'
  > {
  variant?: LinkVariant
  external?: boolean
  href: string
  children: React.ReactNode
}

const variantStyles: Record<LinkVariant, string> = {
  primary: 'text-primary underline underline-offset-4 hover:no-underline',
  secondary: 'text-text-secondary underline underline-offset-4 hover:no-underline',
  text: 'text-text-primary underline underline-offset-4 hover:no-underline',
  ghost: 'text-text-secondary hover:text-text-primary transition-colors',
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'text', external = false, className, children, href, ...props }, ref) => {
    const isExternal = external || href.startsWith('http')

    return (
      <NextLink
        ref={ref}
        href={href}
        className={[
          variantStyles[variant],
          className,
        ].filter(Boolean).join(' ')}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
        {isExternal && <span className="sr-only">(opens in new tab)</span>}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'
