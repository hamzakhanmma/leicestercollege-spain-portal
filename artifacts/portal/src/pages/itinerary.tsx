import { AnimatedPage } from "@/components/AnimatedPage";
import { Timeline, TimelineItem } from "@/components/Timeline";
import { Plane, Calendar, MapPin, Coffee, Utensils, Flag } from "lucide-react";

export default function Itinerary() {
  const week1Items: TimelineItem[] = [
    {
      id: "w1-1",
      date: "Mon 14 Jul",
      title: "Travel Day",
      description: "Depart Leicester, arrive Lebrija, settle in.",
      icon: <Plane className="h-5 w-5" />,
      isActive: true,
    },
    {
      id: "w1-2",
      date: "Tue 15 Jul",
      title: "Orientation",
      description: "Meet placement supervisors, Spanish lesson (10:00).",
      icon: <Flag className="h-5 w-5" />,
    },
    {
      id: "w1-3",
      date: "Wed 16 Jul",
      title: "Work Placement & Lesson",
      description: "Work placement (09:00–13:00), afternoon free, Spanish lesson (16:00).",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "w1-4",
      date: "Thu 17 Jul",
      title: "Work & Culture",
      description: "Work placement (09:00–13:00), cultural activity (afternoon).",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "w1-5",
      date: "Fri 18 Jul",
      title: "Work & Group Dinner",
      description: "Work placement (09:00–13:00), group dinner (20:00).",
      icon: <Utensils className="h-5 w-5 text-purple-400" />,
    },
    {
      id: "w1-6",
      date: "Sat 19 Jul",
      title: "Day Trip",
      description: "Day trip to Cadiz & beach.",
      icon: <MapPin className="h-5 w-5 text-yellow-400" />,
    },
    {
      id: "w1-7",
      date: "Sun 20 Jul",
      title: "Rest Day",
      description: "Rest day / optional football / paddle tennis.",
      icon: <Coffee className="h-5 w-5" />,
    },
  ];

  const week2Items: TimelineItem[] = [
    {
      id: "w2-1",
      date: "Mon 21 Jul",
      title: "Work & Reflection",
      description: "Work placement (09:00–13:00), reflective diary session.",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "w2-2",
      date: "Tue 22 Jul",
      title: "Cooking Class",
      description: "Work placement, enrichment: Spanish cooking class.",
      icon: <Utensils className="h-5 w-5 text-orange-400" />,
    },
    {
      id: "w2-3",
      date: "Wed 23 Jul",
      title: "Seville Trip",
      description: "Work placement, Seville city trip (afternoon).",
      icon: <MapPin className="h-5 w-5 text-amber-400" />,
    },
    {
      id: "w2-4",
      date: "Thu 24 Jul",
      title: "Work & Free Time",
      description: "Work placement, free afternoon in Lebrija.",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "w2-5",
      date: "Fri 25 Jul",
      title: "Final Placement Day",
      description: "Final placement day, farewell activity.",
      icon: <Flag className="h-5 w-5" />,
    },
    {
      id: "w2-6",
      date: "Sat 26 Jul",
      title: "Free Day",
      description: "Free day / shopping / relaxation.",
      icon: <Coffee className="h-5 w-5" />,
    },
    {
      id: "w2-7",
      date: "Sun 27 Jul",
      title: "Farewell",
      description: "Packing, farewell dinner, early night.",
      icon: <Utensils className="h-5 w-5 text-purple-400" />,
    },
    {
      id: "w2-8",
      date: "Mon 28 Jul",
      title: "Departure",
      description: "Depart Lebrija → Seville airport → Fly home.",
      icon: <Plane className="h-5 w-5" />,
    },
  ];

  return (
    <AnimatedPage className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Daily Itinerary</h1>
          <p className="text-xl text-muted-foreground">Your schedule for the two-week placement.</p>
        </div>
        <div className="bg-primary/10 border border-primary/30 px-5 py-3 rounded-xl backdrop-blur-md">
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Current Status</div>
          <div className="font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,169,206,0.8)]"></div>
            Pre-Departure
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300 drop-shadow-md inline-block">Week 1</h2>
        <Timeline items={week1Items} />
      </div>

      <div className="space-y-12 pt-12">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300 drop-shadow-md inline-block">Week 2</h2>
        <Timeline items={week2Items} />
      </div>

    </AnimatedPage>
  );
}