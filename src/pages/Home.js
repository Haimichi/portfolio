import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope, FaCode, FaMobileAlt, FaServer, FaFutbol, FaBook, FaPlane } from 'react-icons/fa';
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, 
  FaDatabase, FaDocker, FaGitAlt, FaNpm, FaFigma, FaAndroid, FaFirefox,
  FaMobile, FaTools, FaLaptopCode
} from 'react-icons/fa';
import { 
  SiFlutter, SiDart, SiMongodb, SiMysql, 
  SiFirebase, SiPostman, SiVscodium 
} from 'react-icons/si';

import "../styles/tailwind.css";

const Home = () => {
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const ctaRef = useRef(null);
  const hobbiesRef = useRef(null);
  const navigate = useNavigate();
  
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

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%'; // Chiếm toàn bộ chiều cao hero section
      canvas.width = heroRef.current.offsetWidth;
      canvas.height = heroRef.current.offsetHeight;
    };
    updateCanvasSize();

    heroRef.current.insertBefore(canvas, heroRef.current.firstChild);

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
      if (heroRef.current) {
        heroRef.current.removeChild(canvas);
      }
    };
  }, []);
  
  // Dữ liệu mẫu cho các dự án
  const featuredProjects = [
    {
      id: 1,
      title: 'Booky',
      description: 'Ứng dụng di động Flutter cho phép người dùng đọc và quản lý sách yêu thích.',
      image: '/images/booky.jpg',
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
      technologies: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
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
      technologies: ['React', 'Node.js', 'MongoDB'],
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

  return (
    <>
      {/* Hero Section - Cải thiện hiệu ứng */}
      <section 
        ref={heroRef} 
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-blue-950 dark:to-indigo-950"
      >
        <div className="container mx-auto px-4 py-20 z-10">
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
                  className="btn btn-primary px-8 py-3 text-lg shadow-xl hover:shadow-blue-500/20 transform transition hover:-translate-y-1 hover:scale-105 button-shimmer"
                >
                  Tìm hiểu thêm
                </button>
                <button 
                  onClick={() => handleNavigation('/projects')}
                  className="btn btn-outline px-8 py-3 text-lg border-2 hover:bg-gray-50 dark:hover:bg-blue-900 transform transition hover:-translate-y-1 hover:scale-105 border-shimmer"
                >
                  Xem dự án
                </button>
              </div>
              
              {/* Redes sociales con efectos de rotación */}
              <div className="flex gap-6 pt-4 justify-center md:justify-start animate-fade-in-delay-3">
                <a href="https://github.com/Haimichi" target="_blank" rel="noreferrer" className="icon-float text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors transform hover:scale-125 hover:rotate-12">
                  <FaGithub size={24} />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="icon-float delay-100 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors transform hover:scale-125 hover:rotate-12">
                  <FaLinkedin size={24} />
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
        
        {/* Decorative elements với hiệu ứng */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50 animate-float-delay"></div>
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-indigo-100 dark:bg-indigo-900 rounded-full opacity-50 animate-float-delay-2"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full opacity-30 animate-float-delay-3"></div>
        <div className="absolute bottom-1/3 left-10 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full opacity-30 animate-float-delay-4"></div>
      </section>

      {/* Skills Section - Hiệu ứng mới */}
      <section ref={skillsRef} className="py-20 bg-white dark:bg-blue-950 transition-opacity duration-1000">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 inline-block relative">
              Kỹ Năng Chuyên Môn
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-blue-500 animate-width"></div>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
              Các công nghệ và công cụ tôi thường xuyên sử dụng trong quá trình phát triển
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-blue-900 rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`text-${skill.color}-600 dark:text-${skill.color}-400 mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6 relative overflow-hidden group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {skill.category}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {skill.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="tech-item group text-center">
                      <div className={`${tech.color} mx-auto transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12`}>
                        {tech.icon}
                      </div>
                      <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">{tech.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section - Hiệu ứng mới */}
      <section ref={projectsRef} className="py-20 bg-gray-50 dark:bg-blue-900 transition-opacity duration-1000">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 inline-block relative">
              Dự Án Nổi Bật
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-blue-500 animate-width"></div>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
              Một số dự án tiêu biểu tôi đã thực hiện gần đây
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="group bg-white dark:bg-blue-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x200.png?text=${project.title}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                          className="px-2 py-1 text-xs bg-blue-100/80 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 rounded-full backdrop-blur-sm transform transition-transform hover:scale-110"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative overflow-hidden">
                    {project.title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-6">
                    <a
                      href={project.github}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors transform hover:scale-125"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href={project.demo}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 font-medium group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Xem chi tiết <FaArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/projects" 
              className="inline-flex items-center btn btn-primary px-8 py-3 text-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Xem tất cả dự án <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Hiệu ứng mới */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-opacity duration-1000 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-pulse-slow"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Bạn có dự án cần triển khai?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 animate-fade-in-delay">
            Tôi luôn sẵn sàng đưa ý tưởng của bạn thành hiện thực với các giải pháp công nghệ hiện đại và hiệu quả.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-3 text-lg bg-white text-blue-600 font-medium rounded-full shadow-xl hover:shadow-blue-800/30 hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 animate-bounce-slow"
          >
            Liên hệ ngay
          </a>
          
          {/* Hiệu ứng hình học */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/20 rounded-lg rotate-45 animate-float"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-white/20 rounded-full animate-ping-slow"></div>
        </div>
      </section>

      {/* Hobbies Section - Con animaciones mejoradas */}
      <section ref={hobbiesRef} className="py-20 bg-white dark:bg-blue-950 transition-opacity duration-1000">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 inline-block relative">
              Sở Thích
              <div className="absolute bottom-0 left-1/3 right-1/3 h-1 bg-blue-500 animate-width"></div>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
              Những điều tôi yêu thích bên cạnh lập trình
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Football Hobby */}
            <div className="group">
              <div className="relative overflow-hidden rounded-xl bg-blue-50 dark:bg-blue-900 p-8 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
                <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-blue-200 dark:bg-blue-800 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 min-h-[200px]">
                  <div className="relative flex justify-center items-center h-20 mb-6">
                    {/* Static icon */}
                    <FaFutbol className="w-16 h-16 text-green-500 transition-opacity duration-300 group-hover:opacity-0 absolute" />
                    
                    {/* Animation that appears on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                      <div className="football-wrapper">
                        <FaFutbol className="w-16 h-16 text-green-500 football-bounce" />
                        <div className="football-shadow"></div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Bóng Đá</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Đam mê theo dõi và chơi bóng đá. Là fan của Manchester United và đội tuyển Việt Nam.
                  </p>
                </div>
              </div>
            </div>

            {/* Reading Hobby */}
            <div className="group">
              <div className="relative overflow-hidden rounded-xl bg-indigo-50 dark:bg-indigo-900 p-8 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
                <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 min-h-[200px]">
                  <div className="relative flex justify-center items-center h-20 mb-6">
                    {/* Static icon */}
                    <FaBook className="w-16 h-16 text-blue-500 transition-opacity duration-300 group-hover:opacity-0 absolute" />
                    
                    {/* Animation that appears on hover */}
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

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Đọc Sách</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Yêu thích đọc sách về công nghệ, khoa học và phát triển bản thân.
                  </p>
                </div>
              </div>
            </div>

            {/* Traveling Hobby - Animación mejorada */}
            <div className="group">
              <div className="relative overflow-hidden rounded-xl bg-purple-50 dark:bg-purple-900 p-8 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
                <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 min-h-[200px]">
                  <div className="relative flex justify-center items-center h-24 mb-6">
                    {/* Static icon */}
                    <FaPlane className="w-16 h-16 text-purple-500 transition-opacity duration-300 group-hover:opacity-0 absolute" />
                    
                    {/* Animation that appears on hover */}
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

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Du Lịch</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Thích khám phá những vùng đất mới và trải nghiệm văn hóa khác nhau.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ejemplo de link con transición */}
      <button onClick={() => handleNavigation('/about')} className="...">
        Ir a About
      </button>
    </>
  );
};

export default Home;