import React from 'react';

/**
 * Reusable Avatar component for user profile images
 * Supports fallback initials and different sizes
 */
export interface AvatarProps {
  /** User's name for fallback initials */
  name: string;
  /** Image source URL */
  src?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Dark mode support */
  isDarkMode?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  isDarkMode = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
    xl: 'h-12 w-12 text-lg'
  };
  
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium';
  const bgClasses = isDarkMode
    ? 'bg-gray-600 text-white'
    : 'bg-gray-200 text-gray-700';
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${bgClasses} ${className}`;
  
  // Generate initials from name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className={classes}>
      {src ? (
        <img
          src={src}
          alt={`${name}'s avatar`}
          className="h-full w-full rounded-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
      ) : null}
      <span className={src ? 'hidden' : ''}>
        {getInitials(name)}
      </span>
    </div>
  );
};
