import { useState, useEffect, useCallback } from "react";
import { Users, AlertCircle, Loader as LoaderIcon, Trash2, LogOut } from "lucide-react";
import RSVPService from "../services/rsvpService";
import { Loader, LoaderError } from "../components/Loader";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

const AdminRSVP = () => {
  const [rsvps, setRsvps] = useState([]);
  const [dietaryStats, setDietaryStats] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRSVP, setSelectedRSVP] = useState(null);

  // Charger les données avec useCallback pour l'auto-refresh
  const loadRSVPs = useCallback(async () => {
    try {
      setError(null);
      const response = await RSVPService.getAllRSVPs();
      setRsvps(response.data.rsvps || []);
      setDietaryStats(response.data.dietaryStats || []);
      setStats(response.data.stats || {});
    } catch (err) {
      console.error("Erreur chargement RSVPs:", err);
      setError("Impossible de charger les RSVPs");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-refresh toutes les 30 secondes
  useAutoRefresh(loadRSVPs, 30000, true);

  // Supprimer un RSVP
  const handleDeleteRSVP = async (rsvpId) => {
    if (!window.confirm("Confirmer la suppression?")) return;

    try {
      await RSVPService.deleteRSVP(rsvpId);
      await loadRSVPs(); // Recharger
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader message="Chargement des RSVPs..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <LoaderError message={error} onRetry={loadRSVPs} />
    );
  }

  return (
    <div className="text-white">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-400 text-sm">Confirmés</p>
          <p className="text-4xl font-bold text-rose-500">{stats?.confirmed || 0}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-400 text-sm">Nombre de convives</p>
          <p className="text-4xl font-bold text-blue-500">{stats?.totalGuests || 0}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-400 text-sm">En attente</p>
          <p className="text-4xl font-bold text-yellow-500">{stats?.pending || 0}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-400 text-sm">Annulés</p>
          <p className="text-4xl font-bold text-red-500">{stats?.cancelled || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* RSVPs */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-500" />
            Confirmations ({rsvps.length})
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {rsvps.length === 0 ? (
              <p className="text-gray-400">Aucun RSVP pour le moment</p>
            ) : (
              rsvps.map((rsvp) => (
                <div
                  key={rsvp._id}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-rose-500 transition-colors cursor-pointer"
                  onClick={() => setSelectedRSVP(rsvp)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold text-lg">{rsvp.name}</p>
                      <p className="text-sm text-gray-400">{rsvp.email}</p>
                      <p className="text-sm text-gray-400">{rsvp.phone}</p>
                      <p className="text-sm text-rose-400 mt-1">
                        📍 {rsvp.guests} convive{rsvp.guests > 1 ? "s" : ""}
                      </p>
                      {rsvp.dietary && (
                        <p className="text-xs text-yellow-400 mt-1">
                          🍽️ {rsvp.dietary}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRSVP(rsvp._id);
                      }}
                      className="p-2 hover:bg-red-600/20 rounded transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Restrictions alimentaires */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🍽️ Restrictions alimentaires</h2>
          {dietaryStats.length === 0 ? (
            <p className="text-gray-400">Aucune restriction</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dietaryStats.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-500/30"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold capitalize">{item.restriction}</span>
                    <span className="bg-yellow-500 text-gray-900 rounded-full px-3 py-1 text-sm font-bold">
                      {item.count}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">
                    {item.people.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Détail RSVP sélectionné */}
      {selectedRSVP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">{selectedRSVP.name}</h3>
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="font-mono">{selectedRSVP.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Téléphone</p>
                <p className="font-mono">{selectedRSVP.phone}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Nombre de convives</p>
                <p className="text-lg font-bold text-rose-500">
                  {selectedRSVP.guests}
                </p>
              </div>
              {selectedRSVP.dietary && (
                <div>
                  <p className="text-gray-400 text-sm">Restrictions alimentaires</p>
                  <p className="text-yellow-400">{selectedRSVP.dietary}</p>
                </div>
              )}
              {selectedRSVP.message && (
                <div>
                  <p className="text-gray-400 text-sm">Message</p>
                  <p className="italic">{selectedRSVP.message}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-sm">Soumis le</p>
                <p className="text-sm">
                  {new Date(selectedRSVP.submittedAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedRSVP(null)}
              className="w-full bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg font-bold transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRSVP;
