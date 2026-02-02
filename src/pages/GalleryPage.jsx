import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
} from "lucide-react";
import PhotoService from "../services/photoService";
import GalleryService from "../services/galleryService";
import UploadForm from "../components/UploadForm";
import { Loader, LoaderError } from "../components/Loader";
import PhotoSkeleton from "../components/PhotoSkeleton";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useFavorites } from "../hooks/useFavorites";

const GalleryPage = ({ setIsLoading: setHeaderLoading = () => {} }) => {
  const navigate = useNavigate();
  const categories = [
    { id: "couple", label: "Couple", icon: "💑" },
    { id: "ami", label: "Amis", icon: "👥" },
    { id: "famille", label: "Famille", icon: "👨‍👩‍👧‍👦" },
    { id: "ensemble", label: "Ensemble", icon: "🎉" },
    { id: "mairie", label: "Mairie", icon: "🏛️" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photosByCategory, setPhotosByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Utiliser le hook de favoris avec persistance localStorage
  const { favorites, toggleFavorite: toggleFavLocal } = useFavorites();

  // Fonction de chargement des photos avec useCallback pour l'auto-refresh
  const loadPhotos = useCallback(async () => {
    try {
      setError(null);
      setHeaderLoading(true);
      const photos = await PhotoService.getAllPhotos();
      setPhotosByCategory(photos);
    } catch (err) {
      console.error("Erreur chargement photos:", err);
      setError("Impossible de charger les photos. Vérifiez que le serveur est démarré.");
    } finally {
      setIsLoading(false);
      setHeaderLoading(false);
    }
  }, [setHeaderLoading]);

  // Auto-refresh: rafraîchit toutes les 30 secondes
  useAutoRefresh(loadPhotos, 30000, true);

  // Cleanup au unmount
  useEffect(() => {
    return () => {
      setHeaderLoading(false);
    };
  }, [setHeaderLoading]);

  // Toggle favori avec synchronisation serveur
  const toggleFavorite = async (photoId) => {
    try {
      // Mettre à jour localement d'abord (UX rapide)
      toggleFavLocal(photoId);

      // Synchroniser avec le serveur en arrière-plan
      if (favorites.has(photoId)) {
        await GalleryService.decrementFavorites(photoId);
      } else {
        await GalleryService.incrementFavorites(photoId);
      }
    } catch (err) {
      console.error("Erreur sync favori:", err);
      // L'utilisateur garde son favori local même si le serveur fail
    }
  };

  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextPhoto = () => {
    const photos = photosByCategory[selectedCategory] || [];
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    const photos = photosByCategory[selectedCategory] || [];
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextPhoto();
    if (e.key === "ArrowLeft") prevPhoto();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, selectedCategory]);

  const downloadPhoto = async (photo) => {
    try {
      // Incrémenter le compteur de téléchargement
      await GalleryService.incrementDownloads(photo._id);

      const response = await fetch(`http://localhost:5000${photo.url}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = photo.filename || "photo.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur téléchargement:", err);
      alert("Erreur lors du téléchargement");
    }
  };

  const handleUploadSuccess = () => {
    setShowUploadForm(false);
    loadPhotos();
  };

  // Lightbox Component
  const Lightbox = () => {
    if (!lightboxOpen || !selectedCategory) return null;

    const photos = photosByCategory[selectedCategory] || [];
    const currentPhoto = photos[currentPhotoIndex];

    if (!currentPhoto) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
        {/* Bouton fermer */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 text-white hover:text-rose-400 transition-colors z-50"
          aria-label="Fermer"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Compteur */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-playfair z-50">
          {currentPhotoIndex + 1} / {photos.length}
        </div>

        {/* Navigation précédent */}
        <button
          onClick={prevPhoto}
          className="absolute left-4 text-white hover:text-rose-400 transition-colors z-50"
          aria-label="Photo précédente"
        >
          <ChevronLeft className="w-12 h-12" />
        </button>

        {/* Image principale */}
        <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
          <div className="relative">
            <img
              src={`http://localhost:5000${currentPhoto.url}`}
              alt={currentPhoto.originalName}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Boutons actions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
              <button
                onClick={() => downloadPhoto(currentPhoto)}
                className="p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full transition-all shadow-lg hover:shadow-xl"
                title="Télécharger"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleFavorite(currentPhoto._id)}
                className="p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full transition-all shadow-lg hover:shadow-xl"
                title="Ajouter aux favoris"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(currentPhoto._id)
                      ? "fill-rose-500 text-rose-500"
                      : "text-gray-600"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation suivant */}
        <button
          onClick={nextPhoto}
          className="absolute right-4 text-white hover:text-rose-400 transition-colors z-50"
          aria-label="Photo suivante"
        >
          <ChevronRight className="w-12 h-12" />
        </button>
      </div>
    );
  };

  // Vue galerie d'une catégorie
  if (selectedCategory) {
    const categoryLabel = categories.find((c) => c.id === selectedCategory)?.label;
    const photos = photosByCategory[selectedCategory] || [];

    if (isLoading) {
      return (
        <section className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 py-20 flex items-center justify-center">
          <div className="loader-gradient">
            <Loader message="Chargement des photos..." />
          </div>
        </section>
      );
    }

    if (error) {
      return (
        <section className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 py-20 flex items-center justify-center">
          <LoaderError message={error} onRetry={loadPhotos} />
        </section>
      );
    }

    return (
      <>
        <section className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 py-20">
          <div className="container-elegant">
            {/* En-tête avec bouton retour */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-playfair transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Retour aux catégories
                </button>

                <div className="text-sm font-montserrat text-gray-600">
                  {photos.length} photo{photos.length > 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* Titre avec animation */}
            <div className="text-center mb-12">
              <div className="inline-block">
                <h2 className="heading-elegant text-gray-900 mb-3">
                  <span className="text-gradient-rose">{categoryLabel}</span>
                </h2>
                <div className="h-1 w-full bg-gradient-rose rounded-full"></div>
              </div>
              <p className="font-playfair text-gray-600 mt-4">
                Cliquez sur une photo pour l'agrandir
              </p>
            </div>

            {/* Message si pas de photos */}
            {photos.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-playfair text-gray-600">
                  Aucune photo dans cette catégorie pour le moment
                </p>
              </div>
            ) : (
              /* Galerie en grille */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo, index) => (
                  <div
                    key={photo._id}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={`http://localhost:5000${photo.url}`}
                        alt={photo.originalName}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />

                      {/* Overlay avec dégradé */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Icône zoom */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Description */}
                        {photo.description && (
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white font-playfair text-lg text-center">
                              {photo.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bouton favori */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(photo._id);
                      }}
                      className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group/heart"
                      aria-label="Ajouter aux favoris"
                    >
                      <Heart
                        className={`w-5 h-5 transition-all duration-300 ${
                          favorites.has(photo._id)
                            ? "fill-rose-500 text-rose-500 scale-110"
                            : "text-gray-600 group-hover/heart:text-rose-500 group-hover/heart:scale-110"
                        }`}
                      />
                    </button>

                    {/* Bouton télécharger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPhoto(photo);
                      }}
                      className="absolute bottom-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
                      title="Télécharger"
                    >
                      <Download className="w-5 h-5 text-gray-600 hover:text-rose-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        <Lightbox />
      </>
    );
  }

  // Vue principale avec catégories
  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 py-20">
        <div className="container-elegant">
          {/* Bouton retour à l'accueil */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-playfair transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </button>

        {/* Décoration supérieure animée */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-400 to-rose-400"></div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
              <div
                className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-rose-400 to-rose-400"></div>
          </div>
        </div>

        {/* Afficher les erreurs */}
        {error && (
          <div className="mb-8">
            <LoaderError message={error} onRetry={loadPhotos} />
          </div>
        )}

        {/* Titre */}
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs md:text-sm text-rose-600 font-semibold tracking-widest uppercase mb-3">
            Souvenirs Précieux
          </p>
          <h2 className="heading-elegant text-gray-900 mb-4">
            <span className="text-gradient-rose">Notre Galerie</span>
          </h2>
          <p className="font-playfair text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Revivez les moments magiques de notre union à travers ces instants
            capturés
          </p>
        </div>

        {/* Catégories avec animations */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const count = photosByCategory[category.id]?.length || 0;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 bg-white border-2 border-rose-100 hover:border-rose-300 p-8 flex flex-col items-center justify-center min-h-48 animate-fade-in hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Fond dégradé animé au survol */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-rose-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Particules décoratives */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-rose-300 rounded-full animate-ping"></div>
                  <div
                    className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                </div>

                {/* Contenu */}
                <div className="relative z-10 text-center">
                  <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">
                    {category.icon}
                  </div>
                  <h3 className="font-playfair text-xl md:text-2xl text-gray-800 group-hover:text-rose-600 transition-colors duration-300 mb-2">
                    {category.label}
                  </h3>
                  <p className="font-montserrat text-xs text-gray-500 group-hover:text-rose-500 transition-colors duration-300">
                    {count} photo{count > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Icône cœur animée */}
                <Heart className="absolute top-3 right-3 w-5 h-5 text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:fill-rose-400" />
              </button>
            );
          })}
        </div>

        {/* Message explicatif avec icône */}
        <div className="text-center mt-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-soft border border-rose-100">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
            <p className="font-playfair text-gray-600 text-sm md:text-base">
              Sélectionnez une catégorie pour explorer les souvenirs
            </p>
          </div>
        </div>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <UploadForm
          onUploadSuccess={handleUploadSuccess}
          onClose={() => setShowUploadForm(false)}
        />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .container-elegant {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .heading-elegant {
          font-family: "Playfair Display", serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.2;
        }

        .text-gradient-rose {
          background: linear-gradient(
            135deg,
            #f43f5e 0%,
            #ec4899 50%,
            #f43f5e 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bg-gradient-rose {
          background: linear-gradient(
            90deg,
            #f43f5e 0%,
            #ec4899 50%,
            #f43f5e 100%
          );
        }

        .shadow-soft {
          box-shadow:
            0 4px 6px -1px rgba(244, 63, 94, 0.1),
            0 2px 4px -1px rgba(244, 63, 94, 0.06);
        }
      `}</style>
      </section>
    </>
  );
};

export default GalleryPage;
