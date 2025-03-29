import React from 'react';
import { FaDownload, FaCode, FaLaptopCode, FaServer, FaTools } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-white dark:bg-blue-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="bg-white dark:bg-blue-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="rounded-full overflow-hidden border-4 border-primary/20 shadow-xl max-w-xs mx-auto">
              <img 
                src="/images/profile.jpg" 
                alt="Nguyễn Huỳnh Thanh Hải" 
                className="w-full h-auto" 
              />
            </div>
          </div>
          
          <div className="md:w-2/3 md:pl-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Về Tôi</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Xin chào! Tôi là Nguyễn Huỳnh Thanh Hải, một nhà phát triển ứng dụng di động và web với đam mê tạo ra các sản phẩm có giá trị.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Họ và tên:</span>
                <span className="text-gray-600 dark:text-gray-300">Nguyễn Huỳnh Thanh Hải</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Ngày sinh:</span>
                <span className="text-gray-600 dark:text-gray-300">[Ngày sinh của bạn]</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Email:</span>
                <span className="text-gray-600 dark:text-gray-300">[Email của bạn]</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Điện thoại:</span>
                <span className="text-gray-600 dark:text-gray-300">[Số điện thoại của bạn]</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Địa chỉ:</span>
                <span className="text-gray-600 dark:text-gray-300">TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
            
            <a 
              href="https://27vvzl-my.sharepoint.com/:b:/g/personal/thanhhai_27vvzl_onmicrosoft_com/EXKdDATPTvxFma9lzbUJFzsBYc6tokKwB_LH5T0Vk7Q0pw?e=ylYnjo" 
              download 
              className="btn btn-primary inline-flex items-center"
            >
              <FaDownload className="mr-2" /> Tải CV
            </a>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 bg-gray-50 dark:bg-blue-950 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Học Vấn</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 border-l-2 border-primary">
            <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary -ml-[9px]"></div>
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Đại học [Tên trường của bạn]</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2">[Năm bắt đầu] - [Năm kết thúc]</p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">Chuyên ngành: [Chuyên ngành của bạn]</p>
              <p className="text-gray-600 dark:text-gray-300">GPA: [GPA của bạn]</p>
            </div>
            
            {/* Thêm nhiều học vấn khác nếu cần */}
            <div className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-primary -ml-[9px]"></div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-white dark:bg-blue-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Kỹ Năng</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 dark:bg-blue-800 p-6 rounded-lg shadow-md transition-colors duration-500">
              <div className="flex justify-center mb-4">
                <FaCode className="text-primary text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">Front-end</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">HTML/CSS</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">JavaScript</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">React</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">Tailwind</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-blue-800 p-6 rounded-lg shadow-md transition-colors duration-500">
              <div className="flex justify-center mb-4">
                <FaLaptopCode className="text-primary text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">Mobile</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">Flutter</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">Dart</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">React Native</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">iOS/Swift</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-blue-800 p-6 rounded-lg shadow-md transition-colors duration-500">
              <div className="flex justify-center mb-4">
                <FaServer className="text-primary text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">Back-end</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">Node.js</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">Express</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">MySQL</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">MongoDB</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-blue-800 p-6 rounded-lg shadow-md transition-colors duration-500">
              <div className="flex justify-center mb-4">
                <FaTools className="text-primary text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">Tools</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">Git/GitHub</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">VS Code</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">Firebase</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="w-1/3 text-gray-700 dark:text-gray-300">Figma</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 bg-gray-50 dark:bg-blue-950 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Kinh Nghiệm Làm Việc</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 border-l-2 border-primary">
            <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary -ml-[9px]"></div>
            
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">[Vị trí công việc] - [Tên công ty]</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">[Thời gian làm việc]</p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex">
                  <div className="mr-2">•</div>
                  <div>Mô tả công việc và thành tựu 1 - Bạn có thể mô tả chi tiết về những gì bạn đã làm và đạt được trong vị trí này.</div>
                </li>
                <li className="flex">
                  <div className="mr-2">•</div>
                  <div>Mô tả công việc và thành tựu 2 - Hãy tập trung vào những đóng góp và thành tựu cụ thể thay vì chỉ liệt kê nhiệm vụ.</div>
                </li>
                <li className="flex">
                  <div className="mr-2">•</div>
                  <div>Mô tả công việc và thành tựu 3 - Nếu có thể, hãy sử dụng số liệu cụ thể để minh họa cho tác động của bạn.</div>
                </li>
              </ul>
            </div>
            
            {/* Thêm kinh nghiệm làm việc khác nếu cần */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">[Vị trí công việc khác] - [Tên công ty khác]</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">[Thời gian làm việc]</p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex">
                  <div className="mr-2">•</div>
                  <div>Mô tả công việc và thành tựu 1 trong vị trí này.</div>
                </li>
                <li className="flex">
                  <div className="mr-2">•</div>
                  <div>Mô tả công việc và thành tựu 2 trong vị trí này.</div>
                </li>
              </ul>
            </div>
            
            <div className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-primary -ml-[9px]"></div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="bg-white dark:bg-blue-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Sở Thích & Hoạt Động</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-blue-800 p-6 rounded-lg shadow-md text-center transition-colors duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary">
                <FaCode className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Lập Trình</h3>
              <p className="text-gray-600 dark:text-gray-300">Tham gia các dự án mã nguồn mở và hackathon. Tôi thường xuyên học hỏi công nghệ mới và áp dụng vào các dự án cá nhân.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-blue-800 p-6 rounded-lg shadow-md text-center transition-colors duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary">
                <i className="fas fa-book text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Đọc Sách</h3>
              <p className="text-gray-600 dark:text-gray-300">Yêu thích sách về công nghệ, phát triển bản thân và tiểu thuyết. Tôi tin rằng đọc sách là cách tốt nhất để mở rộng kiến thức và trí tưởng tượng.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-blue-800 p-6 rounded-lg shadow-md text-center transition-colors duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary">
                <i className="fas fa-hiking text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Du Lịch</h3>
              <p className="text-gray-600 dark:text-gray-300">Khám phá các vùng đất mới và trải nghiệm văn hóa khác nhau. Tôi tin rằng du lịch giúp mở rộng tầm nhìn và tạo ra nhiều ý tưởng mới.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;