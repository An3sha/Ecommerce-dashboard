import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * Reusable Input component with consistent styling and accessibility
 * Supports icons, validation states, and dark mode
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label for the input */
  label?: string;
  /** Helper text or error message */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Icon to display before the input */
  startIcon?: LucideIcon;
  /** Icon to display after the input */
  endIcon?: LucideIcon;
  /** Dark mode support */
  isDarkMode?: boolean;
  /** Full width input */
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error = false,
      startIcon: StartIcon,
      endIcon: EndIcon,
      isDarkMode = false,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseClasses = 'block w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : isDarkMode
      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white'
      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-black focus:ring-black';
    
    const widthClasses = fullWidth ? 'w-full' : '';
    
    const inputClasses = `${baseClasses} ${variantClasses} ${widthClasses} ${className}`;
    
    const labelClasses = `block text-sm font-medium mb-1 ${
      isDarkMode ? 'text-white' : 'text-gray-700'
    }`;
    
    const helperTextClasses = `text-sm mt-1 ${
      error
        ? 'text-red-600'
        : isDarkMode
        ? 'text-gray-400'
        : 'text-gray-500'
    }`;
    
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
        <div className="relative">
          {StartIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <StartIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${inputClasses} ${StartIcon ? 'pl-10' : ''} ${EndIcon ? 'pr-10' : ''}`}
            aria-invalid={error}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {EndIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <EndIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
          )}
        </div>
        {helperText && (
          <p id={`${inputId}-helper`} className={helperTextClasses}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
