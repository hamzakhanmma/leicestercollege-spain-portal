import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Home, Clock, Wifi, Coffee, Shirt, Info, ShieldAlert } from "lucide-react";
import { SafetyAlert } from "@/components/SafetyAlert";

export default function Accommodation() {
  return (
    <AnimatedPage className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Accommodation</h1>
        <p className="text-muted-foreground">Residencia Universitaria, Lebrija.</p>
      </div>

      <div className="relative rounded-2xl overflow-hidden h-64 border border-white/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-2xl font-bold">Residencia Universitaria</h2>
          <p className="text-muted-foreground">Modern university-style accommodation</p>
        </div>
      </div>

      <SafetyAlert type="warning" title="Curfew Notice">
        Missing curfew is a serious breach of rules. Parents and college will be notified immediately.
      </SafetyAlert>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col items-center text-center p-6">
          <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <Home className="h-6 w-6" />
          </div>
          <h3 className="font-bold mb-2">Room Sharing</h3>
          <p className="text-sm text-muted-foreground">Rooms shared with college classmates (2-3 per room).</p>
        </GlassCard>

        <GlassCard className="flex flex-col items-center text-center p-6">
          <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="font-bold mb-2">Curfew</h3>
          <p className="text-sm text-muted-foreground">22:00 Sunday–Thursday<br/>23:00 Friday–Saturday</p>
        </GlassCard>

        <GlassCard className="flex flex-col items-center text-center p-6">
          <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <Info className="h-6 w-6" />
          </div>
          <h3 className="font-bold mb-2">Cleaning</h3>
          <p className="text-sm text-muted-foreground">Students are responsible for keeping rooms tidy — inspections may occur.</p>
        </GlassCard>

        <GlassCard className="flex flex-col items-center text-center p-6">
          <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="font-bold mb-2">Behaviour</h3>
          <p className="text-sm text-muted-foreground">Respect for other residents, no loud noise after 22:00.</p>
        </GlassCard>

        <GlassCard className="flex flex-col items-center text-center p-6">
          <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <Wifi className="h-6 w-6" />
          </div>
          <h3 className="font-bold mb-2">Wi-Fi</h3>
          <p className="text-sm text-muted-foreground">Available throughout, password provided on arrival.</p>
        </GlassCard>

        <GlassCard className="flex flex-col items-center text-center p-6">
          <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <Shirt className="h-6 w-6" />
          </div>
          <h3 className="font-bold mb-2">Laundry</h3>
          <p className="text-sm text-muted-foreground">Available on-site (bring your own detergent pods).</p>
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Coffee className="h-6 w-6 text-primary" /> Meals
        </h3>
        <p className="text-sm text-muted-foreground mb-6">Do not miss meals. Served in the main dining hall.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-1">Breakfast</h4>
            <p className="text-primary font-mono">07:30</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-1">Lunch</h4>
            <p className="text-primary font-mono">14:00</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-1">Dinner</h4>
            <p className="text-primary font-mono">20:30</p>
          </div>
        </div>
      </GlassCard>
    </AnimatedPage>
  );
}