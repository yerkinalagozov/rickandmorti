import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 
          border border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-foreground))]
          text-[rgb(var(--color-text))]
          rounded-md
          focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder-[rgb(var(--color-text-secondary))]
          ${error ? 'border-[rgb(var(--color-error))] focus:ring-[rgb(var(--color-error))]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-[rgb(var(--color-error))]">
          {error}
        </p>
      )}
    </div>
  )
}