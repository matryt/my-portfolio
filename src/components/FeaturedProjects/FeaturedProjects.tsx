import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useApi';
import type { ProjectData } from '../../types/api';
import LazyProjectImage from '../LazyProjectImage/LazyProjectImage';
import {
  getProjectSlug,
  getPlaceholderText,
  isFeaturedProject,
  getProjectDomain,
  getProjectStatusText
} from '../../utils/projectUtils';
import './FeaturedProjects.scss';

const FeaturedProjects: React.FC = () => {
  const { projects, loading } = useProjects();
  const { t } = useTranslation();

  const featuredProjects = useMemo(() => {
    const featured = projects.filter(isFeaturedProject);
    featured.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (featured.length > 0) return featured.slice(0, 3);
    return projects.slice(0, 3);
  }, [projects]);

  const getKicker = (p: ProjectData) => {
    const domain = getProjectDomain(p);
    const statusText = getProjectStatusText(p.status, t);
    return `${domain} · ${statusText}`.toUpperCase();
  };

  return (
    <section className="featured-projects-section">
      <div className="container">
        <h2 className="section-kicker mono-label">{t('home.featuredTitle')}</h2>

        <div className="featured-list">
          {loading ? (
            Array.from({ length: 3 }, (_, idx) => (
              <div key={idx} className="featured-item skeleton">
                <div className="featured-image-col skeleton-box"></div>
                <div className="featured-text-col">
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line title"></div>
                  <div className="skeleton-line text"></div>
                  <div className="skeleton-line text"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
            ))
          ) : (
            featuredProjects.map((project) => {
              const slug = getProjectSlug(project);
              const kicker = getKicker(project);
              const placeholder = getPlaceholderText(project);

              return (
                <div key={project.name} className="featured-item">
                  <div className="featured-image-col">
                    {project.hasImage ? (
                      <LazyProjectImage 
                        project={project} 
                        alt={project.name} 
                        className="featured-image"
                      />
                    ) : (
                      <div className="featured-placeholder">
                        <span className="placeholder-label">{placeholder}</span>
                      </div>
                    )}
                  </div>
                  <div className="featured-text-col">
                    <span className="item-kicker mono-label">{kicker}</span>
                    <h3 className="item-title">
                      <Link to={`/projets/${slug}`}>{project.name}</Link>
                    </h3>
                    <p className="item-description">{project.description}</p>
                    <div className="item-techs mono-label">
                      {project.technologies?.map((tech) => tech.toUpperCase()).join(' · ')}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="all-projects-wrapper">
          <Link to="/projets" className="all-projects-link">
            {t('home.allProjects')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
