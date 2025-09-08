import React from "react";
import {
  LayoutDashboard,
  FolderOpen,
  ShoppingCart,
  BookOpen,
  User,
  CreditCard,
  Building,
  FileText,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useDashboard } from "../context/DashboardContext";
import "../styles/sidebar.css";

export const Sidebar: React.FC = () => {
  const { isDarkMode, setCurrentView } = useDashboard();

  const favoritesItems = [
    { id: "overview", label: "Overview", icon: null },
    { id: "projects", label: "Projects", icon: null },
  ];

  const dashboardsItems = [
    {
      id: "default",
      label: "Order List",
      icon: LayoutDashboard,
      isActive: false,
      hasSubmenu: false,
      isExpanded: false,
    },
    {
      id: "ecommerce",
      label: "eCommerce",
      isActive: true,
      icon: ShoppingCart,
      hasSubmenu: true,
      isExpanded: false,
    },
    {
      id: "projects-dash",
      label: "Projects",
      icon: FolderOpen,
      hasSubmenu: true,
      isActive: false,
      isExpanded: false,
    },
    {
      id: "online-courses",
      label: "Online Courses",
      icon: BookOpen,
      hasSubmenu: true,
      isActive: false,
      isExpanded: false,
    },
  ];

  const pagesItems = [
    {
      id: "user-profile",
      label: "User Profile",
      icon: User,
      hasSubmenu: true,
      isActive: false,
      isExpanded: true,
      submenu: [
        {
          id: "profile-overview",
          label: "Overview",
          icon: null,
          isActive: false,
        },
        { id: "profile-projects", label: "Projects", icon: null },
        { id: "profile-campaigns", label: "Campaigns", icon: null },
        { id: "profile-documents", label: "Documents", icon: null },
        { id: "profile-followers", label: "Followers", icon: null },
      ],
    },
    {
      id: "account",
      label: "Account",
      icon: CreditCard,
      hasSubmenu: true,
      isActive: false,
      isExpanded: false,
    },
    {
      id: "corporate",
      label: "Corporate",
      icon: Building,
      hasSubmenu: true,
      isActive: false,
      isExpanded: false,
    },
    {
      id: "blog",
      label: "Blog",
      icon: FileText,
      hasSubmenu: true,
      isActive: false,
      isExpanded: false,
    },
    {
      id: "social",
      label: "Social",
      icon: Users,
      hasSubmenu: true,
      isActive: false,
      isExpanded: false,
    },
  ];

  return (
    <div
      className={`flex flex-col ${isDarkMode ? "bg-[#1C1C1C]" : "bg-white"} w-[212px] lg:w-56`}
      style={{
        // borderRightWidth: "1px",
        paddingTop: "20px",
        paddingRight: "16px",
        paddingBottom: "20px",
        paddingLeft: "16px",
        gap: "16px",
        opacity: 1,
        // borderRight: isDarkMode ? "1px solid #FFFFFF1A" : "1px solid #1C1C1C1A",
      }}
    >
      {/* Logo */}
      <div
        className={`flex items-center`}
        style={{
          gap: "8px",

          borderRadius: "8px",
          padding: "4px",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            opacity: 1,
            borderRadius: "80px",
          }}
        >
          <img
            src="/src/assests/ByeWind.svg"
            alt="ByeWind Logo"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "80px",
            }}
          />
        </div>
        <h1
          className={`${isDarkMode ? "text-white" : "text-[#1C1C1C]"}`}
          style={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0%",
          }}
        >
          ByeWind
        </h1>
      </div>

      {/* Favorites Section */}
      <div className="favorites-container">
        <div className="favorites-header-container">
          <div className="favorites-header-item">
            <h3 className={`favorites-title ${isDarkMode ? "dark" : "light"}`}>
              Favorites
            </h3>
          </div>
          <div className="favorites-header-item">
            <h3 className={`favorites-recently-title ${isDarkMode ? "dark" : "light"}`}>
              Recently
            </h3>
          </div>
        </div>

        {favoritesItems.map((item) => (
          <div key={item.id} className="favorites-item-container">
            <div className="favorites-item-content">
              <div className="favorites-bullet-container">
                <div className={`favorites-bullet-dot ${isDarkMode ? "dark" : "light"}`}></div>
              </div>
              <span className={`favorites-item-text ${isDarkMode ? "dark" : "light"}`}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboards Section */}
      <div className="favorites-container">
      <div className="favorites-header-item">
      <h3 className={`favorites-title ${isDarkMode ? "dark" : "light"}`}>
              Dashboards
            </h3>
        </div>
      
        {dashboardsItems.map((item) => (
          <div key={item.id} className="item-container">
            <div
              className={`sidebar-button ${item.isActive ? "active" : "inactive"} ${isDarkMode ? "dark" : "light"}`}
              onClick={() => {
                if (item.id === 'ecommerce') {
                  setCurrentView('ecommerce');
                } else if (item.id === 'default') {
                  setCurrentView('orderlist');
                }
              }}
            >
              <div className="button-content">
              {item.hasSubmenu ?(
                <div className="chevron">
                  {item.isExpanded ? (
                    <ChevronDown size={14} className={`chevron ${isDarkMode ? "dark" : "light"}`} />
                  ) : (
                    <ChevronRight size={14} className={`chevron ${isDarkMode ? "dark" : "light"}`} />
                  )}
                </div>
              ):(
                <div className="chevron">
                  
                </div>
              )}
                {item.icon && (
                  <item.icon
                    size={16}
                    className={`button-icon ${isDarkMode ? "dark" : "light"}`}
                  />
                )}
                <span>{item.label}</span>
              </div>
            </div>
          </div>
        ))}
    
      </div>

      {/* Pages Section */}
      <div className="favorites-container">
        <div className="favorites-header-item">
          <h3 className={`favorites-title ${isDarkMode ? "dark" : "light"}`}>
            Pages
          </h3>
        </div>
        {pagesItems.map((item) => (
          <div key={item.id} className="item-container">
            <div
              className={`sidebar-button ${item.isActive ? "active" : "inactive"} ${isDarkMode ? "dark" : "light"}`}
            >
              <div className="button-content">
              {item.hasSubmenu && (
                <div className="chevron">
                  {item.isExpanded ? (
                    <ChevronDown size={14} className={`chevron ${isDarkMode ? "dark" : "light"}`} />
                  ) : (
                    <ChevronRight size={14} className={`chevron ${isDarkMode ? "dark" : "light"}`} />
                  )}
                </div>
              )}
                {item.icon && (
                  <item.icon
                    size={16}
                    className={`button-icon  ${isDarkMode ? "dark" : "light"}`}
                  />
                )}
                <span>{item.label}</span>
              </div>
             
            </div>

            {item.hasSubmenu && item.isExpanded && item.submenu && (
              <div className="submenu-container">
                {item.submenu.map((subItem) => (
                  <div key={subItem.id} className="submenu-item">
                    <span
                      className={`submenu-item ${subItem.isActive ? "active" : "inactive"} ${isDarkMode ? "dark" : "light"}`}
                    >
                      {subItem.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
