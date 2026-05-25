import { AnimatedPage } from "@/components/AnimatedPage";
import { Timeline, TimelineItem } from "@/components/Timeline";
import { Plane, Calendar, MapPin, Coffee, Utensils, Flag } from "lucide-react";
import { usePortalContent } from "@/lib/portal-content";
import { ReactNode } from "react";

const ICON_MAP: Record<string, ReactNode> = {
  Plane: <Plane className="h-5 w-5" />,
  Calendar: <Calendar className="h-5 w-5" />,
  MapPin: <MapPin className="h-5 w-5" />,
  Coffee: <Coffee className="h-5 w-5" />,
  Utensils: <Utensils className="h-5 w-5" />,
  Flag: <Flag className="h-5 w-5" />,
};

const COLOR_ICON: Record<string, ReactNode> = {
  sky: <Plane className="h-5 w-5 text-sky-400" />,
  cyan: <MapPin className="h-5 w-5 text-cyan-400" />,
  amber: <MapPin className="h-5 w-5 text-amber-400" />,
  orange: <Utensils className="h-5 w-5 text-orange-400" />,
  purple: <Utensils className="h-5 w-5 text-purple-400" />,
};

function toTimelineItem(day: any): TimelineItem {
  const icon = day.colorKey && COLOR_ICON[day.colorKey]
    ? COLOR_ICON[day.colorKey]
    : ICON_MAP[day.iconKey || "Calendar"] ?? <Calendar className="h-5 w-5" />;

  return {
    id: day.id,
    date: day.date,
    title: day.title,
    description: day.description,
    icon,
    isActive: day.isActive,
  };
}

export default function Itinerary() {
  const { content } = usePortalContent();
  const all = content.itinerary;
  const week1Items = all.slice(0, 7).map(toTimelineItem);
  const week2Items = all.slice(7).map(toTimelineItem);

  return (
    <AnimatedPage className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Daily Itinerary</h1>
          <p className="text-xl text-muted-foreground">Your schedule for the two-week placement.</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/25 px-5 py-3 rounded-xl backdrop-blur-md">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Current Status</div>
          <div className="font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
            Pre-Departure
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300 drop-shadow-md inline-block">Week 1</h2>
        <Timeline items={week1Items} />
      </div>

      {week2Items.length > 0 && (
        <div className="space-y-12 pt-12">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300 drop-shadow-md inline-block">Week 2</h2>
          <Timeline items={week2Items} />
        </div>
      )}
    </AnimatedPage>
  );
}
