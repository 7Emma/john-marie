import { X, Mail, Phone } from "lucide-react";
import { useState } from "react";

const RSVPModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    dietary: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "1",
        dietary: "",
        message: "",
      });
      onClose();
    }, 2000);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-screen w-full md:w-[450px] bg-white shadow-2xl z-50 overflow-y-auto transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-rose-50 to-white border-b border-rose-100 px-6 py-5 flex items-center justify-between">
          <h2 className="font-playfair text-2xl font-bold text-gray-900">
            RSVP
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Contenu */}
        <div className="px-6 py-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Message d'intro */}
              <div className="mb-6">
                <p className="font-montserrat text-gray-700 text-sm leading-relaxed">
                  Merci de confirmer votre présence avant le <span className="font-semibold text-rose-600">10 mars 2026</span>
                </p>
              </div>

              {/* Nom */}
              <div>
                <label className="block font-montserrat font-semibold text-gray-900 mb-2 text-sm">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat text-sm"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-montserrat font-semibold text-gray-900 mb-2 text-sm">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat text-sm"
                  placeholder="votre.email@exemple.com"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block font-montserrat font-semibold text-gray-900 mb-2 text-sm">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat text-sm"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              {/* Nombre de convives */}
              <div>
                <label className="block font-montserrat font-semibold text-gray-900 mb-2 text-sm">
                  Nombre de convives *
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat text-sm"
                >
                  <option value="1">1 invité</option>
                  <option value="2">2 invités</option>
                  <option value="3">3 invités</option>
                  <option value="4">4 invités</option>
                  <option value="5">5+ invités</option>
                </select>
              </div>

              {/* Restrictions alimentaires */}
              <div>
                <label className="block font-montserrat font-semibold text-gray-900 mb-2 text-sm">
                  Restrictions alimentaires
                </label>
                <textarea
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat text-sm resize-none"
                  placeholder="Allergies, régimes particuliers..."
                  rows="2"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-montserrat font-semibold text-gray-900 mb-2 text-sm">
                  Un message pour nous?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat text-sm resize-none"
                  placeholder="Vos vœux ou messages..."
                  rows="3"
                />
              </div>

              {/* Bouton submit */}
              <button
                type="submit"
                className="w-full btn-romantic mt-8"
              >
                Confirmer ma présence
              </button>

              {/* Séparateur */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-rose-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-600 font-montserrat">
                    Ou nous contacter
                  </span>
                </div>
              </div>

              {/* Contact alternative */}
              <div className="space-y-2">
                <a
                  href="mailto:emma.thomas.mariage@email.com?subject=Confirmation RSVP"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors font-montserrat text-sm font-semibold"
                >
                  <Mail className="w-4 h-4" />
                  <span>Par Email</span>
                </a>
                <a
                  href="tel:+33612345678"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors font-montserrat text-sm font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Marie : 06 12 34 56 78</span>
                </a>
              </div>
            </form>
          ) : (
            /* Message de confirmation */
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center animate-pulse">
                <svg
                  className="w-8 h-8 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.285 2l-11.285 11.567-5.285-5.36-3.715 3.785 9 9.15 15-15.397z" />
                </svg>
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Merci!
                </h3>
                <p className="font-montserrat text-gray-700">
                  Votre présence a été confirmée avec succès.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RSVPModal;
