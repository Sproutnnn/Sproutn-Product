import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuIcon, BellIcon, UserIcon, LogOutIcon, BuildingIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'payment' | 'feedback' | 'update';
  read: boolean;
  link: string;
}
const Navbar: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  // Mock notifications - in a real app, these would come from an API or context
  const [notifications, setNotifications] = useState<Notification[]>([{
    id: '1',
    title: 'Payment Required',
    message: 'Please complete payment for your Smart Home Controller project',
    type: 'payment',
    read: false,
    link: '/project/1'
  }, {
    id: '2',
    title: 'Feedback Needed',
    message: 'Your prototype is ready for review. Please provide feedback.',
    type: 'feedback',
    read: false,
    link: '/project/1/prototyping'
  }]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  const handleNotificationClick = (notification: Notification) => {
    // Mark this notification as read
    setNotifications(notifications.map(n => n.id === notification.id ? {
      ...n,
      read: true
    } : n));
    // Navigate to the appropriate page
    navigate(notification.link);
    // Close the notifications dropdown
    setShowNotifications(false);
  };
  return <nav className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center md:hidden">
        <button className="text-charcoal-500 focus:outline-none">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-1 md:ml-8 flex items-center">
        <h1 className="text-xl font-semibold text-charcoal-500">
          Rooted in your success
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="text-charcoal-500 hover:text-charcoal-700 focus:outline-none relative" onClick={toggleNotifications}>
            <BellIcon className="h-6 w-6" />
            {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>}
          </button>
          {showNotifications && <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
              <div className="py-2 px-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">
                  Notifications
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? <div className="divide-y divide-gray-200">
                    {notifications.map(notification => <div key={notification.id} className={`p-3 ${notification.read ? 'bg-white' : 'bg-primary-50'} cursor-pointer hover:bg-gray-50`} onClick={() => handleNotificationClick(notification)}>
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {notification.type === 'payment' && <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <span className="text-red-600 text-xs font-bold">
                                  $
                                </span>
                              </div>}
                            {notification.type === 'feedback' && <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 text-xs font-bold">
                                  !
                                </span>
                              </div>}
                            {notification.type === 'update' && <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-green-600 text-xs font-bold">
                                  ✓
                                </span>
                              </div>}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>)}
                  </div> : <div className="py-4 text-center text-sm text-gray-500">
                    No notifications
                  </div>}
              </div>
              {notifications.length > 0 && <div className="py-2 px-3 bg-gray-50 border-t border-gray-200 text-center">
                  <button className="text-sm text-primary-600 hover:text-primary-800" onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                </div>}
            </div>}
        </div>
        <div className="relative">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/profile')}>
            <div className="bg-gray-200 rounded-full p-2">
              <UserIcon className="h-5 w-5 text-charcoal-500" />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-charcoal-500">
                {user?.name}
              </div>
              <div className="flex items-center text-xs text-charcoal-400">
                {user?.companyName && <>
                    <BuildingIcon className="h-3 w-3 mr-1" />
                    <span className="mr-2">{user.companyName}</span>
                  </>}
                <span className="capitalize">{user?.role}</span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="text-charcoal-500 hover:text-charcoal-700 focus:outline-none">
          <LogOutIcon className="h-6 w-6" />
        </button>
      </div>
    </nav>;
};
export default Navbar;