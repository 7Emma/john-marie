/**
 * Configuration centralisée des requêtes HTTP
 * Utilise fetch avec une configuration uniforme
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TIMEOUT = 30000; // 30 secondes

/**
 * Options par défaut pour toutes les requêtes
 */
const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT,
};

/**
 * Classe pour gérer les requêtes HTTP
 */
export class HttpClient {
  /**
   * Effectue une requête HTTP générique
   * @param {string} endpoint - URL relative (ex: '/photos')
   * @param {Object} options - Options fetch
   * @returns {Promise<Object>} Réponse parsée
   */
  static async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    let config = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    // Don't set default headers if it's FormData
    if (options.body instanceof FormData) {
      config.headers = options.headers || {};
    } else {
      config.headers = {
        ...DEFAULT_OPTIONS.headers,
        ...options.headers,
      };
    }

    // Créer un AbortController pour le timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), config.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: abortController.signal,
      });

      clearTimeout(timeoutId);

      // Gestion des erreurs HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new HttpError(
          errorData.error || `HTTP ${response.status}`,
          response.status,
          errorData
        );
        throw error;
      }

      // Parser la réponse
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      // Erreur de timeout
      if (error.name === 'AbortError') {
        throw new HttpError(
          'Délai d\'attente dépassé',
          'TIMEOUT',
          { originalError: error }
        );
      }

      // Erreur réseau
      if (error instanceof TypeError) {
        throw new HttpError(
          'Erreur de connexion au serveur',
          'NETWORK_ERROR',
          { originalError: error }
        );
      }

      throw error;
    }
  }

  /**
   * Requête GET
   */
  static get(endpoint, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * Requête POST
   */
  static post(endpoint, data = null, options = {}) {
    const config = {
      ...options,
      method: 'POST',
    };

    if (data) {
      if (data instanceof FormData) {
        config.body = data;
      } else {
        config.body = JSON.stringify(data);
      }
    }

    return this.request(endpoint, config);
  }

  /**
   * Requête PUT
   */
  static put(endpoint, data = null, options = {}) {
    const config = {
      ...options,
      method: 'PUT',
    };

    if (data) {
      if (data instanceof FormData) {
        config.body = data;
      } else {
        config.body = JSON.stringify(data);
      }
    }

    return this.request(endpoint, config);
  }

  /**
   * Requête DELETE
   */
  static delete(endpoint, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }

  /**
   * Requête PATCH
   */
  static patch(endpoint, data = null, options = {}) {
    const config = {
      ...options,
      method: 'PATCH',
    };

    if (data) {
      if (data instanceof FormData) {
        config.body = data;
      } else {
        config.body = JSON.stringify(data);
      }
    }

    return this.request(endpoint, config);
  }
}

/**
 * Classe personnalisée pour les erreurs HTTP
 */
export class HttpError extends Error {
  constructor(message, status, data = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }

  /**
   * Retourne true si l'erreur est une erreur client (4xx)
   */
  get isClientError() {
    return typeof this.status === 'number' && this.status >= 400 && this.status < 500;
  }

  /**
   * Retourne true si l'erreur est une erreur serveur (5xx)
   */
  get isServerError() {
    return typeof this.status === 'number' && this.status >= 500;
  }

  /**
   * Retourne true si c'est une erreur réseau
   */
  get isNetworkError() {
    return this.status === 'NETWORK_ERROR' || this.status === 'TIMEOUT';
  }
}

export default HttpClient;
