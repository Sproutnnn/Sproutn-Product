import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, FolderPlusIcon, MessageCircleIcon, UserIcon, UsersIcon, LayoutIcon, BookOpenIcon, BarChart2Icon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const Sidebar: React.FC = () => {
  const location = useLocation();
  const {
    user
  } = useAuth();
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
      <div className="flex items-center justify-center h-16 bg-charcoal-600">
        <img src="/IMG_8337.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(item => {
          // Only show nav items relevant to the user's role
          if (!user || !item.roles.includes(user.role)) {
            return null;
          }
          return <Link key={item.path} to={item.path} className={`flex items-center px-4 py-3 text-sm rounded-md ${isActive(item.path) ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-charcoal-600'}`}>
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>;
        })}
        </nav>
      </div>
    </div>;
};
export default Sidebar;