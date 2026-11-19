import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useApi';
import type { ProjectData } from '../../types/api';
import LazyProjectImage from '../../components/LazyProjectImage/LazyProjectImage';
import {
  getProjectSlug,
  getPlaceholderText,
  isFeaturedProject,
  getProjectDomain,
  getProjectStatusText,
  getProjectTypeText
} from '../../utils/projectUtils';
import './Projects.scss';

type FilterType = 'all' | 'personal' | 'school' | 'collaborative';

const Projects: React.FC = () => {
  const { projects, loading } = useProjects();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filtrage selon le filtre actif
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'collaborative') {
        return (project.partners && project.partners.length > 0);
      }
      if (activeFilter === 'school') {
        return project.projectType === 'school';
      }
      if (activeFilter === 'personal') {
        return project.projectType === 'personal' && (!project.partners || project.partners.length === 0);
      }
      return true;
    });
  }, [projects, activeFilter]);

  // Séparation Projets en avant / Archives
  const { featured, archives } = useMemo(() => {
    const featuredList: ProjectData[] = [];
    const archiveList: ProjectData[] = [];

    filteredProjects.forEach((p) => {
      if (isFeaturedProject(p)) {
        featuredList.push(p);
      } else {
        archiveList.push(p);
      }
    });

    // Ordonner les featured et les archives par ordre
    featuredList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    archiveList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return { featured: featuredList, archives: archiveList };
  }, [filteredProjects]);

  const getFullKicker = (p: ProjectData): string => {
    const domain = getProjectDomain(p);
    const status = getProjectStatusText(p.status, t);
    const type = getProjectTypeText(p, t);
    return [domain, status, type].filter(Boolean).join(' · ');
  };

  const getArchiveMeta = (p: ProjectData): string => {
    const techs = p.technologies ? p.technologies.slice(0, 3).map(t => t.toUpperCase()).join(' · ') : '';
    const status = getProjectStatusText(p.status, t);
    return [techs, status].filter(Boolean).join(' · ');
  };

  const filters: Array<{ key: FilterType; label: string }> = [
    { key: 'all', label: t('projectsPage.filters.all') },
    { key: 'personal', label: t('projectsPage.filters.personal') },
    { key: 'school', label: t('projectsPage.filters.school') },
    { key: 'collaborative', label: t('projectsPage.filters.collaborative') }
  ];

  return (
    <div className="projects-page">
      <div className="container">
        {/* Titre de la page */}
        <h1 className="page-title">{t('projectsPage.title')}</h1>

        {/* Filtres en texte mono */}
        <div className="project-filters">
          {filters.map(filter => (
            <button
              key={filter.key}
              type="button"
              className={`filter-btn mono-label ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Liste des projets en avant */}
        <div className="featured-projects-list">
          {loading ? (
            Array.from({ length: 3 }, (_, idx) => (
              <div key={idx} className="featured-project-item skeleton">
                <div className="item-image-col skeleton-box"></div>
                <div className="item-text-col">
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line title"></div>
                  <div className="skeleton-line text"></div>
                  <div className="skeleton-line text"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
            ))
          ) : (
            featured.map((project) => {
              const slug = getProjectSlug(project);
              const kicker = getFullKicker(project);
              const placeholder = getPlaceholderText(project);

              return (
                <div key={project.name} className="featured-project-item">
                  <div className="item-image-col">
                    {project.hasImage ? (
                      <LazyProjectImage 
                        project={project} 
                        alt={project.name} 
                        className="project-image"
                      />
                    ) : (
                      <div className="project-placeholder">
                        <span className="placeholder-label">{placeholder}</span>
                      </div>
                    )}
                  </div>
                  <div className="item-text-col">
                    <span className="item-kicker mono-label">{kicker}</span>
                    <h2 className="item-title">
                      <Link to={`/projets/${slug}`}>{project.name}</Link>
                    </h2>
                    <p className="item-description">{project.description}</p>
                    <div className="item-techs mono-label">
                      {project.technologies?.map(tech => tech.toUpperCase()).join(' · ')}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Section Archives */}
        {archives.length > 0 && (
          <section className="archives-section">
            <h2 className="archives-title mono-label">{t('projectsPage.archivesTitle')}</h2>
            <div className="archives-list">
              {archives.map((project) => {
                const slug = getProjectSlug(project);
                const meta = getArchiveMeta(project);

                return (
                  <div key={project.name} className="archive-row">
                    <div className="archive-name">
                      <Link to={`/projets/${slug}`}>{project.name}</Link>
                    </div>
                    <div className="archive-meta mono-label">
                      {meta}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {!loading && filteredProjects.length === 0 && (
          <p className="empty-message mono-label">{t('projectsPage.empty')}</p>
        )}
      </div>
    </div>
  );
};

export default Projects;