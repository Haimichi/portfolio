import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import ProjectCard from '../components/ProjectCard';
import SkillBar from '../components/SkillBar';

const Home = () => {
  const heroRef = useRef(null);
  const matrixRef = useRef(null);
  
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
      canvas.style.height = '400px'; // Giới hạn chiều cao
      canvas.width = heroRef.current.offsetWidth;
      canvas.height = 400; // Cố định chiều cao
    };
    updateCanvasSize();

    heroRef.current.insertBefore(canvas, heroRef.current.firstChild);

    // Tạo particles nhỏ hơn và ít hơn
    const particles = [];
    const particleCount = 30; // Giảm số lượng particles
    const colors = ['#4F9FFF', '#65B5FF', '#89C8FF'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5, // Giảm kích thước
        speedX: (Math.random() - 0.5) * 1.5, // Giảm tốc độ
        speedY: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.2, // Giảm độ trong suốt
        rotation: Math.random() * Math.PI * 2
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

        // Vẽ particle dạng ngôi sao nhỏ
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(
            Math.cos((i * 4 * Math.PI) / 5) * particle.size,
            Math.sin((i * 4 * Math.PI) / 5) * particle.size
          );
        }
        ctx.closePath();
        ctx.fill();

        // Glow effect nhẹ hơn
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8;
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
      });
    }

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      draw();
    }
    animate();

    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
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

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 md:py-28 lg:py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold">
                  <span className="text-gray-900 dark:text-white gradient-text-hover">
                    Xin chào, tôi là{' '}
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 gradient-text-hover">
                    Nguyễn Huỳnh Thanh Hải
                  </span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-medium text-gray-600 dark:text-gray-300">
                  Mobile & Web Developer
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Tôi là một nhà phát triển đam mê với kinh nghiệm về Flutter và ứng dụng web.
                  Chuyên tạo ra những trải nghiệm người dùng tuyệt vời và giải pháp công nghệ hiệu quả.
                </p>
                <div className="flex gap-6">
                  <Link to="/about" className="btn btn-primary px-8 py-3 text-lg">
                    Tìm hiểu thêm
                  </Link>
                  <Link to="/projects" className="btn btn-outline px-8 py-3 text-lg">
                    Xem dự án
                  </Link>
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://github.com/yourusername" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <FaGithub size={24} />
                  </a>
                  <a href="https://linkedin.com/in/yourusername" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <FaLinkedin size={24} />
                  </a>
                  <a href="mailto:your.email@example.com" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <FaEnvelope size={24} />
                  </a>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-3xl opacity-20"></div>
                <img 
                  src="/avt.jpg" 
                  alt="Profile"
                  className="relative rounded-full w-64 h-64 md:w-80 md:h-80 object-cover mx-auto border-4 border-white dark:border-blue-900 shadow-xl"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400.png?text=Profile+Image';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* <section className="py-20 bg-gray-50 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Dịch Vụ Của Tôi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Cung cấp các giải pháp công nghệ toàn diện từ thiết kế đến triển khai
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaMobileAlt className="w-12 h-12" />,
                title: "Mobile Development",
                description: "Phát triển ứng dụng di động đa nền tảng với Flutter, mang lại trải nghiệm người dùng tuyệt vời."
              },
              {
                icon: <FaCode className="w-12 h-12" />,
                title: "Web Development",
                description: "Xây dựng website hiện đại, responsive với React và các công nghệ web tiên tiến."
              },
              {
                icon: <FaServer className="w-12 h-12" />,
                title: "Backend Development",
                description: "Phát triển API và hệ thống backend mạnh mẽ với Node.js và các công nghệ server-side."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white dark:bg-blue-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Projects Section */}
      <section className="py-20 bg-white dark:bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Dự Án Nổi Bật
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Những dự án tiêu biểu tôi đã thực hiện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <div key={project.id} className="bg-white dark:bg-blue-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x200.png?text=${project.title}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <a
                      href={project.github}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href={project.demo}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Demo →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects" className="inline-flex items-center btn btn-primary px-8 py-3 text-lg">
              Xem tất cả dự án <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Kỹ Năng
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Các công nghệ tôi sử dụng
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div className="bg-white dark:bg-blue-800 rounded-xl p-6 shadow-lg">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <FaCode className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
                Frontend
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="tech-item group">
                  <SiFlutter className="w-12 h-12 mx-auto text-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">Flutter</p>
                </div>
                <div className="tech-item group">
                  <FaReact className="w-12 h-12 mx-auto text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-300" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">React</p>
                </div>
                <div className="tech-item group">
                  <FaHtml5 className="w-12 h-12 mx-auto text-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">HTML5</p>
                </div>
                <div className="tech-item group">
                  <FaCss3Alt className="w-12 h-12 mx-auto text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">CSS3</p>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white dark:bg-blue-800 rounded-xl p-6 shadow-lg">
              <div className="text-green-600 dark:text-green-400 mb-4">
                <FaServer className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
                Backend
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="tech-item group">
                  <FaNodeJs className="w-12 h-12 mx-auto text-green-500 transition-all duration-300 group-hover:scale-110 group-hover:text-green-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">Node.js</p>
                </div>
                <div className="tech-item group">
                  <SiMongodb className="w-12 h-12 mx-auto text-green-600 transition-all duration-300 group-hover:scale-110 group-hover:text-green-500" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">MongoDB</p>
                </div>
                <div className="tech-item group">
                  <SiMysql className="w-12 h-12 mx-auto text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">MySQL</p>
                </div>
                <div className="tech-item group">
                  <FaDatabase className="w-12 h-12 mx-auto text-gray-600 transition-all duration-300 group-hover:scale-110 group-hover:text-gray-500" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">SQL</p>
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="bg-white dark:bg-blue-800 rounded-xl p-6 shadow-lg">
              <div className="text-purple-600 dark:text-purple-400 mb-4">
                <FaMobile className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
                Mobile
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="tech-item group">
                  <SiDart className="w-12 h-12 mx-auto text-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">Dart</p>
                </div>
                <div className="tech-item group">
                  <SiFirebase className="w-12 h-12 mx-auto text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:text-yellow-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">Firebase</p>
                </div>
                <div className="tech-item group">
                  <FaAndroid className="w-12 h-12 mx-auto text-green-500 transition-all duration-300 group-hover:scale-110 group-hover:text-green-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">Android</p>
                </div>
                <div className="tech-item group">
                  <FaFirefox className="w-12 h-12 mx-auto text-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">PWA</p>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white dark:bg-blue-800 rounded-xl p-6 shadow-lg">
              <div className="text-gray-600 dark:text-gray-400 mb-4">
                <FaTools className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
                Tools
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="tech-item group">
                  <FaGitAlt className="w-12 h-12 mx-auto text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">Git</p>
                </div>
                <div className="tech-item group">
                  <SiVscodium className="w-12 h-12 mx-auto text-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">VS Code</p>
                </div>
                <div className="tech-item group">
                  <SiPostman className="w-12 h-12 mx-auto text-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">Postman</p>
                </div>
                <div className="tech-item group">
                  <FaNpm className="w-12 h-12 mx-auto text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:text-red-400" />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">NPM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="py-20 bg-white dark:bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Sở Thích
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Những điều tôi yêu thích ngoài lập trình
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Football Hobby */}
            <div className="hobby-card group">
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-blue-800 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <FaFutbol className="w-16 h-16 mx-auto text-green-500 mb-6 transform group-hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Bóng Đá</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Đam mê theo dõi và chơi bóng đá. Là fan của Manchester United và đội tuyển Việt Nam.
                  </p>
                  <div className="mt-4 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            </div>

            {/* Reading Hobby */}
            <div className="hobby-card group">
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-blue-800 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <FaBook className="w-16 h-16 mx-auto text-blue-500 mb-6 transform group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Đọc Sách</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Yêu thích đọc sách về công nghệ, khoa học và phát triển bản thân.
                  </p>
                  <div className="mt-4 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            </div>

            {/* Traveling Hobby */}
            <div className="hobby-card group">
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-blue-800 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <FaPlane className="w-16 h-16 mx-auto text-purple-500 mb-6 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Du Lịch</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Thích khám phá những vùng đất mới và trải nghiệm văn hóa khác nhau.
                  </p>
                  <div className="mt-4 w-full h-1 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
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