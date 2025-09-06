import { useState, useEffect } from 'react';
import { fetchProjectImages, fetchProjectImagesBatch } from '../api';
import type { ProjectData, ProjectImages } from '../types/api';

// Hook pour gérer le chargement d'image d'un projet individuel
export const useProjectImage = (project: ProjectData, lang: 'fr' | 'en' = 'fr') => {
  const [imageData, setImageData] = useState<ProjectImages | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    if (!project.hasImage && !project.hasScreenshots) {
      return; // Pas d'images à charger
    }

    setIsLoadingImage(true);
    setImageError(null);

    fetchProjectImages(project.name, lang)
      .then(data => {
        setImageData(data);
      })
      .catch(error => {
        console.error(`Failed to load images for ${project.name}:`, error);
        setImageError('Erreur de chargement des images');
      })
      .finally(() => {
        setIsLoadingImage(false);
      });
  }, [project.name, project.hasImage, project.hasScreenshots, lang]);

  return {
    imageData,
    isLoadingImage,
    imageError,
    hasImage: project.hasImage,
    hasScreenshots: project.hasScreenshots
  };
};

// Hook pour gérer le chargement d'images de plusieurs projets en batch
export const useProjectImagesBatch = (projects: ProjectData[], lang: 'fr' | 'en' = 'fr') => {
  const [imagesData, setImagesData] = useState<Map<string, ProjectImages>>(new Map());
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [imagesError, setImagesError] = useState<string | null>(null);

  useEffect(() => {
    // Filtrer les projets qui ont des images
    const projectsWithImages = projects.filter(p => p.hasImage || p.hasScreenshots);
    
    if (projectsWithImages.length === 0) {
      return; // Pas d'images à charger
    }

    setIsLoadingImages(true);
    setImagesError(null);

    const projectNames = projectsWithImages.map(p => p.name);
    
    fetchProjectImagesBatch(projectNames, lang)
      .then(batchData => {
        const imageMap = new Map();
        batchData.forEach(imageData => {
          imageMap.set(imageData.id, imageData);
        });
        setImagesData(imageMap);
      })
      .catch(error => {
        console.error('Failed to load batch images:', error);
        setImagesError('Erreur de chargement des images');
      })
      .finally(() => {
        setIsLoadingImages(false);
      });
  }, [projects, lang]);

  const getProjectImage = (projectName: string): ProjectImages | null => {
    return imagesData.get(projectName) || null;
  };

  return {
    imagesData,
    isLoadingImages,
    imagesError,
    getProjectImage
  };
};

// Hook combiné pour un projet avec toutes ses données
export const useProjectWithImages = (projectName: string, lang: 'fr' | 'en' = 'fr') => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [imageData, setImageData] = useState<ProjectImages | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Charger d'abord les données du projet
    setIsLoadingProject(true);
    setError(null);

    // Simuler l'appel API pour un projet spécifique
    // En réalité, vous devriez avoir une fonction fetchProjectByName
    import('../api').then(({ fetchProjectByName }) => {
      return fetchProjectByName(projectName, lang);
    })
      .then(project => {
        if (project) {
          setProjectData(project);
          
          // Si le projet a des images, les charger séparément
          if (project.hasImage || project.hasScreenshots) {
            setIsLoadingImage(true);
            return fetchProjectImages(project.name, lang);
          }
          return null;
        }
        throw new Error('Projet non trouvé');
      })
      .then(images => {
        if (images) {
          setImageData(images);
        }
      })
      .catch(error => {
        console.error('Error loading project:', error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoadingProject(false);
        setIsLoadingImage(false);
      });
  }, [projectName, lang]);

  return {
    projectData,
    imageData,
    isLoading: isLoadingProject || isLoadingImage,
    isLoadingProject,
    isLoadingImage,
    error
  };
};
