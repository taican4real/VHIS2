'use client'

import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, required, id, className, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="form-field form-field--checkbox">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={[
            'form-field__checkbox',
            error && 'form-field__input--error',
            className,
          ].filter(Boolean).join(' ')}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          {...props}
        />
        <label htmlFor={inputId} className="form-field__label">
          {label}
          {required && <span className="form-field__required" aria-hidden="true">*</span>}
        </label>
        {error && (
          <p id={`${inputId}-error`} className="form-field__error">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'