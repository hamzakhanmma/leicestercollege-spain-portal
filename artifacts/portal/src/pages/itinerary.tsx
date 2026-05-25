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
      icon: <Plane className="h-4 w-4" />,
    },
    {
      id: "w1-2",
      date: "Tue 15 Jul",
      title: "Orientation",
      description: "Meet placement supervisors, Spanish lesson (10:00).",
      icon: <Flag className="h-4 w-4" />,
    },
    {
      id: "w1-3",
      date: "Wed 16 Jul",
      title: "Work Placement & Lesson",
      description: "Work placement (09:00–13:00), afternoon free, Spanish lesson (16:00).",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "w1-4",
      date: "Thu 17 Jul",
      title: "Work & Culture",
      description: "Work placement (09:00–13:00), cultural activity (afternoon).",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "w1-5",
      date: "Fri 18 Jul",
      title: "Work & Group Dinner",
      description: "Work placement (09:00–13:00), group dinner (20:00).",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      id: "w1-6",
      date: "Sat 19 Jul",
      title: "Day Trip",
      description: "Day trip to Cadiz & beach.",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      id: "w1-7",
      date: "Sun 20 Jul",
      title: "Rest Day",
      description: "Rest day / optional football / paddle tennis.",
      icon: <Coffee className="h-4 w-4" />,
    },
  ];

  const week2Items: TimelineItem[] = [
    {
      id: "w2-1",
      date: "Mon 21 Jul",
      title: "Work & Reflection",
      description: "Work placement (09:00–13:00), reflective diary session.",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "w2-2",
      date: "Tue 22 Jul",
      title: "Cooking Class",
      description: "Work placement, enrichment: Spanish cooking class.",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      id: "w2-3",
      date: "Wed 23 Jul",
      title: "Seville Trip",
      description: "Work placement, Seville city trip (afternoon).",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      id: "w2-4",
      date: "Thu 24 Jul",
      title: "Work & Free Time",
      description: "Work placement, free afternoon in Lebrija.",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "w2-5",
      date: "Fri 25 Jul",
      title: "Final Placement Day",
      description: "Final placement day, farewell activity.",
      icon: <Flag className="h-4 w-4" />,
    },
    {
      id: "w2-6",
      date: "Sat 26 Jul",
      title: "Free Day",
      description: "Free day / shopping / relaxation.",
      icon: <Coffee className="h-4 w-4" />,
    },
    {
      id: "w2-7",
      date: "Sun 27 Jul",
      title: "Farewell",
      description: "Packing, farewell dinner, early night.",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      id: "w2-8",
      date: "Mon 28 Jul",
      title: "Departure",
      description: "Depart Lebrija → Seville airport → Fly home.",
      icon: <Plane className="h-4 w-4" />,
    },
  ];

  return (
    <AnimatedPage className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Daily Itinerary</h1>
        <p className="text-muted-foreground">Your schedule for the two-week placement.</p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-primary">Week 1</h2>
        <Timeline items={week1Items} />
      </div>

      <div className="space-y-8 pt-8">
        <h2 className="text-2xl font-bold text-primary">Week 2</h2>
        <Timeline items={week2Items} />
      </div>

    </AnimatedPage>
  );
}