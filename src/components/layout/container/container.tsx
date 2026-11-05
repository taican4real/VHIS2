import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean
  narrow?: boolean
  className?: string
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({
  fullWidth = false,
  narrow = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={[
        'container',
        fullWidth ? 'max-w-wide' : 'max-w-container',
        narrow ? 'max-w-[800px]' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

Container.displayName = 'Container'