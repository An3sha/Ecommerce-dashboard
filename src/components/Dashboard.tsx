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
      className={`flex min-h-screen ${
        isDarkMode ? "bg-[#FFFFFF1A]" : "bg-[#1C1C1C0D]"
      }`}
    >
      <Sidebar />
      {currentView === "orderlist" ? (
        <div className="flex-1 flex flex-col relative">
          <Header  showNotificationToggle={true} />
          <OrderTable />

          {/* Notification Panel Slider for Order List View */}
          {isNotificationPanelOpen && (
            <div className="absolute inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out">
              <NotificationPanel />
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-row relative">
          <div className="flex-1 flex flex-col">
            <Header  showNotificationToggle={false} />
            <div className="flex flex-1">
              <div className="flex-1">
                <EcommerceDashboard />
              </div>
            </div>
          </div>
          <NotificationPanel />
        </div>
      )}
    </div>
  );
};
