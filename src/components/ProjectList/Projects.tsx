// src/pages/Projects.tsx
import React, { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard';
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
    return <div className="loading-message">Chargement des projets...</div>;
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