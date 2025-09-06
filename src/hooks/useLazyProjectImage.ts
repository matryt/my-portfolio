import { useState, useEffect } from 'react';
import { useLazyLoad } from './useIntersectionObserver';
import type { ProjectData } from '../types/api';

interface UseLazyProjectImageOptions {
  /**
   * Décalage en pixels pour commencer le chargement avant que l'élément soit visible
   */
  rootMargin?: string;
  /**
   * Seuil de visibilité (0 = dès qu'un pixel est visible, 1 = entièrement visible)
   */
  threshold?: number;
  /**
   * Si true, force le chargement même sans visibilité (utile pour debug)
   */
  forceLoad?: boolean;
  /**
   * Délai avant de commencer le chargement (en ms)
   */
  delay?: number;
}

interface LazyImageState {
  /**
   * L'image est-elle chargée ?
   */
  isLoaded: boolean;
  /**
   * Y a-t-il une erreur de chargement ?
   */
  hasError: boolean;
  /**
   * Le chargement est-il en cours ?
   */
  isLoading: boolean;
  /**
   * L'élément est-il visible (ou l'a-t-il été) ?
   */
  isVisible: boolean;
  /**
   * URL de l'image (null si pas encore chargée)
   */
  imageUrl: string | null;
  /**
   * URLs des screenshots (vide si pas encore chargées)
   */
  screenshots: string[];
}

/**
 * Hook pour le lazy loading intelligent des images de projets
 * Combine la détection de visibilité avec le chargement d'images
 */
export const useLazyProjectImage = (
  project: ProjectData,
  lang: 'fr' | 'en' = 'fr', // Ajout du paramètre langue
  options: UseLazyProjectImageOptions = {}
): LazyImageState & { ref: React.RefObject<HTMLElement> } => {
  const {
    rootMargin = '100px', // Chargement plus anticipé pour l'UX
    threshold = 0.1,
    forceLoad = false,
    delay = 0,
  } = options;

  // Hook de visibilité
  const { ref, isIntersecting, hasIntersected } = useLazyLoad({
    rootMargin,
    threshold,
    delay,
  });

  // State local pour gérer l'état du chargement
  const [imageState, setImageState] = useState<LazyImageState>({
    isLoaded: false,
    hasError: false,
    isLoading: false,
    isVisible: false,
    imageUrl: null,
    screenshots: [],
  });

  // Détermine si on doit charger l'image
  const shouldLoad = forceLoad || hasIntersected || isIntersecting;

  // Chargement d'image personnalisé pour le lazy loading
  useEffect(() => {
    if (!shouldLoad || (!project.hasImage && !project.hasScreenshots)) {
      return;
    }

    setImageState(prev => ({ ...prev, isLoading: true, hasError: false }));

    // Import dynamique de la fonction API
    import('../api').then(({ fetchProjectImages }) => {
      return fetchProjectImages(project.name, lang); // Utilisation de la langue
    })
    .then(data => {
      setImageState(prev => ({
        ...prev,
        isLoaded: true,
        isLoading: false,
        imageUrl: data?.image || null,
        screenshots: data?.screenshots || [],
      }));
    })
    .catch(error => {
      console.error(`Failed to lazy load images for ${project.name}:`, error);
      setImageState(prev => ({
        ...prev,
        isLoading: false,
        hasError: true,
      }));
    });
  }, [shouldLoad, project.name, project.hasImage, project.hasScreenshots, lang]); // Ajout de lang dans les dépendances

  // Mettre à jour l'état quand la visibilité change
  useEffect(() => {
    setImageState(prev => ({
      ...prev,
      isVisible: isIntersecting || hasIntersected,
    }));
  }, [isIntersecting, hasIntersected]);

  // Debug en mode développement
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log(`[LazyLoad] ${project.name}:`, {
        shouldLoad,
        isVisible: imageState.isVisible,
        isLoading: imageState.isLoading,
        isLoaded: imageState.isLoaded,
        hasError: imageState.hasError,
      });
    }
  }, [project.name, shouldLoad, imageState]);

  return {
    ref: ref as React.RefObject<HTMLElement>,
    ...imageState,
  };
};

/**
 * Hook spécialisé pour le lazy loading des screenshots
 * Utilisé dans ProjectDetails quand on ne veut charger que les screenshots
 */
export const useLazyScreenshots = (
  project: ProjectData,
  lang: 'fr' | 'en' = 'fr', // Ajout du paramètre langue
  options: UseLazyProjectImageOptions = {}
) => {
  const result = useLazyProjectImage(project, lang, { // Correction: passage de la langue
    ...options,
    // Pour les screenshots, on peut être moins anticipé
    rootMargin: options.rootMargin || '50px',
  });

  return {
    ref: result.ref,
    screenshots: result.screenshots,
    isLoading: result.isLoading && project.hasScreenshots,
    hasError: result.hasError,
    isVisible: result.isVisible,
    // Indique si on doit afficher le composant screenshots
    shouldShowScreenshots: result.isVisible && project.hasScreenshots,
  };
};

/**
 * Hook pour précharger intelligemment les images suivantes
 * Se déclenche quand l'image actuelle est chargée
 */
export const useLazyPreload = (
  currentProject: ProjectData,
  nextProjects: ProjectData[],
  maxPreload: number = 2
) => {
  const [preloadedProjects, setPreloadedProjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!currentProject || nextProjects.length === 0) return;

    // Précharger les projets suivants avec un délai
    const preloadNext = async () => {
      const projectsToPreload = nextProjects
        .slice(0, maxPreload)
        .filter(p => p.hasImage && !preloadedProjects.has(p.name));

      for (const project of projectsToPreload) {
        try {
          // Préchargement silencieux
          const response = await fetch(`/api/project-image/${encodeURIComponent(project.name)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.image) {
              // Créer un élément image pour déclencher le cache navigateur
              const img = new Image();
              img.src = data.image;
              
              setPreloadedProjects(prev => new Set(prev).add(project.name));
            }
          }
        } catch (error) {
          // Échec silencieux pour le préchargement
          console.debug(`Preload failed for ${project.name}:`, error);
        }
      }
    };

    // Délai de 1 seconde pour ne pas interférer avec le chargement principal
    const timeoutId = setTimeout(preloadNext, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentProject?.name, nextProjects, maxPreload, preloadedProjects]);

  return {
    preloadedProjects,
    isPreloaded: (projectName: string) => preloadedProjects.has(projectName),
  };
};
