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
  Circle
} from "lucide-react";
import { Link } from "wouter";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const [registration] = useLocalStorage("portal-registration", null);
  const [diary] = useLocalStorage("portal-diary", []);
  
  const progressItems = [
    { label: "Registration Completed", done: !!registration },
    { label: "Flight Details Reviewed", done: false }, // Could track via local storage on page view
    { label: "Safety Guidelines Read", done: false },
    { label: "First Diary Entry", done: diary && diary.length > 0 },
  ];
  
  const progressPercent = (progressItems.filter(i => i.done).length / progressItems.length) * 100;

  return (
    <AnimatedPage className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden p-8 md:p-12 border border-white/5 bg-gradient-to-br from-card to-background shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full mix-blend-screen"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium text-foreground/80 tracking-wide uppercase">Lebrija, Spain 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
            International Work<br/>Experience Portal
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Everything students, parents, and staff need — all in one place. Your ultimate guide to the Leicester College Spain placement.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/itinerary">
              <Button size="lg" className="rounded-full shadow-[0_0_20px_rgba(0,169,206,0.3)] px-8 font-semibold">
                Explore Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {!registration && (
              <Link href="/register">
                <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 px-8 font-semibold">
                  Register Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Widgets Column */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard className="text-center p-8 bg-gradient-to-br from-card/80 to-card border-primary/20">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Trip Countdown</h3>
            <CountdownTimer targetDate="2025-07-14T06:30:00" />
          </GlassCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-400" /> Weather
                </h3>
                <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-md">Lebrija</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center py-4">
                <div className="text-5xl font-light tracking-tighter mb-2">34°<span className="text-muted-foreground/50">C</span></div>
                <div className="text-sm text-yellow-400 font-medium tracking-wide">Sunny & Clear</div>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" /> Next Up
                </h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Departure Meeting</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">12 July, 14:00 - Room A14</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <GlassCard className="p-6">
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-bold">Your Progress</h3>
              <span className="text-sm font-medium text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2 mb-6 bg-white/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {progressItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {item.done ? (
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Quick Access Column */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-2">Quick Access</h3>
          
          <Link href="/flights">
            <GlassCard hoverable className="p-4 flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plane className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Flight Details</h4>
                <p className="text-xs text-muted-foreground">Times & luggage</p>
              </div>
            </GlassCard>
          </Link>
          
          <Link href="/safety">
            <GlassCard hoverable className="p-4 flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Safety Info</h4>
                <p className="text-xs text-muted-foreground">Emergency contacts</p>
              </div>
            </GlassCard>
          </Link>
          
          <Link href="/accommodation">
            <GlassCard hoverable className="p-4 flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Accommodation</h4>
                <p className="text-xs text-muted-foreground">Rules & curfews</p>
              </div>
            </GlassCard>
          </Link>
          
          <Link href="/culture">
            <GlassCard hoverable className="p-4 flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Cultural Prep</h4>
                <p className="text-xs text-muted-foreground">Spain guide & phrases</p>
              </div>
            </GlassCard>
          </Link>
          
          <Link href="/diary">
            <GlassCard hoverable className="p-4 flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Reflective Diary</h4>
                <p className="text-xs text-muted-foreground">Log your experience</p>
              </div>
            </GlassCard>
          </Link>
        </div>
      </div>
    </AnimatedPage>
  );
}