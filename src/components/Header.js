import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  // Theo dõi sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const isActive = (path) => {
    return location.pathname === path ? 
      isDark ? 'bg-blue-800/30 text-white' : 'bg-blue-100/50 text-blue-800' 
      : '';
  };

  return (
    <header 
      className={`transition-all duration-300 fixed w-full ${
        scrolled 
          ? isDark 
            ? 'bg-blue-950/95 shadow-md backdrop-blur-sm' 
            : 'bg-white/95 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
        } z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className={`text-xl md:text-2xl font-bold ${
              isDark 
                ? 'text-white' 
                : scrolled ? 'text-blue-900' : 'text-blue-900'
            }`}>
              PORTFOLIO
            </Link>
          </div>
          
          {/* Menu chính ở giữa */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 hidden md:block transition-all duration-300`}>
            <div className={`flex items-center transition-all duration-300 ${
              scrolled 
                ? 'py-1' 
                : isDark 
                  ? 'bg-blue-900/60 backdrop-blur-sm rounded-full px-2 py-1.5 shadow-lg' 
                  : 'bg-blue-100/60 backdrop-blur-sm rounded-full px-2 py-1.5 shadow-lg'
            }`}>
              <Link 
                to="/" 
                className={`px-4 py-2 ${isDark ? 'text-white' : 'text-blue-900'} text-sm font-medium hover:${isDark ? 'bg-blue-800/30' : 'bg-blue-200/50'} rounded-full transition ${isActive('/')}`}
              >
                HOME
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 ${isDark ? 'text-white' : 'text-blue-900'} text-sm font-medium hover:${isDark ? 'bg-blue-800/30' : 'bg-blue-200/50'} rounded-full transition ${isActive('/about')}`}
              >
                ABOUT
              </Link>
              <Link 
                to="/projects" 
                className={`px-4 py-2 ${isDark ? 'text-white' : 'text-blue-900'} text-sm font-medium hover:${isDark ? 'bg-blue-800/30' : 'bg-blue-200/50'} rounded-full transition ${isActive('/projects')}`}
              >
                PROJECTS
              </Link>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Menu mobile */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden transition-colors duration-300 focus:outline-none ${
                isDark ? 'text-white' : 'text-blue-900'
              }`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 ${
            isDark 
              ? 'bg-blue-950/95 backdrop-blur-sm' 
              : 'bg-white/95 backdrop-blur-sm'
          } shadow-md`}>
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md font-medium ${
                location.pathname === '/' 
                  ? isDark 
                    ? 'bg-blue-800/30 text-white' 
                    : 'bg-blue-100 text-blue-800' 
                  : isDark 
                    ? 'text-gray-300 hover:bg-blue-800/30 hover:text-white' 
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md font-medium ${
                location.pathname === '/about' 
                  ? isDark 
                    ? 'bg-blue-800/30 text-white' 
                    : 'bg-blue-100 text-blue-800' 
                  : isDark 
                    ? 'text-gray-300 hover:bg-blue-800/30 hover:text-white' 
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/projects" 
              className={`block px-3 py-2 rounded-md font-medium ${
                location.pathname === '/projects' 
                  ? isDark 
                    ? 'bg-blue-800/30 text-white' 
                    : 'bg-blue-100 text-blue-800' 
                  : isDark 
                    ? 'text-gray-300 hover:bg-blue-800/30 hover:text-white' 
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;