import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * Si true, l'observer continue à observer après la première intersection
   * Si false, il se disconnecte après la première fois que l'élément devient visible
   */
  triggerOnce?: boolean;
  /**
   * Délai avant de déclencher (utile pour éviter les triggers trop rapides)
   */
  delay?: number;
}

/**
 * Hook pour détecter quand un élément devient visible dans le viewport
 * Optimisé pour les performances et la gestion mémoire
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    threshold = 0.1, // Se déclenche quand 10% de l'élément est visible
    rootMargin = '50px', // Commence à charger 50px avant d'être visible
    triggerOnce = true, // Par défaut, se déclenche une seule fois
    delay = 0,
    ...restOptions
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Cleanup de l'observer précédent si il existe
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        const triggerVisibility = () => {
          setIsIntersecting(true);
          setHasIntersected(true);
          
          // Si triggerOnce est true, on disconnecte l'observer pour économiser les ressources
          if (triggerOnce && observerRef.current) {
            observerRef.current.disconnect();
          }
        };

        if (delay > 0) {
          setTimeout(triggerVisibility, delay);
        } else {
          triggerVisibility();
        }
      } else {
        // L'élément n'est plus visible
        if (!triggerOnce) {
          setIsIntersecting(false);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      ...restOptions,
    });

    observerRef.current.observe(element);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  // Hook pour forcer la déconnexion (utile pour économiser la mémoire)
  const disconnect = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  };

  // Hook pour reconnecter (utile si on veut réactiver l'observation)
  const reconnect = () => {
    const element = elementRef.current;
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  return {
    ref: elementRef,
    isIntersecting,
    hasIntersected, // Utile pour savoir si l'élément a été visible au moins une fois
    disconnect,
    reconnect,
  };
};

/**
 * Hook simplifié pour le cas d'usage le plus courant : lazy loading
 */
export const useLazyLoad = (options?: Omit<UseIntersectionObserverOptions, 'triggerOnce'>) => {
  return useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  });
};

/**
 * Hook pour détecter la visibilité continue (pour animations, analytics, etc.)
 */
export const useVisibility = (options?: Omit<UseIntersectionObserverOptions, 'triggerOnce'>) => {
  return useIntersectionObserver({
    triggerOnce: false,
    threshold: 0.5, // Plus strict pour la visibilité continue
    rootMargin: '0px',
    ...options,
  });
};
