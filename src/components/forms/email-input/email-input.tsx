'use client'

import { TextInput } from '@/components/forms/text-input'

export interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}

export const EmailInput: React.FC<EmailInputProps> = ({
  label,
  error,
  helperText,
  required,
  ...props
}) => {
  return (
    <TextInput
      type="email"
      label={label}
      error={error}
      helperText={helperText}
      required={required}
      {...props}
    />
  )
}

EmailInput.displayName = 'EmailInput'