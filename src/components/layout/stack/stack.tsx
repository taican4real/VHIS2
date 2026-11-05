import React from 'react'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  space?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24'
  className?: string
  children: React.ReactNode
}

export const Stack: React.FC<StackProps> = ({
  space = '6',
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={[
        'stack',
        `space-y-${space}`,
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

Stack.displayName = 'Stack'