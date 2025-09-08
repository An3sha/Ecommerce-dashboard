import React from "react";
import {
  X,
  Bug,
  UserPlus,
  AlertTriangle,
  GitBranch,
  FileText,
  Trash2,
} from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

interface NotificationItem {
  id: string;
  type:
    | "bug"
    | "user"
    | "warning"
    | "release"
    | "submission"
    | "modification"
    | "deletion";
  title: string;
  time: string;
  user?: {
    name: string;
    avatar: string;
  };
}

const notifications: NotificationItem[] = [
  {
    id: "1",
    type: "bug",
    title: "You have a bug that needs...",
    time: "Just now",
  },
  {
    id: "2",
    type: "user",
    title: "New user registered",
    time: "59 minutes ago",
  },
  {
    id: "3",
    type: "bug",
    title: "You have a bug that needs...",
    time: "12 hours ago",
  },
  {
    id: "4",
    type: "user",
    title: "Andi Lane subscribed to you",
    time: "Today, 11:59 AM",
  },
];

const activities = [
  {
    id: "1",
    type: "bug",
    title: "You have a bug that needs...",
    time: "Just now",
    user: { name: "You", avatar: "Y" },
  },
  {
    id: "2",
    type: "release",
    title: "Released a new version",
    time: "59 minutes ago",
    user: { name: "System", avatar: "S" },
  },
  {
    id: "3",
    type: "submission",
    title: "Submitted a bug",
    time: "12 hours ago",
    user: { name: "User", avatar: "U" },
  },
  {
    id: "4",
    type: "modification",
    title: "Modified A data in Page X",
    time: "Today, 11:59 AM",
    user: { name: "Admin", avatar: "A" },
  },
  {
    id: "5",
    type: "deletion",
    title: "Deleted a page in Project X",
    time: "Feb 2, 2023",
    user: { name: "Editor", avatar: "E" },
  },
];

const contacts = [
  { name: "Natali Craig", avatar: "NC" },
  { name: "Drew Cano", avatar: "DC" },
  { name: "Orlando Diggs", avatar: "OD" },
  { name: "Andi Lane", avatar: "AL" },
  { name: "Kate Morrison", avatar: "KM" },
  { name: "Koray Okumus", avatar: "KO" },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "bug":
      return <Bug size={16} />;
    case "user":
      return <UserPlus size={16} />;
    case "warning":
      return <AlertTriangle size={16} />;
    case "release":
      return <GitBranch size={16} />;
    case "submission":
      return <FileText size={16} />;
    case "modification":
      return <FileText size={16} />;
    case "deletion":
      return <Trash2 size={16} />;
    default:
      return <AlertTriangle size={16} />;
  }
};

export const NotificationPanel: React.FC = () => {
  const { isDarkMode, toggleNotificationPanel } = useDashboard();

  return (
    <div
      className={`flex flex-col ${isDarkMode ? "bg-[#1C1C1C]" : "bg-white"}`}
      style={{
        width: "280px",
        // height: "100vh",
        borderLeftWidth: "1px",
        padding: "20px",

        gap: "24px",
        opacity: 1,
        borderLeft: isDarkMode ? "1px solid #FFFFFF1A" : "1px solid #1C1C1C1A",
      }}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mt-2">
          <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>
            Notifications
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-3">
            <div
              className={`p-1 rounded-lg ${
                isDarkMode ? "bg-[#E3F5FF]" : "bg-[#E3F5FF]"
              }`}
            >
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`logo-text ${isDarkMode ? "dark" : "light"}`}>
                {notification.title}
              </p>
              <p className={`table-cell ${isDarkMode ? "dark" : "light"}`}>
                {notification.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Activities */}
      <div>
        <div className="flex items-center justify-between mt-2">
          <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>
            Activities
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="w-[24px] h-[24px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {activity.user?.avatar}
              </span>
            </div>
            <div className="flex-1 min-w-0">
            <p className={`logo-text ${isDarkMode ? "dark" : "light"}`}>
                  {activity.title}
              </p>
              <p className={`table-cell ${isDarkMode ? "dark" : "light"}`}>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Contacts */}
      <div>
        <div className="flex items-center justify-between mt-2">
          <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>
            Contacts
          </span>
        </div>
      </div>
     
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-[24px] h-[24px]  bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {contact.avatar}
                </span>
              </div>
              <span
                className={`logo-text ${isDarkMode ? "dark" : "light"}`}
              >
                {contact.name}
              </span>
            </div>
          ))}
        </div>
 
    </div>
    // </div>
  );
};
