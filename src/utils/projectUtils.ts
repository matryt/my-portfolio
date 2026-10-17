import type { ProjectData } from '../types/api';

export const getProjectSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

export const getPlaceholderText = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('locations') || lower.includes('réservations') || lower.includes('reservation')) {
    return '[CAPTURE DU TABLEAU DE BORD]';
  }
  if (lower.includes('reconnaissance') || lower.includes('robot')) {
    return '[SCHÉMA DES TROIS COUCHES]';
  }
  if (lower.includes('qcm')) {
    return '[CAPTURE DE LA DÉMO]';
  }
  return '[CAPTURE DU PROJET]';
};

export const getDetailPlaceholderText = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('locations') || lower.includes('réservations') || lower.includes('reservation')) {
    return '[CAPTURE : CALENDRIER DES DISPONIBILITÉS]';
  }
  if (lower.includes('reconnaissance') || lower.includes('robot')) {
    return '[SCHÉMA DES TROIS COUCHES]';
  }
  if (lower.includes('qcm')) {
    return '[CAPTURE DE LA DÉMO]';
  }
  return `[CAPTURE : ${name.toUpperCase()}]`;
};

export const isFeaturedProject = (project: ProjectData): boolean => {
  if (project.featured) return true;
  const targets = ['locations', 'reconnaissance', 'qcm'];
  return targets.some(target => project.name.toLowerCase().includes(target));
};

export const getProjectDomain = (project: ProjectData): string => {
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
