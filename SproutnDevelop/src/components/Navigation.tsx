import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isAuthenticated
  } = useAuth();
  const location = useLocation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Close the mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  return <nav className="bg-[#1A1E21] w-full sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/IMG_8337_copy.png" alt="Sprout'n Logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={`px-2 py-1 text-sm font-medium ${location.pathname === '/' ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>
              Home
            </Link>
          </div>
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/dashboard' : '/login'} className="text-gray-400 hover:text-white flex items-center">
              <UserIcon className="h-4 w-4 mr-2" />
              <span className="hidden md:inline text-sm">
                {isAuthenticated ? 'Dashboard' : 'Login'}
              </span>
            </Link>
            <button onClick={toggleMenu} className="md:hidden ml-4 text-gray-400 hover:text-white focus:outline-none" aria-expanded={isMenuOpen}>
              {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-200 ease-in-out ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-3 space-y-1 bg-[#171B1E]">
          <Link to="/" className={`block px-3 py-2 text-sm font-medium ${location.pathname === '/' ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>
            Home
          </Link>
        </div>
      </div>
    </nav>;
};
export default Navigation;