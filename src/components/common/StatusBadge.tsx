import React from 'react';

/**
 * Status badge component for displaying order statuses
 * Supports different status types with consistent styling
 */
export interface StatusBadgeProps {
  /** Status text to display */
  status: string;
  /** Dark mode support */
  isDarkMode?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  isDarkMode = false,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  // Get status-specific styling
  const getStatusClasses = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    switch (normalizedStatus) {
      case 'in progress':
        return isDarkMode
          ? 'bg-blue-900 text-blue-200'
          : 'bg-blue-100 text-blue-800';
      case 'complete':
        return isDarkMode
          ? 'bg-green-900 text-green-200'
          : 'bg-green-100 text-green-800';
      case 'pending':
        return isDarkMode
          ? 'bg-yellow-900 text-yellow-200'
          : 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return isDarkMode
          ? 'bg-green-900 text-green-200'
          : 'bg-green-100 text-green-800';
      case 'rejected':
        return isDarkMode
          ? 'bg-red-900 text-red-200'
          : 'bg-red-100 text-red-800';
      default:
        return isDarkMode
          ? 'bg-gray-700 text-gray-200'
          : 'bg-gray-100 text-gray-800';
    }
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${getStatusClasses(status)} ${className}`;
  
  return (
    <span className={classes} role="status" aria-label={`Status: ${status}`}>
      {status}
    </span>
  );
};
