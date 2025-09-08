import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { Calendar, FileText, MoreHorizontal, Plus, Filter, ArrowUpDown } from "lucide-react";
import { Pagination } from "./Pagination";
import { SearchInput } from "./SearchInput";
import { useDashboard } from "../context/DashboardContext";
import { useOrderData } from "../hooks/useOrderData";
import { Order } from "../types/Order";
import "../styles/sidebar.css";

// OrderTableRow component
interface OrderTableRowProps {
  order: Order;
  isDarkMode: boolean;
  selectedOrders: Set<string>;
  toggleOrderSelection: (orderId: string) => void;
}

const OrderTableRow: React.FC<OrderTableRowProps> = ({
  order,
  isDarkMode,
  selectedOrders,
  toggleOrderSelection,
}) => {
  const isSelected = selectedOrders.has(order.orderId);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "#8A8CD9"; // Purple
      case "complete":
        return "#4AA785"; // Green
      case "pending":
        return "#59A8D4"; // Blue
      case "approved":
        return "#FFC555"; // Yellow
      case "rejected":
        return "#1C1C1C66"; // Gray
      default:
        return "#1C1C1C66";
    }
  };

  return (
    <TableRow
      sx={{
        height: "40px",
        backgroundColor: isSelected
          ? isDarkMode
            ? "#FFFFFF0D"
            : "#F7F9FB"
          : isDarkMode ? "#1C1C1C" : "white",
        borderBottom: isDarkMode
          ? "1px solid #FFFFFF1A"
          : "1px solid #1C1C1C1A",
        "&:hover": {
          backgroundColor: isDarkMode ? "#FFFFFF0D" : "#F7F9FB",
        },
      }}
    >
      {/* Checkbox */}
      <TableCell
        sx={{
          width: "28px",
          height: "40px",
          padding: "8px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Checkbox
          size="small"
          checked={isSelected}
          onChange={() => toggleOrderSelection(order.orderId)}
          sx={{
            color: isDarkMode ? "#FFFFFF33" : "#1C1C1C33",
            "&.Mui-checked": {
              color: "#8B5CF6",
            },
          }}
        />
      </TableCell>

      {/* Order ID */}
      <TableCell
        sx={{
          width: "100px",
          height: "40px",
          padding: "8px 12px",
         
        }}
      >
        <span className={`table-text ${isDarkMode ? "dark" : "light"}`}>
        {order.orderId}
        </span>
      </TableCell>

      {/* User */}
      <TableCell
        sx={{
          width: "214px",
          height: "40px",
          padding: "8px 12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: "12px",
              backgroundColor: "#8B5CF6",
              color: "white",
            }}
          >
            {order.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </Avatar>
          <span className={`table-text ${isDarkMode ? "dark" : "light"}`}>
            {order.user.name}
          </span>
        </Box>
      </TableCell>

      {/* Project */}
      <TableCell
        sx={{
          width: "215px",
          height: "40px",
          padding: "8px 12px",
        
        }}
      >
        <span className={`table-text ${isDarkMode ? "dark" : "light"}`}>
          {order.project}
        </span>
      </TableCell>

      {/* Address */}
      <TableCell
        sx={{
          width: "270px",
          height: "40px",
          padding: "8px 12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <span className={`table-text ${isDarkMode ? "dark" : "light"}`}>
           
            {order.address}
          </span>
          {order.hasExternalLink && (
            <FileText
              size={14}
              color={isDarkMode ? "#FFFFFF66" : "#1C1C1C66"}
            />
          )}
        </Box>
      </TableCell>

      {/* Date */}
      <TableCell
        sx={{
          width: "191px",
          height: "40px",
          padding: "8px 12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Calendar size={14} color={isDarkMode ? "#FFFFFF66" : "#1C1C1C66"} />
          <span className={`table-text ${isDarkMode ? "dark" : "light"}`}>
            {order.date}
          </span>
        </Box>
      </TableCell>

      {/* Status */}
      <TableCell
        sx={{
          width: "110px",
          height: "40px",
          padding: "8px 12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: getStatusColor(order.status),
            }}
          />
          <span
            className="table-text"
            style={{
              color: getStatusColor(order.status),
            }}
          >
            {order.status}
          </span>
          {order.status.toLowerCase() === "rejected" && (
            <MoreHorizontal
              size={14}
              color={isDarkMode ? "#FFFFFF66" : "#1C1C1C66"}
            />
          )}
        </Box>
      </TableCell>

      {/* Actions */}
      <TableCell
        sx={{
          width: "48px",
          height: "40px",
          padding: "8px 12px",
        }}
      >
        <MoreHorizontal
          size={14}
          color={isDarkMode ? "#FFFFFF66" : "#1C1C1C66"}
        />
      </TableCell>
    </TableRow>
  );
};

export const OrderTable: React.FC = () => {
  const { 
    isDarkMode, 
    selectedOrders, 
    toggleAllOrders, 
    toggleOrderSelection,
    searchTerm,
    setSearchTerm,
    setSorting,
    setDateFilterWithReset,
  } = useDashboard();
  const { orders: paginatedOrders } = useOrderData();

  return (
    <div
      className={`flex flex-col p-4 sm:p-6 gap-4 h-full ${
        isDarkMode ? "bg-[#1C1C1C]" : "bg-white"
      }`}
    >
      {/* Table Header */}
      <div
        style={{
          padding: "4px 8px",

          opacity: 1,
        }}
      >
        <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>
          Order List
        </span>
       

     
      
      </div>
      <div className="gap-[12px] w-full h-full flex flex-col">
        <div
          className={isDarkMode ? "bg-[#FFFFFF0D]" : "bg-[#F7F9FB]"}
          style={{
            padding: "8px",
            gap: "16px",
            borderRadius: "12px",
    
          }}
        >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              isDarkMode 
                  ? "border-gray-600 hover:bg-gray-700 text-gray-400"
                  : "border-gray-300 hover:bg-gray-50 text-gray-600"
              }`}
              aria-label="Add new order"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => {
                // Filter by date - show only recent orders (last 24 hours)
                setDateFilterWithReset('recent');
              }}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? "border-gray-600 hover:bg-gray-700 text-gray-400"
                  : "border-gray-300 hover:bg-gray-50 text-gray-600"
              }`}
              aria-label="Filter orders"
            >
              <Filter size={16} />
            </button>
              <button
              onClick={() => {
                // Filter by name - sort alphabetically by user name
                setSorting('user', 'asc');
              }}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkMode 
                  ? "border-gray-600 hover:bg-gray-700 text-gray-400"
                  : "border-gray-300 hover:bg-gray-50 text-gray-600"
                }`}
                aria-label="Sort orders"
              >
              <ArrowUpDown size={16} />
              </button>
          </div>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search"
            isDarkMode={isDarkMode}
            variant="table"
          />
        </div>
      </div>

      {/* Table */}
        <div className="overflow-x-auto">
          <TableContainer
            sx={{
              backgroundColor: isDarkMode ? "#1C1C1C" : "white",
              boxShadow: "none",
              minWidth: "800px", // Ensure minimum width for table
            }}
          >
            <Table 
              sx={{ 
                tableLayout: "fixed",
                borderCollapse: "collapse",
                "& .MuiTableCell-root": {
                  borderBottom: "none", // Remove default MUI borders
                }
              }}
            >
            <TableHead>
              <TableRow
                sx={{
                  height: "40px",
                
                  borderBottom: isDarkMode
                    ? "1px solid #FFFFFF1A"
                    : "1px solid #1C1C1C1A",
                }}
              >
                <TableCell
                  sx={{
                    // width: "24px",
                    height: "40px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    left: "12px",
                  }}
                >
                  <Checkbox
                    className="checkbox-container"
                    size="small"
                    checked={
                      paginatedOrders.length > 0 &&
                      paginatedOrders.every((order) =>
                        selectedOrders.has(order.orderId)
                      )
                    }
                  onChange={() => toggleAllOrders(paginatedOrders)}
                    sx={{
                      height: "12px",
                      width: "12px",
                      // top: "1px",
                      right: "10px",
                      color: isDarkMode ? "#FFFFFF33" : "#1C1C1C33",
                      "&.Mui-checked": {
                        color: "#8B5CF6",
                      },
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    width: "100px",
                    height: "40px",
                    padding: "8px 12px",
                  }}
                >
                <span className={`table-cell ${isDarkMode ? "dark" : "light"}`}>Order ID</span>
                </TableCell>
                <TableCell
                  sx={{
                    width: "214px",
                    height: "40px",
                    padding: "8px 12px",
                  }}
                >
                <span className={`table-cell ${isDarkMode ? "dark" : "light"}`}>User</span>
                </TableCell>
                <TableCell
                  sx={{
                    width: "215px",
                    height: "40px",
                    padding: "8px 12px",
                  }}
                >
                <span className={`table-cell ${isDarkMode ? "dark" : "light"}`}>Project</span>
                </TableCell>
                <TableCell
                  sx={{
                    width: "270px",
                    height: "40px",
                    padding: "8px 12px",
                  }}
                >
                <span className={`table-cell ${isDarkMode ? "dark" : "light"}`}>Address</span>
                </TableCell>
                <TableCell
                  sx={{
                    width: "191px",
                    height: "40px",
                    padding: "8px 12px",
                  }}
                >
                <span className={`table-cell ${isDarkMode ? "dark" : "light"}`}>Date</span>
                </TableCell>
                <TableCell
                  sx={{
                    width: "110px",
                    height: "40px",
                    padding: "8px 12px",
                  }}
                >
                <span className={`table-cell ${isDarkMode ? "dark" : "light"}`}>Status</span>
                </TableCell>
                <TableCell
                  sx={{
                    width: "48px",
                    height: "40px",
                    padding: "8px 12px",
                  }}
                >
                <span className={`table-cell ${isDarkMode ? "dark" : "light"}`}></span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => (
                <OrderTableRow
                  key={order.orderId}
                  order={order}
                  isDarkMode={isDarkMode}
                  selectedOrders={selectedOrders}
                  toggleOrderSelection={toggleOrderSelection}
                />
            ))}
            {paginatedOrders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    sx={{
                      textAlign: "center",
                      padding: "48px 24px",
                      color: isDarkMode ? "#FFFFFF66" : "#1C1C1C66",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="h4">📋</Typography>
                      <Typography variant="h6" fontWeight="medium">
                        No orders found
                      </Typography>
                      <Typography variant="body2">
                        Try adjusting your search or filter criteria
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </div>

      {/* Pagination */}
        <div className="flex justify-end items-center w-full">
        <Pagination />
        </div>
      </div>
    </div>
  );
};
