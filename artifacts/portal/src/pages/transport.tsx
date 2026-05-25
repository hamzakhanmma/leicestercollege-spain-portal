import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Timeline } from "@/components/Timeline";
import { SafetyAlert } from "@/components/SafetyAlert";
import { Bus, Map, MapPin } from "lucide-react";

export default function Transport() {
  const routeItems = [
    {
      id: "leicester",
      title: "Leicester College",
      description: "Coach departs main entrance at 06:30.",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      id: "ema",
      title: "East Midlands Airport",
      description: "Flight to Seville.",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      id: "seville",
      title: "Seville Airport (SVQ)",
      description: "Private coach transfer upon arrival.",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      id: "lebrija",
      title: "Lebrija Residencia",
      description: "Arrive at accommodation.",
      icon: <MapPin className="h-5 w-5" />,
      isActive: true,
    }
  ];

  return (
    <AnimatedPage className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Transport</h1>
        <p className="text-muted-foreground">Information about local and international transport.</p>
      </div>

      <SafetyAlert type="info" title="Travel Safety Reminders">
        Stay with the group, share location with parents, and no solo travel at night.
      </SafetyAlert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Bus className="h-5 w-5 text-primary" /> Placement Transport
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Students will walk or take the local bus to their placements. Provided route maps will be given upon arrival.
          </p>
          <div className="bg-black/20 rounded-lg p-4 flex items-center justify-center border border-white/5">
            <Map className="h-10 w-10 text-muted-foreground/50" />
            <span className="ml-2 text-sm text-muted-foreground font-medium">Maps available at induction</span>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Bus className="h-5 w-5 text-primary" /> Organised Trips
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="block">Seville Day Trip</strong>
                <span className="text-sm text-muted-foreground">Private coach provided by residencia (included).</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="block">Cadiz / Beach Trip</strong>
                <span className="text-sm text-muted-foreground">Private coach provided (Saturday 19 July).</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="block">Emergency Taxi</strong>
                <span className="text-sm text-muted-foreground">Available via residencia staff. Cost will be deducted from pocket money if misused.</span>
              </div>
            </li>
          </ul>
        </GlassCard>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold">Route Overview</h3>
        <Timeline items={routeItems} />
      </div>

    </AnimatedPage>
  );
}