'use client'

import { TextInput } from '@/components/forms/text-input'

export interface TelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}

export const TelInput: React.FC<TelInputProps> = ({
  label,
  error,
  helperText,
  required,
  ...props
}) => {
  return (
    <TextInput
      type="tel"
      label={label}
      error={error}
      helperText={helperText}
      required={required}
      {...props}
    />
  )
}

TelInput.displayName = 'TelInput'