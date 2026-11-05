'use client'

import React, { forwardRef } from 'react'

export interface RadioOption {
  label: string
  value: string
}

export interface RadioGroupProps {
  label: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  error?: string
  required?: boolean
  name: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  required,
  name,
}) => {
  return (
    <div className="form-field">
      <label className="form-field__label">
        {label}
        {required && <span className="form-field__required" aria-hidden="true">*</span>}
      </label>
      <div className="form-field__radio-group">
        {options.map((option) => (
          <label key={option.value} className="form-field__radio-label">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              className="form-field__radio"
              aria-required={required}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="form-field__error">{error}</p>
      )}
    </div>
  )
}

RadioGroup.displayName = 'RadioGroup'