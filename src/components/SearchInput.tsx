import React, { memo, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from './common/Input';


interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDarkMode: boolean;
  variant?: 'header' | 'table';
  className?: string;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Show keyboard shortcut hint */
  showShortcut?: boolean;
}

export const SearchInput = memo<SearchInputProps>(({
  value,
  onChange,
  placeholder = "Search",
  isDarkMode,
  variant = 'header',
  className = "",
  debounceMs = 300,
  showShortcut = true
}) => {
  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        event.preventDefault();
        const searchInput = document.querySelector(`[data-search-input="${variant}"]`) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [variant]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const getVariantStyles = () => {
    if (variant === 'table') {
      return {
        container: "relative",
        input: `w-full sm:w-[160px] h-[28px] ${
          isDarkMode 
            ? 'bg-[#1C1C1C66] text-[#FFFFFF33] placeholder-gray-400 border-[#FFFFFF1A]' 
            : 'bg-[#FFFFFF66] text-[#1C1C1C33] placeholder-gray-500 border-gray-300'
        }`,
        showShortcut: false
      };
    }
    
    // Default header variant
    return {
      container: "relative",
      input: `w-full sm:w-[160px] h-[28px] ${
        isDarkMode 
          ? 'bg-[#FFFFFF1A] text-[#FFFFFF33] placeholder-gray-400 border-[#FFFFFF1A]' 
          : 'bg-[#1C1C1C0D] text-[#1C1C1C33] placeholder-gray-500 border-gray-300'
      }`,
      showShortcut: showShortcut
    };
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`} role="search">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        startIcon={Search}
        isDarkMode={isDarkMode}
        className={styles.input}
        data-search-input={variant}
        aria-label={`Search ${variant === 'table' ? 'table' : 'dashboard'}`}
        role="searchbox"
      />
      {styles.showShortcut && (
        <span 
          className={`text-xs absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none ${
            isDarkMode ? 'text-[#FFFFFF33]' : 'text-[#1C1C1C33]'
          }`}
          aria-hidden="true"
        >
          ⌘/
        </span>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
