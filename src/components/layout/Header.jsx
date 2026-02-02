import { Heart, Menu, X, Loader as LoaderIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NavBar({ onOpenRSVP, isLoading = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Notre Histoire", href: "#notre-histoire", action: "scroll" },
    { name: "Programme", href: "#programme", action: "scroll" },
    { name: "Galerie", href: "/galerie", action: "navigate" },
    { name: "Cadeaux", href: "#cadeaux", action: "scroll" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item) => {
    if (item.action === "navigate" && item.name === "Galerie") {
      navigate("/galerie");
      setIsMenuOpen(false);
    } else {
      scrollToSection(item.href);
    }
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-elegant ${
          isScrolled
            ? "bg-white/98 backdrop-blur-lg shadow-soft border-b border-rose-100"
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="container-elegant">
          <div className="flex justify-between items-center py-4 md:py-5">
            {/* Logo des mariés */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Heart
                  className={`w-7 h-7 transition-all duration-500 text-rose-500 group-hover:scale-110 group-hover:text-rose-600 animate-glow-pulse`}
                  fill="currentColor"
                />
              </div>
              <button
                onClick={() => scrollToSection("#hero")}
                className="font-playfair font-bold text-2xl md:text-3xl text-gradient-rose hover:opacity-80 transition-elegant"
              >
                J & M
              </button>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((nav, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(nav)}
                  className="relative px-5 py-2 text-gray-800 font-montserrat font-medium transition-elegant group"
                >
                  <span className="relative z-10">{nav.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-rose-600 transition-all duration-500 group-hover:w-full"></div>
                </button>
              ))}
            </div>

            {/* Loader indicator */}
            {isLoading && (
              <div className="hidden md:flex items-center gap-2">
                <LoaderIcon className="w-4 h-4 animate-spin text-rose-500" />
                <span className="text-xs text-gray-600">Chargement...</span>
              </div>
            )}

            {/* Bouton RSVP desktop */}
            <button 
              onClick={onOpenRSVP}
              className="hidden md:inline-block btn-romantic text-sm"
            >
              Confirmer
            </button>

            {/* Bouton menu mobile */}
            <button
              className="md:hidden p-2.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden bg-white border-t border-rose-100 ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((nav, index) => (
              <button
                key={index}
                onClick={() => {
                  handleNavClick(nav);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 px-4 text-gray-800 font-montserrat font-medium hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors duration-300"
              >
                {nav.name}
              </button>
            ))}
            <button 
              onClick={() => {
                onOpenRSVP();
                setIsMenuOpen(false);
              }}
              className="w-full btn-romantic mt-4 text-sm"
            >
              Confirmer votre présence
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20 md:h-24"></div>
    </>
  );
}

export default NavBar;
