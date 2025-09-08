import React, { forwardRef } from 'react';

/**
 * Reusable Checkbox component with consistent styling and accessibility
 * Supports indeterminate state and custom styling
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label for the checkbox */
  label?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Dark mode support */
  isDarkMode?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      isDarkMode = false,
      size = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    };
    
    const baseClasses = `rounded border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClasses[size]}`;
    
    const variantClasses = isDarkMode
      ? 'border-gray-600 bg-gray-700 text-white focus:ring-white'
      : 'border-gray-300 bg-white text-black focus:ring-black';
    
    const checkboxClasses = `${baseClasses} ${variantClasses} ${className}`;
    
    const labelClasses = `ml-2 text-sm font-medium ${
      isDarkMode ? 'text-white' : 'text-gray-700'
    }`;
    
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={checkboxClasses}
          aria-describedby={label ? `${checkboxId}-label` : undefined}
          {...props}
        />
        {label && (
          <label
            id={`${checkboxId}-label`}
            htmlFor={checkboxId}
            className={labelClasses}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
