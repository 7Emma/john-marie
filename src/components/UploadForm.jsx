import { useState } from "react";
import { Upload, AlertCircle, CheckCircle, X, File } from "lucide-react";
import UploadService from "../services/uploadService";
import { useToastContext } from "../context/ToastContext";

const UploadForm = ({ onUploadSuccess, onClose, defaultCategory = "couple" }) => {
  const { showToast } = useToastContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [multipleMode, setMultipleMode] = useState(false);

  const categories = [
    { id: "couple", label: "Couple" },
    { id: "ami", label: "Amis" },
    { id: "famille", label: "Famille" },
    { id: "ensemble", label: "Ensemble" },
    { id: "mairie", label: "Mairie" },
  ];

  const handleFileSelect = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    setError(null);
    const validFiles = [];
    let hasError = false;

    files.forEach((file, index) => {
      // Vérifier le type
      if (!file.type.startsWith("image/")) {
        setError(`Fichier ${index + 1}: "${file.name}" n'est pas une image`);
        hasError = true;
        return;
      }

      // Vérifier la taille (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(`Fichier ${index + 1}: "${file.name}" dépasse 5MB`);
        hasError = true;
        return;
      }

      validFiles.push(file);
    });

    if (!hasError) {
      setSelectedFiles(validFiles);
      setMultipleMode(validFiles.length > 1);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    if (selectedFiles.length - 1 <= 1) {
      setMultipleMode(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setError("Veuillez sélectionner au moins une image");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (selectedFiles.length === 1) {
        // Upload simple
        await UploadService.uploadImage(selectedFiles[0], selectedCategory);
        setSuccess(true);
      } else {
        // Upload multiple
        const uploadProgress = {};
        selectedFiles.forEach((_, idx) => {
          uploadProgress[idx] = 0;
        });
        setUploadProgress(uploadProgress);

        await UploadService.uploadMultiple(
          selectedFiles,
          selectedCategory,
          (progressData) => {
            setUploadProgress(progressData);
          }
        );
        setSuccess(true);
      }

      setSelectedFiles([]);
      setSelectedCategory("couple");
      setMultipleMode(false);

      // Afficher le toast de succès
      showToast(
        `${selectedFiles.length > 1 ? "Photos" : "Photo"} uploadée${selectedFiles.length > 1 ? "s" : ""} avec succès`,
        "success"
      );

      // Appeler le callback de succès
      if (onUploadSuccess) {
        onUploadSuccess();
      }

      // Fermer le formulaire après 2 secondes
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      const errorMsg = err.message || "Erreur lors de l'upload";
      setError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-playfair text-2xl text-gray-900">
            {multipleMode ? "Ajouter plusieurs photos" : "Ajouter une photo"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2 items-start">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-2 items-start">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-700 text-sm">
              {selectedFiles.length === 0
                ? `${multipleMode ? "Photos" : "Photo"} uploadée${multipleMode ? "s" : ""} avec succès`
                : "Upload en cours..."}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Catégorie */}
          <div>
            <label className="block font-playfair text-gray-800 mb-2">
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              disabled={isLoading || success}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Upload d'images */}
          <div>
            <label className="block font-playfair text-gray-800 mb-2">
              Images
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                disabled={isLoading || success}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="block w-full px-4 py-8 border-2 border-dashed border-rose-300 rounded-lg text-center cursor-pointer hover:bg-rose-50 transition"
              >
                <Upload className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="font-montserrat text-sm text-gray-700">
                  {selectedFiles.length === 0
                    ? "Cliquez pour sélectionner des images"
                    : `${selectedFiles.length} image${selectedFiles.length > 1 ? "s" : ""} sélectionnée${selectedFiles.length > 1 ? "s" : ""}`}
                </p>
                <p className="font-montserrat text-xs text-gray-500 mt-1">
                  Vous pouvez sélectionner plusieurs images (JPG, PNG, GIF, WebP - max 5MB chacun)
                </p>
              </label>
            </div>
          </div>

          {/* Liste des fichiers sélectionnés */}
          {selectedFiles.length > 0 && (
            <div>
              <p className="font-playfair text-gray-800 mb-3">
                Fichiers sélectionnés ({selectedFiles.length})
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto bg-gray-50 p-4 rounded-lg">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-3 rounded border border-gray-200"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <File className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800 truncate font-montserrat">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 font-montserrat">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    {/* Barre de progression */}
                    {isLoading && uploadProgress[index] !== undefined && (
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mx-3">
                        <div
                          className="h-full bg-rose-500 transition-all duration-300"
                          style={{
                            width: `${uploadProgress[index] || 0}%`,
                          }}
                        />
                      </div>
                    )}

                    {/* Bouton supprimer */}
                    {!isLoading && !success && (
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-500 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}

                    {/* Checkmark si succès */}
                    {success && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info progression globale */}
          {isLoading && selectedFiles.length > 1 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-montserrat text-sm text-blue-800">
                Upload en cours...
                <br />
                {Object.values(uploadProgress).reduce((sum, val) => sum + val, 0) /
                  selectedFiles.length /
                  100}
                % complété
              </p>
            </div>
          )}

          {/* Boutons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 font-montserrat transition hover:bg-gray-50 disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading || selectedFiles.length === 0 || success}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg font-montserrat transition hover:shadow-lg disabled:opacity-50"
            >
              {isLoading
                ? `Téléchargement... (${selectedFiles.length})`
                : `Uploader ${selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
