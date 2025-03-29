import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        isDark ? 'bg-gray-800 text-yellow-300' : 'bg-blue-100 text-blue-800'
      } focus:outline-none theme-toggle-animation`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? (
        <FaSun className="w-5 h-5" />
      ) : (
        <FaMoon className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;