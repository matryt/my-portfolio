import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../ProjectCard/ProjectCard';
import { fetchProjects } from '../../api';
import type { Project } from '../../types/api';
import './ProjectsPreviewSection.scss';

interface ProjectsPreviewSectionProps {
  maxProjects?: number;
}

const ProjectsPreviewSection: React.FC<ProjectsPreviewSectionProps> = ({ 
  maxProjects = 3 
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const allProjects = await fetchProjects();
      const displayedProjects = allProjects
        .filter(p => p.displayed)
        .slice(0, maxProjects);
      setProjects(displayedProjects);
    };
    getProjects();
  }, [maxProjects]);

  return (
    <section className="projects-preview-section">
      <div className="container">
        <h2 className="section-title">Mes Projets</h2>
        <div className="projects-grid">
          {projects.map((project: Project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
        {projects.length > 0 && (
          <div className="view-all-container">
            <Link to="/projets" className="view-all-button">
              Voir tous les projets
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPreviewSection;
