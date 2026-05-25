import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { SafetyAlert } from "@/components/SafetyAlert";
import { Phone, ShieldAlert, Sun, Info, AlertTriangle } from "lucide-react";

export default function Safety() {
  return (
    <AnimatedPage className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Keeping Safe</h1>
        <p className="text-muted-foreground">Emergency contacts and safety guidance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="space-y-4 border-destructive/30">
          <h2 className="text-xl font-bold flex items-center gap-2 text-destructive">
            <Phone className="h-6 w-6" /> Emergency Contacts
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
              <span className="font-medium">European Emergency</span>
              <a href="tel:112" className="text-destructive font-mono font-bold tracking-wider">112</a>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
              <span className="font-medium">UK Emergency</span>
              <a href="tel:999" className="text-foreground font-mono font-bold tracking-wider">999</a>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
              <span className="font-medium">Trip Leader (Mr Smith)</span>
              <a href="tel:+447700900123" className="text-primary font-mono font-bold tracking-wider">+44 7700 900123</a>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
              <span className="font-medium">Residencia Office</span>
              <a href="tel:+34955123456" className="text-foreground font-mono font-bold tracking-wider">+34 955 123 456</a>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
              <span className="font-medium">UK Consulate (Seville)</span>
              <a href="tel:+34954230294" className="text-foreground font-mono font-bold tracking-wider">+34 954 230 294</a>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <SafetyAlert type="critical" title="Emergency Procedure">
            Stay calm → Call 112 → Call Mr Smith → Wait at agreed meetpoint
          </SafetyAlert>

          <GlassCard className="bg-primary/5">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Sun className="h-6 w-6 text-yellow-400" /> Health & Wellbeing
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0"/> Drink 2L water daily (it will be 35°C+)</li>
              <li className="flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0"/> Wear sunscreen SPF50+</li>
              <li className="flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0"/> Rest during afternoon heat (14:00–17:00 is hottest)</li>
            </ul>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="h-10 w-10 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center mb-4">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="font-bold mb-2">Pickpocket Safety</h3>
          <p className="text-sm text-muted-foreground">Keep valuables in hotel safe, don't flash phones in busy areas (Seville market, bus stations).</p>
        </GlassCard>

        <GlassCard>
          <div className="h-10 w-10 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center mb-4">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <h3 className="font-bold mb-2">Scam Warnings</h3>
          <p className="text-sm text-muted-foreground">Beware of "friendship bracelets" from strangers, do not give money to anyone on the street.</p>
        </GlassCard>

        <GlassCard>
          <div className="h-10 w-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mb-4">
            <Info className="h-5 w-5" />
          </div>
          <h3 className="font-bold mb-2">Daily Check-in</h3>
          <p className="text-sm text-muted-foreground">All students must check in with a staff member by 09:30 each morning.</p>
        </GlassCard>
      </div>

      <GlassCard className="border-white/10">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <ShieldAlert className="h-6 w-6 text-foreground" /> Medical Info
        </h2>
        <p className="text-sm text-muted-foreground mb-2">
          Any medication must be declared. The residencia has a first aid kit.
        </p>
        <p className="text-sm font-medium">
          Nearest hospital: Hospital de Lebrija (5 min by taxi)
        </p>
      </GlassCard>
    </AnimatedPage>
  );
}