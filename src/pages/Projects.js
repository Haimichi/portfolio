import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Booky Mobile App',
      description: 'Ứng dụng di động Flutter cho phép người dùng đọc và quản lý sách yêu thích. Booky là một dự án Flutter, được tạo ra như một điểm khởi đầu cho ứng dụng Flutter, giúp người dùng khám phá và quản lý các cuốn sách yêu thích của mình.',
      image: '/images/booky-detail.jpg',
      technologies: ['Flutter', 'Dart', 'Node.js', 'MySQL'],
      github: 'https://github.com/Haimichi/DoAn_LTMobile',
      demo: '#',
      features: [
        'Tìm kiếm sách theo tên, tác giả hoặc thể loại',
        'Xem thông tin chi tiết của sách',
        'Quản lý danh sách sách yêu thích',
        'Đánh dấu tiến độ đọc sách'
      ],
      year: '2024'
    },
    {
      id: 2,
      title: 'Manga Corner',
      description: 'Manga Corner là một ứng dụng web giúp người dùng khám phá và quản lý các bộ truyện tranh (manga) yêu thích của mình. Dự án này tập trung vào trải nghiệm người dùng và giao diện trực quan.',
      image: '/images/manga-corner-detail.jpg',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
      github: 'https://github.com/Haimichi/manga-corner',
      demo: '#',
      features: [
        'Tìm kiếm manga theo tên hoặc tác giả',
        'Xem thông tin chi tiết của manga bao gồm các chương, tác giả, và mô tả',
        'Quản lý danh sách manga yêu thích',
        'Đánh dấu các chương đã đọc'
      ],
      year: '2024'
    },
    {
      id: 3,
      title: 'Table Reservations',
      description: 'Hệ thống đặt bàn trực tuyến cho nhà hàng và quán ăn. Ứng dụng này giúp người dùng tìm kiếm, đặt bàn tại các nhà hàng, và quản lý các đơn đặt bàn của họ.',
      image: '/images/table-reservations-detail.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/Sushiba2ker/Table-reservations',
      demo: '#',
      features: [
        'Đặt bàn trực tuyến với nhiều tùy chọn',
        'Tìm kiếm nhà hàng theo vị trí, loại ẩm thực',
        'Quản lý lịch sử đặt bàn',
        'Hệ thống đánh giá và phản hồi'
      ],
      year: '2024'
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-blue-950 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 md:py-24">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Dự Án Của Tôi</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Dưới đây là các dự án tôi đã thực hiện trong thời gian qua, thể hiện kinh nghiệm và kỹ năng của tôi trong phát triển ứng dụng.
        </p>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`bg-white dark:bg-blue-900 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} transition-colors duration-500`}
            >
              <div className="md:w-1/2">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h2>
                
                <div className="flex items-center mb-4">
                  <div className="mr-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{project.year}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Tính Năng Chính</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center btn btn-outline"
                  >
                    <FaGithub className="mr-2" /> GitHub
                  </a>
                  
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center btn btn-primary"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;