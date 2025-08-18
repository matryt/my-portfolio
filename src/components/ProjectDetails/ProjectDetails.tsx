import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjects } from '../../api';
import type { Project } from '../../types/api';
import './ProjectDetails.scss';
import ImageGallery from '../ImageGallery/ImageGallery';
import ProjectBadges from '../ProjectBadges/ProjectBadges';

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProject = async () => {
      const allProjects = await fetchProjects();
      const foundProject = allProjects.find(
        (p) => p.name.toLowerCase().replace(/\s+/g, '-') === projectName
      );

      if (foundProject) {
        setProject(foundProject);
      } else {
        navigate('/projets');
      }
      setLoading(false);
    };
    getProject();
  }, [projectName, navigate]);

  if (loading) {
    return <div className="loading-message">Chargement du projet...</div>;
  }

  if (!project) {
    return null;
  }

  const splitMultiLineText = (text: string) => {
   
    const lines = text
      .replace(/\\n/g, '\n')  // Remplacer les \n échappés
      .replace(/<br\s*\/?>/gi, '\n') 
      .split('\n')
      .filter(line => line.trim() !== ''); // Supprimer les lignes vides
    
    console.log('Lignes après split:', lines); // Debug
    
    return lines.map((line: string, index: number) => (
      <p key={index}>{line.trim()}</p>
    ));
  };

  return (
    <div className="project-detail-page">
      <header className="project-header">
        <h1 className="project-title">{project.name}</h1>
        <p className="project-tagline">{project.description}</p>
        <ProjectBadges 
          status={project.status}
          projectType={project.projectType}
          isCollaborative={project.partners && project.partners.length > 0}
        />
      </header>
      
      {/* Galerie d'images - Adaptive */}
      {project.screenshots && project.screenshots.length > 0 && (
        <ImageGallery images={project.screenshots} />
      )}

      <hr className="divider" />
      
      <section className="project-summary">
        <div className="summary-text">
          {project.longDescription && (
            <div className="info-block">
              <h3>Contexte et fonctionnalités</h3>
              {splitMultiLineText(project.longDescription)}
            </div>
          )}
          {project.problemsAndSolutions && (
            <div className="info-block">
              <h3>Problèmes et solutions</h3>
              {splitMultiLineText(project.problemsAndSolutions)}
            </div>
          )}
          {project.whatILearned && (
            <div className="info-block">
              <h3>Ce que j'ai appris</h3>
              {splitMultiLineText(project.whatILearned)}
            </div>
          )}
        </div>
        <aside className="summary-sidebar">
          <div className="sidebar-block">
            <h3>Technologies utilisées</h3>
            <div className="tech-list">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
          <div className="sidebar-block">
            <h3>Liens du projet</h3>
            <div className="project-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-button">
                  Voir sur GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-button">
                  Voir la démo
                </a>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ProjectDetail;
