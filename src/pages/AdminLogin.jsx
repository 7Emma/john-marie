import { useState } from "react";
import { Lock, Eye, EyeOff, AlertCircle, Heart } from "lucide-react";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur de connexion");
        setPassword("");
        return;
      }

      // Succès - appeler onLogin
      if (data.success) {
        // Sauvegarder les infos admin en localStorage
        localStorage.setItem("adminToken", JSON.stringify(data.admin));
        onLogin();
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
      console.error("Erreur login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <h1 className="font-playfair text-3xl text-gradient-rose">J & M</h1>
          </div>
          <p className="font-montserrat text-gray-600 text-sm">
            Mariage du 15 mars 2026
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100">
          {/* Icône */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full">
              <Lock className="w-8 h-8 text-rose-600" />
            </div>
          </div>

          {/* Titre */}
          <h2 className="font-playfair text-2xl text-gray-900 text-center mb-2">
            Panneau Admin
          </h2>
          <p className="font-montserrat text-gray-600 text-center text-sm mb-6">
            Authentifiez-vous pour gérer la galerie
          </p>

          {/* Erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2 items-start">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ email */}
            <div>
              <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.marie0.mariage@site.com"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition font-montserrat disabled:bg-gray-100"
                autoFocus
                required
              />
            </div>

            {/* Champ mot de passe */}
            <div>
              <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition font-montserrat disabled:bg-gray-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg font-montserrat font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-montserrat text-blue-700 text-xs">
              <strong>Admin:</strong> john.marie0.mariage@site.com
            </p>
          </div>
        </div>

        {/* Lien retour */}
        <div className="mt-8 text-center">
          <p className="font-montserrat text-gray-600 text-sm">
            Vous n'êtes pas administrateur?{" "}
            <a
              href="/"
              className="text-rose-600 hover:text-rose-700 font-semibold transition"
            >
              Retour à l'accueil
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .text-gradient-rose {
          background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
