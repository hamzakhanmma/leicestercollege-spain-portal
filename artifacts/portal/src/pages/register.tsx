import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import logo from "@assets/download__1_-removebg-preview_1779668985807.png";

export default function Register() {
  const [registration, setRegistration] = useLocalStorage<{ name: string; date: string } | null>("portal-registration", null);
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !agreed) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setRegistration({ name, date: new Date().toISOString() });
      setIsSubmitting(false);
    }, 1500);
  };

  if (registration) {
    return (
      <AnimatedPage className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl overflow-hidden">
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none">
           {Array.from({ length: 50 }).map((_, i) => (
             <div 
               key={i} 
               className="absolute w-3 h-8 rounded-full"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: '-20px',
                 backgroundColor: ['#00a9ce', '#facc15', '#a855f7', '#ec4899', '#22c55e'][Math.floor(Math.random() * 5)],
                 animation: `confetti-fall ${Math.random() * 3 + 2}s linear forwards`,
                 animationDelay: `${Math.random() * 2}s`
               }}
             />
           ))}
        </div>
        
        <GlassCard className="max-w-2xl w-full text-center p-12 border-primary/40 bg-primary/10 shadow-[0_0_100px_rgba(0,169,206,0.2)] relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mx-auto mb-8"
          >
             <img src={logo} alt="Leicester College" className="h-24 w-auto mx-auto filter drop-shadow-[0_0_15px_rgba(0,169,206,0.5)]" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white drop-shadow-md flex justify-center items-center gap-4">
              Welcome to Spain 2025! <CheckCircle2 className="h-10 w-10 text-green-400" />
            </h2>
            <p className="text-xl text-primary-50 mb-10 font-medium">
              You are officially registered for the Leicester College International Work Experience, <strong className="text-white">{registration.name}</strong>.
            </p>
            <div className="inline-flex items-center justify-center gap-3 text-base font-bold text-green-400 bg-green-950/40 px-6 py-3 rounded-full border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              Registration Confirmed on {new Date(registration.date).toLocaleDateString()}
            </div>
          </motion.div>
        </GlassCard>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-2xl w-full mx-auto relative z-10">
        <div className="text-center space-y-4 mb-10">
          <img src={logo} alt="Leicester College" className="h-16 w-auto mx-auto mb-6 filter drop-shadow-[0_0_10px_rgba(0,169,206,0.3)]" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Student Registration</h1>
          <p className="text-xl text-muted-foreground font-medium">Confirm your details to unlock the portal.</p>
        </div>

        <GlassCard className="p-10 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-card/60 backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Legal Name</label>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className="bg-black/30 h-16 text-xl px-6 rounded-2xl border-white/10 focus:border-primary focus:shadow-[0_0_20px_rgba(0,169,206,0.2)] transition-all placeholder:text-muted-foreground/30"
                required
              />
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => setAgreed(!agreed)}>
              <Checkbox 
                id="terms" 
                checked={agreed}
                onCheckedChange={(c) => setAgreed(c === true)}
                className="mt-1 h-6 w-6 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor="terms" 
                className="text-base font-medium leading-relaxed text-foreground/90 cursor-pointer select-none"
                onClick={(e) => e.preventDefault()}
              >
                I confirm that I have read and understood the International Work Experience guidance and agree to follow all rules and expectations set by Leicester College and the host organisation.
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 text-xl font-bold rounded-2xl shadow-[0_0_30px_rgba(0,169,206,0.3)] hover:scale-[1.02] transition-transform" 
              disabled={!name.trim() || !agreed || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Confirming...
                </div>
              ) : "Confirm Registration"}
            </Button>
          </form>
        </GlassCard>
      </div>
    </AnimatedPage>
  );
}