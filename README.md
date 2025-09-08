# Dashboard Application

A modern, responsive dashboard application built with React, TypeScript, and Material-UI. Features a comprehensive order management system with e-commerce analytics, dark/light theme support, and advanced filtering capabilities.

## 🚀 Features

### 📊 **Order Management Dashboard**
- **Interactive Data Table**: Sortable, filterable, and searchable order list
- **Smart Pagination**: Efficient data pagination 
- **Bulk Selection**: Select multiple orders with checkbox functionality
- **Real-time Search**: Instant search across all order fields

### 🛒 **E-commerce Analytics**
- **Metric Cards**: Key performance indicators (Orders, Revenue, Customers, Growth)
- **Interactive Charts**: 
  - Projections vs Actuals bar chart
  - Revenue trend line chart
  - Revenue by location map visualization
  - Top selling products table
  - Total sales pie chart

### 🎨 **UI/UX Features**
- **Dark/Light Theme**: Seamless theme switching with persistent preferences
- **Modern Design**: Clean, professional interface with consistent styling
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: ARIA-compliant components and keyboard navigation

### 🔧 **Advanced Functionality**
- **Context-based State Management**: Global state with React Context API
- **Custom Hooks**: Reusable logic for data fetching and manipulation
- **Type Safety**: Full TypeScript implementation with strict typing
- **Performance Optimized**: Memoized components and efficient re-rendering

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe development with strict typing
- **Vite 5.4.2** - Fast build tool and development server

### **UI Libraries**
- **Material-UI (MUI) 7.3.2** - Professional React components
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Beautiful, customizable icons
- **Emotion** - CSS-in-JS styling solution

### **Data Visualization**
- **Recharts 3.1.2** - Composable charting library
- **React Simple Maps 3.0.0** - Interactive map components
  

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5174
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Production
npm run build        # Create optimized build
```

## 🎯 Key Components

### **OrderTable**
- Material-UI table with fixed column widths
- Sortable columns with visual indicators
- Advanced filtering and search capabilities
- Responsive pagination with customizable page sizes
- Bulk selection with select all functionality

### **EcommerceDashboard**
- Interactive metric cards with click navigation
- Multiple chart types (bar, line, pie, map)
- Responsive grid layout
- Theme-aware styling

### **DashboardContext**
- Global state management for:
  - Theme preferences (dark/light)
  - Search and filter states
  - Pagination settings
  - Order selection
  - View navigation

### **SearchInput**
- Reusable search component with variants
- Header and table-specific styling
- Keyboard shortcuts (⌘/)
- Real-time search functionality


