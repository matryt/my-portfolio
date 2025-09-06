import axios from 'axios';
import type { ProjectData, ProjectImages, EducationItem, JobItem } from '../types/api';

// Assurez-vous que cette URL est correcte et que votre API est bien lancée
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:21000'; 

export const fetchProjects = async (lang: 'fr' | 'en' = 'fr'): Promise<ProjectData[]> => {
  try {
    const response = await axios.get<ProjectData[]>(`${API_BASE_URL}/projects?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

export const fetchProjectByName = async (projectName: string, lang: 'fr' | 'en' = 'fr'): Promise<ProjectData | null> => {
  try {
    const response = await axios.get<ProjectData[]>(`${API_BASE_URL}/projects?lang=${lang}`);
    const project = response.data.find((p: ProjectData) => p.name === projectName);
    return project || null;
  } catch (error) {
    console.error(`Failed to fetch project ${projectName}:`, error);
    return null;
  }
};

// Nouvelle fonction pour récupérer l'image d'un projet
export const fetchProjectImages = async (projectName: string, lang: 'fr' | 'en' = 'fr'): Promise<ProjectImages | null> => {
  try {
    const encodedName = encodeURIComponent(projectName);
    const url = `${API_BASE_URL}/project-image/${encodedName}?lang=${lang}`;
    const response = await axios.get<ProjectImages>(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch images for project ${projectName}:`, error);
    return null;
  }
};

// Fonction pour récupérer les images de plusieurs projets en batch
export const fetchProjectImagesBatch = async (projectNames: string[], lang: 'fr' | 'en' = 'fr'): Promise<ProjectImages[]> => {
  try {
    const response = await axios.post<ProjectImages[]>(`${API_BASE_URL}/project-images-batch?lang=${lang}`, {
      projectNames
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch batch project images:", error);
    return [];
  }
};

export const fetchEducationItems = async (lang: 'fr' | 'en' = 'fr'): Promise<EducationItem[]> => {
  try {
    const response = await axios.get<EducationItem[]>(`${API_BASE_URL}/education?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch education items:", error);
    return [];
  }
};

export const fetchJobs = async (lang: 'fr' | 'en' = 'fr'): Promise<JobItem[]> => {
  try {
    const response = await axios.get<JobItem[]>(`${API_BASE_URL}/jobs?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
};
