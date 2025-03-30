import React, { useState, useEffect } from 'react';
import { 
  FaReact, FaNodeJs, FaJs 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTypescript, SiJavascript, SiVercel, 
  SiVscodium, SiFigma, SiFlutter, SiMongodb
} from 'react-icons/si';

// Component TechGrid để quản lý trạng thái hover cho các technology
const TechGrid = ({ isDark, defaultBorder }) => {
  const [activetech, setActiveTech] = useState('Technology');
  const [activeTechColor, setActiveTechColor] = useState('text-white');
  const [isChanging, setIsChanging] = useState(false);
  
  const technologies = [
    {
      name: 'Next.js',
      icon: <SiNextdotjs className="text-white" />,
      color: 'text-white'
    },
    {
      name: 'Flutter',
      icon: <SiFlutter className="text-[#0468D7]" />,
      color: 'text-[#0468D7]'
    },
    {
      name: 'React',
      icon: <FaReact className="text-[#61DAFB]" />,
      color: 'text-[#61DAFB]'
    },
    {
      name: 'Tailwind',
      icon: <SiFlutter className="text-[#38BDF8]" />,
      color: 'text-[#38BDF8]'
    },
    {
      name: 'JavaScript',
      icon: <SiJavascript className="text-[#F7DF1E]" />,
      color: 'text-[#F7DF1E]'
    },
    {
      name: 'TypeScript',
      icon: <SiTypescript className="text-[#3178C6]" />,
      color: 'text-[#3178C6]'
    },
    {
      name: 'Node.js',
      icon: <FaNodeJs className="text-[#539E43]" />,
      color: 'text-[#539E43]'
    },
    {
      name: 'VS Code',
      icon: <SiVscodium className="text-[#007ACC]" />,
      color: 'text-[#007ACC]'
    },
    {
      name: 'Figma',
      icon: <SiFigma className="text-[#F24E1E]" />,
      color: 'text-[#F24E1E]'
    },
    {
      name: 'MongoDB',
      icon: <SiMongodb className="text-[#47A248]" />,
      color: 'text-[#47A248]'
    }
  ];

  // Hàm xử lý khi hover vào một công nghệ
  const handleTechHover = (tech, color) => {
    setIsChanging(true);
    setActiveTech(tech);
    setActiveTechColor(color);
  };

  // Hàm xử lý khi không hover nữa
  const handleTechLeave = () => {
    setIsChanging(true);
    setActiveTech('Technology');
    setActiveTechColor(isDark ? 'text-white' : 'text-gray-800');
  };

  // Loại bỏ useEffect cho hiệu ứng hover vì chúng ta sẽ dùng Tailwind
  useEffect(() => {
    if (isChanging) {
      const timer = setTimeout(() => {
        setIsChanging(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isChanging, activetech]);

  // Đồng bộ màu sắc với theme website
  const bgClass = isDark ? 'bg-indigo-950' : 'bg-white';
  const borderClass = defaultBorder || (isDark ? 'border-blue-900' : 'border-gray-200');
  const textClass = isDark ? 'text-white' : 'text-gray-800';

  // Hàm trả về gradient class cho công nghệ màu trắng
  const getGradientClass = (tech, color) => {
    // Nếu là Technology mặc định, dùng màu theo theme
    if (tech === 'Technology') {
      return isDark ? 'text-white' : 'text-gray-800';
    }
    
    // Tạo gradient đặc biệt cho Next.js
    if (tech === 'Next.js') {
      if (isDark) {
        return 'bg-gradient-to-r from-white via-blue-100 to-indigo-200 text-transparent bg-clip-text';
      } else {
        return 'bg-gradient-to-r from-black via-blue-900 to-indigo-800 text-transparent bg-clip-text';
      }
    }
    
    // Chỉ áp dụng gradient cho các công nghệ có màu trắng
    if (color === 'text-white') {
      if (isDark) {
        return 'bg-gradient-to-r from-white via-gray-300 to-gray-400 text-transparent bg-clip-text';
      } else {
        return 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 text-transparent bg-clip-text';
      }
    }
    
    // Trả về màu gốc cho các công nghệ khác
    return color;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-6 pt-2">
      {/* 4 ô đầu tiên ở hàng 1 */}
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer overflow-hidden group border-2 ${borderClass} ${isDark ? 'hover:border-white' : 'hover:border-black'}`}
          onMouseEnter={() => handleTechHover('Next', 'text-white')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[0].icon, { className: 'w-20 h-20 transition-transform duration-300 group-hover:scale-110' })}
          </div>
        </div>
      </div>
      
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer overflow-hidden group border-2 ${borderClass} hover:border-[#0468D7]`}
          onMouseEnter={() => handleTechHover('Flutter', 'text-[#0468D7]')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0468D7]/10 to-[#0468D7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[1].icon, { className: `w-20 h-20 ${technologies[1].color} transition-transform duration-300 group-hover:scale-110` })}
          </div>
        </div>
      </div>
      
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-400/30 cursor-pointer overflow-hidden group border-2 ${borderClass} hover:border-[#61DAFB]`}
          onMouseEnter={() => handleTechHover('React', 'text-[#61DAFB]')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#61DAFB]/10 to-[#61DAFB]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[2].icon, { className: `w-20 h-20 ${technologies[2].color} transition-transform duration-300 group-hover:scale-110` })}
          </div>
        </div>
      </div>
      
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer overflow-hidden group border-2 ${borderClass} hover:border-[#38BDF8]`}
          onMouseEnter={() => handleTechHover('Tailwind', 'text-[#38BDF8]')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 to-[#38BDF8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[3].icon, { className: `w-20 h-20 ${technologies[3].color} transition-transform duration-300 group-hover:scale-110` })}
            </div>
          </div>
      </div>
      
      {/* Ô "Technology is my weapon" ở hàng 1, 2 cột bên phải */}
      <div className="col-span-2 row-span-1">
        <div className={`h-full ${bgClass} rounded-3xl border ${borderClass} flex items-center justify-center p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
          <div className="text-center">
            <div className={`transition-all duration-500 ${isChanging ? 'blur-sm' : ''}`}>
              <h2 className={`text-4xl md:text-5xl font-bold ${getGradientClass(activetech, activeTechColor)} mb-2`}>
            {activetech}
              </h2>
              <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                is my weapon
              </h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hàng thứ hai */}
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/30 cursor-pointer overflow-hidden group border-2 ${borderClass} hover:border-[#F7DF1E]`}
          onMouseEnter={() => handleTechHover('JavaScript', 'text-[#F7DF1E]')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7DF1E]/10 to-[#F7DF1E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[4].icon, { className: `w-20 h-20 ${technologies[4].color} transition-transform duration-300 group-hover:scale-110` })}
          </div>
        </div>
      </div>
      
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer overflow-hidden group border-2 ${borderClass} hover:border-[#3178C6]`}
          onMouseEnter={() => handleTechHover('TypeScript', 'text-[#3178C6]')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3178C6]/10 to-[#3178C6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[5].icon, { className: `w-20 h-20 ${technologies[5].color} transition-transform duration-300 group-hover:scale-110` })}
          </div>
        </div>
      </div>
      
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/30 cursor-pointer overflow-hidden group border-2 ${borderClass} hover:border-[#539E43]`}
          onMouseEnter={() => handleTechHover('Node.js', 'text-[#539E43]')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#539E43]/10 to-[#539E43]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[6].icon, { className: `w-20 h-20 ${technologies[6].color} transition-transform duration-300 group-hover:scale-110` })}
          </div>
        </div>
      </div>
      
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer overflow-hidden group border-2 ${borderClass} hover:border-[#007ACC]`}
          onMouseEnter={() => handleTechHover('VS Code', 'text-[#007ACC]')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#007ACC]/10 to-[#007ACC]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[7].icon, { className: `w-20 h-20 ${technologies[7].color} transition-transform duration-300 group-hover:scale-110` })}
          </div>
        </div>
      </div>
      
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30 cursor-pointer overflow-hidden group border-2 ${borderClass} hover:border-[#F24E1E]`}
          onMouseEnter={() => handleTechHover('Figma', 'text-[#F24E1E]')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F24E1E]/10 to-[#F24E1E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[8].icon, { className: `w-20 h-20 ${technologies[8].color} transition-transform duration-300 group-hover:scale-110` })}
          </div>
            </div>
          </div>
      
      <div className="col-span-1">
        <div 
          className={`aspect-square ${bgClass} rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/30 cursor-pointer overflow-hidden group border-2 ${borderClass} hover:border-[#47A248]`}
          onMouseEnter={() => handleTechHover('MongoDB', 'text-[#47A248]')}
          onMouseLeave={handleTechLeave}
        >
          <div className="w-full h-full flex items-center justify-center relative p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#47A248]/10 to-[#47A248]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {React.cloneElement(technologies[9].icon, { className: `w-20 h-20 ${technologies[9].color} transition-transform duration-300 group-hover:scale-110` })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default TechGrid;