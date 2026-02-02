/**
 * Service de gestion des photos
 * Responsable: CRUD des photos
 * 
 * Utilise la couche API centralisée (api.js)
 */

import { photosApi } from './api';

export class PhotoService {
  /**
   * Récupère toutes les photos groupées par catégorie
   * @returns {Promise<Object>} Photos groupées par catégorie
   */
  static async getAllPhotos() {
    try {
      const response = await photosApi.getAll();
      return response.data;
    } catch (error) {
      console.error('Erreur getAllPhotos:', error);
      throw error;
    }
  }

  /**
   * Récupère les photos d'une catégorie spécifique
   * @param {string} category - Catégorie des photos
   * @returns {Promise<Array>} Photos de la catégorie
   */
  static async getPhotosByCategory(category) {
    try {
      const response = await photosApi.getByCategory(category);
      return response.data;
    } catch (error) {
      console.error('Erreur getPhotosByCategory:', error);
      throw error;
    }
  }

  /**
   * Obtient une photo par ID
   * @param {string} photoId - ID de la photo
   * @returns {Promise<Object>} Données de la photo
   */
  static async getPhotoById(photoId) {
    try {
      const response = await photosApi.getById(photoId);
      return response.data;
    } catch (error) {
      console.error('Erreur getPhotoById:', error);
      throw error;
    }
  }

  /**
   * Supprime une photo
   * @param {string} photoId - ID MongoDB de la photo
   * @returns {Promise<Object>} Résultat de la suppression
   */
  static async deletePhoto(photoId) {
    try {
      const response = await photosApi.delete(photoId);
      return response.data;
    } catch (error) {
      console.error('Erreur deletePhoto:', error);
      throw error;
    }
  }

  /**
   * Met à jour une photo
   * @param {string} photoId - ID de la photo
   * @param {Object} updates - Données à mettre à jour
   */
  static async updatePhoto(photoId, updates) {
    try {
      const response = await photosApi.update(photoId, updates);
      return response.data;
    } catch (error) {
      console.error('Erreur updatePhoto:', error);
      throw error;
    }
  }

  /**
   * Recherche des photos
   * @param {string} query - Terme de recherche
   * @returns {Promise<Array>} Résultats de recherche
   */
  static async searchPhotos(query) {
    try {
      const response = await photosApi.search(query);
      return response.data;
    } catch (error) {
      console.error('Erreur searchPhotos:', error);
      throw error;
    }
  }
}

export default PhotoService;
