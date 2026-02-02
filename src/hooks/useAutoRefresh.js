import { useEffect, useCallback, useRef } from 'react';

/**
 * Hook pour rafraîchir automatiquement les données
 * Avec détection du changement de visibilité et gestion du polling
 * 
 * @param {Function} refreshFn - Fonction qui charge les données
 * @param {number} interval - Intervalle de polling en ms (défaut: 30s)
 * @param {boolean} enabled - Activer/désactiver le polling (défaut: true)
 */
export const useAutoRefresh = (refreshFn, interval = 30000, enabled = true) => {
  const intervalRef = useRef(null);
  const isVisibleRef = useRef(true);
  const isComponentMountedRef = useRef(true);

  // Gérer la visibilité de la page
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
      
      // Rafraîchir immédiatement quand on revient à la page
      if (isVisibleRef.current && enabled && isComponentMountedRef.current) {
        refreshFn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refreshFn, enabled]);

  // Gérer le polling automatique
  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // Rafraîchir immédiatement si composant est monté
    if (isComponentMountedRef.current) {
      refreshFn();
    }

    // Puis à intervalles réguliers
    intervalRef.current = setInterval(() => {
      if (isVisibleRef.current && isComponentMountedRef.current) {
        refreshFn();
      }
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refreshFn, interval, enabled]);

  // Cleanup au unmount du composant
  useEffect(() => {
    return () => {
      isComponentMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
};

export default useAutoRefresh;
