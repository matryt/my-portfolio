// src/pages/Projects.tsx
import React, { useState, useEffect } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { fetchProjects } from '../../api';
import type { Project } from '../../types/api';
import './Projects.scss';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    };
    getProjects();
  }, []); 

  if (loading) {
    return (
      <div className="projects-page">
        <h1 className="page-title">Mes Projets</h1>
        <div className="projects-grid">
          {/* Placeholders skeleton pendant le chargement */}
          {Array.from({ length: 6 }, (_, idx) => (
            <div key={idx} className="project-card skeleton">
              <div className="skeleton-image"></div>
              <div className="project-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-description short"></div>
                <div className="skeleton-technologies">
                  <div className="skeleton-tech"></div>
                  <div className="skeleton-tech"></div>
                  <div className="skeleton-tech"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <h1 className="page-title">Mes Projets</h1>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;