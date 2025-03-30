import React, { useState, useRef, useContext } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaCog, FaSun, FaMoon, FaComment, FaTimes, FaFacebook } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const settingsButtonRef = useRef(null);
  const feedbackButtonRef = useRef(null);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  const feedbackFormRef = useRef();

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (showFeedback) setShowFeedback(false);
  };

  const openFeedback = () => {
    setShowFeedback(true);
    setShowSettings(false);
  };
  
  // Chức năng này sẽ đóng feedback và mở lại settings
  const closeFeedbackOpenSettings = () => {
    setShowFeedback(false);
    setShowSettings(true);
  };

  const handleMessageChange = (e) => {
    const message = e.target.value;
    if (message.length <= 500) {
      setFeedbackMessage(message);
      setCharCount(message.length);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    
    setIsSubmitting(true);

    // Sử dụng Formspree thay thế cho Netlify Functions
    try {
      // Đăng ký tại formspree.io và sử dụng form ID của bạn
      const response = await fetch('https://formspree.io/f/xyyqwwba', { // Thay bằng ID của bạn
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: feedbackMessage,
          to: 'nghthai02@gmail.com'
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFeedbackMessage('');
        setCharCount(0);
        
        setTimeout(() => {
          setShowFeedback(false);
          setShowSettings(true); // Quay lại Settings sau khi gửi thành công
          setSubmitSuccess(false);
        }, 2000);
      } else {
        const errorText = await response.text();
        console.error('Form submission error:', errorText);
        throw new Error('Không thể gửi biểu mẫu');
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error);
      alert(`Đã xảy ra lỗi khi gửi phản hồi: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={`border ${isDark ? 'border-blue-800 bg-blue-950' : 'border-blue-300 bg-gray-50'} 
      py-6 px-4 transition-colors duration-300 rounded-3xl mx-4 md:mx-6 lg:mx-8 my-6 shadow-lg relative`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          &copy;2025 Nguyen Huynh Thanh Hai. All rights reserved.
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Social Media Icons */}
          <a href="https://github.com/Haimichi" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.instagram.com/hajj.o2/" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <FaInstagram size={20} />
          </a>
          <a href="https://www.facebook.com/hajj02/" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <FaFacebook size={20} />
          </a>
          
          {/* Settings Button */}
          <button 
            ref={settingsButtonRef}
            onClick={toggleSettings}
            className="ml-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            aria-label="Settings"
          >
            <FaCog size={20} />
          </button>
        </div>
      </div>

      {/* Overlay cho cả hai popup */}
      {(showSettings || showFeedback) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => {
          if (showFeedback) {
            closeFeedbackOpenSettings();
          } else {
            toggleSettings();
          }
        }}></div>
      )}

      {/* Settings Modal - Hiển thị ở giữa màn hình */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden transform transition-all ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">App Settings</h2>
              <button 
                onClick={toggleSettings}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="px-6 py-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">You can change the settings of this app here.</p>
              
              <div className="border-t border-b border-gray-200 dark:border-gray-700 py-2 my-2">
                <h3 className="text-gray-700 dark:text-gray-300 py-2">User Area</h3>
              </div>
              
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className="flex items-center justify-between w-full my-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  {isDark ? <FaMoon className="text-blue-400 mr-3" /> : <FaSun className="text-yellow-500 mr-3" />}
                  <span className="text-gray-800 dark:text-white">Change Theme</span>
                </div>
              </button>
              
              {/* Anonymous Feedback Button */}
              <button 
                ref={feedbackButtonRef}
                onClick={openFeedback}
                className="flex items-center justify-between w-full my-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <FaComment className="text-gray-600 dark:text-gray-400 mr-3" />
                  <span className="text-gray-800 dark:text-white">Anonymous Feedback</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anonymous Feedback Modal - Hiển thị ở giữa màn hình */}
      {showFeedback && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden transform transition-all ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Anonymous Feedback</h2>
              <button 
                onClick={closeFeedbackOpenSettings}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="px-6 py-4">
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Enter your feedback below and don't worry, it's anonymous :)
              </p>
              
              <form ref={feedbackFormRef} onSubmit={handleSubmitFeedback}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <div className="relative">
                    <textarea
                      value={feedbackMessage}
                      onChange={handleMessageChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                      rows="5"
                      placeholder="What do you want to say? it can be anything in your mind. Preferably constructive feedback."
                      disabled={isSubmitting}
                    ></textarea>
                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                      {charCount}/500
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Your draft message is automatically saved in your browser.
                  </p>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                      isSubmitting || !feedbackMessage.trim()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : submitSuccess
                        ? 'bg-green-500'
                        : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                    disabled={isSubmitting || !feedbackMessage.trim()}
                  >
                    {isSubmitting ? 'Sending...' : submitSuccess ? 'Sent Successfully!' : 'Send Feedback'}
                  </button>
                </div>
              </form>
              
              <div className="mt-4 text-center">
                <button
                  onClick={closeFeedbackOpenSettings}
                  className="inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Close Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;