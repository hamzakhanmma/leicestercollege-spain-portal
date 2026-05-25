import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Timeline } from "@/components/Timeline";
import { SafetyAlert } from "@/components/SafetyAlert";
import { Plane, Bus, Luggage, Shield, MapPin, Clock, CreditCard, BatteryCharging } from "lucide-react";

export default function Flights() {
  const timelineItems = [
    {
      id: "meet",
      time: "06:30",
      title: "Meet at College",
      description: "Meet at the main college entrance coach bay. DO NOT BE LATE.",
      icon: <MapPin className="h-5 w-5" />,
      isActive: true,
    },
    {
      id: "coach",
      time: "06:45",
      title: "Coach to EMA",
      description: "Coach departs for East Midlands Airport.",
      icon: <Bus className="h-5 w-5" />,
    },
    {
      id: "checkin",
      time: "07:45",
      title: "Check-in & Security",
      description: "Drop hold bags and clear security.",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: "boarding",
      time: "09:00",
      title: "Boarding FR1234",
      description: "Proceed to gate for boarding.",
      icon: <Plane className="h-5 w-5" />,
    },
    {
      id: "takeoff",
      time: "09:45",
      title: "Takeoff",
      description: "Departing for Seville (SVQ).",
      icon: <Plane className="h-5 w-5" />,
    },
    {
      id: "landing",
      time: "13:30",
      title: "Land in Seville",
      description: "Local time. Clear passport control and collect bags.",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      id: "transfer",
      time: "14:30",
      title: "Transfer to Lebrija",
      description: "Coach transfer to Residencia Universitaria.",
      icon: <Bus className="h-5 w-5" />,
    }
  ];

  return (
    <AnimatedPage className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Flight Information</h1>
        <p className="text-muted-foreground">Detailed travel itinerary and requirements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="space-y-6">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <div className="bg-primary/20 p-3 rounded-xl">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Outbound Flight</h2>
              <p className="text-sm text-muted-foreground">Ryanair FR1234 • 14 July 2025</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-foreground">EMA</p>
              <p className="text-sm text-muted-foreground">East Midlands</p>
              <p className="text-sm font-medium mt-1">09:45</p>
            </div>
            <div className="flex-1 px-4 flex flex-col items-center">
              <div className="w-full h-px bg-border relative">
                <Plane className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground mt-2">2h 45m</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">SVQ</p>
              <p className="text-sm text-muted-foreground">Seville</p>
              <p className="text-sm font-medium mt-1">13:30 (Local)</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-6">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <div className="bg-secondary/50 p-3 rounded-xl">
              <Plane className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Return Flight</h2>
              <p className="text-sm text-muted-foreground">Ryanair FR1235 • 28 July 2025</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-foreground">SVQ</p>
              <p className="text-sm text-muted-foreground">Seville</p>
              <p className="text-sm font-medium mt-1">16:20 (Local)</p>
            </div>
            <div className="flex-1 px-4 flex flex-col items-center">
              <div className="w-full h-px bg-border relative">
                <Plane className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground rotate-180" />
              </div>
              <span className="text-xs text-muted-foreground mt-2">2h 45m</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">EMA</p>
              <p className="text-sm text-muted-foreground">East Midlands</p>
              <p className="text-sm font-medium mt-1">18:05</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <SafetyAlert type="critical" title="Meeting Point & Time">
        Coach departs Leicester College car park at <strong>06:30 sharp</strong> on Monday 14 July 2025. Do not be late, the coach cannot wait.
      </SafetyAlert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Luggage className="h-5 w-5 text-primary" /> Luggage Allowance
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="block">1x Hold Bag</strong>
                <span className="text-sm text-muted-foreground">Maximum 20kg. Drops at check-in desk.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="block">1x Cabin Bag</strong>
                <span className="text-sm text-muted-foreground">55x40x20cm, max 10kg. Must fit in overhead locker. No personal item included.</span>
              </div>
            </li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> Mandatory Documents
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="block">Passport</strong>
                <span className="text-sm text-muted-foreground">Must be valid for 6+ months beyond return date.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="block">GHIC Card</strong>
                <span className="text-sm text-muted-foreground">Bring your European Health Insurance Card.</span>
              </div>
            </li>
          </ul>
        </GlassCard>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold">Departure Timeline</h3>
        <Timeline items={timelineItems} />
      </div>

      <GlassCard className="bg-primary/5 border-primary/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" /> Packing Checklist
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-muted-foreground"/> Passport & GHIC</div>
          <div className="flex items-center gap-2 text-sm"><CreditCard className="h-4 w-4 text-muted-foreground"/> Euros</div>
          <div className="flex items-center gap-2 text-sm"><BatteryCharging className="h-4 w-4 text-muted-foreground"/> Phone charger & adapter (Type C)</div>
          <div className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-muted-foreground"/> Travel insurance docs</div>
          <div className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-muted-foreground"/> Medication letter (if needed)</div>
          <div className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-muted-foreground"/> Sunscreen & comfortable shoes</div>
        </div>
      </GlassCard>

    </AnimatedPage>
  );
}