import { useState, useEffect } from "react";

const Countdown = () => {
  // Calculer la date du mariage (15 jours à partir d'aujourd'hui à 16h)
  const today = new Date();
  const weddingDateObj = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15, 16, 0, 0);
  const weddingDate = weddingDateObj.getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const timeUnits = [
    { label: "Jours", value: timeLeft.days },
    { label: "Heures", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Secondes", value: timeLeft.seconds },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-soft border border-rose-100">
      <div className="text-center mb-4">
        <p className="font-montserrat text-sm md:text-base text-gray-700 font-medium">
          Plus que...
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4">
        {timeUnits.map((unit, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-soft p-2 md:p-3 w-full border border-rose-100 hover:border-rose-300 transition-elegant">
              <div className="text-2xl md:text-3xl font-playfair font-bold text-gradient-rose mb-1">
                {unit.value.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-gray-600 font-montserrat font-semibold uppercase tracking-widest">
                {unit.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="font-playfair text-sm md:text-base text-gray-800 italic">
          Jusqu'au jour J
        </p>
      </div>
    </div>
  );
};

export default Countdown;
