import { Clock, MapPin, Users, Camera, Music, Utensils, Gift, Heart } from "lucide-react";

const Program = () => {
  const schedule = [
    {
      time: "16:00",
      icon: Users,
      title: "Accueil des Invités",
      description: "Cocktail de bienvenue dans les jardins du château",
      location: "Jardins",
    },
    {
      time: "16:30",
      icon: Heart,
      title: "Cérémonie Laïque",
      description: "Échange des vœux en plein air avec vue sur les jardins",
      location: "Orangerie",
    },
    {
      time: "17:30",
      icon: Camera,
      title: "Séance Photos",
      description: "Photos de famille et des mariés dans le parc",
      location: "Parc",
    },
    {
      time: "18:30",
      icon: Utensils,
      title: "Cocktail Dînatoire",
      description: "Apéritif et petits fours sur la terrasse",
      location: "Terrasse",
    },
    {
      time: "20:00",
      icon: Utensils,
      title: "Dîner",
      description: "Repas gastronomique en salle de réception",
      location: "Salle des Fêtes",
    },
    {
      time: "22:30",
      icon: Music,
      title: "Ouverture du Bal",
      description: "Première danse des mariés suivie de la soirée dansante",
      location: "Salle des Fêtes",
    },
    {
      time: "01:00",
      icon: Gift,
      title: "Buffet de Minuit",
      description: "Petite restauration pour reprendre des forces",
      location: "Bar",
    },
  ];

  return (
    <section id="programme" className="section-elegant bg-white">
      <div className="container-elegant">
        {/* En-tête */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-montserrat text-sm md:text-base text-rose-600 font-semibold tracking-widest uppercase mb-4">
            Déroulement
          </p>
          <h2 className="heading-elegant text-gray-900 mb-6">
            Programme du Jour J
          </h2>
          <div className="flex justify-center mb-8">
            <div className="divider-elegant w-32">
              <div className="h-px bg-gradient-rose flex-1"></div>
              <Clock className="h-5 w-5 text-rose-500" />
              <div className="h-px bg-gradient-rose flex-1"></div>
            </div>
          </div>
          <p className="font-montserrat text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Un programme pensé pour que ce jour soit magique du début à la fin
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Ligne temporelle verticale */}
            <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 via-rose-500 to-rose-300"></div>

            {schedule.map((event, index) => {
              const EventIcon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative mb-6 md:mb-10">
                  {/* Point sur la timeline */}
                  <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 top-6 w-6 h-6 bg-white border-4 border-rose-500 rounded-full z-10"></div>

                  {/* Contenu de l'événement */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    <div className="card-romantic group">
                      {/* En-tête avec heure et icône */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="bg-rose-100 p-2.5 rounded-lg group-hover:bg-rose-200 transition-colors flex-shrink-0">
                          <EventIcon className="h-5 w-5 text-rose-600" />
                        </div>
                        <div>
                          <div className="font-playfair text-lg font-bold text-rose-600">
                            {event.time}
                          </div>
                          <h3 className="font-playfair text-xl font-bold text-gray-900">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-montserrat text-gray-700 mb-3 ml-1">
                        {event.description}
                      </p>

                      {/* Lieu */}
                      <div className="flex items-center text-sm ml-1">
                        <MapPin className="h-4 w-4 text-rose-500 mr-2" />
                        <span className="font-montserrat text-gray-600 font-medium">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Informations pratiques */}
        <div className="mt-20 md:mt-24 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="card-romantic">
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
              Informations Pratiques
            </h3>
            <ul className="space-y-4 font-montserrat text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-rose-500 font-bold mt-1">•</span>
                <span>Tenue de cérémonie souhaitée</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-rose-500 font-bold mt-1">•</span>
                <span>Parking gratuit disponible sur place</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-rose-500 font-bold mt-1">•</span>
                <span>Hébergement possible au château (nous contacter)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-rose-500 font-bold mt-1">•</span>
                <span>Cérémonie en extérieur (prévoir une étole)</span>
              </li>
            </ul>
          </div>

          <div className="card-romantic">
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
              Nous Contacter
            </h3>
            <div className="space-y-4 font-montserrat text-gray-700">
              <p className="font-semibold text-gray-900">Pour toute question :</p>
              <div className="space-y-2">
                <p><span className="text-rose-600 font-semibold">John :</span> 06 12 34 56 78</p>
                <p><span className="text-rose-600 font-semibold">Marie :</span> 06 98 76 54 32</p>
              </div>
              <div className="pt-2 border-t border-rose-100">
                <a 
                  href="mailto:emma.thomas.mariage@email.com"
                  className="text-rose-600 font-semibold hover:text-rose-700 transition-colors"
                >
                  john.marie.mariage@email.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
