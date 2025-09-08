import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDarkMode: boolean;
  variant?: 'header' | 'table';
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search",
  isDarkMode,
  variant = 'header',
  className = ""
}) => {
  const getVariantStyles = () => {
    if (variant === 'table') {
        return {
            container: "relative",
            input: `pl-8 pr-4 border  rounded-lg py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-[160px] h-[28px] ${
              isDarkMode 
                ? 'bg-[#1C1C1C66] text-[#FFFFFF33] placeholder-gray-400 border-[#FFFFFF1A]' 
                : 'bg-[#FFFFFF66] text-[#1C1C1C33] placeholder-gray-500'
            }`,
            icon: `absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-[#FFFFFF33]' : 'text-[#1C1C1C33]'
            }`,
            showShortcut: false
          };
    }
    
    // Default header variant
    return {
      container: "relative",
      input: `pl-8 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-[160px] h-[28px] ${
        isDarkMode 
          ? 'bg-[#FFFFFF1A] text-[#FFFFFF33] placeholder-gray-400' 
          : 'bg-[#1C1C1C0D] text-[#1C1C1C33] placeholder-gray-500'
      }`,
      icon: `absolute left-3 top-1/2 transform -translate-y-1/2 ${
        isDarkMode ? 'text-[#FFFFFF33]' : 'text-[#1C1C1C33]'
      }`,
      showShortcut: true
    };
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      <Search size={16} className={styles.icon} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
      {styles.showShortcut && (
        <span 
          className={`text-sm ${isDarkMode ? 'text-[#FFFFFF33]' : 'text-[#1C1C1C33]'}`}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          ⌘/
        </span>
      )}
    </div>
  );
};
