'use client'

import React, { forwardRef, SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
  options: { label: string; value: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, required, id, options, className, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="form-field">
        <label
          htmlFor={inputId}
          className={`form-field__label ${required ? 'form-field__label--required' : ''}`}
        >
          {label}
          {required && <span className="form-field__required" aria-hidden="true">*</span>}
        </label>
        <select
          ref={ref}
          id={inputId}
          className={[
            'form-field__select',
            error && 'form-field__input--error',
            className,
          ].filter(Boolean).join(' ')}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          {...props}
        >
          <option value="" disabled>
            {required ? 'Select an option' : 'Choose an option'}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helperText && (
          <p id={`${inputId}-helper`} className="form-field__helper-text">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="form-field__error">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'