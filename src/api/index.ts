import axios from 'axios';
import type { Project, EducationItem, JobItem } from '../types/api';

// Assurez-vous que cette URL est correcte et que votre API est bien lancée
const API_BASE_URL = 'http://localhost:21000'; 

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(`${API_BASE_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

export const fetchProjectByName = async (projectName: string): Promise<Project | null> => {
  try {
    const response = await axios.get<Project[]>(`${API_BASE_URL}/projects`);
    const project = response.data.find((p: Project) => p.name === projectName);
    return project || null;
  } catch (error) {
    console.error(`Failed to fetch project ${projectName}:`, error);
    return null;
  }
};


export const fetchEducationItems = async (): Promise<EducationItem[]> => {
  try {
    const response = await axios.get<EducationItem[]>(`${API_BASE_URL}/education`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch education items:", error);
    return [];
  }
};

export const fetchJobs = async (): Promise<JobItem[]> => {
  try {
    const response = await axios.get<JobItem[]>(`${API_BASE_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
};