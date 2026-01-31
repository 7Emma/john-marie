import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-rose-100">
      <div className="container-elegant py-16 md:py-20">
        {/* Contenu principal */}
        <div className="max-w-3xl mx-auto text-center space-y-12">
          
          {/* Logo et noms */}
          <div>
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Heart className="h-6 w-6 text-rose-500 fill-current" />
              <h3 className="font-playfair font-bold text-3xl md:text-4xl text-gradient-rose">
                J & M
              </h3>
              <Heart className="h-6 w-6 text-rose-500 fill-current" />
            </div>
            <p className="font-montserrat text-gray-700 text-lg">
              John & Marie
            </p>
          </div>

          {/* Informations du mariage */}
          <div className="bg-rose-50 rounded-2xl p-8 border border-rose-100">
            <p className="font-playfair text-3xl font-bold text-gradient-rose mb-3">
              30 Juin 2025
            </p>
            <p className="font-playfair text-lg text-gray-800 mb-2">
              Château de Malmaison
            </p>
            <p className="font-montserrat text-gray-600">
              Rueil-Malmaison, Île-de-France
            </p>
          </div>

          {/* Informations de contact */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Phone className="h-5 w-5 text-rose-500" />
              <div className="font-montserrat">
                <p className="text-gray-900 font-semibold">John</p>
                <p className="text-gray-600 text-sm">06 12 34 56 78</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Phone className="h-5 w-5 text-rose-500" />
              <div className="font-montserrat">
                <p className="text-gray-900 font-semibold">Marie</p>
                <p className="text-gray-600 text-sm">06 98 76 54 32</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Mail className="h-5 w-5 text-rose-500" />
              <a 
                href="mailto:emma.thomas.mariage@email.com"
                className="font-montserrat text-gray-900 font-semibold hover:text-rose-600 transition-colors text-sm"
              >
                Email
              </a>
            </div>
          </div>

          {/* Adresse */}
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="h-5 w-5 text-rose-500 flex-shrink-0" />
            <p className="font-montserrat text-gray-700">
              Avenue du Château de Malmaison, 92500 Rueil-Malmaison
            </p>
          </div>

          {/* Décoration */}
          <div className="flex justify-center">
            <div className="divider-elegant w-24">
              <div className="h-px bg-gradient-rose flex-1"></div>
              <Heart className="h-4 w-4 text-rose-600 fill-current" />
              <div className="h-px bg-gradient-rose flex-1"></div>
            </div>
          </div>

          {/* Message final */}
          <div>
            <p className="font-playfair text-2xl md:text-3xl text-gray-900 mb-3 italic">
              "Nous avons hâte de partager ce moment magique avec vous"
            </p>
            <p className="font-montserrat text-gray-700">
              Merci de faire partie de notre histoire d'amour
            </p>
          </div>

          {/* Séparateur */}
          <div className="h-px bg-gradient-rose"></div>

          {/* Copyright */}
          <div>
            <p className="font-montserrat text-sm text-gray-600">
              © 2025 John & Marie • Créé avec 💕 pour notre mariage
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
