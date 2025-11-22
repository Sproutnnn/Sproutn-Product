import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, UserIcon, ChevronDownIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    isAuthenticated
  } = useAuth();
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };
  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Close the mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <nav className={`${isScrolled ? 'bg-charcoal-500/95 backdrop-blur-sm shadow-sm' : 'bg-charcoal-500'} w-full sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="https://sproutn.ca" className="flex-shrink-0 flex items-center">
              <img src="/IMG_8337.png" alt="Sprout'n Logo" className="h-8 w-auto" />
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="https://sproutn.ca" className="px-2 py-1 text-sm font-medium text-gray-300 hover:text-primary-300">
              Product
            </a>
            <a href="https://develop.sproutn.ca" className="px-2 py-1 text-sm font-medium text-gray-300 hover:text-primary-300">
              Platforms
            </a>
            <div className="relative" ref={servicesRef}>
              <button onClick={toggleServices} className={`flex items-center px-2 py-1 text-sm font-medium focus:outline-none ${location.pathname.includes('/services') ? 'text-primary-300 border-b-2 border-primary-300' : 'text-gray-300 hover:text-primary-300'}`}>
                Services
                <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && <div className="absolute left-0 mt-2 w-56 bg-charcoal-600 rounded-md shadow-md z-10 border border-charcoal-700">
                  <div className="py-1">
                    <Link to="/services/prototyping" className="block px-4 py-2 text-sm text-gray-300 hover:bg-charcoal-700 hover:text-primary-300">
                      Sampling
                    </Link>
                    <Link to="/services/sourcing" className="block px-4 py-2 text-sm text-gray-300 hover:bg-charcoal-700 hover:text-primary-300">
                      Manufacturing & Freight
                    </Link>
                    <Link to="/services/photography" className="block px-4 py-2 text-sm text-gray-300 hover:bg-charcoal-700 hover:text-primary-300">
                      Product Shots
                    </Link>
                    <Link to="/services/marketing" className="block px-4 py-2 text-sm text-gray-300 hover:bg-charcoal-700 hover:text-primary-300">
                      Marketing
                    </Link>
                  </div>
                </div>}
            </div>
            <Link to="/blog" className={`px-2 py-1 text-sm font-medium ${location.pathname === '/blog' ? 'text-primary-300 border-b-2 border-primary-300' : 'text-gray-300 hover:text-primary-300'}`}>
              Blog
            </Link>
            <Link to="/about" className={`px-2 py-1 text-sm font-medium ${location.pathname === '/about' ? 'text-primary-300 border-b-2 border-primary-300' : 'text-gray-300 hover:text-primary-300'}`}>
              About
            </Link>
          </div>
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/dashboard' : '/login'} className="text-sm font-medium text-gray-300 hover:text-primary-300 hidden md:block">
              {isAuthenticated ? 'Dashboard' : 'Login'}
            </Link>
            <button onClick={toggleMenu} className="md:hidden ml-4 p-2 rounded-md text-gray-300 hover:text-primary-300 focus:outline-none" aria-expanded={isMenuOpen}>
              {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden border-t border-charcoal-400">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="https://sproutn.ca" className="block px-3 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-charcoal-600 hover:text-primary-300">
              Product
            </a>
            <a href="https://develop.sproutn.ca" className="block px-3 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-charcoal-600 hover:text-primary-300">
              Platforms
            </a>
            <button onClick={() => setIsServicesOpen(!isServicesOpen)} className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium rounded-md ${location.pathname.includes('/services') ? 'text-primary-300 bg-charcoal-600' : 'text-gray-300 hover:bg-charcoal-600 hover:text-primary-300'}`}>
              <span>Services</span>
              <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isServicesOpen && <div className="pl-4 space-y-1">
                <Link to="/services/prototyping" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-charcoal-600 hover:text-primary-300 rounded-md">
                  Sampling
                </Link>
                <Link to="/services/sourcing" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-charcoal-600 hover:text-primary-300 rounded-md">
                  Manufacturing & Freight
                </Link>
                <Link to="/services/photography" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-charcoal-600 hover:text-primary-300 rounded-md">
                  Product Shots
                </Link>
                <Link to="/services/marketing" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-charcoal-600 hover:text-primary-300 rounded-md">
                  Marketing
                </Link>
              </div>}
            <Link to="/blog" className={`block px-3 py-2 text-base font-medium rounded-md ${location.pathname === '/blog' ? 'text-primary-300 bg-charcoal-600' : 'text-gray-300 hover:bg-charcoal-600 hover:text-primary-300'}`}>
              Blog
            </Link>
            <Link to="/about" className={`block px-3 py-2 text-base font-medium rounded-md ${location.pathname === '/about' ? 'text-primary-300 bg-charcoal-600' : 'text-gray-300 hover:bg-charcoal-600 hover:text-primary-300'}`}>
              About
            </Link>
            <Link to={isAuthenticated ? '/dashboard' : '/login'} className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-charcoal-600 hover:text-primary-300 rounded-md">
              {isAuthenticated ? 'Dashboard' : 'Login'}
            </Link>
          </div>
        </div>}
    </nav>;
};
export default Navigation;