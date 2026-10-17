import type { ProjectData } from '../types/api';

export const getProjectSlug = (projectOrName: { name: string; slug?: string } | string): string => {
  if (typeof projectOrName === 'string') {
    return projectOrName.toLowerCase().replace(/\s+/g, '-');
  }
  return projectOrName.slug || projectOrName.name.toLowerCase().replace(/\s+/g, '-');
};

export const getPlaceholderText = (projectOrName: { name: string; captureLabel?: string } | string): string => {
  if (typeof projectOrName === 'object') {
    if (projectOrName.captureLabel) {
      return `[CAPTURE : ${projectOrName.captureLabel.toUpperCase()}]`;
    }
    return `[CAPTURE : ${projectOrName.name.toUpperCase()}]`;
  }
  return `[CAPTURE : ${projectOrName.toUpperCase()}]`;
};

export const getDetailPlaceholderText = (projectOrName: { name: string; captureLabel?: string } | string): string => {
  return getPlaceholderText(projectOrName);
};

export const isFeaturedProject = (project: ProjectData): boolean => {
  if (project.featured !== undefined) {
    return Boolean(project.featured);
  }
  // Fallback de transition si la colonne Notion n'est pas encore renseignée
  const targets = ['locations', 'reconnaissance', 'qcm'];
  return targets.some(target => project.name.toLowerCase().includes(target));
};

export const getProjectDomain = (project: ProjectData): string => {
  if (project.domain) {
    return project.domain.toUpperCase();
  }
  const isEmbedded = project.technologies?.some(tech =>
    ['c++', 'arduino'].includes(tech.toLowerCase())
  );
  return isEmbedded ? 'EMBARQUÉ' : 'WEB';
};

export const getProjectStatusText = (status: string | undefined, t: (key: string) => string): string => {
  if (!status) return '';
  const map: Record<string, string> = {
    'in-progress': t('badges.status.inProgress'),
    'completed': t('badges.status.completed'),
    'paused': t('badges.status.paused'),
    'cancelled': t('badges.status.cancelled'),
    'waiting-maj': t('badges.status.waitingUpdate')
  };
  return (map[status] || status).toUpperCase();
};

export const getProjectTypeText = (project: ProjectData, t: (key: string) => string): string => {
  if (project.partners && project.partners.length > 0) {
    return t('badges.collaborative').toUpperCase();
  }
  if (project.projectType === 'school') {
    return 'SCOLAIRE';
  }
  return 'PERSO';
};
