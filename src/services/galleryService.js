/**
 * Service de statistiques et analytics de la galerie
 * Responsable: Suivi des téléchargements, favoris, stats
 * 
 * Utilise la couche API centralisée (api.js)
 */

import { galleryApi } from './api';

export class GalleryService {
  /**
   * Récupère les statistiques générales de la galerie
   * @returns {Promise<Object>} Stats générales
   */
  static async getStats() {
    try {
      const response = await galleryApi.getStats();
      return response.data;
    } catch (error) {
      console.error('Erreur getStats:', error);
      throw error;
    }
  }

  /**
   * Récupère les statistiques détaillées (téléchargements et favoris)
   * @returns {Promise<Object>} Statistiques détaillées
   */
  static async getDetailedStats() {
    try {
      const response = await galleryApi.getDetailedStats();
      return response.data;
    } catch (error) {
      console.error('Erreur getDetailedStats:', error);
      throw error;
    }
  }

  /**
   * Récupère les stats d'une catégorie spécifique
   * @param {string} category - Catégorie
   * @returns {Promise<Object>} Stats de la catégorie
   */
  static async getCategoryStats(category) {
    try {
      const response = await galleryApi.getCategoryStats(category);
      return response.data;
    } catch (error) {
      console.error('Erreur getCategoryStats:', error);
      throw error;
    }
  }

  /**
   * Incrémente le compteur de téléchargements d'une photo
   * @param {string} photoId - ID de la photo
   * @returns {Promise<Object>} Photo mise à jour
   */
  static async incrementDownloads(photoId) {
    try {
      const response = await galleryApi.trackDownload(photoId);
      return response.data;
    } catch (error) {
      console.error('Erreur incrementDownloads:', error);
      // Ne pas throw pour ne pas bloquer le téléchargement
      return null;
    }
  }

  /**
   * Incrémente le compteur de favoris d'une photo
   * @param {string} photoId - ID de la photo
   * @returns {Promise<Object>} Photo mise à jour
   */
  static async incrementFavorites(photoId) {
    try {
      const response = await galleryApi.trackFavorite(photoId);
      return response.data;
    } catch (error) {
      console.error('Erreur incrementFavorites:', error);
      // Ne pas throw pour ne pas bloquer l'ajout aux favoris
      return null;
    }
  }

  /**
   * Décrémente le compteur de favoris d'une photo
   * @param {string} photoId - ID de la photo
   * @returns {Promise<Object>} Photo mise à jour
   */
  static async decrementFavorites(photoId) {
    try {
      const response = await galleryApi.untrackFavorite(photoId);
      return response.data;
    } catch (error) {
      console.error('Erreur decrementFavorites:', error);
      // Ne pas throw pour ne pas bloquer le retrait des favoris
      return null;
    }
  }

  /**
   * Récupère les photos les plus téléchargées
   * @param {number} limit - Nombre de résultats
   * @returns {Promise<Array>} Top photos
   */
  static async getTopDownloaded(limit = 10) {
    try {
      const response = await galleryApi.getTopDownloaded(limit);
      return response.data;
    } catch (error) {
      console.error('Erreur getTopDownloaded:', error);
      throw error;
    }
  }

  /**
   * Récupère les photos les plus aimées
   * @param {number} limit - Nombre de résultats
   * @returns {Promise<Array>} Top photos aimées
   */
  static async getTopFavorited(limit = 10) {
    try {
      const response = await galleryApi.getTopFavorited(limit);
      return response.data;
    } catch (error) {
      console.error('Erreur getTopFavorited:', error);
      throw error;
    }
  }
}

export default GalleryService;
