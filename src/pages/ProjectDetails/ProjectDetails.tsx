import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProject } from '../../hooks/useApi';
import './ProjectDetails.scss';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import ProjectBadges from '../../components/ProjectBadges/ProjectBadges';
import { splitMultiLineText } from '../../utils/textUtils';

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Le hook useProject va chercher le projet par nom avec la langue actuelle
  const { project, loading } = useProject(projectName || '');

  // Rediriger si le projet n'est pas trouvé après le chargement
  useEffect(() => {
    if (!loading && !project && projectName) {
      navigate('/projets');
    }
  }, [loading, project, projectName, navigate]);

  if (loading) {
    return <div className="loading-message">{t('projectDetail.loading', 'Chargement du projet...')}</div>;
  }

  if (!project) {
    return null;
  }

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
          {/* Affichage des partenaires */}
          {project.partners && project.partners.length > 0 && (
            <div className="project-partners">
              <h4>{t('projectDetail.collaborators')}:</h4>
              <ul>
                {project.partners.map((partner) => (
                  <li key={partner.username}>
                    {partner.name} {' '}
                    <a
                      href={partner.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @{partner.username}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
              <h3>{t('projectDetail.context')}</h3>
              {splitMultiLineText(project.longDescription)}
            </div>
          )}
          {project.problemsAndSolutions && (
            <div className="info-block">
              <h3>{t('projectDetail.problems')}</h3>
              {splitMultiLineText(project.problemsAndSolutions)}
            </div>
          )}
          {project.whatILearned && (
            <div className="info-block">
              <h3>{t('projectDetail.learned')}</h3>
              {splitMultiLineText(project.whatILearned)}
            </div>
          )}
        </div>
        <aside className="summary-sidebar">
          <div className="sidebar-block">
            <h3>{t('projectDetail.technologies')}</h3>
            <div className="tech-list">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
          <div className="sidebar-block">
            <h3>{t('projectDetail.links')}</h3>
            <div className="project-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-button">
                  {t('projectDetail.github')}
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-button">
                  {t('projectDetail.demo')}
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
