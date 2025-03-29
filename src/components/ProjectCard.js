import React, { useState, useRef, useContext } from 'react';
import { FaGithub, FaExternalLinkAlt, FaBookOpen, FaBookmark, FaFeather } from 'react-icons/fa';
import { SiFlutter, SiJavascript, SiHtml5, SiReact, SiNodedotjs, SiDart, SiMongodb, SiFirebase } from 'react-icons/si';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

// Cấu hình spring nhẹ nhàng hơn
const springConfig = {
  damping: 15,
  stiffness: 150,
  mass: 0.8
};

const ProjectCard = ({ project }) => {
  const { id, title, description, image, technologies, github, demo, features } = project;
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  // Giá trị vị trí chuột
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Giới hạn góc nghiêng
  const tiltX = useTransform(mouseY, [-300, 300], [5, -5]); 
  const tiltY = useTransform(mouseX, [-300, 300], [-5, 5]);
  
  // Hiệu ứng spring
  const springX = useSpring(tiltX, springConfig);
  const springY = useSpring(tiltY, springConfig);
  const springScale = useSpring(1, springConfig);

  // Chuẩn hóa đường dẫn hình ảnh
  const normalizedImage = image?.startsWith('/public/') 
    ? image.replace('/public/', '/') 
    : image;

  // Xử lý sự kiện chuột di chuyển
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Xử lý hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    springScale.set(1.02);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    springScale.set(1);
  };

  // Lấy icon theo công nghệ
  const getProjectIcon = (tech) => {
    switch (tech.toLowerCase()) {
      case 'flutter':
        return <SiFlutter className="w-5 h-5 text-blue-400" />;
      case 'react':
        return <SiReact className="w-5 h-5 text-blue-400" />;
      case 'javascript':
        return <SiJavascript className="w-5 h-5 text-yellow-400" />;
      case 'html':
      case 'html5':
        return <SiHtml5 className="w-5 h-5 text-orange-400" />;
      case 'node.js':
        return <SiNodedotjs className="w-5 h-5 text-green-400" />;
      case 'dart':
        return <SiDart className="w-5 h-5 text-blue-500" />;
      case 'mongodb':
        return <SiMongodb className="w-5 h-5 text-green-500" />;
      case 'firebase':
        return <SiFirebase className="w-5 h-5 text-yellow-500" />;
      default:
        return <FaFeather className="w-5 h-5 text-gray-400" />;
    }
  };

  // Hiệu ứng cho trang sách khi hover
  const pageAnimations = {
    initial: { rotateY: 0, opacity: 1 },
    hover: { 
      rotateY: -180,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Hiệu ứng cho nội dung khi hover
  const contentAnimations = {
    initial: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, delay: 0.2 }
    }
  };

  return (
    <div className="relative perspective-1000 py-4">
      <motion.div
        ref={cardRef}
        className={`relative w-full h-[350px] rounded-xl overflow-hidden shadow-lg ${
          isDark ? 'shadow-blue-900/20' : 'shadow-blue-300/30'
        } book-card-container`}
        style={{
          rotateX: springX,
          rotateY: springY,
          scale: springScale,
          background: isDark ? '#0F172A' : '#F8FAFC',
          boxShadow: isHovered 
            ? isDark 
              ? '0 22px 35px rgba(30, 58, 138, 0.3)' 
              : '0 22px 35px rgba(96, 165, 250, 0.25)'
            : 'none',
          transition: 'box-shadow 0.3s ease, background 0.3s ease'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* BookCover - Hiển thị khi chưa hover */}
        <motion.div 
          className="book-cover absolute inset-0 w-full h-full z-20"
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={pageAnimations}
        >
          {/* Nền và viền của bìa sách */}
          <div className={`absolute inset-0 ${
            isDark ? 'bg-blue-900/30' : 'bg-blue-50'
          } border-r-4 ${
            isDark ? 'border-blue-800' : 'border-blue-200'
          }`}></div>
          
          {/* Hình ảnh dự án */}
          <div className="absolute inset-[16px] overflow-hidden rounded-lg shadow-inner">
            <img 
              src={normalizedImage} 
              alt={title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x250?text=Book+Cover';
              }}
            />
          </div>
          
          {/* Tiêu đề sách */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="inline-flex items-center gap-1 bg-blue-600/70 text-white text-xs px-2 py-1 rounded-full">
                  {getProjectIcon(tech)}
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Book spine effect */}
          <div className={`absolute top-0 bottom-0 right-0 w-4 ${
            isDark ? 'bg-blue-800' : 'bg-blue-200'
          } shadow-inner`}></div>
          
          {/* Book binding detail */}
          <div className="absolute top-4 bottom-4 right-5 w-[1px] bg-white/30"></div>
        </motion.div>
      
        {/* Book Content - Hiển thị khi hover */}
        <motion.div 
          className="book-content absolute inset-0 w-full h-full z-10 p-6 flex flex-col"
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={contentAnimations}
          style={{ background: isDark ? '#1E293B' : '#EFF6FF' }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <motion.h3 
              className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-blue-900'}`}
            >
              {title}
            </motion.h3>
            <motion.div className="bg-blue-600 text-white p-1 rounded-full">
              <FaBookOpen className="w-5 h-5" />
            </motion.div>
          </div>
          
          {/* Description */}
          <motion.p 
            className={`mb-4 ${isDark ? 'text-blue-100' : 'text-blue-900'}`}
          >
            {description}
          </motion.p>
          
          {/* Features */}
          <motion.div className="mb-4">
            <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              Tính năng:
            </h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-blue-100' : 'text-blue-800'}`}>
              {features?.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FaBookmark className="w-3 h-3 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className={`flex items-center gap-1 ${
                  isDark ? 'bg-blue-800/50 text-blue-100' : 'bg-blue-100 text-blue-800'
                } text-xs px-2 py-1 rounded-full`}
              >
                {getProjectIcon(tech)}
                <span>{tech}</span>
              </span>
            ))}
          </div>
          
          {/* Links */}
          <div className="flex justify-between mt-5 pt-4 border-t border-blue-200/20">
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isDark ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'
              } flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium hover:scale-105 transition-transform`}
              whileHover={{ scale: 1.05 }}
            >
              <FaGithub className="mr-1" /> GitHub
            </motion.a>
            
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
              } flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium hover:scale-105 transition-transform`}
              whileHover={{ scale: 1.05 }}
            >
              Xem Demo <FaExternalLinkAlt className="ml-1" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;