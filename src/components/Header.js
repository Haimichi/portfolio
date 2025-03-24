import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              PORTFOLIO
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium ${isActive('/')}`}>
              HOME
            </Link>
            <Link to="/about" className={`font-medium ${isActive('/about')}`}>
              ABOUT
            </Link>
            <Link to="/projects" className={`font-medium ${isActive('/projects')}`}>
              PROJECTS
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md font-medium ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md font-medium ${isActive('/about') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/projects" 
              className={`block px-3 py-2 rounded-md font-medium ${isActive('/projects') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <a 
              href="#contact" 
              className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;