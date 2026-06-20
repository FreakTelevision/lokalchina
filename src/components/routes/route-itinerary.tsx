interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string;
}

interface RouteItineraryProps {
  itinerary: ItineraryDay[];
  locale: string;
}

export function RouteItinerary({ itinerary, locale }: RouteItineraryProps) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />

      <div className="space-y-8">
        {itinerary.map((day, index) => (
          <div key={index} className="relative flex gap-6">
            {/* Day Number Circle */}
            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{day.day}</span>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1.5">
              <h4 className="font-semibold text-base mb-1.5">{day.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {day.description}
              </p>
              {day.meals && (
                <span className="inline-block mt-2 text-xs font-medium text-primary bg-primary/5 px-2 py-0.5 rounded">
                  🍽 {day.meals}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
