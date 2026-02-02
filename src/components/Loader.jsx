import React from 'react';
import { Loader as LoaderIcon, AlertCircle } from 'lucide-react';
import '../styles/loader.css';

/**
 * Composant Loader avec spinner animé
 */
const Loader = ({ 
  isLoading = true, 
  message = 'Chargement en cours...', 
  size = 'medium',
  fullScreen = false 
}) => {
  if (!isLoading) return null;

  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-black/50 z-50'
    : 'flex flex-col items-center justify-center py-8';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <LoaderIcon className={`${sizeClasses[size]} animate-spin text-rose-500`} />
        {message && <p className="text-gray-600 text-sm">{message}</p>}
      </div>
    </div>
  );
};

/**
 * Composant Error avec icône
 */
const LoaderError = ({ message, onRetry = null }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <p className="text-gray-600 text-center max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          Réessayer
        </button>
      )}
    </div>
  );
};

export { Loader, LoaderError };
export default Loader;
