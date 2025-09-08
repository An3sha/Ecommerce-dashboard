import React from 'react';
import { 
  Bell, 
  Sun, 
  Star,
  History
} from 'lucide-react';
import TabIcon from '../assests/Tab.svg';
import { useDashboard } from '../context/DashboardContext';
import { SearchInput } from './SearchInput';

interface HeaderProps {
  showNotificationToggle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  showNotificationToggle = true 
}) => {
  const { isDarkMode, toggleDarkMode, searchTerm, setSearchTerm, toggleNotificationPanel } = useDashboard();

  
  return (
    <header 
      className={`flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 ${isDarkMode ? "bg-[#1C1C1C]" : "bg-white"}`} 
      style={{
        height: '68px',
        borderBottom: isDarkMode ? "1px solid #FFFFFF1A" : "1px solid #1C1C1C1A",
      }}
    >
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <img 
          src={TabIcon} 
          alt="Tab" 
          width={18}
          height={18}
          className="flex-shrink-0"
          style={{
            filter: isDarkMode ? 'brightness(0) saturate(100%) invert(100%)' : 'brightness(0) saturate(100%) invert(20%)'
          }}
        />
        <Star size={18} className={`flex-shrink-0 ${isDarkMode ? 'text-white' : 'text-black'}`} />
        <span className={`text-sm hidden sm:inline ${isDarkMode ? 'text-[#FFFFFF66]' : 'text-[#1C1C1C66]'}`}>
          Dashboards
        </span>
        <span className={`text-sm hidden sm:inline ${isDarkMode ? 'text-[#FFFFFF66]' : 'text-[#1C1C1C66]'}`}>
          /
        </span>
        <span className={`font-medium text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Default
        </span>
      </div>

      {/* Right side - Search and actions */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Search - Hidden on very small screens */}
        <div className="hidden sm:block">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search"
            isDarkMode={isDarkMode}
            variant="header"
          />
        </div>

        {/* Action buttons */}
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDarkMode 
              ? 'text-white hover:text-gray-300 hover:bg-[#FFFFFF1A]' 
              : 'text-black hover:text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Toggle dark mode"
        >
          <Sun size={18} />
        </button>

        <button 
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDarkMode 
              ? 'text-white hover:text-gray-300 hover:bg-[#FFFFFF1A]' 
              : 'text-black hover:text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="View history"
        >
          <History size={18} />
        </button>

        {showNotificationToggle && (
          <button 
            onClick={toggleNotificationPanel}
            className={`relative p-2 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'text-white hover:text-gray-300 hover:bg-[#FFFFFF1A]' 
                : 'text-black hover:text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Toggle notifications"
          >
            <Bell size={18} />
          </button>
        )}

        <button 
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDarkMode 
              ? 'text-white hover:text-gray-300 hover:bg-[#FFFFFF1A]' 
              : 'text-black hover:text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Open menu"
        >
          <img 
            src={TabIcon} 
            alt="Tab" 
            width={18}
            height={18}
            style={{
              filter: isDarkMode ? 'brightness(0) saturate(100%) invert(100%)' : 'brightness(0) saturate(100%) invert(20%)'
            }}
          />
        </button>
      </div>
    </header>
  );
};