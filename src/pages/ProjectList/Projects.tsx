// src/pages/Projects.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { useProjects } from '../../hooks/useApi';
import './Projects.scss';

const Projects: React.FC = () => {
  const { projects, loading } = useProjects();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="projects-page">
        <h1 className="page-title">{t('navigation.projects')}</h1>
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
      <h1 className="page-title">{t('navigation.projects')}</h1>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;