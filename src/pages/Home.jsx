import { MapPin, Clock, ChevronDown } from "lucide-react";
import Countdown from "../components/Countdown";

const Hero = ({ onOpenRSVP }) => {
  // Calculer la date du mariage (15 jours à partir d'aujourd'hui)
  const weddingDate = new Date();
  weddingDate.setDate(weddingDate.getDate() + 15);
  const dateFormatted = weddingDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden pb-32"
    >
      {/* Arrière-plan avec image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        {/* Overlay dégradé élégant */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-rose-50/30 to-white/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 container-elegant text-center w-full">
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          {/* Décoration supérieure */}
          <div className="flex justify-center">
            <div className="divider-elegant w-24">
              <div className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent flex-1"></div>
              <div className="w-1 h-1 rounded-full bg-rose-500"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent flex-1"></div>
            </div>
          </div>

          {/* Titre principal - Compact */}
          <div>
            <p className="font-montserrat text-xs md:text-sm text-rose-600 font-semibold tracking-widest uppercase mb-2">
              Nous convions
            </p>
            <h1 className="heading-elegant text-gray-900 mb-1 drop-shadow-lg">
              <span className="text-gradient-rose font-vibes text-5xl md:text-7xl lg:text-8xl">
                John & Marie
              </span>
            </h1>
            <p className="font-playfair text-base md:text-lg text-gray-700 font-light">
              à célébrer leur mariage
            </p>
          </div>

          {/* Informations du mariage - Compact */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-soft border border-rose-100 max-w-2xl mx-auto">
            {/* Date */}
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <Clock className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <div className="text-left">
                <p className="font-playfair text-xl md:text-2xl font-bold text-gradient-rose">
                  {dateFormatted}
                </p>
                <p className="font-montserrat text-xs text-gray-600">
                  À partir de 16h00
                </p>
              </div>
            </div>

            {/* Séparateur */}
            <div className="h-px bg-gradient-rose my-2"></div>

            {/* Lieu */}
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <div className="text-left">
                <p className="font-playfair text-sm md:text-base font-semibold text-gray-800">
                  Château de Malmaison
                </p>
                <p className="font-montserrat text-xs text-gray-600">
                  Rueil-Malmaison
                </p>
              </div>
            </div>
          </div>

          {/* Compte à rebours - Compacte */}
          <div className="max-w-2xl mx-auto">
            <Countdown />
          </div>

          {/* Message d'invitation - Réduit */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-soft border border-rose-100 max-w-xl mx-auto">
            <p className="font-playfair text-sm md:text-base text-gray-800 italic leading-relaxed">
              "Nous avons hâte de célébrer ce moment magique avec vous."
            </p>
          </div>

          {/* Boutons d'action - Compacts */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <button
              onClick={() => scrollToSection("#notre-histoire")}
              className="btn-romantic text-sm px-6 py-2.5"
            >
              Notre Histoire
            </button>
            <a
              href="mailto:emma.thomas.mariage@email.com?subject=Confirmation RSVP"
              className="btn-romantic-outline text-sm px-6 py-2.5 text-center"
            >
              Nous Contacter
            </a>
          </div>
        </div>
      </div>

      {/* Décoration flottante subtile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-rose-300/10 animate-float"
            style={{
              width: Math.random() * 60 + 15 + "px",
              height: Math.random() * 60 + 15 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 8 + 6}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
