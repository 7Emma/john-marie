import { useState, useEffect } from "react";
import {
  Download,
  Heart,
  Image,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import GalleryService from "../services/galleryService";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await GalleryService.getDetailedStats();
      setStats(data);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Impossible de charger les statistiques");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-rose-200 border-t-rose-500 animate-spin mx-auto mb-3"></div>
          <p className="text-gray-400">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/30 border border-red-500/50 rounded-xl text-red-400">
        {error}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-8">
      {/* Cartes principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Photos */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Photos</p>
              <p className="text-3xl font-bold">
                {Object.values(stats.categoryStats).reduce((sum, cat) => sum + cat.photoCount, 0)}
              </p>
            </div>
            <Image className="w-10 h-10 text-blue-200 opacity-50" />
          </div>
        </div>

        {/* Total Téléchargements */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Téléchargements</p>
              <p className="text-3xl font-bold">{stats.totalDownloads}</p>
            </div>
            <Download className="w-10 h-10 text-green-200 opacity-50" />
          </div>
        </div>

        {/* Total Favoris */}
        <div className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-100 text-sm mb-1">Photos Aimées</p>
              <p className="text-3xl font-bold">{stats.totalFavorites}</p>
            </div>
            <Heart className="w-10 h-10 text-rose-200 opacity-50 fill-current" />
          </div>
        </div>

        {/* Moyenne par catégorie */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Catégories</p>
              <p className="text-3xl font-bold">{Object.keys(stats.categoryStats).length}</p>
            </div>
            <BarChart3 className="w-10 h-10 text-purple-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Statistiques par catégorie */}
      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-rose-500" />
          <h3 className="text-xl font-playfair text-white">Statistiques par Catégorie</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300 font-montserrat text-sm">Catégorie</th>
                <th className="text-center py-3 px-4 text-gray-300 font-montserrat text-sm">Photos</th>
                <th className="text-center py-3 px-4 text-gray-300 font-montserrat text-sm">Téléchargements</th>
                <th className="text-center py-3 px-4 text-gray-300 font-montserrat text-sm">Favoris</th>
                <th className="text-center py-3 px-4 text-gray-300 font-montserrat text-sm">Tél./Photo</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.categoryStats).map(([category, data]) => (
                <tr key={category} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition">
                  <td className="py-3 px-4 text-white font-montserrat capitalize">{category}</td>
                  <td className="py-3 px-4 text-center text-blue-400 font-montserrat">{data.photoCount}</td>
                  <td className="py-3 px-4 text-center text-green-400 font-montserrat">{data.totalDownloads}</td>
                  <td className="py-3 px-4 text-center text-rose-400 font-montserrat">{data.totalFavorites}</td>
                  <td className="py-3 px-4 text-center text-gray-300 font-montserrat">
                    {data.photoCount > 0 ? (data.totalDownloads / data.photoCount).toFixed(1) : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 10 Photos Téléchargées */}
      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <Download className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-playfair text-white">Top 10 Photos Téléchargées</h3>
        </div>

        {stats.photosByDownloads && stats.photosByDownloads.length > 0 ? (
          <div className="space-y-2">
            {stats.photosByDownloads
              .sort((a, b) => b.downloads - a.downloads)
              .slice(0, 10)
              .map((photo, index) => (
                <div key={photo.id} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-montserrat truncate">{photo.name}</p>
                    <p className="text-gray-400 text-xs capitalize">{photo.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-green-500" />
                    <span className="text-green-400 font-bold">{photo.downloads}</span>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">Aucune donnée de téléchargement</p>
        )}
      </div>

      {/* Top 10 Photos Aimées */}
      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="w-6 h-6 text-rose-500" />
          <h3 className="text-xl font-playfair text-white">Top 10 Photos Aimées</h3>
        </div>

        {stats.photosByFavorites && stats.photosByFavorites.length > 0 ? (
          <div className="space-y-2">
            {stats.photosByFavorites
              .sort((a, b) => b.favorites - a.favorites)
              .slice(0, 10)
              .map((photo, index) => (
                <div key={photo.id} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-montserrat truncate">{photo.name}</p>
                    <p className="text-gray-400 text-xs capitalize">{photo.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500 fill-current" />
                    <span className="text-rose-400 font-bold">{photo.favorites}</span>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">Aucune donnée de favoris</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
