import { HttpClient } from './axiosInstance';

/**
 * Service pour gérer les RSVPs
 */
export class RSVPService {
  /**
   * Soumettre un formulaire RSVP
   */
  static async submitRSVP(data) {
    return HttpClient.post('/rsvp', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      guests: data.guests,
      dietary: data.dietary || '',
      message: data.message || '',
    });
  }

  /**
   * Récupérer les statistiques RSVP
   */
  static async getStats() {
    return HttpClient.get('/rsvp/stats');
  }

  /**
   * Récupérer tous les RSVPs pour l'admin
   */
  static async getAllRSVPs() {
    return HttpClient.get('/rsvp/admin');
  }

  /**
   * Récupérer l'analyse des restrictions alimentaires
   */
  static async getDietaryAnalysis() {
    return HttpClient.get('/rsvp/dietary-analysis');
  }

  /**
   * Supprimer un RSVP
   */
  static async deleteRSVP(rsvpId) {
    return HttpClient.delete(`/rsvp/${rsvpId}`);
  }

  /**
   * Mettre à jour le statut d'un RSVP
   */
  static async updateRSVPStatus(rsvpId, status) {
    return HttpClient.put(`/rsvp/${rsvpId}`, { status });
  }
}

export default RSVPService;
