import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Phương pháp đơn giản hơn để kiểm tra vị trí cuộn
  const toggleVisibility = () => {
    // Lấy vị trí cuộn hiện tại
    const scrolled = window.scrollY;
    
    // Lấy chiều cao của viewport
    const viewportHeight = window.innerHeight;
    
    // Hiển thị nút khi cuộn quá 30% chiều cao màn hình
    if (scrolled > viewportHeight * 0.3) {
      if (!isVisible) {
        console.log("Hiển thị nút Back to Top");
        setIsVisible(true);
      }
    } else {
      if (isVisible) {
        console.log("Ẩn nút Back to Top");
        setIsVisible(false);
      }
    }
  };

  // Xử lý cuộn lên đầu trang
  const scrollToTop = () => {
    setIsAnimating(true);
    console.log("Cuộn về đầu trang");
    
    // Sử dụng API scrollTo có sẵn để cuộn mượt hơn
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Đặt lại trạng thái sau khi cuộn kết thúc
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    // Kiểm tra ngay khi component được mount
    toggleVisibility();
    
    // Thêm event listener
    window.addEventListener('scroll', toggleVisibility);
    
    // Clean up
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isVisible]); // Thêm isVisible vào dependencies để tránh log quá nhiều

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[9999] p-4 rounded-full 
        ${isAnimating ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} 
        text-white shadow-lg 
        hover:shadow-blue-400/50 group transform
        dark:bg-indigo-600 dark:hover:bg-indigo-700
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
      aria-label="Back to top"
    >
      <FaArrowUp 
        className={`transition-transform duration-300 
        ${isAnimating ? 'animate-bounce' : 'group-hover:-translate-y-1'}`} 
      />
      
      {/* Hiệu ứng sóng khi click */}
      <span className={`absolute inset-0 rounded-full bg-white opacity-30 
        transform scale-0 transition-transform duration-700
        ${isAnimating ? 'scale-[4]' : ''}`} />
    </button>
  );
};

export default BackToTop;