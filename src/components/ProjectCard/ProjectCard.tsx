import React from 'react';
import { Link } from 'react-router-dom';
import type { ProjectData } from '../../types/api';
import LazyProjectImage from '../LazyProjectImage/LazyProjectImage';
import './ProjectCard.scss';

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Optionnel : on remplace les espaces par des tirets pour créer une URL propre
  const projectSlug = project.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="project-card">
      <Link to={`/projets/${projectSlug}`} className="project-link">
        <div className="project-image-container">
          <LazyProjectImage 
            project={project}
            alt={project.name}
            className="project-card-image"
          />
        </div>
        <div className="project-content">
          <h3 className="project-title">{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-technologies">
            {project.technologies?.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
