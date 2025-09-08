import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * Reusable IconButton component for icon-only buttons
 * Optimized for accessibility and consistent styling
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to display */
  icon: LucideIcon;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Dark mode support */
  isDarkMode?: boolean;
  /** Accessible label for screen readers */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      size = 'md',
      variant = 'ghost',
      isDarkMode = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: isDarkMode
        ? 'bg-white text-black hover:bg-gray-100 focus:ring-white'
        : 'bg-black text-white hover:bg-gray-800 focus:ring-black',
      secondary: isDarkMode
        ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500'
        : 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      ghost: isDarkMode
        ? 'text-white hover:bg-white hover:bg-opacity-10 focus:ring-white'
        : 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
    };
    
    const sizeClasses = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-3'
    };
    
    const iconSizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        <Icon className={iconSizeClasses[size]} aria-hidden="true" />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
