import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  ShieldCheck, 
  Home, 
  Globe2, 
  BookOpen, 
  ArrowRight,
  Sun,
  MapPin,
  Clock,
  CheckCircle2,
  Circle,
  Star
} from "lucide-react";
import { Link } from "wouter";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { motion } from "framer-motion";
import { usePortalContent } from "@/lib/portal-content";

export default function Dashboard() {
  const [registration] = useLocalStorage("portal-registration", null);
  const [diary] = useLocalStorage("portal-diary", []);
  const { content } = usePortalContent();
  
  const progressItems = [
    { label: "Registration Completed", done: !!registration },
    { label: "Flight Details Reviewed", done: false },
    { label: "Safety Guidelines Read", done: false },
    { label: "First Diary Entry", done: diary && diary.length > 0 },
  ];
  
  const progressPercent = (progressItems.filter(i => i.done).length / progressItems.length) * 100;

  return (
    <AnimatedPage className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden min-h-[70vh] flex flex-col justify-center p-8 md:p-16 border border-white/10 shadow-2xl bg-gradient-to-br from-card/80 via-background/60 to-amber-950/10">
        {/* Warm sunburst radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(251,191,36,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          {/* Warm sunset orb */}
          <div className="absolute top-[10%] right-[10%] w-[180px] h-[180px] rounded-full bg-gradient-to-tr from-amber-500/20 to-orange-500/10 blur-xl animate-rotate-slow"></div>
        </div>

        {/* Route animation SVG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg className="absolute right-0 bottom-0 w-full md:w-[60%] h-full opacity-30 drop-shadow-[0_0_15px_rgba(0,169,206,0.3)]" viewBox="0 0 500 500" preserveAspectRatio="xMaxYMax meet">
            <path 
              d="M 100 100 Q 250 200 400 400" 
              fill="none" 
              stroke="hsl(197, 100%, 60%)" 
              strokeWidth="4" 
              strokeDasharray="20 15"
              className="path-draw"
            />
            <Plane x="85" y="85" className="text-primary h-8 w-8" />
            <Star x="390" y="390" className="text-yellow-400 h-6 w-6" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,169,206,0.8)]"></span>
            <span className="text-sm font-bold text-foreground/90 tracking-[0.15em] uppercase">Lebrija, Spain 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 leading-[1.1]">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-x-4"
            >
              {["International", "Work", "Experience", "Portal"].map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </h1>
          <div className="text-xl md:text-2xl text-muted-foreground/90 mb-10 max-w-2xl font-light tracking-wide flex items-center">
            <span>Your ultimate guide to the Leicester College Spain placement.</span>
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="ml-1 w-2 h-6 bg-primary inline-block rounded-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/itinerary">
              <Button size="lg" className="rounded-full shadow-[0_0_30px_rgba(0,169,206,0.4)] px-10 h-14 text-lg font-bold hover:scale-105 transition-transform">
                Explore Portal <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {!registration && (
              <Link href="/register">
                <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 px-10 h-14 text-lg font-bold hover:scale-105 transition-transform backdrop-blur-sm">
                  Register Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Widgets Column */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="text-center p-8 bg-gradient-to-br from-card/80 to-card border-amber-500/15 relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-[0.3em] mb-10">Trip Countdown</h3>
            <CountdownTimer targetDate={content.meta.countdownDate} />
          </GlassCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard className="flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 text-yellow-500/10 rotate-45 scale-[2]">
                <Sun className="h-48 w-48 animate-rotate-slow" />
              </div>
              <div className="flex items-center justify-between mb-4 z-10">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" /> Weather
                </h3>
                <span className="text-xs font-bold text-foreground/80 bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md uppercase tracking-wider">Lebrija, Spain</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center py-6 z-10">
                <div className="text-7xl font-black tracking-tighter mb-2 drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400">{content.homepage.weatherTemp}°<span className="text-muted-foreground/30 text-5xl">C</span></div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(251,191,36,0.15)]">{content.homepage.weatherCondition}</div>
                <div className="text-xs text-muted-foreground mt-2">{content.homepage.weatherLocation}</div>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary drop-shadow-[0_0_10px_rgba(0,169,206,0.5)]" /> Next Up
                </h3>
              </div>
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-4 items-center group hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,169,206,0.2)]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight">{content.homepage.nextActivityTitle}</h4>
                    <p className="text-sm text-amber-400 mt-1 font-medium tracking-wide">{content.homepage.nextActivityDate} • {content.homepage.nextActivityLocation}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <GlassCard className="p-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="font-bold text-xl mb-1">Your Progress</h3>
                <p className="text-sm text-muted-foreground">Complete these steps before departure.</p>
              </div>
              <span className="text-3xl font-black text-primary drop-shadow-[0_0_10px_rgba(0,169,206,0.3)]">{Math.round(progressPercent)}%</span>
            </div>
            
            <div className="relative h-3 mb-8 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary rounded-full shadow-[0_0_15px_rgba(0,169,206,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {progressItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                  {item.done ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                      <CheckCircle2 className="h-5 w-5 text-primary drop-shadow-[0_0_8px_rgba(0,169,206,0.5)] shrink-0" />
                    </motion.div>
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/50 shrink-0" />
                  )}
                  <span className={item.done ? "text-foreground font-medium" : "text-muted-foreground"}>{item.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Destination Highlights */}
          <div>
            <h3 className="font-bold text-xl mb-4 tracking-tight flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-400" /> Destination Highlights
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: "🏛️", place: "Seville Cathedral", sub: "Seville, Spain", note: "45 min from Lebrija", color: "from-amber-950/40 to-card border-amber-500/20" },
                { icon: "🏖️", place: "Playa de la Victoria", sub: "Cadiz, Spain", note: "Day trip: Sat 19 July", color: "from-sky-950/40 to-card border-sky-500/20" },
                { icon: "🏘️", place: "Lebrija Town", sub: "Lebrija, Andalucía", note: "Your home for 2 weeks", color: "from-orange-950/40 to-card border-orange-500/20" },
                { icon: "🥘", place: "Spanish Cuisine", sub: "Tapas & Gazpacho", note: "Authentic Andalucian food", color: "from-red-950/40 to-card border-red-500/20" },
              ].map((card) => (
                <motion.div
                  key={card.place}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`rounded-2xl bg-gradient-to-br ${card.color} border p-4 cursor-default`}
                >
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <h4 className="font-bold text-sm leading-tight mb-1">{card.place}</h4>
                  <p className="text-xs text-muted-foreground">{card.sub}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1 italic">{card.note}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Live Route Visual Section */}
          <GlassCard className="p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
            <h3 className="font-bold text-xl mb-8 relative z-10 flex items-center gap-2">
               <Plane className="h-5 w-5 text-primary" /> Flight Route
            </h3>
            
            <div className="relative h-32 flex items-center justify-between mb-8 z-10">
              <div className="text-center z-10">
                <div className="text-3xl mb-2 drop-shadow-md">🇬🇧</div>
                <div className="font-bold">Leicester</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">EMA</div>
              </div>

              {/* The arc */}
              <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-24 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <path 
                    d="M 0,70 Q 100,-10 200,70" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="1.5" 
                    strokeDasharray="6 6"
                  />
                  <motion.path 
                    d="M 0,70 Q 100,-10 200,70" 
                    fill="none" 
                    stroke="hsl(197, 100%, 60%)" 
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="drop-shadow-[0_0_8px_rgba(0,169,206,0.8)]"
                  />
                </svg>
                {/* Moving plane icon — animated with x/y so no offsetPath needed */}
                <motion.div
                  className="absolute w-6 h-6 text-primary drop-shadow-[0_0_10px_rgba(0,169,206,0.8)]"
                  style={{ top: "50%", left: 0 }}
                  animate={{
                    x: ["0%", "100%", "200%", "300%", "400%", "500%", "600%", "700%", "800%", "900%", "1000%"],
                    y: [0, -8, -14, -18, -20, -18, -14, -8, 0, 8, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Plane className="w-full h-full rotate-45" />
                </motion.div>
              </div>

              <div className="text-center z-10">
                <div className="text-3xl mb-2 drop-shadow-md">🇪🇸</div>
                <div className="font-bold">Lebrija</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">SVQ</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 relative z-10">
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Flight</div>
                <div className="font-mono font-bold text-lg">FR1234</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Distance</div>
                <div className="font-bold text-lg">~1,450 km</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Duration</div>
                <div className="font-bold text-lg">~2h 20m</div>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* Quick Access Column */}
        <div className="space-y-4">
          <h3 className="font-bold text-xl mb-4 px-2 tracking-tight">Quick Access</h3>
          
          <Link href="/flights">
            <GlassCard hoverable className="p-5 flex items-center gap-5 group style-3d perspective-[1000px]">
              <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Plane className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg mb-0.5">Flight Details</h4>
                <p className="text-sm text-muted-foreground font-medium">Times & luggage</p>
              </div>
            </GlassCard>
          </Link>
          
          <Link href="/safety">
            <GlassCard hoverable className="p-5 flex items-center gap-5 group style-3d perspective-[1000px]">
              <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg mb-0.5">Safety Info</h4>
                <p className="text-sm text-muted-foreground font-medium">Emergency contacts</p>
              </div>
            </GlassCard>
          </Link>
          
          <Link href="/accommodation">
            <GlassCard hoverable className="p-5 flex items-center gap-5 group style-3d perspective-[1000px]">
              <div className="h-14 w-14 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <Home className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg mb-0.5">Accommodation</h4>
                <p className="text-sm text-muted-foreground font-medium">Rules & curfews</p>
              </div>
            </GlassCard>
          </Link>
          
          <Link href="/culture">
            <GlassCard hoverable className="p-5 flex items-center gap-5 group style-3d perspective-[1000px]">
              <div className="h-14 w-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <Globe2 className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg mb-0.5">Cultural Prep</h4>
                <p className="text-sm text-muted-foreground font-medium">Spain guide & phrases</p>
              </div>
            </GlassCard>
          </Link>
          
          <Link href="/diary">
            <GlassCard hoverable className="p-5 flex items-center gap-5 group style-3d perspective-[1000px]">
              <div className="h-14 w-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                <BookOpen className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg mb-0.5">Reflective Diary</h4>
                <p className="text-sm text-muted-foreground font-medium">Log your experience</p>
              </div>
            </GlassCard>
          </Link>
        </div>
      </div>
    </AnimatedPage>
  );
}