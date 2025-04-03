import React, { useContext, useRef, useEffect } from 'react';
import { FaDownload, FaCode, FaServer, FaTools, FaGraduationCap, FaBriefcase, 
  FaHeart, FaFutbol, FaBook, FaPlane, FaStar, FaLightbulb, FaHandshake, FaRocket, FaUsers, 
  FaArrowRight, FaUser, FaChartLine, FaEnvelope, FaGithub, FaDatabase, FaGitAlt, FaRobot,
  FaJs, FaKey, FaClock, FaComments, FaSearch, FaSyncAlt, FaPuzzlePiece, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiMongodb, SiMysql, SiTailwindcss, SiVscodium, SiFlutter } from 'react-icons/si';
import { ThemeContext } from '../context/ThemeContext';

const About = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  const profileRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const personalInfoRef = useRef(null);
  const interestsRef = useRef(null);
  const contactRef = useRef(null);
  
  // Hiệu ứng reveal khi scroll (giữ lại nếu bạn muốn)
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
    
    const sections = [
      profileRef.current, 
      educationRef.current, 
      skillsRef.current, 
      experienceRef.current, 
      personalInfoRef.current, 
      interestsRef.current, 
      contactRef.current
    ];
    
    sections.forEach(section => {
      if (section) {
        section.style.opacity = '0'; // Bắt đầu với trạng thái ẩn
        observer.observe(section);
      }
    });
    
    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="bg-white dark:bg-blue-950 transition-colors duration-500 pt-20 pb-10 px-3 md:px-4 lg:px-5"> 
      {/* Thêm padding top (pt-20) để tránh header */}
      <div className="container mx-auto space-y-8 md:space-y-10"> {/* Thêm space-y để tạo khoảng cách giữa các section */}

        {/* Profile Section */}
        <section 
          ref={profileRef} 
          className={`py-8 ${isDark ? 'bg-blue-900' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
          rounded-3xl shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
        >
          <div className="container mx-auto px-3 md:px-4 lg:px-5">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="md:w-1/3">
                <div className="group relative w-48 h-48 md:w-56 md:h-56 mx-auto"> {/* Kích thước ảnh profile lớn hơn */}
                  <div className={`absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                  <div className="relative overflow-hidden rounded-full border-4 border-primary/20 shadow-lg w-full h-full transform transition-transform group-hover:scale-105 duration-500">
                    <img 
                      src="avt.jpg" // Đã thay đổi thành avt.jpg
                      alt="Nguyễn Huỳnh Thanh Hải" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback nếu avt.jpg không tải được
                        e.target.src = 'https://via.placeholder.com/400?text=Profile+Image'; 
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center md:text-left">Nguyễn Huỳnh Thanh Hải</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center md:text-left">
                  Xin chào! Tôi là nhà phát triển Frontend và Mobile với đam mê tạo ra các sản phẩm có giá trị và trải nghiệm người dùng tuyệt vời.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-800/50' : 'bg-blue-50'} flex items-start`}>
                    <span className="font-semibold mr-2">Họ và tên:</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Nguyễn Huỳnh Thanh Hải</span>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-800/50' : 'bg-blue-50'} flex items-start`}>
                    <span className="font-semibold mr-2">Ngày sinh:</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>25/10/2002</span>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-800/50' : 'bg-blue-50'} flex items-start`}>
                    <span className="font-semibold mr-2">Email:</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>nghthai02@gmail.com</span>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-800/50' : 'bg-blue-50'} flex items-start`}>
                    <span className="font-semibold mr-2">GitHub:</span>
                    <a 
                      href="https://github.com/Haimichi" 
                      target="_blank"
                      rel="noreferrer" 
                      className={`${isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'} flex items-center`}
                    >
                      <FaGithub className="mr-1" size={16} /> github.com/Haimichi
                    </a>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-800/50' : 'bg-blue-50'} flex items-start`}>
                    <span className="font-semibold mr-2">Điện thoại:</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>039XXXXX03</span>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-800/50' : 'bg-blue-50'} flex items-start`}>
                    <span className="font-semibold mr-2">Địa chỉ:</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Hóc Môn, TP. Hồ Chí Minh</span> {/* Đã sửa */}
                  </div>
                </div>
                
                <a 
                  href="https://27vvzl-my.sharepoint.com/:b:/g/personal/thanhhai_27vvzl_onmicrosoft_com/EXKdDATPTvxFma9lzbUJFzsBYc6tokKwB_LH5T0Vk7Q0pw?e=ylYnjo" 
                  download 
                  className="group flex items-center justify-center md:justify-start"
                >
                  <span className={`inline-flex items-center px-6 py-3 rounded-full ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium transition-all duration-300 transform group-hover:scale-105`}>
                    <FaDownload className="mr-2" /> Tải CV
                    <span className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-500' : 'bg-blue-400'} group-hover:scale-110 transition-transform`}>
                      <FaArrowRight className="text-xs" />
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section 
          ref={educationRef} 
          className={`py-8 ${isDark ? 'bg-blue-950' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
          rounded-3xl shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
        >
          <div className="container mx-auto px-3 md:px-4 lg:px-5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
                <FaGraduationCap className="text-3xl" />
              </div>
              <h2 className="text-3xl font-bold">Học Vấn</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Education Item 1 */}
              <div className={`group relative ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 rounded-xl shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'} transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'}`}>
                      <FaGraduationCap className={`text-xl ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Trường Đại học Công nghệ TP.HCM (HUTECH)</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>09/2021 - 09/2025</p>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <p className="mb-2"><span className="font-medium">Chuyên ngành:</span> Công nghệ phần mềm</p>
                    <p><span className="font-medium">GPA:</span> 3.39/4</p>
                  </div>
                </div>
              </div>
              
              {/* Education Item 2 */}
              <div className={`group relative ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 rounded-xl shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'} transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'}`}>
                      <FaGraduationCap className={`text-xl ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Chứng chỉ tiếng Anh</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>2024</p>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <p className="mb-2"><span className="font-medium">Tổ chức cấp:</span> Trung tâm ngoại ngữ ĐH Công nghệ TP.HCM</p>
                    <p><span className="font-medium">Trình độ:</span> B1 theo khung CEFR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          ref={skillsRef} 
          className={`py-8 ${isDark ? 'bg-blue-900' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
          rounded-3xl shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
        >
          <div className="container mx-auto px-3 md:px-4 lg:px-5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
                <FaCode className="text-3xl" />
              </div>
              <h2 className="text-3xl font-bold">Kỹ Năng</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Frontend Category */}
              <div className={`relative px-5 py-6 rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
                <div className="text-center mb-4">
                  <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-900/40' : 'bg-blue-100/80'}`}>
                    <FaCode className="w-7 h-7 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold mt-3">Frontend Technologies</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-blue-50'} transition-colors duration-300`}>
                    <FaReact className="w-10 h-10 text-blue-400 mb-2" />
                    <span className="text-sm font-medium">React</span>
                  </div>
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-blue-50'} transition-colors duration-300`}>
                    <SiFlutter className="w-10 h-10 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">Flutter</span>
                  </div>
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-blue-50'} transition-colors duration-300`}>
                    <FaJs className="w-10 h-10 text-yellow-400 mb-2" />
                    <span className="text-sm font-medium">JavaScript</span>
                  </div>
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-blue-50'} transition-colors duration-300`}>
                    <SiTailwindcss className="w-10 h-10 text-cyan-400 mb-2" />
                    <span className="text-sm font-medium">Tailwind</span>
                  </div>
                </div>
              </div>
              
              {/* Backend Category */}
              <div className={`relative px-5 py-6 rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
                <div className="text-center mb-4">
                  <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center ${isDark ? 'bg-green-900/40' : 'bg-green-100/80'}`}>
                    <FaServer className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold mt-3">Backend Technologies</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-green-50'} transition-colors duration-300`}>
                    <FaNodeJs className="w-10 h-10 text-green-500 mb-2" />
                    <span className="text-sm font-medium">Node.js</span>
                  </div>
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-green-50'} transition-colors duration-300`}>
                    <FaCode className="w-10 h-10 text-indigo-400 mb-2" />
                    <span className="text-sm font-medium">RESTful API</span>
                  </div>
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-green-50'} transition-colors duration-300`}>
                    <FaKey className="w-10 h-10 text-yellow-500 mb-2" />
                    <span className="text-sm font-medium">JWT</span>
                  </div>
                </div>
              </div>
              
              {/* Data Technologies */}
              <div className={`relative px-5 py-6 rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
                <div className="text-center mb-4">
                  <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center ${isDark ? 'bg-yellow-900/40' : 'bg-yellow-100/80'}`}>
                    <FaDatabase className="w-7 h-7 text-yellow-500" />
                  </div>
                  <h3 className="text-lg font-bold mt-3">Data Technologies</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-yellow-50'} transition-colors duration-300`}>
                    <SiMongodb className="w-10 h-10 text-green-500 mb-2" />
                    <span className="text-sm font-medium">MongoDB</span>
                  </div>
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-yellow-50'} transition-colors duration-300`}>
                    <SiMysql className="w-10 h-10 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">SQL Server</span>
                  </div>
                </div>
              </div>
              
              {/* Tools & Source Control */}
              <div className={`relative px-5 py-6 rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
                <div className="text-center mb-4">
                  <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center ${isDark ? 'bg-red-900/40' : 'bg-red-100/80'}`}>
                    <FaTools className="w-7 h-7 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold mt-3">Source Control & Tools</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-red-50'} transition-colors duration-300`}>
                    <FaGitAlt className="w-10 h-10 text-orange-500 mb-2" />
                    <span className="text-sm font-medium">Git</span>
                  </div>
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-red-50'} transition-colors duration-300`}>
                    <FaGithub className="w-10 h-10 text-gray-700 dark:text-gray-300 mb-2" />
                    <span className="text-sm font-medium">GitHub</span>
                  </div>
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-red-50'} transition-colors duration-300`}>
                    <FaRobot className="w-10 h-10 text-cyan-400 mb-2" />
                    <span className="text-sm font-medium">ChatGPT</span>
                  </div>
                  <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-red-50'} transition-colors duration-300`}>
                    <SiVscodium className="w-10 h-10 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">Cursor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft Skills Section */}
            <div className={`relative mt-5 px-5 py-6 rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'} col-span-1 md:col-span-2 lg:col-span-4`}>
              <div className="text-center mb-6">
                <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center ${isDark ? 'bg-purple-900/40' : 'bg-purple-100/80'}`}>
                  <FaUsers className="w-7 h-7 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold mt-3">Soft Skills</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-purple-50'} transition-colors duration-300`}>
                  <FaClock className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-sm font-medium text-center">Time Management</span>
                </div>
                <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-purple-50'} transition-colors duration-300`}>
                  <FaComments className="w-8 h-8 text-green-400 mb-2" />
                  <span className="text-sm font-medium text-center">Communication</span>
                </div>
                <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-purple-50'} transition-colors duration-300`}>
                  <FaUsers className="w-8 h-8 text-orange-400 mb-2" />
                  <span className="text-sm font-medium text-center">Teamwork</span>
                </div>
                <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-purple-50'} transition-colors duration-300`}>
                  <FaSearch className="w-8 h-8 text-red-400 mb-2" />
                  <span className="text-sm font-medium text-center">Attention to Detail</span>
                </div>
                <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-purple-50'} transition-colors duration-300`}>
                  <FaSyncAlt className="w-8 h-8 text-indigo-400 mb-2" />
                  <span className="text-sm font-medium text-center">Adaptability</span>
                </div>
                <div className={`flex flex-col items-center p-3 rounded-lg ${isDark ? 'bg-blue-900/30 hover:bg-blue-800/40' : 'bg-gray-100 hover:bg-purple-50'} transition-colors duration-300`}>
                  <FaPuzzlePiece className="w-8 h-8 text-teal-400 mb-2" />
                  <span className="text-sm font-medium text-center">Flexibility</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Experience Section */}
        <section 
          ref={experienceRef} 
          className={`py-8 ${isDark ? 'bg-blue-950' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
          rounded-3xl shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
        >
          <div className="container mx-auto px-3 md:px-4 lg:px-5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
                <FaBriefcase className="text-3xl" />
              </div>
              <h2 className="text-3xl font-bold">Kinh Nghiệm Làm Việc</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Experience Item 1 */}
              <div className={`group relative ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 rounded-xl shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'} transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'}`}>
                      <FaBriefcase className={`text-xl ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Mobile Developer Intern</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>10/2022 - 01/2023</p>
                    </div>
                  </div>
                  <ul className={`space-y-2 p-4 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'} text-sm`}>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">•</span>
                      <span>Phát triển các tính năng mới cho ứng dụng di động bằng Flutter và Firebase.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">•</span>
                      <span>Sửa lỗi (debug) và tối ưu hóa hiệu suất của ứng dụng.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">•</span>
                      <span>Làm việc với API để tích hợp dữ liệu.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Experience Item 2 */}
              <div className={`group relative ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 rounded-xl shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'} transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'}`}>
                      <FaBriefcase className={`text-xl ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Frontend Developer (Project)</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>03/2022 - 06/2022</p>
                    </div>
                  </div>
                  <ul className={`space-y-2 p-4 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'} text-sm`}>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">•</span>
                      <span>Xây dựng giao diện người dùng (UI) bằng React và Tailwind CSS cho một dự án web.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">•</span>
                      <span>Tích hợp các API backend và quản lý trạng thái ứng dụng.</span>
                    </li>
                     <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">•</span>
                      <span>Đảm bảo thiết kế đáp ứng (responsive) trên các thiết bị khác nhau.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Info Section */}
        <section 
          ref={personalInfoRef}
          className={`py-8 ${isDark ? 'bg-blue-950' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
          rounded-3xl shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
        >
          <div className="container mx-auto px-3 md:px-4 lg:px-5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
                <FaUser className="text-3xl" />
              </div>
              <h2 className="text-3xl font-bold">Giá Trị & Mục Tiêu</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: Personal Values */}
              <div className={`group relative ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 rounded-xl shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'} transition-all duration-300 hover:shadow-xl`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">Giá Trị Cá Nhân</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className={`w-8 h-8 mt-0.5 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'} flex-shrink-0`}>
                        <FaStar className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">Sáng Tạo</h4>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                          Luôn tìm kiếm những giải pháp mới và sáng tạo cho các vấn đề.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-8 h-8 mt-0.5 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'} flex-shrink-0`}>
                        <FaLightbulb className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">Học Hỏi Liên Tục</h4>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                          Luôn cập nhật kiến thức và kỹ năng mới trong lĩnh vực công nghệ.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-8 h-8 mt-0.5 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'} flex-shrink-0`}>
                        <FaHandshake className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">Làm Việc Nhóm</h4>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                          Tin tưởng vào sức mạnh của hợp tác và chia sẻ ý tưởng.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Right Column: Career Goals */}
              <div className={`group relative ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 rounded-xl shadow-lg border ${isDark ? 'border-blue-700' : 'border-blue-200'} transition-all duration-300 hover:shadow-xl`}>
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-purple-500/10' : 'bg-purple-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">Mục Tiêu Nghề Nghiệp</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className={`w-8 h-8 mt-0.5 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'} flex-shrink-0`}>
                        <FaRocket className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">Phát Triển Kỹ Năng</h4>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                          Phát triển chuyên môn sâu về công nghệ web và phát triển di động.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-8 h-8 mt-0.5 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'} flex-shrink-0`}>
                        <FaChartLine className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">Xây Dựng Sản Phẩm</h4>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                          Xây dựng ứng dụng có tác động tích cực đến người dùng và cộng đồng.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-8 h-8 mt-0.5 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'} flex-shrink-0`}>
                        <FaUsers className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">Lãnh Đạo Kỹ Thuật</h4>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                          Phát triển khả năng lãnh đạo kỹ thuật và quản lý dự án hiệu quả.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section 
          ref={interestsRef} 
          className={`py-8 ${isDark ? 'bg-blue-900' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} 
          rounded-3xl shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
        >
          <div className="container mx-auto px-3 md:px-4 lg:px-5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
                <FaHeart className="text-3xl" />
              </div>
              <h2 className="text-3xl font-bold">Sở Thích</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Giảm gap nếu cần */}
              {/* Hobby Card 1 */}
              <div className={`group relative overflow-hidden rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
                 <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                 <div className="relative z-10 min-h-[180px] flex flex-col items-center">
                   <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'} mb-4`}>
                     <FaFutbol className={`text-3xl text-green-500`} />
                   </div>
                   <h3 className="text-lg font-bold mb-2 text-center">Bóng Đá</h3>
                   <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center text-sm`}>
                     Đam mê theo dõi và chơi bóng đá. Là fan của Manchester United.
                   </p>
                 </div>
               </div>
               
               {/* Hobby Card 2 */}
              <div className={`group relative overflow-hidden rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
                 <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                 <div className="relative z-10 min-h-[180px] flex flex-col items-center">
                   <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'} mb-4`}>
                     <FaBook className={`text-3xl text-blue-500`} />
                   </div>
                   <h3 className="text-lg font-bold mb-2 text-center">Đọc Sách</h3>
                   <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center text-sm`}>
                     Yêu thích đọc sách về công nghệ, khoa học và phát triển bản thân.
                   </p>
                 </div>
               </div>
               
               {/* Hobby Card 3 */}
              <div className={`group relative overflow-hidden rounded-xl ${isDark ? 'bg-indigo-950' : 'bg-white'} p-5 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 border ${isDark ? 'border-blue-700' : 'border-blue-200'}`}>
                 <div className={`absolute -right-16 -bottom-16 w-40 h-40 ${isDark ? 'bg-purple-500/10' : 'bg-purple-100'} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                 <div className="relative z-10 min-h-[180px] flex flex-col items-center">
                   <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800' : 'bg-blue-100'} mb-4`}>
                     <FaPlane className={`text-3xl text-purple-500`} />
                   </div>
                   <h3 className="text-lg font-bold mb-2 text-center">Du Lịch</h3>
                   <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center text-sm`}>
                     Thích khám phá những vùng đất mới và trải nghiệm văn hóa khác nhau.
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section 
          ref={contactRef}
          className={`py-8 ${isDark ? 'bg-gradient-to-br from-blue-900 to-indigo-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} 
          rounded-3xl shadow-lg border ${isDark ? 'border-blue-800' : 'border-blue-300'}`}
        >
          <div className="container mx-auto px-3 md:px-4 lg:px-5">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Hãy Kết Nối Với Tôi</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 text-lg`}>
                Tôi luôn mở cho các cơ hội hợp tác và dự án mới. Hãy liên hệ nếu bạn muốn cùng nhau xây dựng những sản phẩm tuyệt vời!
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="mailto:nghthai02@gmail.com" 
                  className="group flex items-center justify-center">
                  <span className={`inline-flex items-center px-6 py-3 rounded-full ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium transition-all duration-300 transform group-hover:scale-105`}>
                    <FaEnvelope className="mr-2" /> Liên hệ Email
                    <span className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-500' : 'bg-blue-400'} group-hover:scale-110 transition-transform`}>
                      <FaArrowRight className="text-xs" />
                    </span>
                  </span>
                </a>
                
                <a 
                  href="https://github.com/Haimichi" 
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center">
                  <span className={`inline-flex items-center px-6 py-3 rounded-full border-2 ${isDark ? 'border-blue-400 text-blue-200 hover:border-blue-300' : 'border-blue-500 text-blue-600 hover:border-blue-400'} font-medium transition-all duration-300 transform group-hover:scale-105`}>
                    <FaGithub className="mr-2" /> GitHub
                    <span className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-800/50' : 'bg-blue-100'} group-hover:scale-110 transition-transform`}>
                      <FaArrowRight className="text-xs" />
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;