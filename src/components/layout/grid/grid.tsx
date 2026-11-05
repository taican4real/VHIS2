import React from 'react'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 'mobile' | 'tablet' | 'desktop' | string
  gap?: 'mobile' | 'tablet' | 'desktop'
  className?: string
  children: React.ReactNode
}

export const Grid: React.FC<GridProps> = ({
  cols = 'tablet',
  gap = 'tablet',
  className,
  children,
  ...props
}) => {
  const colMap: Record<string, string> = {
    mobile: 'grid-cols-4',
    tablet: 'grid-cols-8',
    desktop: 'grid-cols-12',
  }

  const gapMap: Record<string, string> = {
    mobile: 'gap-[16px]',
    tablet: 'gap-[20px]',
    desktop: 'gap-[24px]',
  }

  return (
    <div
      className={[
        'grid',
        colMap[cols] || cols,
        gapMap[gap] || '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

Grid.displayName = 'Grid'