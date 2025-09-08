import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";
import { useOrderData } from "../hooks/useOrderData";

export const Pagination: React.FC = () => {
  const {
    isDarkMode,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  } = useDashboard();
  const { totalPages, totalItems, hasNextPage, hasPreviousPage } =
    useOrderData();

  // Generate page numbers to show (max 5 pages visible)
  const getVisiblePages = () => {
    const maxVisible = 5;
    const pages = [];
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      const current = currentPage;
      const total = totalPages;
      
      if (current <= 3) {
        // Show first 4 pages + last page
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 2) {
        // Show first page + last 4 pages
        pages.push(1);
        pages.push('...');
        for (let i = total - 3; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Show first page + current-1, current, current+1 + last page
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex w-full items-center justify-end">
 
      
      {/* Pagination controls */}
      <div className="flex items-center w-[244px] h-[28px] gap-[8px]">

      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={!hasPreviousPage}
        className={`p-2 h-[28px] w-[28px] rounded-lg transition-all duration-200 disabled:opacity-50 items-center justify-center flex ${
          isDarkMode
            ? "text-white hover:text-gray-300 hover:bg-[#FFFFFF1A]"
            : "text-[#1C1C1C] hover:text-gray-600 hover:bg-gray-100"
        } disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={28} />
      </button>

      {visiblePages.map((page, index) => (
        page === '...' ? (
          <span
            key={index}
            className={`px-3 py-2 text-sm w-[28px] h-[28px] rounded-lg items-center justify-center flex ${
              isDarkMode ? "text-white" : "text-[#1C1C1C]"
            }`}
          >
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setCurrentPage(page as number)}
            className={`px-3 py-2 text-sm w-[28px] h-[28px] rounded-lg transition-all duration-200 hover:scale-105 items-center justify-center flex ${
              page === currentPage
                ? isDarkMode 
                  ? "bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] text-white"
                  : "bg-[#1C1C1C0D] hover:bg-gray-200"
                : isDarkMode
                ? "text-white hover:text-gray-300 hover:bg-[#FFFFFF1A]"
                : "text-[#1C1C1C] hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!hasNextPage}
        className={`p-2 h-[28px] w-[28px] rounded-lg transition-all duration-200 disabled:opacity-50 items-center justify-center flex ${
          isDarkMode
            ? "text-white hover:text-gray-300 hover:bg-[#FFFFFF1A]"
            : "text-[#1C1C1C] hover:text-gray-600 hover:bg-gray-100"
        } disabled:cursor-not-allowed`}
      >
        <ChevronRight size={28} />
      </button>
      </div>
    </div>
  );
};
