import { Heart, Calendar, MapPin, Sparkles } from "lucide-react";

const OurStory = () => {
  const milestones = [
    {
      icon: Heart,
      title: "Notre Rencontre",
      date: "Septembre 2020",
      description:
        "Nous nous sommes rencontrés lors d'un voyage entre amis en Toscane. Un coup de foudre sous les oliviers d'une belle soirée italienne.",
    },
    {
      icon: Calendar,
      title: "Premier Anniversaire",
      date: "Septembre 2021",
      description:
        "Notre première année ensemble, remplie de découvertes, de rires, de voyages et de moments magiques inoubliables.",
    },
    {
      icon: MapPin,
      title: "Emménagement",
      date: "Mars 2023",
      description:
        "Nous avons franchi le pas et décidé de vivre ensemble dans notre petit cocon parisien, commençant une nouvelle aventure.",
    },
    {
      icon: Sparkles,
      title: "La Demande",
      date: "Décembre 2024",
      description:
        "John a fait sa demande lors d'un weekend romantique en Normandie, face à la mer. Le moment où tout s'est changé en magie.",
    },
  ];

  return (
    <section
      id="notre-histoire"
      className="section-elegant bg-gradient-to-br from-rose-50/50 via-white to-gray-50"
    >
      <div className="container-elegant">
        {/* En-tête de section */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-montserrat text-sm md:text-base text-rose-600 font-semibold tracking-widest uppercase mb-4">
            Notre Voyage
          </p>
          <h2 className="heading-elegant text-gray-900 mb-6">
            Notre Histoire
          </h2>

          <div className="flex justify-center mb-8">
            <div className="divider-elegant w-32">
              <div className="h-px bg-gradient-rose flex-1"></div>
              <Heart className="h-5 w-5 text-rose-500 fill-current" />
              <div className="h-px bg-gradient-rose flex-1"></div>
            </div>
          </div>

          <p className="font-montserrat text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Une belle aventure qui a commencé il y a quelques années et qui se concrétise aujourd'hui en un mariage rempli d'amour.
          </p>
        </div>

        {/* Timeline des événements */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Ligne temporelle verticale */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-200 via-rose-400 to-rose-200 hidden md:block"></div>

            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative mb-10 md:mb-16 ${
                    isEven ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div
                    className={`md:w-1/2 ${
                      isEven ? "md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    {/* Point sur la timeline */}
                    <div
                      className="hidden md:block absolute top-6 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-4 border-rose-500 rounded-full z-10"
                      style={{
                        left:
                          isEven
                            ? "calc(50% + 40px)"
                            : "calc(50% - 40px)",
                      }}
                    ></div>

                    {/* Carte d'événement */}
                    <div className="card-romantic group">
                      {/* En-tête de carte */}
                      <div className="flex items-start mb-4 space-x-4">
                        <div className="bg-gradient-to-br from-rose-100 to-rose-200 p-3 rounded-xl group-hover:shadow-glow transition-all">
                          <Icon className="h-6 w-6 text-rose-600" />
                        </div>

                        <div className={isEven ? "md:text-right" : "md:text-left"}>
                          <h3 className="font-playfair text-2xl font-bold text-gray-900">
                            {milestone.title}
                          </h3>
                          <p className="font-montserrat text-sm text-rose-600 font-semibold mt-1">
                            {milestone.date}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-montserrat text-gray-700 leading-relaxed ml-1">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Point mobile */}
                  <div className="md:hidden absolute left-0 top-0 w-5 h-5 bg-white border-4 border-rose-500 rounded-full z-10 transform -translate-x-2.5"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Citation romantique */}
        <div className="text-center mt-20 md:mt-24">
          <div className="card-romantic bg-gradient-to-br from-rose-50 to-white max-w-3xl mx-auto">
            <p className="font-playfair text-2xl md:text-3xl text-gray-900 mb-6 italic">
              "L'amour, c'est quand on rencontre quelqu'un qui vous donne des nouvelles de vous-même."
            </p>
            <p className="font-montserrat text-rose-600 font-semibold">
              — André Breton
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
