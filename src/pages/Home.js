import React, { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaEnvelope, FaCode, FaServer, FaFutbol, FaBook, FaPlane, FaFacebookF, FaEye } from 'react-icons/fa';
import { 
  FaReact, FaHtml5, FaCss3Alt, FaNodeJs, 
  FaDatabase, FaGitAlt, FaNpm, FaAndroid
} from 'react-icons/fa';
import { 
  SiFlutter, SiDart, SiMongodb, SiMysql, 
  SiFirebase, SiPostman, SiVscodium 
} from 'react-icons/si'
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
      description: 'Ứng dụng di động Flutter kinh doanh nhà sách',
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
      description: 'Ứng dụng web giúp người dùng đọc truyện tranh, quản lý truyện tranh yêu thích và tương tác với cộng đồng.',
      image: '/booky.png',
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
      description: 'Hệ thống nhà hàng SushiA với chức năng đặt bàn trực tuyến tự động',
      image: '/booky.png',
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

  const handleNavigation = (path) => {
    // Muestra un efecto antes de navegar
    document.body.classList.add('page-transitioning');
    
    // Navega después de un breve retraso
    setTimeout(() => {
      navigate(path);
      document.body.classList.remove('page-transitioning');
    }, 300);
  };

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
                <a href="mailto:your.nghthai02@gmail.com" className="icon-float delay-200 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors transform hover:scale-125 hover:rotate-12">
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

      {/* Project Showcase Section */}
      <section 
        ref={projectsRef} 
        className={`py-8 ${isDark ? 'bg-blue-950' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
        transition-all duration-500 rounded-3xl mx-3 md:mx-4 lg:mx-5 my-4 
        shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
      >
        <div className="container mx-auto px-3 md:px-4 lg:px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Project card 1 */}
            <div className={`${isDark ? 'bg-indigo-950' : 'bg-white'} rounded-xl overflow-hidden transition-transform hover:-translate-y-2 duration-300 shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
              <div className={`relative p-2 ${isDark ? 'bg-blue-900/10' : 'bg-blue-50'} aspect-video`}>
                <img 
                  src={featuredProjects[0].image} 
                  alt={featuredProjects[0].title} 
                  className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x350?text=Project+Image';
                    }}
                  />
                </div>
              <div className="p-3 md:p-4">
                <h3 className="text-xl font-bold mb-2">{featuredProjects[0].title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3 line-clamp-2 text-sm md:text-base`}>
                  {featuredProjects[0].description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {featuredProjects[0].technologies.map((tech, index) => (
                    <span key={index} className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <a
                    href={featuredProjects[0].github} 
                      target="_blank"
                    rel="noreferrer" 
                    className={`flex items-center gap-1 text-sm ${isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
                    >
                    <FaGithub size={16} /> GitHub
                    </a>
                    <a
                    href={featuredProjects[0].demo} 
                      target="_blank"
                    rel="noreferrer" 
                    className={`flex items-center gap-1 text-sm ${isDark ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-800'}`}
                    >
                    <FaEye size={16} /> Demo
                    </a>
                  </div>
                </div>
          </div>

            {/* Project card 2 */}
            <div className={`${isDark ? 'bg-indigo-950' : 'bg-white'} rounded-xl overflow-hidden transition-transform hover:-translate-y-2 duration-300 shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
              <div className={`relative p-2 ${isDark ? 'bg-blue-900/10' : 'bg-blue-50'} aspect-video`}>
                <img 
                  src={featuredProjects[1].image} 
                  alt={featuredProjects[1].title} 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x350?text=Project+Image';
                  }}
                />
          </div>
              <div className="p-3 md:p-4">
                <h3 className="text-xl font-bold mb-2">{featuredProjects[1].title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3 line-clamp-2 text-sm md:text-base`}>
                  {featuredProjects[1].description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {featuredProjects[1].technologies.map((tech, index) => (
                    <span key={index} className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
                      {tech}
                    </span>
                  ))}
          </div>
                <div className="flex justify-between">
                  <a 
                    href={featuredProjects[1].github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex items-center gap-1 text-sm ${isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    <FaGithub size={16} /> GitHub
                  </a>
                  <a 
                    href={featuredProjects[1].demo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex items-center gap-1 text-sm ${isDark ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-800'}`}
                  >
                    <FaEye size={16} /> Demo
                  </a>
                </div>
              </div>
            </div>

            {/* Project card 3 */}
            <div className={`${isDark ? 'bg-indigo-950' : 'bg-white'} rounded-xl overflow-hidden transition-transform hover:-translate-y-2 duration-300 shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
              <div className={`relative p-2 ${isDark ? 'bg-blue-900/10' : 'bg-blue-50'} aspect-video`}>
                <img 
                  src={featuredProjects[2].image} 
                  alt={featuredProjects[2].title} 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x350?text=Project+Image';
                  }}
                />
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-xl font-bold mb-2">{featuredProjects[2].title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3 line-clamp-2 text-sm md:text-base`}>
                  {featuredProjects[2].description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {featuredProjects[2].technologies.map((tech, index) => (
                    <span key={index} className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a 
                    href={featuredProjects[2].github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex items-center gap-1 text-sm ${isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    <FaGithub size={16} /> GitHub
                  </a>
                  <a 
                    href={featuredProjects[2].demo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex items-center gap-1 text-sm ${isDark ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-800'}`}
                  >
                    <FaEye size={16} /> Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section 
        ref={skillsRef} 
        className={`py-8 ${isDark ? 'bg-blue-950' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
        rounded-3xl mx-3 md:mx-4 lg:mx-5 my-4 
        shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
      >
        <div className="container mx-auto px-3 md:px-4 lg:px-5">
          <TechGrid isDark={isDark} defaultBorder={isDark ? 'border-blue-900' : 'border-gray-200'} />
        </div>
      </section>

      {/* Hobbies Section */}
      <section 
        ref={hobbiesRef} 
        className={`py-8 ${isDark ? 'bg-blue-950' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
        rounded-3xl mx-3 md:mx-4 lg:mx-5 my-4 
        shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
      >
        <div className="container mx-auto px-3 md:px-4 lg:px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Football Hobby */}
            <div className="group">
              <div className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10 min-h-[180px]">
                  <div className="relative flex justify-center items-center h-20 mb-4">
                    <FaFutbol className="w-14 h-14 text-green-500 transition-opacity duration-300 group-hover:opacity-0 absolute" />
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                      <div className="football-wrapper">
                        <FaFutbol className="w-14 h-14 text-green-500 football-bounce" />
                        <div className="football-shadow"></div>
                      </div>
                    </div>
          </div>

                  <h3 className="text-lg font-bold mb-3 text-center">Bóng Đá</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center text-sm`}>
                    Đam mê theo dõi và chơi bóng đá. Là fan của Manchester United và đội tuyển Việt Nam.
                  </p>
                </div>
              </div>
            </div>

            {/* Reading Hobby */}
            <div className="group">
              <div className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10 min-h-[180px]">
                  <div className="relative flex justify-center items-center h-20 mb-4">
                    <FaBook className="w-14 h-14 text-blue-500 transition-opacity duration-300 group-hover:opacity-0 absolute" />
                    
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

                  <h3 className="text-lg font-bold mb-3 text-center">Đọc Sách</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center text-sm`}>
                    Yêu thích đọc sách về công nghệ, khoa học và phát triển bản thân.
                  </p>
                </div>
              </div>
            </div>

            {/* Traveling Hobby */}
            <div className="group">
              <div className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-purple-500/10' : 'bg-purple-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10 min-h-[180px]">
                  <div className="relative flex justify-center items-center h-20 mb-4">
                    <FaPlane className="w-14 h-14 text-purple-500 transition-opacity duration-300 group-hover:opacity-0 absolute" />
                    
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

                  <h3 className="text-lg font-bold mb-3 text-center">Du Lịch</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center text-sm`}>
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