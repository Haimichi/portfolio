import React from 'react';

const SkillBar = ({ skill, percentage }) => {
  return (
    <div className="group">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 dark:text-gray-300">{skill}</span>
        <span className="text-gray-500 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out group-hover:bg-gradient-to-r from-blue-500 to-indigo-600"
          style={{ 
            width: `${percentage}%`,
            transform: 'translateX(-100%)',
            animation: 'slideRight 1s forwards'
          }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;