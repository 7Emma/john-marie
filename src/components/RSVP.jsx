import { Mail, Phone } from "lucide-react";
import { useState } from "react";

const RSVP = () => {
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
    // Ici on pourrait envoyer les données à un backend
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
    }, 3000);
  };

  return (
    <section id="rsvp" className="section-elegant bg-gradient-to-br from-rose-50/50 via-white to-gray-50">
      <div className="container-elegant">
        {/* En-tête */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-montserrat text-sm md:text-base text-rose-600 font-semibold tracking-widest uppercase mb-4">
            Confirmez votre présence
          </p>
          <h2 className="heading-elegant text-gray-900 mb-6">
            RSVP
          </h2>
          <div className="flex justify-center mb-8">
            <div className="divider-elegant w-32">
              <div className="h-px bg-gradient-rose flex-1"></div>
              <svg className="h-5 w-5 text-rose-500 fill-current" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <div className="h-px bg-gradient-rose flex-1"></div>
            </div>
          </div>
          <p className="font-montserrat text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Merci de confirmer votre présence avant le 10 mars 2026
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="card-romantic space-y-6 mb-8">
            {/* Nom */}
            <div>
              <label className="block font-montserrat font-semibold text-gray-900 mb-2">
                Nom Complet *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat"
                placeholder="Votre nom"
              />
            </div>

            {/* Email et Téléphone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-montserrat font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat"
                  placeholder="votre.email@exemple.com"
                />
              </div>
              <div>
                <label className="block font-montserrat font-semibold text-gray-900 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat"
                  placeholder="06 XX XX XX XX"
                />
              </div>
            </div>

            {/* Nombre de convives */}
            <div>
              <label className="block font-montserrat font-semibold text-gray-900 mb-2">
                Nombre de convives *
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat"
              >
                <option value="1">1 invité</option>
                <option value="2">2 invités</option>
                <option value="3">3 invités</option>
                <option value="4">4 invités</option>
                <option value="5">5+ invités</option>
              </select>
            </div>

            {/* Régimes alimentaires */}
            <div>
              <label className="block font-montserrat font-semibold text-gray-900 mb-2">
                Restrictions alimentaires
              </label>
              <textarea
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat resize-none"
                placeholder="Allergies, régimes particuliers..."
                rows="2"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-montserrat font-semibold text-gray-900 mb-2">
                Un message pour nous?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all font-montserrat resize-none"
                placeholder="Vos vœux ou messages..."
                rows="3"
              />
            </div>

            {/* Bouton submit */}
            <button
              type="submit"
              className="btn-romantic w-full mt-8"
            >
              {submitted ? "✓ Confirmé!" : "Confirmer ma présence"}
            </button>
          </form>

          {/* Alternatives de contact */}
          <div className="text-center">
            <p className="font-montserrat text-gray-700 mb-4">
              Ou contactez-nous directement:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:emma.thomas.mariage@email.com"
                className="flex items-center justify-center space-x-2 btn-romantic-outline"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </a>
              <a
                href="tel:+33612345678"
                className="flex items-center justify-center space-x-2 btn-romantic-outline"
              >
                <Phone className="w-5 h-5" />
                <span>Appeler</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
