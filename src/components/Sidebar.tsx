import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, FolderPlusIcon, MessageCircleIcon, UserIcon, UsersIcon, LayoutIcon, BookOpenIcon, BarChart2Icon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { chatService } from '../services/chat.service';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const {
    user
  } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll for unread messages (admin only)
  useEffect(() => {
    if (user?.role !== 'admin') return;

    const checkUnread = async () => {
      try {
        const count = await chatService.getUnreadCountForAdmin();
        setUnreadCount(count);
      } catch (error) {
        console.error('Error checking unread messages:', error);
      }
    };

    checkUnread();
    const interval = setInterval(checkUnread, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [user]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const navItems = [{
    path: '/dashboard',
    label: 'Dashboard',
    icon: <HomeIcon className="h-5 w-5" />,
    roles: ['admin', 'customer']
  }, {
    path: '/create-project',
    label: 'Create Project',
    icon: <FolderPlusIcon className="h-5 w-5" />,
    roles: ['customer']
  }, {
    path: '/chat',
    label: 'Chat',
    icon: <MessageCircleIcon className="h-5 w-5" />,
    roles: ['admin', 'customer']
  }, {
    path: '/users',
    label: 'Users',
    icon: <UsersIcon className="h-5 w-5" />,
    roles: ['admin']
  }, {
    path: '/admin/pages',
    label: 'Edit Pages',
    icon: <LayoutIcon className="h-5 w-5" />,
    roles: ['admin']
  }, {
    path: '/admin/blogs',
    label: 'Manage Blogs',
    icon: <BookOpenIcon className="h-5 w-5" />,
    roles: ['admin']
  }, {
    path: '/admin/traffic',
    label: 'Site Traffic',
    icon: <BarChart2Icon className="h-5 w-5" />,
    roles: ['admin']
  }, {
    path: '/profile',
    label: 'Profile',
    icon: <UserIcon className="h-5 w-5" />,
    roles: ['admin', 'customer']
  }];
  return <div className="hidden md:flex md:flex-col md:w-48 md:bg-charcoal-500 md:text-white">
      <Link to="/" className="flex items-center justify-center h-16 bg-charcoal-600 hover:bg-charcoal-500 transition-colors cursor-pointer">
        <img src="/IMG_8337.png" alt="Logo" className="h-10" />
      </Link>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(item => {
          // Only show nav items relevant to the user's role
          if (!user || !item.roles.includes(user.role)) {
            return null;
          }
          return <Link key={item.path} to={item.path} className={`flex items-center px-4 py-3 text-sm rounded-md ${isActive(item.path) ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-charcoal-600'}`}>
                <span className="mr-3 relative">
                  {item.icon}
                  {item.path === '/chat' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </span>
                <span>{item.label}</span>
              </Link>;
        })}
        </nav>
      </div>
    </div>;
};
export default Sidebar;