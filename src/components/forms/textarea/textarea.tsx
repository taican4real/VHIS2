'use client'

import React, { forwardRef, TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea
          ref={ref}
          id={inputId}
          className={[
            'form-field__textarea',
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

Textarea.displayName = 'Textarea'