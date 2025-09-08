import React from 'react';

/**
 * Reusable loading spinner component
 * Supports different sizes and colors
 */
export interface LoadingSpinnerProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
  'aria-label': ariaLabel = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };
  
  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    gray: 'text-gray-400'
  };
  
  const classes = `animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`;
  
  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
      role="status"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};
