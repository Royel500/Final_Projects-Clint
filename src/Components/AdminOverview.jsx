import React, { useEffect, useState } from 'react';
import { 
  FiUsers, FiPackage, FiDollarSign, FiTruck, 
  FiUser, FiCalendar, FiMail, FiPhone, FiRefreshCw 
} from 'react-icons/fi';
import { FaChartLine, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router';
import useAxiosecure from '../hooks/useAxiosecure';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';

const AdminOverview = () => {
  const [overview, setOverview] = useState({
    riders: 0,
    users: 0,
    totalUsers: 0, // Added total users count
    parcels: 0,
    payments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const axiosSecure = useAxiosecure();
  const { user } = useAuth();

  // Sample data for visualization
  const paymentData = [400, 600, 750, 900, 650, 850, 700];
  const maxPayment = Math.max(...paymentData, 1);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch dashboard stats
      const statsResponse = await axiosSecure.get('/admin/dashboard/stats');
      if (statsResponse.data.success) {
        setOverview({
          riders: statsResponse.data.stats.riders,
          clients: statsResponse.data.stats.clients,
          totalUsers: statsResponse.data.stats.totalUsers, // Added this line
          parcels: statsResponse.data.stats.parcels,
          payments: statsResponse.data.stats.payments
        });
      }

      // Fetch recent activity
      const activityResponse = await axiosSecure.get('/admin/recent-activity');
      setRecentActivity(activityResponse.data || []);

    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [axiosSecure]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <p className="text-red-600 font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-blue-600 italic">Admin {user?.displayName}</span> !
          </h1>
          <p className="text-gray-500 mt-2">
            Here's what's happening with your delivery business today.
          </p>
        </div>
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Riders" 
          value={overview.riders} 
          icon={<FiTruck className="w-6 h-6" />}
          color="bg-blue-100 text-blue-600"
          trend="up"
          change="5% from last week"
        />
        <DashboardCard 
          title="Total Clients" 
          value={overview.clients} 
          icon={<FiUsers className="w-6 h-6" />}
          color="bg-green-100 text-green-600"
          trend="up"
          change="12% from last month"
        />
        <DashboardCard 
          title="Total Users" 
          value={overview.totalUsers} 
          icon={<FiUser className="w-6 h-6" />}
          color="bg-purple-100 text-purple-600"
          trend="up"
          change="8% from last month"
        />
        <DashboardCard 
          title="Total Payments" 
          value={`$${overview.payments.toLocaleString()}`} 
          icon={<FiDollarSign className="w-6 h-6" />}
          color="bg-amber-100 text-amber-600"
          trend="up"
          change="15% from last month"
        />
      </div>

      {/* Profile and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Profile */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-1">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  className="h-32 w-32 rounded-full object-cover border-4 border-blue-100"
                  alt="Admin" 
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="w-16 h-16 text-blue-600" />
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">{user?.displayName || 'Admin User'}</h3>
              <p className="text-gray-500 mt-2 flex items-center justify-center gap-2">
                <FiMail className="w-4 h-4" />
                {user?.email || 'admin@example.com'}
              </p>
              {user?.phoneNumber && (
                <p className="text-gray-500 mt-1 flex items-center justify-center gap-2">
                  <FiPhone className="w-4 h-4" />
                  {user.phoneNumber}
                </p>
              )}
              <p className="text-gray-400 mt-3 flex items-center justify-center gap-2">
                <FiCalendar className="w-4 h-4" />
                Joined {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <Link to="/admin/activity" className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No recent activity found</p>
            </div>
          )}
        </div>
      </div>

      {/* Data Visualization Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">User Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Distribution Bar Chart */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                       <div className="flex justify-between items-center mb-4">
                         <h4 className="font-semibold text-lg">Revenue Growth</h4>
                         <FaChartLine className="text-blue-500 text-xl" />
                       </div>
                       <div className="h-48 flex items-end space-x-2">
                         {[40, 60, 75, 90, 65, 85, 70].map((height, index) => (
                           <div 
                             key={index} 
                             className="w-8 bg-gradient-to-t from-blue-400 to-indigo-600 rounded-t flex-grow"
                             style={{ height: `${height}%` }}
                           ></div>
                         ))}
                       </div>
                       <div className="flex justify-between mt-2 text-sm text-gray-600">
                         <span>Mon</span>
                         <span>Tue</span>
                         <span>Wed</span>
                         <span>Thu</span>
                         <span>Fri</span>
                         <span>Sat</span>
                         <span>Sun</span>
                       </div>
                     </div>
            <div className="flex items-end space-x-4">
              {/* Total Users Bar */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-10 bg-blue-400 rounded-t"
                  style={{ height: `${(overview.totalUsers / (overview.totalUsers + 10)) * 100}%` }}
                ></div>
                <span className="text-xs mt-1">Total</span>
                <span className="text-sm font-semibold">{overview.totalUsers}</span>
              </div>
              
              {/* Clients Bar */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-10 bg-green-400 rounded-t"
                  style={{ height: `${(overview.clients / (overview.totalUsers + 10)) * 100}%` }}
                ></div>
                <span className="text-xs mt-1">Clients</span>
                <span className="text-sm font-semibold">{overview.clients}</span>
              </div>
              
              {/* Riders Bar */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-10 bg-purple-400 rounded-t"
                  style={{ height: `${(overview.riders / (overview.totalUsers + 10)) * 100}%` }}
                ></div>
                <span className="text-xs mt-1">Riders</span>
                <span className="text-sm font-semibold">{overview.riders}</span>
              </div>
            </div>
          </div>
          
          {/* User Growth Pie Chart */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg">User Composition</h4>
              <FaUsers className="text-green-500 text-xl" />
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{overview.totalUsers}</p>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                </div>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="8" 
                  />
                  {/* Clients segment */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="8" 
                    strokeDasharray={`
                      ${(overview.clients / overview.totalUsers) * 283}, 
                      ${283 - (overview.clients / overview.totalUsers) * 283}
                    `}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Riders segment */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="8" 
                    strokeDasharray={`
                      ${(overview.riders / overview.totalUsers) * 283}, 
                      ${283 - (overview.riders / overview.totalUsers) * 283}
                    `}
                    strokeLinecap="round"
                    transform={`rotate(${(overview.clients / overview.totalUsers) * 360 - 90} 50 50)`}
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span className="text-xs">Clients ({Math.round((overview.clients / overview.totalUsers) * 100)}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-xs">Riders ({Math.round((overview.riders / overview.totalUsers) * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction 
            to="/rider" 
            icon={<FiUsers className="w-6 h-6" />}
            color="bg-blue-50 text-blue-600 hover:bg-blue-100"
            label="Add New Rider"
          />
          <QuickAction 
            to="/sendpercel" 
            icon={<FiPackage className="w-6 h-6" />}
            color="bg-green-50 text-green-600 hover:bg-green-100"
            label="Create Parcel"
          />
          <QuickAction 
            to="/dasboard/paymenthistory" 
            icon={<FiDollarSign className="w-6 h-6" />}
            color="bg-purple-50 text-purple-600 hover:bg-purple-100"
            label="Process Payment"
          />
          <QuickAction 
            to="/dasboard/assign-rider" 
            icon={<FiTruck className="w-6 h-6" />}
            color="bg-amber-50 text-amber-600 hover:bg-amber-100"
            label="Assign Delivery"
          />
        </div>
      </div>
    </div>
  );
};

// Dashboard Card Component
const DashboardCard = ({ title, value, icon, color, trend, change }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className={`text-xs mt-1 flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trend === 'up' ? '↑' : '↓'} {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ activity }) => {
  return (
    <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{activity.description}</p>
        <p className="text-sm text-gray-500">
          {new Date(activity.timestamp).toLocaleString()} • {activity.user}
        </p>
      </div>
    </div>
  );
};

// Quick Action Component
const QuickAction = ({ to, icon, color, label }) => {
  return (
    <Link to={to}>
      <button className={`w-full p-4 ${color} rounded-lg transition-colors flex flex-col items-center`}>
        {icon}
        <span className="mt-2">{label}</span>
      </button>
    </Link>
  );
};

// Helper functions
const getActivityIcon = (type) => {
  switch(type) {
    case 'delivery': return <FiTruck className="w-4 h-4" />;
    case 'payment': return <FiDollarSign className="w-4 h-4" />;
    case 'user': return <FiUsers className="w-4 h-4" />;
    default: return <FiPackage className="w-4 h-4" />;
  }
};

const getActivityColor = (type) => {
  switch(type) {
    case 'delivery': return 'bg-blue-100 text-blue-600';
    case 'payment': return 'bg-green-100 text-green-600';
    case 'user': return 'bg-purple-100 text-purple-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export default AdminOverview;