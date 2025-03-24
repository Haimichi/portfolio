import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const { title, description, image, technologies, github, demo, features } = project;
  
  return (
    <div className="bg-white dark:bg-blue-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        {features && features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex space-x-3 mt-4">
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              <FaGithub className="mr-1" /> GitHub
            </a>
          )}
          
          {demo && (
            <a 
              href={demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              <FaExternalLinkAlt className="mr-1" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;