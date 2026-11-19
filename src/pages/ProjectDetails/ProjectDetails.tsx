import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProject } from '../../hooks/useApi';
import { useProjectImage } from '../../hooks/useProjectImages';
import { useLanguage } from '../../contexts/LanguageContext';
import ProjectBadges from '../../components/ProjectBadges/ProjectBadges';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import { splitMultiLineText } from '../../utils/textUtils';
import { getDetailPlaceholderText } from '../../utils/projectUtils';
import './ProjectDetails.scss';

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Le hook useProject va chercher le projet par nom/slug avec la langue actuelle
  const { project, loading } = useProject(projectName || '');

  // Hook pour charger les images séparément
  const { imageData, hasScreenshots } = useProjectImage(
    project || {
      hasImage: false,
      hasScreenshots: false,
      name: '',
      description: '',
      github: '',
      displayed: false,
      technologies: [],
      partners: []
    },
    language
  );

  // Rediriger si le projet n'est pas trouvé après le chargement
  useEffect(() => {
    if (!loading && !project && projectName) {
      navigate('/projets');
    }
  }, [loading, project, projectName, navigate]);

  if (loading) {
    return (
      <div className="project-detail-page">
        <div className="loading-message">{t('projectDetail.loading', 'Chargement du projet...')}</div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <article className="project-detail-page">
      <Link to="/projets" className="back-link">
        ← {t('projectDetail.backToProjects', 'PROJETS')}
      </Link>

      <header className="project-header">
        <h1 className="project-title">{project.name}</h1>
        <p className="project-tagline">{project.description}</p>
        <ProjectBadges
          status={project.status}
          projectType={project.projectType}
          isCollaborative={Boolean(project.partners && project.partners.length > 0)}
        />
      </header>

      {/* Galerie d'images ou conteneur 16:9 éditorial */}
      <div className="project-media-container">
        {hasScreenshots && imageData?.screenshots && imageData.screenshots.length > 0 ? (
          <ImageGallery images={imageData.screenshots} />
        ) : imageData?.image ? (
          <div className="project-main-image">
            <img src={imageData.image} alt={project.name} />
          </div>
        ) : (
          <div className="project-placeholder-box">
            <span>{getDetailPlaceholderText(project)}</span>
          </div>
        )}
      </div>

      <section className="project-content-grid">
        <div className="content-main">
          {/* CE QUE FAIT LE SITE */}
          {(project.longDescription || project.description) && (
            <div className="editorial-block">
              <h2 className="block-title">{t('projectDetail.whatItDoes', 'Ce que fait le site')}</h2>
              <div className="block-body">
                {splitMultiLineText(project.longDescription || project.description)}
              </div>
            </div>
          )}

          {/* CHOIX DE CONCEPTION */}
          {project.designChoices && (
            <div className="editorial-block">
              <h2 className="block-title">{t('projectDetail.designChoices', 'Trois choix de conception')}</h2>
              <div className="block-body">
                {splitMultiLineText(project.designChoices)}
              </div>
            </div>
          )}

          {/* MISE EN PRODUCTION */}
          {(project.deployment || project.demo || project.demoNote) && (
            <div className="editorial-block">
              <h2 className="block-title">{t('projectDetail.deployment', 'Mise en production')}</h2>
              <div className="block-body">
                {project.deployment ? (
                  <div>{splitMultiLineText(project.deployment)}</div>
                ) : project.demo ? (
                  <p>
                    {t('projectDetail.deployedAt', 'Déployé et accessible en ligne :')}{' '}
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="deployment-link">
                      {project.demo}
                    </a>
                    {project.demoNote && (
                      <span className="deployment-restriction"> ({project.demoNote})</span>
                    )}
                  </p>
                ) : project.demoNote ? (
                  <p>
                    <strong>{t('projectDetail.access', 'Accès :')}</strong> {project.demoNote}
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </div>

        <aside className="content-sidebar">
          {/* TECHNOLOGIES */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">{t('projectDetail.technologies', 'Technologies')}</h3>
              <ul className="tech-list">
                {project.technologies.map((tech) => (
                  <li key={tech} className="tech-item">{tech}</li>
                ))}
              </ul>
            </div>
          )}

          {/* LIENS */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">{t('projectDetail.links', 'Liens')}</h3>
            <div className="links-list">
              {/* GITHUB */}
              {project.github ? (
                <div className="link-item">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    {t('projectDetail.github', 'GitHub')} →
                  </a>
                  {project.githubNote && (
                    <span className="link-note">({project.githubNote})</span>
                  )}
                </div>
              ) : project.githubNote ? (
                <div className="link-item link-item-note">
                  <span className="link-label">{t('projectDetail.githubShort', 'GitHub :')}</span>
                  <span className="link-note">{project.githubNote}</span>
                </div>
              ) : (
                <span className="placeholder-tag">{t('projectDetail.privateRepo', '[DÉPÔT PRIVÉ]')}</span>
              )}

              {/* DEMO */}
              {project.demo ? (
                <div className="link-item">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    {t('projectDetail.demo', 'Démo en ligne')} →
                  </a>
                  {project.demoNote && (
                    <span className="link-note">({project.demoNote})</span>
                  )}
                </div>
              ) : project.demoNote ? (
                <div className="link-item link-item-note">
                  <span className="link-label">{t('projectDetail.demoShort', 'Démo :')}</span>
                  <span className="link-note">{project.demoNote}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* CO-CRÉATEURS */}
          {project.partners && project.partners.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">
                {project.partners.length > 1
                  ? t('projectDetail.collaboratorsPlural', 'Co-créateurs')
                  : t('projectDetail.collaborators', 'Co-créateur')}
              </h3>
              <ul className="collaborators-list">
                {project.partners.map((partner) => (
                  <li key={partner.username} className="collaborator-item">
                    <span className="collaborator-name">{partner.name}</span>
                    <a
                      href={partner.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="collaborator-handle"
                    >
                      @{partner.username}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </article>
  );
};

export default ProjectDetail;
