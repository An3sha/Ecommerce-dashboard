import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { OrderTable } from "./OrderTable";
import { EcommerceDashboard } from "./EcommerceDashboard";
import { NotificationPanel } from "./NotificationPanel";
import { useDashboard } from "../context/DashboardContext";

export const Dashboard: React.FC = () => {
  const { isDarkMode, currentView, isNotificationPanelOpen } = useDashboard();

  return (
    <div
      className={`flex min-h-screen w-full overflow-hidden ${
        isDarkMode ? "bg-[#FFFFFF1A]" : "bg-[#1C1C1C0D]"
      }`}
    >
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div 
        className={`hidden lg:block ${isDarkMode ? "bg-[#1C1C1C]" : "bg-white"}`}
        style={{
          borderRight: isDarkMode ? "1px solid #FFFFFF1A" : "1px solid #1C1C1C1A"
        }}
      >
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {currentView === "orderlist" ? (
          <div className="flex-1 flex flex-col relative min-h-0">
            <Header showNotificationToggle={true} />
            <div className="flex-1 overflow-auto">
              <OrderTable />
            </div>

            {/* Notification Panel Slider for Order List View */}
            {isNotificationPanelOpen && (
              <div 
                className={`absolute inset-y-0 right-0 z-50 w-80 max-w-[90vw] transform transition-transform duration-300 ease-in-out ${isDarkMode ? "bg-[#1C1C1C]" : "bg-white"}`}
                style={{
                  borderLeft: isDarkMode ? "1px solid #FFFFFF1A" : "1px solid #1C1C1C1A"
                }}
              >
                <NotificationPanel />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col lg:flex-row relative min-h-0">
            <div className="flex-1 flex flex-col min-w-0">
              <Header showNotificationToggle={false} />
              <div className="flex-1 overflow-auto">
                <EcommerceDashboard />
              </div>
            </div>
            {/* Notification Panel - Hidden on mobile, visible on desktop */}
            <div 
              className={`hidden lg:block ${isDarkMode ? "bg-[#1C1C1C]" : "bg-white"}`}
              style={{
                borderLeft: isDarkMode ? "1px solid #FFFFFF1A" : "1px solid #1C1C1C1A"
              }}
            >
              <NotificationPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
