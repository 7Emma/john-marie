/**
 * Couche API centralisée
 * Regroupe tous les appels API en un seul endroit
 * 
 * Organisation:
 * - Photos (GET, POST, PUT, DELETE)
 * - Uploads (POST)
 * - Statistiques (GET)
 */

import { HttpClient, HttpError } from './axiosInstance';

/**
 * API Photos - Opérations CRUD
 */
export const photosApi = {
  /**
   * Récupère toutes les photos
   */
  getAll() {
    return HttpClient.get('/photos');
  },

  /**
   * Récupère les photos d'une catégorie
   */
  getByCategory(category) {
    return HttpClient.get(`/photos/${category}`);
  },

  /**
   * Obtient une photo par ID
   */
  getById(photoId) {
    return HttpClient.get(`/photos/${photoId}`);
  },

  /**
   * Récupère les photos avec pagination
   */
  getPaginated(page = 1, limit = 20) {
    return HttpClient.get(`/photos?page=${page}&limit=${limit}`);
  },

  /**
   * Crée une nouvelle photo
   */
  create(data) {
    return HttpClient.post('/photos', data);
  },

  /**
   * Met à jour une photo
   */
  update(photoId, data) {
    return HttpClient.put(`/photos/${photoId}`, data);
  },

  /**
   * Supprime une photo
   */
  delete(photoId) {
    return HttpClient.delete(`/photos/${photoId}`);
  },

  /**
   * Recherche des photos
   */
  search(query) {
    return HttpClient.get(`/search?q=${encodeURIComponent(query)}`);
  },
};

/**
 * API Uploads - Gestion des fichiers
 */
export const uploadsApi = {
  /**
   * Upload une image unique
   * @param {File} file - Fichier à uploader
   * @param {string} category - Catégorie
   * @param {Object} metadata - Données additionnelles
   */
  uploadImage(file, category, metadata = {}) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);

    if (metadata.description) {
      formData.append('description', metadata.description);
    }
    if (metadata.uploadedBy) {
      formData.append('uploadedBy', metadata.uploadedBy);
    }

    return HttpClient.post('/upload', formData);
  },

  /**
   * Upload plusieurs images (via backend)
   * Note: Utilisé via UploadService.uploadMultiple() qui fait des appels parallèles
   */
  uploadMultiple(files, category) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    formData.append('category', category);

    return HttpClient.post('/upload/multiple', formData);
  },
};

/**
 * API Galerie - Statistiques et analytics
 */
export const galleryApi = {
  /**
   * Récupère les stats générales
   */
  getStats() {
    return HttpClient.get('/stats');
  },

  /**
   * Récupère les stats détaillées (téléchargements, favoris)
   */
  getDetailedStats() {
    return HttpClient.get('/stats/detailed');
  },

  /**
   * Récupère les stats d'une catégorie
   */
  getCategoryStats(category) {
    return HttpClient.get(`/stats/category/${category}`);
  },

  /**
   * Enregistre un téléchargement
   */
  trackDownload(photoId) {
    return HttpClient.post(`/photos/${photoId}/download`);
  },

  /**
   * Enregistre un favori
   */
  trackFavorite(photoId) {
    return HttpClient.post(`/photos/${photoId}/favorite`);
  },

  /**
   * Retire un favori
   */
  untrackFavorite(photoId) {
    return HttpClient.post(`/photos/${photoId}/unfavorite`);
  },

  /**
   * Récupère les photos les plus téléchargées
   */
  getTopDownloaded(limit = 10) {
    return HttpClient.get(`/stats/top-downloaded?limit=${limit}`);
  },

  /**
   * Récupère les photos les plus aimées
   */
  getTopFavorited(limit = 10) {
    return HttpClient.get(`/stats/top-favorited?limit=${limit}`);
  },
};

/**
 * API Santé - Vérification du serveur
 */
export const healthApi = {
  /**
   * Vérifie la connexion au serveur
   */
  check() {
    return HttpClient.get('/health').catch(() => {
      throw new HttpError('Serveur indisponible', 'OFFLINE');
    });
  },
};

/**
 * Objet regroupant tous les appels API
 */
export const api = {
  photos: photosApi,
  uploads: uploadsApi,
  gallery: galleryApi,
  health: healthApi,
};

export default api;
