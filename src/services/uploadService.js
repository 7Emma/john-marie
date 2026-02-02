/**
 * Service de gestion des uploads
 * Responsable: Upload de fichiers (simple et multiple)
 * 
 * Utilise la couche API centralisée (api.js)
 */

import { uploadsApi } from './api';

export class UploadService {
  /**
   * Upload une image
   * @param {File} file - Fichier à uploader
   * @param {string} category - Catégorie de la photo
   * @param {Object} options - Options additionnelles (description, uploadedBy)
   * @returns {Promise<Object>} Données du fichier uploadé
   */
  static async uploadImage(file, category, options = {}) {
    try {
      const response = await uploadsApi.uploadImage(file, category, options);
      return response.data;
    } catch (error) {
      console.error('Erreur uploadImage:', error);
      throw error;
    }
  }

  /**
   * Upload plusieurs images en même temps
   * @param {File[]} files - Fichiers à uploader
   * @param {string} category - Catégorie de la photo
   * @param {Function} onProgress - Callback pour la progression (optionnel)
   * @returns {Promise<Object[]>} Données des fichiers uploadés
   */
  static async uploadMultiple(files, category, onProgress = null) {
    if (!Array.isArray(files) || files.length === 0) {
      throw new Error('Aucun fichier fourni');
    }

    try {
      const uploadPromises = files.map((file, index) =>
        this.uploadImage(file, category).then((result) => {
          // Mettre à jour la progression
          if (onProgress) {
            const progress = {};
            for (let i = 0; i < files.length; i++) {
              if (i < index + 1) {
                progress[i] = 100;
              } else {
                progress[i] = 0;
              }
            }
            onProgress(progress);
          }
          return result;
        })
      );

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Erreur uploadMultiple:', error);
      throw error;
    }
  }

  /**
   * Vérifie la connexion au serveur
   * @returns {Promise<boolean>} État du serveur
   */
  static async checkHealth() {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL || 'http://localhost:5000/api' + '/health'
      );
      return response.ok;
    } catch (error) {
      console.error('Serveur indisponible:', error);
      return false;
    }
  }
}

export default UploadService;
