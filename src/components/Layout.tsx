import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      {/* Chat button - show on all pages except /chat, only for customers */}
      {!isChatPage && user?.role === 'customer' && <Chat />}
    </div>
  );
};

export default Layout;