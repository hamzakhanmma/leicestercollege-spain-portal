import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { SafetyAlert } from "@/components/SafetyAlert";
import { Phone, ShieldAlert, Sun, Info, AlertTriangle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function Safety() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const spainTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(time);

  return (
    <AnimatedPage className="space-y-8">
      {/* Page Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950/40 via-red-900/10 to-background border border-red-500/20 shadow-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-[40px] animate-pulse"></div>
          <div className="relative w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-red-500/50 animate-ping"></div>
            <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-red-100">Keeping Safe</h1>
          <p className="text-xl text-red-200/80 font-medium">Your safety is our highest priority.</p>
        </div>
        
        <GlassCard className="bg-red-950/40 border-red-500/30 w-full md:w-auto text-center shrink-0">
          <div className="text-sm text-red-300/80 font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" /> Time in Spain
          </div>
          <div className="text-4xl font-mono font-black text-red-100 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            {spainTime}
          </div>
        </GlassCard>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="space-y-6 border-red-500/20 bg-gradient-to-b from-card/80 to-card">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Phone className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-red-100 tracking-tight">Rapid Access</h2>
          </div>
          
          <div className="space-y-4">
            <a href="tel:112" className="block group">
              <div className="flex justify-between items-center p-4 bg-red-950/20 rounded-xl border border-red-500/30 hover:bg-red-900/30 hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all">
                <div>
                  <span className="font-bold text-red-200 text-lg block">European Emergency</span>
                  <span className="text-xs font-bold text-red-400/80 bg-red-500/10 px-2 py-0.5 rounded mt-1 inline-block">TAP TO CALL</span>
                </div>
                <span className="text-3xl text-red-500 font-mono font-black tracking-wider drop-shadow-md">112</span>
              </div>
            </a>
            
            <a href="tel:+447700900123" className="block group">
              <div className="flex justify-between items-center p-4 bg-blue-950/20 rounded-xl border border-blue-500/30 hover:bg-blue-900/30 hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all">
                <div>
                  <span className="font-bold text-blue-200 text-lg block">Trip Leader (Staff)</span>
                  <span className="text-xs font-bold text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded mt-1 inline-block">TAP TO CALL</span>
                </div>
                <span className="text-xl text-blue-400 font-mono font-bold tracking-wider">+44 7700 900123</span>
              </div>
            </a>
            
            <a href="tel:+34955123456" className="block group">
              <div className="flex justify-between items-center p-4 bg-green-950/20 rounded-xl border border-green-500/30 hover:bg-green-900/30 hover:border-green-500/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all">
                <div>
                  <span className="font-bold text-green-200 text-lg block">Hospital / Residencia</span>
                  <span className="text-xs font-bold text-green-400/80 bg-green-500/10 px-2 py-0.5 rounded mt-1 inline-block">TAP TO CALL</span>
                </div>
                <span className="text-xl text-green-400 font-mono font-bold tracking-wider">+34 955 123 456</span>
              </div>
            </a>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/10 animate-pulse rounded-xl blur-md"></div>
            <GlassCard className="border-red-500/50 bg-red-950/20 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse uppercase tracking-widest">CRITICAL</span>
                <h3 className="font-bold text-xl text-red-100">Emergency Procedure</h3>
              </div>
              <div className="space-y-3 font-medium text-red-200/90 text-lg">
                <p>1. Stay calm</p>
                <p>2. Call <strong className="text-red-400">112</strong> if life-threatening</p>
                <p>3. Call Trip Leader immediately</p>
                <p>4. Wait at agreed meeting point</p>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="bg-primary/5 border-primary/20">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-5 border-b border-white/5 pb-3">
              <Sun className="h-6 w-6 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" /> Health & Wellbeing
            </h2>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-3 items-start"><div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,169,206,0.8)]"/> <span className="text-base text-foreground/90">Drink 2L water daily (it will be 35°C+)</span></li>
              <li className="flex gap-3 items-start"><div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,169,206,0.8)]"/> <span className="text-base text-foreground/90">Wear sunscreen SPF50+</span></li>
              <li className="flex gap-3 items-start"><div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,169,206,0.8)]"/> <span className="text-base text-foreground/90">Rest during afternoon heat (14:00–17:00 is hottest)</span></li>
            </ul>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverable className="group">
          <div className="h-12 w-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.1)]">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Pickpocket Safety</h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">Keep valuables in hotel safe, don't flash phones in busy areas (Seville market, bus stations).</p>
        </GlassCard>

        <GlassCard hoverable className="group">
          <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Scam Warnings</h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">Beware of "friendship bracelets" from strangers, do not give money to anyone on the street.</p>
        </GlassCard>

        <GlassCard hoverable className="group">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <Info className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Daily Check-in</h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">All students must check in with a staff member by 09:30 each morning.</p>
        </GlassCard>
      </div>

    </AnimatedPage>
  );
}