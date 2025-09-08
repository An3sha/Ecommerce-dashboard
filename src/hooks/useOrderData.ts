import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { orders } from '../data/orders';

export const useOrderData = () => {
  const {
    searchTerm,
    sortField,
    sortDirection,
    filterStatus,
    dateFilter,
    currentPage,
    itemsPerPage,
  } = useDashboard();

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = orders.filter(order => {
      // Search filter
      const matchesSearch = 
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = filterStatus === 'all' || 
        order.status.toLowerCase() === filterStatus.toLowerCase();

      // Date filter
      const matchesDate = dateFilter === 'all' || matchesDateFilter(order.date, dateFilter);

      return matchesSearch && matchesStatus && matchesDate;
    });

    // Sort (only if sortField is specified)
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortField) {
          case 'orderId':
            aValue = a.orderId;
            bValue = b.orderId;
            break;
          case 'user':
            aValue = a.user.name;
            bValue = b.user.name;
            break;
          case 'project':
            aValue = a.project;
            bValue = b.project;
            break;
          case 'address':
            aValue = a.address;
            bValue = b.address;
            break;
          case 'date':
            // Convert date strings to comparable values
            aValue = getDateValue(a.date);
            bValue = getDateValue(b.date);
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortField, sortDirection, filterStatus, dateFilter]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, endIndex);
  }, [filteredAndSortedOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const totalItems = filteredAndSortedOrders.length;

  return {
    orders: paginatedOrders,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};

// Helper function to convert date strings to comparable values
const getDateValue = (dateStr: string): number => {
  const now = Date.now();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  switch (dateStr.toLowerCase()) {
    case 'just now':
      return now;
    case 'a minute ago':
      return now - minute;
    case '1 hour ago':
      return now - hour;
    case 'yesterday':
      return now - day;
    case 'feb 2, 2023':
      return new Date('2023-02-02').getTime();
    default:
      return new Date(dateStr).getTime() || 0;
  }
};

// Helper function to check if order matches date filter
const matchesDateFilter = (dateStr: string, filter: string): boolean => {
  const now = Date.now();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  const orderTime = getDateValue(dateStr);

  switch (filter) {
    case 'recent':
      // Last 24 hours
      return orderTime >= (now - day);
    case 'today':
      // Today (last 24 hours)
      return orderTime >= (now - day);
    case 'yesterday':
      // Yesterday (24-48 hours ago)
      return orderTime >= (now - 2 * day) && orderTime < (now - day);
    case 'thisWeek':
      // This week (last 7 days)
      return orderTime >= (now - week);
    default:
      return true;
  }
};