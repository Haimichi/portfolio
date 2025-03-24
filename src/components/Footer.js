import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-blue-950 text-white transition-colors duration-500">
      <div id="contact" className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Liên Hệ</h3>
            <p className="mb-2 text-gray-300">Thành phố Hồ Chí Minh, Việt Nam</p>
            <p className="mb-2 text-gray-300">email@example.com</p>
            <p className="mb-4 text-gray-300">+84 XXX XXX XXX</p>
            
            <div className="flex space-x-4">
              <a href="https://github.com/Haimichi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <FaGithub size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <FaLinkedin size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Gửi tin nhắn</h3>
            <form>
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Họ tên"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 dark:bg-blue-900 border border-gray-700 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-primary text-white"
                />
              </div>
              <div className="mb-4">
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 dark:bg-blue-900 border border-gray-700 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-primary text-white"
                />
              </div>
              <div className="mb-4">
                <textarea 
                  placeholder="Tin nhắn"
                  rows="4"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 dark:bg-blue-900 border border-gray-700 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-primary text-white"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Gửi tin nhắn</button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-blue-900 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Nguyễn Huỳnh Thanh Hải. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;