import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  placeholder = 'Select an option...',
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
      <select
        className={`
          w-full px-3 py-2 
          border border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-foreground))]
          text-[rgb(var(--color-text))]
          rounded-md
          focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-[rgb(var(--color-error))] focus:ring-[rgb(var(--color-error))]' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-[rgb(var(--color-error))]">
          {error}
        </p>
      )}
    </div>
  )
}