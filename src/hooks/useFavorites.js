import { useState, useEffect, useCallback } from 'react';

/**
 * Hook pour gérer les favoris avec persistance localStorage
 * Les favoris restent sauvegardés après actualisation
 * 
 * @returns {Object} { favorites, toggleFavorite, isFavorite }
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState(new Set());
  const STORAGE_KEY = 'gallery_favorites';

  // Charger les favoris depuis localStorage au montage
  useEffect(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);
    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites);
        setFavorites(new Set(parsed));
      } catch (error) {
        console.error('Erreur lecture favoris:', error);
        setFavorites(new Set());
      }
    }
  }, []);

  // Sauvegarder les favoris dans localStorage
  const saveFavoritesToStorage = useCallback((favSet) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favSet)));
    } catch (error) {
      console.error('Erreur sauvegarde favoris:', error);
    }
  }, []);

  // Ajouter/retirer un favori
  const toggleFavorite = useCallback((photoId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(photoId)) {
        newFavorites.delete(photoId);
      } else {
        newFavorites.add(photoId);
      }
      // Sauvegarder dans localStorage
      saveFavoritesToStorage(newFavorites);
      return newFavorites;
    });
  }, [saveFavoritesToStorage]);

  // Vérifier si une photo est en favori
  const isFavorite = useCallback((photoId) => {
    return favorites.has(photoId);
  }, [favorites]);

  // Obtenir le nombre de favoris
  const favoriteCount = favorites.size;

  // Obtenir la liste des favoris
  const getFavoritesList = useCallback(() => {
    return Array.from(favorites);
  }, [favorites]);

  // Ajouter plusieurs favoris à la fois
  const addMultipleFavorites = useCallback((photoIds) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      photoIds.forEach((id) => newFavorites.add(id));
      saveFavoritesToStorage(newFavorites);
      return newFavorites;
    });
  }, [saveFavoritesToStorage]);

  // Nettoyer les favoris (réinitialiser)
  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoriteCount,
    getFavoritesList,
    addMultipleFavorites,
    clearFavorites,
  };
};

export default useFavorites;
