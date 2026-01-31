import { Gift, Heart, Plane, Home, MessageCircle, DollarSign, Sparkles, Utensils, BookOpen } from "lucide-react";

const Gifts = () => {
  const giftCategories = [
    {
      icon: Home,
      title: "Maison & Décoration",
      items: [
        "Linge de maison premium",
        "Service de vaisselle",
        "Couvertures & oreillers",
        "Miroir ou cadre déco",
      ],
    },
    {
      icon: Utensils,
      title: "Électroménager",
      items: [
        "Mixeur ou robot cuiseur",
        "Machine à café",
        "Fer à repasser",
        "Aspirateur",
      ],
    },
    {
      icon: Gift,
      title: "Cartes Cadeaux",
      items: [
        "Carte Fnac / Amazon",
        "Bon restaurant",
        "Bien-être & spa",
        "Magasin meubles",
      ],
    },
  ];

  const fundraisingProjects = [
    {
      icon: Plane,
      title: "Voyage de Noces",
      description: "Financer notre rêve : une semaine en Grèce pour découvrir les îles grecques",
      color: "from-blue-100 to-cyan-100",
    },
    {
      icon: Home,
      title: "Installation du Foyer",
      description: "Nous aider à meubler et aménager notre premier petit nid d'amour",
      color: "from-amber-100 to-orange-100",
    },
    {
      icon: Heart,
      title: "Projet Commun",
      description: "Contribuer à un projet qui nous tient à cœur et symbolise notre amour",
      color: "from-rose-100 to-pink-100",
    },
  ];

  const symbolicGifts = [
    {
      icon: MessageCircle,
      title: "Messages de Bénédiction",
      description: "Écrivez-nous un mot doux, un conseil ou vos bénédictions pour notre couple",
    },
    {
      icon: BookOpen,
      title: "Conseils pour la Vie de Couple",
      description: "Partagez les secrets de votre bonheur conjugal et vos meilleurs souvenirs",
    },
    {
      icon: Sparkles,
      title: "Vœux & Souhaits",
      description: "Un texte poétique, une citation qui nous inspire ou un souhait spécial",
    },
  ];

  return (
    <section id="cadeaux" className="section-elegant bg-white">
      <div className="container-elegant">
        {/* En-tête */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-montserrat text-sm md:text-base text-rose-600 font-semibold tracking-widest uppercase mb-4">
            Cadeaux
          </p>
          <h2 className="heading-elegant text-gray-900 mb-6">
            Comment Nous Offrir un Présent
          </h2>
          <div className="flex justify-center mb-8">
            <div className="divider-elegant w-32">
              <div className="h-px bg-gradient-rose flex-1"></div>
              <Gift className="h-5 w-5 text-rose-500" />
              <div className="h-px bg-gradient-rose flex-1"></div>
            </div>
          </div>
        </div>

        {/* Message d'introduction */}
        <div className="card-romantic bg-gradient-to-br from-rose-50 to-white max-w-3xl mx-auto mb-16">
          <div className="space-y-4">
            <p className="font-playfair text-xl md:text-2xl text-gray-900 italic">
              Votre présence à nos côtés est déjà un merveilleux cadeau.
            </p>
            <p className="font-montserrat text-gray-700 leading-relaxed">
              Pour ceux qui souhaitent nous offrir un présent, vous trouverez ci-dessous quelques idées qui nous aideront à commencer notre nouvelle vie ensemble avec joie et sérénité.
            </p>
            <p className="font-montserrat text-gray-600 italic text-sm">
              ❤️ Votre générosité nous touche profondément.
            </p>
          </div>
        </div>

        {/* Section 1 : Cadeaux classiques */}
        <div className="mb-20">
          <h3 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-4">
            Idées de Cadeaux
          </h3>
          <p className="font-montserrat text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Des suggestions pour vous aider à choisir un présent qui nous plaira vraiment
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {giftCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="card-romantic">
                  <div className="bg-rose-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-rose-600" />
                  </div>
                  <h4 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                    {category.title}
                  </h4>
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <span className="text-rose-500 font-bold mt-1 flex-shrink-0">✓</span>
                        <span className="font-montserrat text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2 : Cagnotte & Projets */}
        <div className="mb-20">
          <h3 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-4">
            Contribution à Nos Projets
          </h3>
          <p className="font-montserrat text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Si vous souhaitez contribuer à un projet qui nous tient à cœur, voici nos priorités
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {fundraisingProjects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={index}
                  className={`card-romantic bg-gradient-to-br ${project.color}`}
                >
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-soft">
                    <IconComponent className="h-6 w-6 text-rose-600" />
                  </div>
                  <h4 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h4>
                  <p className="font-montserrat text-gray-800">
                    {project.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3 : Cadeaux Symboliques */}
        <div className="mb-20">
          <h3 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-4">
            Cadeaux du Cœur
          </h3>
          <p className="font-montserrat text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Un geste qui nous touchera aussi profondément qu'un présent matériel
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {symbolicGifts.map((gift, index) => {
              const IconComponent = gift.icon;
              return (
                <div key={index} className="card-romantic bg-gradient-to-br from-purple-50 to-white">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                    {gift.title}
                  </h4>
                  <p className="font-montserrat text-gray-700">
                    {gift.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4 : Contribution Financière */}
        <div className="mb-20">
          <div className="card-romantic bg-gradient-to-br from-rose-50 to-white max-w-2xl mx-auto">
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-rose-100 p-3 rounded-lg flex-shrink-0">
                <DollarSign className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h4 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Contribution Financière
                </h4>
                <p className="font-montserrat text-gray-700 leading-relaxed mb-4">
                  Si vous souhaitez contribuer financièrement à nos projets, vous pouvez le faire de manière sécurisée. Chaque contribution, petite ou grande, est un geste d'amour qui nous aide à construire notre avenir ensemble.
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t border-rose-200 pt-6">
              <div className="bg-white rounded-lg p-4 border border-rose-100">
                <p className="font-montserrat font-semibold text-gray-900 mb-2">
                  Virement Bancaire
                </p>
                <p className="font-montserrat text-sm text-gray-700">
                  <span className="block">Titulaire : John & Marie</span>
                  <span className="block text-gray-600 text-xs mt-2">Contactez-nous pour les coordonnées bancaires</span>
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-rose-100">
                <p className="font-montserrat font-semibold text-gray-900 mb-2">
                  Contact Direct
                </p>
                <p className="font-montserrat text-sm text-gray-700">
                  <span className="block">John : 06 12 34 56 78</span>
                  <span className="block">Marie : 06 98 76 54 32</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 : Message de Remerciement */}
        <div className="card-romantic bg-gradient-to-br from-rose-100 to-pink-50 max-w-3xl mx-auto text-center">
          <div className="space-y-6">
            <Heart className="h-10 w-10 text-rose-600 fill-current mx-auto animate-glow-pulse" />
            <div>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-4 italic">
                Merci du fond du cœur
              </h3>
              <p className="font-montserrat text-gray-800 leading-relaxed mb-4">
                Merci pour votre amour, votre soutien et votre générosité.
              </p>
              <p className="font-montserrat text-gray-700">
                Votre présence et vos bénédictions sont les plus beaux cadeaux qu'on puisse recevoir.
              </p>
            </div>
            <p className="font-playfair text-xl text-rose-600">
              Nous avons hâte de célébrer ce grand jour avec vous 💍
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="mailto:emma.thomas.mariage@email.com?subject=Cadeau de mariage"
            className="btn-romantic inline-block"
          >
            Nous Contacter pour Plus d'Infos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gifts;
