'use client'

import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, helperText, required, id, className, ...props }, ref) => {
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
        <input
          ref={ref}
          id={inputId}
          className={[
            'form-field__input',
            error && 'form-field__input--error',
            className,
          ].filter(Boolean).join(' ')}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
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

TextInput.displayName = 'TextInput'