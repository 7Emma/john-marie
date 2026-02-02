import { useState, useEffect, useCallback } from "react";
import { Lock, LogOut, Upload as UploadIcon, AlertCircle, LayoutDashboard, Grid, Users } from "lucide-react";
import UploadForm from "../components/UploadForm";
import AdminDashboard from "../components/AdminDashboard";
import AdminRSVP from "./AdminRSVP";
import PhotoService from "../services/photoService";
import GalleryService from "../services/galleryService";
import { Loader, LoaderError } from "../components/Loader";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useToastContext } from "../context/ToastContext";

const AdminGallery = ({ onLogout }) => {
  const { showToast } = useToastContext();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [photos, setPhotos] = useState({});
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const categories = [
    { id: "couple", label: "Couple", icon: "💑", color: "from-red-500 to-pink-500" },
    { id: "ami", label: "Amis", icon: "👥", color: "from-blue-500 to-purple-500" },
    { id: "famille", label: "Famille", icon: "👨‍👩‍👧‍👦", color: "from-green-500 to-emerald-500" },
    { id: "ensemble", label: "Ensemble", icon: "🎉", color: "from-yellow-500 to-orange-500" },
    { id: "mairie", label: "Mairie", icon: "🏛️", color: "from-indigo-500 to-purple-500" },
  ];

  // Fonction de chargement avec useCallback pour l'auto-refresh
  const loadData = useCallback(async () => {
    try {
      setError(null);
      const [allPhotos, allStats] = await Promise.all([
        PhotoService.getAllPhotos(),
        GalleryService.getStats(),
      ]);
      setPhotos(allPhotos);
      setStats(allStats);
    } catch (err) {
      console.error("Erreur chargement:", err);
      setError("Impossible de charger les données du serveur.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-refresh toutes les 20 secondes (admin veut des données fraîches)
  useAutoRefresh(loadData, 20000, true);

  const handleUploadSuccess = async () => {
    console.log("Upload réussi");
    await loadData();
  };

  const handleDeletePhoto = async (photoId, category) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette photo?")) {
      return;
    }

    try {
      await PhotoService.deletePhoto(photoId);
      await loadData();
      showToast("Photo supprimée avec succès", "success");
    } catch (err) {
      showToast("Erreur lors de la suppression: " + err.message, "error");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="loader-gradient bg-gray-800/50">
          <Loader message="Chargement des données..." size="large" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="bg-gray-800/50 rounded-lg p-8">
          <LoaderError message={error} onRetry={loadData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Admin */}
      <div className="sticky top-0 z-40 bg-gray-800/95 backdrop-blur border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-4 flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-playfair text-xl text-white">Panneau Admin</h1>
                <p className="text-xs text-gray-400">Gestion de la galerie mariage</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-montserrat transition ${
                activeTab === "dashboard"
                  ? "bg-rose-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Tableau de bord
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-montserrat transition ${
                activeTab === "gallery"
                  ? "bg-rose-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Grid className="w-4 h-4" />
              Galerie
            </button>
            <button
              onClick={() => setActiveTab("rsvp")}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-montserrat transition ${
                activeTab === "rsvp"
                  ? "bg-rose-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Users className="w-4 h-4" />
              Réservations
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && <AdminDashboard />}

        {/* RSVP Tab */}
        {activeTab === "rsvp" && <AdminRSVP onLogout={onLogout} />}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <>
            {/* Statistiques */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">Total de photos</p>
                  <p className="text-4xl font-bold text-white">{stats.totalPhotos || 0}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">Espace utilisé</p>
                  <p className="text-4xl font-bold text-white">
                    {((stats.totalSize || 0) / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">Dernière mise à jour</p>
                  <p className="text-lg font-bold text-white">
                    {stats.lastUpdated
                      ? new Date(stats.lastUpdated).toLocaleDateString("fr-FR")
                      : "Jamais"}
                  </p>
                </div>
              </div>
            )}

            {/* Bouton Upload */}
            <div className="mb-8">
              <button
                onClick={() => setShowUploadForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg font-montserrat transition hover:shadow-lg hover:shadow-rose-500/30"
              >
                <UploadIcon className="w-5 h-5" />
                Ajouter une photo
              </button>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="mb-8 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex gap-3 text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Catégories avec galeries */}
            <div className="space-y-12">
              {categories.map((category) => {
                const categoryPhotos = photos[category.id] || [];

                return (
                  <div key={category.id} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
                    {/* En-tête catégorie */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`text-4xl p-3 bg-gradient-to-br ${category.color} rounded-lg`}>
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-playfair text-white">{category.label}</h2>
                        <p className="text-gray-400 text-sm">
                          {categoryPhotos.length} photo{categoryPhotos.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    {/* Galerie photos */}
                    {categoryPhotos.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
                        <p className="text-gray-400">Aucune photo dans cette catégorie</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categoryPhotos.map((photo) => (
                          <div key={photo._id} className="group relative rounded-lg overflow-hidden bg-gray-700">
                            <img
                              src={`http://localhost:5000${photo.url}`}
                              alt={photo.originalName}
                              className="w-full h-48 object-cover group-hover:brightness-75 transition duration-300"
                            />

                            {/* Infos au survol */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4">
                              <p className="text-white text-sm text-center mb-4 line-clamp-2">
                                {photo.originalName}
                              </p>

                              <button
                                onClick={() => handleDeletePhoto(photo._id, category.id)}
                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition"
                              >
                                Supprimer
                              </button>
                            </div>

                            {/* Badge taille */}
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {(photo.size / 1024 / 1024).toFixed(1)} MB
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadForm && (
        <UploadForm
          onUploadSuccess={handleUploadSuccess}
          onClose={() => setShowUploadForm(false)}
        />
      )}
    </div>
  );
};

export default AdminGallery;
