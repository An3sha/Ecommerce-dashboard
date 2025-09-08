import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '../types/Order';

export type SortField = 'orderId' | 'user' | 'project' | 'address' | 'date' | 'status' | null;
export type SortDirection = 'asc' | 'desc';
export type FilterStatus = 'all' | 'in progress' | 'complete' | 'pending' | 'approved' | 'rejected';
export type DateFilter = 'all' | 'recent' | 'today' | 'yesterday' | 'thisWeek';
export type ViewType = 'default' | 'orderlist' | 'ecommerce';

interface DashboardContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSearchTermWithReset: (term: string) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  setSorting: (field: SortField, direction: SortDirection) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  setFilterStatusWithReset: (status: FilterStatus) => void;
  dateFilter: DateFilter;
  setDateFilter: (filter: DateFilter) => void;
  setDateFilterWithReset: (filter: DateFilter) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  setItemsPerPageWithReset: (items: number) => void;
  selectedOrders: Set<string>;
  toggleOrderSelection: (orderId: string) => void;
  toggleAllOrders: (orders: Order[]) => void;
  clearSelection: () => void;
  isNotificationPanelOpen: boolean;
  toggleNotificationPanel: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setSorting = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(1); // Reset to first page when sorting
  };

  const setSearchTermWithReset = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const setFilterStatusWithReset = (status: FilterStatus) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const setDateFilterWithReset = (filter: DateFilter) => {
    setDateFilter(filter);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const setItemsPerPageWithReset = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const toggleOrderSelection = (orderId: string) => {
    const newSelection = new Set(selectedOrders);
    if (newSelection.has(orderId)) {
      newSelection.delete(orderId);
    } else {
      newSelection.add(orderId);
    }
    setSelectedOrders(newSelection);
  };

  const toggleAllOrders = (orders: Order[]) => {
    const allSelected = orders.every(order => selectedOrders.has(order.orderId));
    if (allSelected) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(orders.map(order => order.orderId)));
    }
  };

  const clearSelection = () => {
    setSelectedOrders(new Set());
  };

  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
  };

  return (
    <DashboardContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        currentView,
        setCurrentView,
        searchTerm,
        setSearchTerm,
        setSearchTermWithReset,
        sortField,
        sortDirection,
        setSorting,
        filterStatus,
        setFilterStatus,
        setFilterStatusWithReset,
        dateFilter,
        setDateFilter,
        setDateFilterWithReset,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        setItemsPerPageWithReset,
        selectedOrders,
        toggleOrderSelection,
        toggleAllOrders,
        clearSelection,
        isNotificationPanelOpen,
        toggleNotificationPanel,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};