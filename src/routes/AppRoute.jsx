import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Pages publiques
import Home from "../pages/Home";
import OurStory from "../pages/OurStory";
import Program from "../pages/Programme";
import RSVP from "../components/RSVP";
import Gifts from "../pages/Gifts";
import GalleryPage from "../pages/GalleryPage";

// Pages admin
import AdminLogin from "../pages/AdminLogin";
import AdminGallery from "../pages/AdminGallery";

// Composants communs
import NavBar from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RSVPModal from "../components/RSVPModal";
import ScrollToTop from "../components/ScrollToTop";
import ToastContainer from "../components/ToastContainer";
import { useToast } from "../hooks/useToast";
import ToastContext from "../context/ToastContext";

/**
 * Composant pour les pages publiques (avec NavBar et Footer)
 */
const PublicLayout = ({ children, onOpenRSVP, isLoading = false }) => {
  return (
    <>
      <NavBar onOpenRSVP={onOpenRSVP} isLoading={isLoading} />
      {children}
      <Footer />
    </>
  );
};

/**
 * Routes de l'application
 */
function AppRoute() {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, closeToast } = useToast();

  // Récupérer l'état admin du localStorage au montage
  useEffect(() => {
    const savedAdminState = localStorage.getItem("isAdminLoggedIn");
    if (savedAdminState === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Fonction login admin
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("isAdminLoggedIn", "true");
  };

  // Fonction logout admin
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      <Routes>
        {/* Route Accueil (avec toutes les sections) */}
        <Route
          path="/"
          element={
            <PublicLayout
              onOpenRSVP={() => setIsRSVPOpen(true)}
            >
              <Home onOpenRSVP={() => setIsRSVPOpen(true)} />
              <OurStory />
              <Program />
              <RSVP />
              <Gifts />
            </PublicLayout>
          }
        />

        {/* Route Galerie */}
        <Route
          path="/galerie"
          element={
            <PublicLayout
              onOpenRSVP={() => setIsRSVPOpen(true)}
              isLoading={isLoading}
            >
              <GalleryPage setIsLoading={setIsLoading} />
            </PublicLayout>
          }
        />

        {/* Route Admin */}
        <Route
          path="/mariageAdmin"
          element={
            isAdminLoggedIn ? (
              <AdminGallery onLogout={handleAdminLogout} />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modal RSVP Global */}
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} showToast={showToast} />
      <ScrollToTop />
      
      {/* Toast Container */}
      <ToastContainer toast={toast} onClose={closeToast} />
    </ToastContext.Provider>
  );
}

/**
 * Composant principal avec BrowserRouter
 */
function AppWithRouter() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default AppWithRouter;
