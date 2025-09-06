import { useLanguage } from '../contexts/LanguageContext';
import { fetchProjects, fetchEducationItems, fetchJobs } from '../api';
import { useEffect, useState } from 'react';
import type { ProjectData, EducationItem, JobItem } from '../types/api';

// Hook pour fetch des projets avec la langue actuelle
export const useProjects = () => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects(language);
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { projects, loading, error };
};

// Hook pour fetch des éléments d'éducation avec la langue actuelle
export const useEducation = () => {
  const { language } = useLanguage();
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEducationItems(language);
        setEducation(data);
      } catch (err) {
        setError('Failed to fetch education');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { education, loading, error };
};

// Hook pour fetch des jobs avec la langue actuelle
export const useJobs = () => {
  const { language } = useLanguage();
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchJobs(language);
        setJobs(data);
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { jobs, loading, error };
};

// Hook pour fetch un projet spécifique avec la langue actuelle
export const useProject = (projectName: string) => {
  const { language } = useLanguage();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectName) {
        setProject(null);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        // Récupérer tous les projets et chercher celui qui correspond
        const allProjects = await fetchProjects(language);
        const foundProject = allProjects.find(
          (p) => p.name.toLowerCase().replace(/\s+/g, '-') === projectName
        );
        setProject(foundProject || null);
      } catch (err) {
        setError('Failed to fetch project');
        console.error(err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectName, language]);

  return { project, loading, error };
};
