import axios from 'axios';
import type { Project, EducationItem, JobItem } from '../types/api';

// Assurez-vous que cette URL est correcte et que votre API est bien lancée
const API_BASE_URL = 'http://localhost:21000'; 

export const fetchProjects = async (lang: 'fr' | 'en' = 'fr'): Promise<Project[]> => {
  console.log(lang);
  try {
    const response = await axios.get<Project[]>(`${API_BASE_URL}/projects?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

export const fetchProjectByName = async (projectName: string, lang: 'fr' | 'en' = 'fr'): Promise<Project | null> => {
  try {
    const response = await axios.get<Project[]>(`${API_BASE_URL}/projects?lang=${lang}`);
    const project = response.data.find((p: Project) => p.name === projectName);
    return project || null;
  } catch (error) {
    console.error(`Failed to fetch project ${projectName}:`, error);
    return null;
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