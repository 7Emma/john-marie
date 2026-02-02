import React, { useState } from 'react';
import { Heart, X, ChevronRight } from 'lucide-react';

/**
 * Panneau affichant les images aimées
 * Permet de visualiser et gérer les favoris
 */
const FavoritesPanel = ({ 
  isOpen = false, 
  onClose = () => {}, 
  favorites = [], 
  photosByCategory = {},
  onSelectPhoto = () => {}
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Récupérer les photos favorites
  const favoritePhotos = React.useMemo(() => {
    const photos = [];
    Object.values(photosByCategory).forEach((categoryPhotos) => {
      categoryPhotos.forEach((photo) => {
        if (favorites.has(photo._id)) {
          photos.push(photo);
        }
      });
    });
    return photos;
  }, [favorites, photosByCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/50">
      <div className="absolute right-0 top-0 h-screen w-full max-w-md bg-white overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-rose-100 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <div>
              <h2 className="font-playfair text-2xl text-gray-900">Vos Adorées</h2>
              <p className="text-sm text-gray-600">{favoritePhotos.length} photo(s)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-4">
          {favoritePhotos.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4 opacity-50" />
              <p className="text-gray-600 font-playfair">
                Aucune photo aimée pour le moment
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Cliquez sur le cœur pour ajouter vos photos préférées
              </p>
            </div>
          ) : (
            favoritePhotos.map((photo) => (
              <div
                key={photo._id}
                onClick={() => onSelectPhoto(photo)}
                className="group cursor-pointer overflow-hidden rounded-lg border border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={`http://localhost:5000${photo.url}`}
                    alt={photo.originalName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                {photo.description && (
                  <div className="p-3 bg-white border-t border-rose-100">
                    <p className="text-sm text-gray-700 font-playfair">
                      {photo.description}
                    </p>
                  </div>
                )}
                <div className="px-3 py-2 bg-rose-50 flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {photo.category}
                  </span>
                  <ChevronRight className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPanel;
