import React from 'react';

/**
 * Skeleton loader pour les photos
 * Affiche des placeholder pendant le chargement
 */
const PhotoSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 rounded-lg skeleton" />
      ))}
    </div>
  );
};

export default PhotoSkeleton;
