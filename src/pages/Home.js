import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope, FaCode, FaMobileAlt, FaServer, FaFutbol, FaBook, FaPlane, FaFacebookF, FaEye } from 'react-icons/fa';
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, 
  FaDatabase, FaDocker, FaGitAlt, FaNpm, FaFigma, FaAndroid, FaFirefox,
  FaMobile, FaTools, FaLaptopCode
} from 'react-icons/fa';
import { 
  SiFlutter, SiDart, SiMongodb, SiMysql, 
  SiFirebase, SiPostman, SiVscodium 
} from 'react-icons/si'
import ProjectCard from '../components/ProjectCard';
import Waves from '../components/Waves';
import { ThemeContext } from '../context/ThemeContext';
import TechGrid from '../components/TechGrid';

import "../styles/tailwind.css";

const Home = () => {
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const ctaRef = useRef(null);
  const hobbiesRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  // Hiệu ứng reveal khi scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all section elements
    const sections = [skillsRef.current, projectsRef.current, ctaRef.current, hobbiesRef.current];
    sections.forEach(section => {
      if (section) {
        section.style.opacity = '0';
        observer.observe(section);
      }
    });
    
    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  
  // Particle animation cho hero section
  useEffect(() => {
    if (!heroRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heroRefCurrent = heroRef.current;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%'; // Chiếm toàn bộ chiều cao hero section
      canvas.width = heroRefCurrent.offsetWidth;
      canvas.height = heroRefCurrent.offsetHeight;
    };
    updateCanvasSize();

    heroRefCurrent.insertBefore(canvas, heroRefCurrent.firstChild);

    // Tạo particles nhỏ hơn và ít hơn
    const particles = [];
    const particleCount = 40; // Tăng số lượng particles một chút
    const colors = ['#4F9FFF', '#65B5FF', '#89C8FF', '#A0D2FF'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5, // Giảm kích thước
        speedX: (Math.random() - 0.5) * 1.5, // Giảm tốc độ
        speedY: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.2, // Giảm độ trong suốt
        rotation: Math.random() * Math.PI * 2,
        pulse: Math.random() * 0.02, // Thêm hiệu ứng pulse
        pulseDirection: Math.random() > 0.5 ? 1 : -1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient nhẹ nhàng hơn
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(30, 64, 175, 0.02)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.opacity;

        // Hiệu ứng pulse cho particles
        const pulseSize = particle.size * (1 + Math.sin(Date.now() * 0.003) * particle.pulse);

        // Vẽ particle dạng ngôi sao nhỏ
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(
            Math.cos((i * 4 * Math.PI) / 5) * pulseSize,
            Math.sin((i * 4 * Math.PI) / 5) * pulseSize
          );
        }
        ctx.closePath();
        ctx.fill();

        // Glow effect nhẹ hơn
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8 + Math.sin(Date.now() * 0.002) * 2;
        ctx.fill();

        ctx.restore();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += 0.01; // Xoay chậm hơn

        // Wrap around screen
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        
        // Thêm tương tác với chuột
        if (window.mouseX && window.mouseY) {
          const dx = particle.x - window.mouseX;
          const dy = particle.y - window.mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * 0.5;
            particle.y += Math.sin(angle) * 0.5;
          }
        }
      });
    }

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      draw();
    }
    animate();

    // Thêm sự kiện chuột
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      window.mouseX = e.clientX - rect.left;
      window.mouseY = e.clientY - rect.top;
    };

    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (heroRefCurrent) {
        heroRefCurrent.removeChild(canvas);
      }
    };
  }, []);
  
  // Thêm vào phần useEffect trong Home.js
  useEffect(() => {
    // Xử lý sự kiện khi cuộn để điều chỉnh hiệu ứng Waves
    const handleScroll = () => {
      const wavesContainer = document.querySelector('.waves-container');
      const headerHeight = 64; // Chiều cao của header
      
      if (wavesContainer) {
        if (window.scrollY > 50) {
          // Khi đã cuộn xuống, tạo hiệu ứng clip cho waves chỉ hiển thị ở hero section
          wavesContainer.style.clipPath = `polygon(0 ${headerHeight}px, 100% ${headerHeight}px, 100% 100%, 0 100%)`;
        } else {
          // Khi ở đầu trang, hiện waves ở cả header và hero
          wavesContainer.style.clipPath = 'none';
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Dữ liệu mẫu cho các dự án
  const featuredProjects = [
    {
      id: 1,
      title: 'Booky',
      description: 'Ứng dụng di động Flutter cho phép người dùng đọc và quản lý sách yêu thích.',
      image: '/booky.png',
      technologies: ['Flutter', 'Dart', 'Node.js'],
      github: 'https://github.com/Haimichi/DoAn_LTMobile',
      demo: '#',
      features: [
        'Tìm kiếm sách theo tên, tác giả hoặc thể loại',
        'Quản lý danh sách sách yêu thích',
        'Đánh dấu tiến độ đọc sách'
      ]
    },
    {
      id: 2,
      title: 'Manga Corner',
      description: 'Ứng dụng web giúp người dùng khám phá và quản lý truyện tranh yêu thích.',
      image: '/images/manga-corner.jpg',
      technologies: ['HTML', 'CSS','React', 'Tailwind', 'Node.js'],
      github: 'https://github.com/Haimichi/manga-corner',
      demo: '#',
      features: [
        'Tìm kiếm manga theo tên hoặc tác giả',
        'Xem thông tin chi tiết của manga',
        'Quản lý danh sách manga yêu thích'
      ]
    },
    {
      id: 3,
      title: 'Table Reservations',
      description: 'Hệ thống đặt bàn trực tuyến cho nhà hàng và quán ăn.',
      image: '/images/table-reservations.jpg',
      technologies: ['ASP.NET Core', 'SQLServer', 'WebServices'],
      github: 'https://github.com/Sushiba2ker/Table-reservations',
      demo: '#',
      features: [
        'Đặt bàn trực tuyến',
        'Quản lý lịch đặt bàn',
        'Tìm kiếm nhà hàng theo vị trí'
      ]
    }
  ];

  // Dữ liệu cho phần kỹ năng
  const skills = [
    {
      category: "Frontend",
      icon: <FaCode className="w-8 h-8 mx-auto" />,
      color: "blue",
      technologies: [
        { name: "Flutter", icon: <SiFlutter className="w-12 h-12" />, color: "text-blue-500" },
        { name: "React", icon: <FaReact className="w-12 h-12" />, color: "text-blue-400" },
        { name: "HTML5", icon: <FaHtml5 className="w-12 h-12" />, color: "text-orange-500" },
        { name: "CSS3", icon: <FaCss3Alt className="w-12 h-12" />, color: "text-blue-600" }
      ]
    },
    {
      category: "Backend",
      icon: <FaServer className="w-8 h-8 mx-auto" />,
      color: "green",
      technologies: [
        { name: "Node.js", icon: <FaNodeJs className="w-12 h-12" />, color: "text-green-500" },
        { name: "MongoDB", icon: <SiMongodb className="w-12 h-12" />, color: "text-green-600" },
        { name: "MySQL", icon: <SiMysql className="w-12 h-12" />, color: "text-blue-600" },
        { name: "Database", icon: <FaDatabase className="w-12 h-12" />, color: "text-gray-600" }
      ]
    },
    {
      category: "Mobile",
      icon: <FaMobile className="w-8 h-8 mx-auto" />,
      color: "purple",
      technologies: [
        { name: "Dart", icon: <SiDart className="w-12 h-12" />, color: "text-blue-500" },
        { name: "Firebase", icon: <SiFirebase className="w-12 h-12" />, color: "text-yellow-500" },
        { name: "Android", icon: <FaAndroid className="w-12 h-12" />, color: "text-green-500" }
      ]
    },
    {
      category: "Tools",
      icon: <FaTools className="w-8 h-8 mx-auto" />,
      color: "gray",
      technologies: [
        { name: "Git", icon: <FaGitAlt className="w-12 h-12" />, color: "text-orange-600" },
        { name: "VS Code", icon: <SiVscodium className="w-12 h-12" />, color: "text-blue-500" },
        { name: "Postman", icon: <SiPostman className="w-12 h-12" />, color: "text-orange-500" },
        { name: "NPM", icon: <FaNpm className="w-12 h-12" />, color: "text-red-500" }
      ]
    }
  ];

  const handleNavigation = (path) => {
    // Muestra un efecto antes de navegar
    document.body.classList.add('page-transitioning');
    
    // Navega después de un breve retraso
    setTimeout(() => {
      navigate(path);
      document.body.classList.remove('page-transitioning');
    }, 300);
  };

  // // Thêm hàm để tạo màu khác nhau cho mỗi dự án
  // function getProjectColor(id) {
  //   const colors = [
  //     [0, 1, 1],    // Màu cyan - xanh lam
  //     [0.33, 1, 1], // Màu xanh lá
  //     [0.66, 1, 1], // Màu tím
  //     [0.15, 1, 1], // Màu xanh lá nhạt
  //     [0.5, 1, 1],  // Màu tím nhạt
  //     [0.85, 1, 1]  // Màu đỏ nhạt
  //   ];
    
  //   return colors[(id - 1) % colors.length];
  // }

  return (
    <>
      {/* Hero Section - bo tròn ở phần dưới */}
      <section 
        ref={heroRef} 
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-blue-950 dark:to-indigo-950 pt-16 md:pt-20 rounded-b-3xl"
      >
        {/* Container của Waves - điều chỉnh z-index thấp hơn header */}
        <div className="absolute inset-0 waves-container overflow-hidden rounded-b-3xl">
          <Waves 
            lineColor={isDark ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.6)"} 
            backgroundColor="transparent" 
            waveSpeedX={0.015}
            waveSpeedY={0.008}
            waveAmpX={40}
            waveAmpY={25}
            xGap={15}
            yGap={30}
            friction={0.94}
            tension={0.008}
            maxCursorMove={120}
            style={{ 
              zIndex: 0,
              strokeWidth: 1.5,
            }}
            className="opacity-90 dark:opacity-75 wave-effect"
          />
        </div>
        
        {/* Nội dung container */}
        <div className="container mx-auto px-4 py-20 z-10 relative">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-3/5 space-y-6 text-center md:text-left">
              {/* Efecto de aparición de letras una por una */}
              <div className="overflow-hidden">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <div className="full-intro-animation">
                    <span className="text-gray-900 dark:text-white intro-text-start">
                      Xin chào, tôi là 
                  </span>
                    <span className="intro-text-name bg-clip-text text-transparent bg-gradient-to-l from-indigo-500 to-blue-600">
                    Nguyễn Huỳnh Thanh Hải
                  </span>
                  </div>
                </h1>
              </div>
              
              {/* Efecto de línea que se dibuja */}
              <h2 className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 animate-fade-in">
                <span className="relative overflow-hidden">
                  <span className="word-reveal">Mobile</span> <span className="word-reveal reveal-delay-1">&</span> <span className="word-reveal reveal-delay-2">Web</span> <span className="word-reveal reveal-delay-3">Developer</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 opacity-50 animate-width"></span>
                </span>
                </h2>
              
              {/* Párrafo con fade-in por líneas */}
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                <span className="line-appear">Tôi là một nhà phát triển đam mê với kinh nghiệm về Flutter và ứng dụng web.</span>
                <span className="line-appear appear-delay-1">Tập trung vào việc tạo ra những trải nghiệm người dùng tuyệt vời và giải pháp công nghệ hiệu quả.</span>
              </p>
              
              {/* Botones con efecto de escalado mejorado */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in-delay-2">
                <button 
                  onClick={() => handleNavigation('/about')}
                  className="btn-modern primary group relative overflow-hidden px-8 py-3 text-lg font-medium rounded-lg flex items-center gap-2"
                >
                  <span className="relative z-10">Tìm hiểu thêm</span>
                  <span className="icon-container relative z-10 group-hover:translate-x-1 transition-transform">
                    <FaArrowRight className="ml-1" />
                  </span>
                  <span className="btn-bg absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"></span>
                  <span className="btn-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
                
                <button 
                  onClick={() => handleNavigation('/projects')}
                  className="btn-modern secondary group relative overflow-hidden px-8 py-3 text-lg font-medium rounded-lg flex items-center gap-2"
                >
                  <span className="relative z-10">Xem dự án</span>
                  <span className="icon-container relative z-10 flex items-center justify-center overflow-hidden w-5 h-5">
                    <span className="icon-swap">
                      <FaEye className="top-icon" />
                      <FaCode className="bottom-icon" />
                    </span>
                  </span>
                  <span className="btn-border absolute inset-0"></span>
                </button>
                </div>
              
              {/* Redes sociales con efectos de rotación */}
              <div className="flex gap-6 pt-4 justify-center md:justify-start animate-fade-in-delay-3">
                <a href="https://github.com/Haimichi" target="_blank" rel="noreferrer" className="icon-float text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors transform hover:scale-125 hover:rotate-12">
                    <FaGithub size={24} />
                  </a>
                <a href="https://www.facebook.com/hajj02/" target="_blank" rel="noreferrer" className="icon-float delay-100 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors transform hover:scale-125 hover:rotate-12">
                  <FaFacebookF size={24} />
                  </a>
                <a href="mailto:your.email@example.com" className="icon-float delay-200 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors transform hover:scale-125 hover:rotate-12">
                    <FaEnvelope size={24} />
                  </a>
                </div>
              </div>
            
            <div className="md:w-2/5">
              <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 md:inset-6 lg:inset-8 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full animate-spin-slow"></div>
                <img 
                  src="/avt.jpg" 
                  alt="Profile"
                  className="absolute inset-0 w-full h-full object-cover rounded-full z-10 p-3 md:p-4 lg:p-5 transform transition-transform hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400.png?text=Profile+Image';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements - điều chỉnh để phù hợp với góc bo tròn */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50 animate-float-delay z-0"></div>
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-indigo-100 dark:bg-indigo-900 rounded-full opacity-50 animate-float-delay-2 z-0"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full opacity-30 animate-float-delay-3 z-0"></div>
        <div className="absolute bottom-1/3 left-10 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full opacity-30 animate-float-delay-4 z-0"></div>
      </section>

      {/* Thêm khoảng cách nhỏ giữa hero và section tiếp theo */}
      <div className="h-4"></div>

      {/* Project Showcase Section - viền mỏng hơn và khoảng cách nhỏ hơn */}
      <section 
        ref={projectsRef} 
        className={`py-16 ${isDark ? 'bg-blue-950' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
        transition-all duration-500 rounded-3xl mx-4 md:mx-6 lg:mx-8 my-6 
        shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
      >
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-5xl font-bold mb-4">10 Project Showcase</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mb-8`}>
              Explore the various projects I've worked on in the software development field. See my diverse and high-quality work.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <a href="https://github.com/Haimichi" target="_blank" rel="noreferrer" className={`${isDark ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'} transition-colors`}>
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className={`${isDark ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'} transition-colors`}>
                <FaLinkedin size={24} />
              </a>
              <button className={`ml-4 px-6 py-2 border ${isDark ? 'border-white hover:bg-white hover:text-blue-950' : 'border-gray-800 hover:bg-gray-800 hover:text-white'} rounded-full flex items-center gap-2 transition-all`}>
                See More <FaArrowRight className="ml-1" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project 1 */}
            <div className={`${isDark ? 'bg-indigo-950' : 'bg-white'} rounded-xl overflow-hidden transition-transform hover:-translate-y-2 duration-300 shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
              <div className={`relative p-3 ${isDark ? 'bg-[#0099ff]/10' : 'bg-blue-50'} aspect-video`}>
                <img 
                  src="/images/positivus.jpg" 
                  alt="Positivus Landing Page" 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x350?text=Project+Image';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Positivus Landing Page</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Implementation of the Positivus Landing Page design using React.js, CSS with BEM methodology, and Framer Motion for animations.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`${isDark ? 'bg-indigo-950' : 'bg-white'} rounded-xl overflow-hidden transition-transform hover:-translate-y-2 duration-300 shadow-lg`}>
              <div className={`relative p-3 ${isDark ? 'bg-[#ff4d94]/10' : 'bg-pink-50'} aspect-video`}>
                <img 
                  src="/images/smoothie.jpg" 
                  alt="Smoothie" 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x350?text=Project+Image';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Smoothie</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  A fresh and animation-rich website improvised by implementing Nickfox's UI/UX design prototype.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className={`${isDark ? 'bg-indigo-950' : 'bg-white'} rounded-xl overflow-hidden transition-transform hover:-translate-y-2 duration-300 shadow-lg`}>
              <div className={`relative p-3 ${isDark ? 'bg-[#00a3cc]/10' : 'bg-cyan-50'} aspect-video`}>
                <img 
                  src="/images/bittle.jpg" 
                  alt="Bittle Link Shortener" 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x350?text=Project+Image';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Bittle Link Shortener</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  A RESTful API for direct static URL shortening developed using Express.js, MongoDB, and short-id.
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className={`${isDark ? 'bg-indigo-950' : 'bg-white'} rounded-xl overflow-hidden transition-transform hover:-translate-y-2 duration-300 shadow-lg`}>
              <div className={`relative p-3 ${isDark ? 'bg-[#00cc66]/10' : 'bg-green-50'} aspect-video`}>
                <img 
                  src="/images/daunnesia.jpg" 
                  alt="Daunnesia Angency" 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x350?text=Project+Image';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Daunnesia Angency</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Web application for Agency that sells software application without sign in feature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - viền mỏng hơn và khoảng cách nhỏ hơn */}
      <section 
        ref={skillsRef} 
        className={`py-16 ${isDark ? 'bg-blue-950' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
        rounded-3xl mx-4 md:mx-6 lg:mx-8 my-6 
        shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
      >
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4 inline-block relative">
              Kỹ Năng Chuyên Môn
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-blue-500 animate-width"></div>
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mt-4`}>
              Các công nghệ tôi thường xuyên sử dụng trong quá trình phát triển
            </p>
          </div>
          
          <TechGrid isDark={isDark} />
        </div>
      </section>

      {/* Hobbies Section - viền mỏng hơn và khoảng cách nhỏ hơn */}
      <section 
        ref={hobbiesRef} 
        className={`py-16 ${isDark ? 'bg-blue-950' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
        rounded-3xl mx-4 md:mx-6 lg:mx-8 my-6 
        shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 inline-block relative">
              Sở Thích
              <div className="absolute bottom-0 left-1/3 right-1/3 h-1 bg-blue-500 animate-width"></div>
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto mt-4`}>
              Những điều tôi yêu thích bên cạnh lập trình
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Football Hobby */}
            <div className="group">
              <div className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} p-8 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10 min-h-[200px]">
                  <div className="relative flex justify-center items-center h-20 mb-6">
                    <FaFutbol className="w-16 h-16 text-green-500 transition-opacity duration-300 group-hover:opacity-0 absolute" />
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                      <div className="football-wrapper">
                        <FaFutbol className="w-16 h-16 text-green-500 football-bounce" />
                        <div className="football-shadow"></div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center">Bóng Đá</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                    Đam mê theo dõi và chơi bóng đá. Là fan của Manchester United và đội tuyển Việt Nam.
                  </p>
                </div>
              </div>
            </div>

            {/* Reading Hobby */}
            <div className="group">
              <div className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} p-8 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10 min-h-[200px]">
                  <div className="relative flex justify-center items-center h-20 mb-6">
                    <FaBook className="w-16 h-16 text-blue-500 transition-opacity duration-300 group-hover:opacity-0 absolute" />
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                      <div className="book-wrapper">
                        <div className="book">
                          <div className="book-cover"></div>
                          <div className="book-page page-1"></div>
                          <div className="book-page page-2"></div>
                          <div className="book-page page-3"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center">Đọc Sách</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                    Yêu thích đọc sách về công nghệ, khoa học và phát triển bản thân.
                  </p>
                </div>
              </div>
            </div>

            {/* Traveling Hobby */}
            <div className="group">
              <div className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} p-8 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-purple-500/10' : 'bg-purple-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10 min-h-[200px]">
                  <div className="relative flex justify-center items-center h-24 mb-6">
                    <FaPlane className="w-16 h-16 text-purple-500 transition-opacity duration-300 group-hover:opacity-0 absolute" />
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute w-full travel-scene-container">
                      <div className="travel-scene">
                        <div className="sky-bg"></div>
                        <div className="sun"></div>
                        <div className="cloud cloud-1"></div>
                        <div className="cloud cloud-2"></div>
                        <div className="cloud cloud-3"></div>
                        <div className="cloud cloud-4"></div>
                        <div className="mountain mountain-1"></div>
                        <div className="mountain mountain-2"></div>
                        <FaPlane className="travel-plane text-purple-500" />
                        <div className="plane-trail"></div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center">Du Lịch</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                    Thích khám phá những vùng đất mới và trải nghiệm văn hóa khác nhau.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;