# Dashboard Application

A modern, responsive dashboard application built with React, TypeScript, and Material-UI. Features a comprehensive order management system with e-commerce analytics, dark/light theme support, and advanced filtering capabilities.

## 🚀 Features

### 📊 **Order Management Dashboard**
- **Interactive Data Table**: Sortable, filterable, and searchable order list
- **Advanced Filtering**: Filter by status, date ranges, and custom criteria
- **Smart Pagination**: Efficient data pagination with customizable page sizes
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
- **Responsive Layout**: Optimized for different screen sizes

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

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefixing

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── common/          # Reusable UI components
│   ├── Dashboard.tsx    # Main dashboard layout
│   ├── OrderTable.tsx   # Order management table
│   ├── EcommerceDashboard.tsx # E-commerce analytics
│   ├── Header.tsx       # Navigation header
│   ├── Sidebar.tsx      # Main navigation
│   ├── NotificationPanel.tsx # Notifications sidebar
│   ├── Pagination.tsx   # Table pagination
│   └── SearchInput.tsx  # Search component
├── context/             # React Context providers
│   └── DashboardContext.tsx # Global state management
├── hooks/               # Custom React hooks
│   └── useOrderData.ts  # Order data management
├── data/                # Mock data and constants
│   └── orders.ts        # Sample order data
├── types/               # TypeScript type definitions
│   └── Order.ts         # Order data types
├── styles/              # CSS and styling
│   └── sidebar.css      # Sidebar-specific styles
└── utils/               # Utility functions
```

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

## 🎨 Theming

The application supports both dark and light themes with:
- **Automatic theme detection** based on system preferences
- **Manual theme switching** via header toggle
- **Persistent theme storage** across sessions
- **Consistent color palette** throughout the application

### Theme Colors
- **Dark Mode**: `#1C1C1C` background, `#FFFFFF` text
- **Light Mode**: `#FFFFFF` background, `#1C1C1C` text
- **Accent Colors**: Purple (`#8B5CF6`) for interactive elements

## 📊 Data Management

### **Order Data Structure**
```typescript
interface Order {
  orderId: string;
  user: {
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: string;
  status: 'in progress' | 'complete' | 'pending' | 'approved' | 'rejected';
  hasExternalLink?: boolean;
}
```

### **Filtering & Sorting**
- **Search**: Full-text search across all order fields
- **Status Filter**: Filter by order status
- **Date Filter**: Filter by date ranges (recent, today, yesterday, this week)
- **Sorting**: Sort by any column (ascending/descending)

## 🔧 Customization

### **Adding New Features**
1. Create components in `src/components/`
2. Add types in `src/types/`
3. Update context in `src/context/DashboardContext.tsx`
4. Add data in `src/data/`

### **Styling**
- Use Tailwind CSS classes for utility styling
- MUI `sx` prop for component-specific styles
- CSS modules for complex styling needs

### **Data Sources**
- Replace mock data in `src/data/orders.ts`
- Implement API calls in custom hooks
- Update types to match your data structure

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

### **Deploy to Netlify**
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI** for the comprehensive component library
- **Tailwind CSS** for the utility-first styling approach
- **Recharts** for the beautiful chart components
- **Lucide** for the consistent icon set

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**
