import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Activity } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { NotificationPanel } from './NotificationPanel';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// Sample data for charts
const projectionsData = [
  { month: 'Jan', projections: 16, actuals: 42 },
  { month: 'Feb', projections: 20, actuals: 48 },
  { month: 'Mar', projections: 16, actuals: 45 },
  { month: 'Apr', projections: 28, actuals: 50 },
  { month: 'May', projections: 16, actuals: 36 },
  { month: 'Jun', projections: 22, actuals: 48 },
];

const revenueData = [
  { month: 'Jan', current: 15, previous: 12 },
  { month: 'Feb', current: 18, previous: 15 },
  { month: 'Mar', current: 12, previous: 18 },
  { month: 'Apr', current: 20, previous: 16 },
  { month: 'May', current: 16, previous: 20 },
  { month: 'Jun', current: 25, previous: 22 },
];

const salesData = [
  { name: 'Direct', value: 38.6, amount: 300.56, color: '#1C1C1C' },
  { name: 'Sponsored', value: 30.1, amount: 154.02, color: '#95A4FC' },
  { name: 'Affiliate', value: 22.5, amount: 135.18, color: '#BAEDBD' },
  { name: 'E-mail', value: 8.8, amount: 48.96, color: '#B1E3FF' },
];

const topProducts = [
  { name: 'ASOS Ridley High Waist', price: 79.49, quantity: 82, amount: 6518.18 },
  { name: 'Marco Lightweight Shirt', price: 128.50, quantity: 37, amount: 4754.50 },
  { name: 'Half Sleeve Shirt', price: 39.99, quantity: 64, amount: 2559.36 },
  { name: 'Lightweight Jacket', price: 20.00, quantity: 184, amount: 3680.00 },
  { name: 'Marco Shoes', price: 79.49, quantity: 64, amount: 1965.81 },
];

const revenueByLocation = [
  { city: 'New York', amount: '72K', coordinates: [-74.006, 40.7128] },
  { city: 'San Francisco', amount: '39K', coordinates: [-122.4194, 37.7749] },
  { city: 'Sydney', amount: '25K', coordinates: [151.2093, -33.8688] },
  { city: 'Singapore', amount: '61K', coordinates: [103.8198, 1.3521] },
];

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<any>;
  className?: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon: Icon,
  className = '',
  onClick
}) => {
  const { isDarkMode } = useDashboard();
  
  // Check if text-black or text-white is specified in className
  const hasBlackText = className.includes('text-black');
  const hasWhiteText = className.includes('text-white');
  
  return (
    <div 
      className={`flex flex-col gap-2 transition-all duration-200 hover:shadow-sm ${
        onClick ? 'cursor-pointer' : ''
      } ${
        isDarkMode 
          ? 'bg-[#FFFFFF0D]' 
          : 'bg-[#F7F9FB]'
      } ${className}`}
      style={{
        width: '202px',
        height: '112px',
        minWidth: '200px',
        gap: '8px',
        opacity: 1,
        borderRadius: '16px',
        padding: '24px'
      }}
      onClick={onClick}
    >
       <span className={`order-list-title ${
         hasBlackText ? 'text-[#1C1C1C]' : hasWhiteText ? 'text-white' : isDarkMode ? "dark" : "light"
       }`}>
          {title}
        </span>
      
      <div className="flex items-end justify-between">
        <div>
            <p className={`text-2xl font-bold ${
              hasBlackText ? 'text-[#1C1C1C]' : hasWhiteText ? 'text-white' : isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
            }`}>{value}</p>
        </div>
        <div className={`flex items-center space-x-1 text-xs ${
          hasBlackText ? 'text-[#1C1C1C]' : hasWhiteText ? 'text-white' : isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
        }`}>
         
          <span>{change}</span>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        </div>
      </div>
    </div>
  );
};

export const EcommerceDashboard: React.FC = () => {
  const { isDarkMode, setCurrentView } = useDashboard();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`px-4 py-2 rounded-lg shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 text-white' 
            : 'bg-gray-900 text-white'
        }`}>
          <span className="text-white font-semibold text-sm">{data.value}%</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div
    className={`flex flex-col p-8 gap-4 min-h-screen ${
      isDarkMode ? "bg-[#1C1C1C]" : "bg-white"
    }`}
  >
       <div
        style={{
          padding: "4px 8px",

          opacity: 1,
        }}
      >
        <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>
          eCommerce
        </span>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
         

          <div className="flex flex-row gap-6 mb-[28px]">
            {/* Metrics Cards - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-6 w-[50%]">
              <MetricCard
                title="Customers"
                value="3,781"
                change="+11.01%"
                isPositive={true}
                icon={Users}
                className="bg-[#E3F5FF] text-black"
              />
              <MetricCard
                title="Orders"
                value="1,219"
                change="-0.03%"
                isPositive={false}
                icon={ShoppingCart}
                onClick={() => setCurrentView('orderlist')}
              />
              <MetricCard
                title="Revenue"
                value="$695"
                change="+15.03%"
                isPositive={true}
                icon={DollarSign}
             
              />
              <MetricCard
                title="Growth"
                value="30.1%"
                change="+6.08%"
                isPositive={true}
                icon={Activity}
                className="bg-[#E5ECF6] text-black"
              />
            </div>

            {/* Projections vs Actuals Chart */}
            <div className={`w-[50%] h-[252px] p-6 gap-4 flex flex-col items-start rounded-2xl ${
              isDarkMode 
                ? 'bg-[#FFFFFF0D]' 
                : 'bg-[#F7F9FB] '
            }`}>
              <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>Projections vs Actuals</span>
              {/* <h3 className="text-lg font-semibold mb-4 text-white">Projections vs Actuals</h3> */}
              
              <ResponsiveContainer height={168}>
                <BarChart data={projectionsData} barCategoryGap="68%" stackOffset="none">
                  <CartesianGrid vertical={false}  stroke={isDarkMode ? '#FFFFFF66' : '#E5E7EB'} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    tickFormatter={(value) => `${value}M`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  
                  <Bar dataKey="actuals" stackId="a" fill="#A8C5DA" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="projections" stackId="a" fill="#d5e3ed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-row gap-6 mb-[28px]">
            {/* Revenue Chart */}
            <div className={`w-full h-[318px] p-6 gap-[16px] flex flex-col items-start rounded-2xl ${
              isDarkMode 
                ? 'bg-[#FFFFFF0D]' 
                : 'bg-[#F7F9FB]'
            }`}>
              <div className='flex flex-row items-center justify-between w-full'>
                <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>Revenue</span>
                <div className="flex items-center space-x-6 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#7DD3FC]' : 'bg-[#1C1C1C]'}`}></div>
                    <span className={isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}>
                      Current Week: $58,211
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#A78BFA]' : 'bg-[#9CA3AF]'}`}></div>
                    <span className={isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}>
                      Previous Week: $68,768
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <CartesianGrid vertical={false} stroke={isDarkMode ? '#FFFFFF66' : '#E5E7EB'} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      tickFormatter={(value) => `${value}M`}
                      domain={[0, 30]}
                      ticks={[0, 10, 20, 30]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="current" 
                      stroke={isDarkMode ? '#7DD3FC' : '#1C1C1C'} 
                      strokeWidth={2}
                      dot={{ fill: isDarkMode ? '#7DD3FC' : '#1C1C1C', strokeWidth: 2, r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="previous" 
                      stroke={isDarkMode ? '#A78BFA' : '#9CA3AF'} 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: isDarkMode ? '#A78BFA' : '#9CA3AF', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue by Location */}
            <div className={`w-[30%] h-[318px] p-6 gap-2 flex flex-col items-center rounded-2xl ${
              isDarkMode 
                ? 'bg-[#FFFFFF0D]' 
                : 'bg-[#F7F9FB]'
            }`}>
              <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>Revenue by Location</span>
              
              {/* World Map */}
              <div className={` h-full relative ${
                isDarkMode ? 'bg-[#FFFFFF0D]' : 'bg-[#F7F9FB]'
              }`}>
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 80,
                    center: [0, 20]
                  }}
                  width={400}
                  height={220}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isDarkMode ? '#FFFFFF33' : '#1C1C1C33'}
                          stroke={isDarkMode ? '#FFFFFF66' : '#1C1C1C66'}
                          strokeWidth={0.5}
                        />
                      ))
                    }
                  </Geographies>
                  {revenueByLocation.map(({ city, coordinates }) => (
                    <Marker key={city} coordinates={coordinates}>
                      <circle r={6} fill="#3b82f6" />
                    </Marker>
                  ))}
                </ComposableMap>
              </div>
              
              <div className="space-y-3 w-full">
                {revenueByLocation.map((location, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    {/* Name and Amount on same line */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
                      }`}>{location.city}</span>
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
                      }`}>{location.amount}</span>
                    </div>
                    {/* Progress bar on separate line */}
                    <div className="w-full">
                      <div className={`h-1 rounded-full ${
                        isDarkMode ? 'bg-[#FFFFFF33]' : 'bg-[#1C1C1C33]'
                      }`}>
                        <div 
                          className="h-1 rounded-full transition-all duration-300 bg-[#A8C5DA]"
                          style={{ 
                            width: `${Math.min(parseInt(location.amount) / 72 * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-6 mb-[28px]">
            {/* Top Selling Products */}
            <div className={`w-full h-[336px] p-6 p-4 flex flex-col items-start rounded-2xl ${
              isDarkMode 
                ? 'bg-[#FFFFFF0D]' 
                : 'bg-[#F7F9FB]'
            }`}>
              <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>Top Selling Products</span>
              <div className="w-full flex-1">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b h-10 ${
                      isDarkMode ? 'border-[#FFFFFF1A]' : 'border-[#1C1C1C1A]'
                    }`}>
                      <th className={`text-left text-xs font-medium h-10 ${
                        isDarkMode ? 'text-[#FFFFFF66]' : 'text-[#1C1C1C66]'
                      }`}>Name</th>
                      <th className={`text-left text-xs font-medium h-10 ${
                        isDarkMode ? 'text-[#FFFFFF66]' : 'text-[#1C1C1C66]'
                      }`}>Price</th>
                      <th className={`text-left text-xs font-medium h-10 ${
                        isDarkMode ? 'text-[#FFFFFF66]' : 'text-[#1C1C1C66]'
                      }`}>Quantity</th>
                      <th className={`text-left text-xs font-medium h-10 ${
                        isDarkMode ? 'text-[#FFFFFF66]' : 'text-[#1C1C1C66]'
                      }`}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={index} className={`h-10 ${
                        index < topProducts.length - 1 ? (isDarkMode ? 'border-[#FFFFFF1A]' : 'border-[#1C1C1C1A]') : ''
                      }`}>
                        <td className={`text-xs h-10 ${
                          isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
                        }`}>{product.name}</td>
                        <td className={`text-xs h-10 ${
                          isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
                        }`}>${product.price}</td>
                        <td className={`text-xs h-10 ${
                          isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
                        }`}>{product.quantity}</td>
                        <td className={`text-xs h-10 ${
                          isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
                        }`}>${product.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Sales Pie Chart */}
            <div className={`w-[30%] h-[336px] p-6 gap-4 flex flex-col items-start rounded-2xl ${
              isDarkMode 
                ? 'bg-[#FFFFFF0D]' 
                : 'bg-[#F7F9FB]'
            }`}>
              <span className={`order-list-title ${isDarkMode ? "dark" : "light"}`}>Total Sales</span>
              <div className="flex items-center justify-center flex-1 relative">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={salesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={6}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                      cornerRadius={10}
                    >
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center percentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`px-3 py-1 rounded-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-900'
                  }`}>
                    <span className="text-sm font-semibold text-white">38.6%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 w-full">
                {salesData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
                      }`}>{item.name}</span>
                    </div>
                    <span className={`text-xs font-medium ${
                      isDarkMode ? 'text-white' : 'text-[#1C1C1C]'
                    }`}>${item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      
    </div>
  );
};