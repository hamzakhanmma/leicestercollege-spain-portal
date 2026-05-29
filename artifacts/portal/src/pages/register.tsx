import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { usePortalContent } from "@/lib/portal-content";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import logo from "@assets/download__1_-removebg-preview_1779668985807.png";

export default function Register() {
  const { content } = usePortalContent();
  const [registration, setRegistration] = useLocalStorage<{ name: string; date: string } | null>("portal-registration", null);
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full legal name.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the terms before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        setRegistration({ name: name.trim(), date: new Date().toISOString() });
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  if (registration) {
    return (
      <AnimatedPage className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-8 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                backgroundColor: ['#f59e0b', '#facc15', '#a855f7', '#ec4899', '#22c55e'][Math.floor(Math.random() * 5)],
                animation: `confetti-fall ${Math.random() * 3 + 2}s linear forwards`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <GlassCard className="max-w-2xl w-full text-center p-12 border-primary/40 bg-primary/10 shadow-[0_0_100px_rgba(245,158,11,0.15)] relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mx-auto mb-8"
          >
            <img src={logo} alt="Leicester College" className="h-24 w-auto mx-auto filter drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground flex justify-center items-center gap-4 flex-wrap">
              {content.registration.successHeadline} <CheckCircle2 className="h-10 w-10 text-green-500" />
            </h2>
            <p className="text-xl text-muted-foreground mb-10 font-medium">
              {content.registration.successMessage}{" "}
              <strong className="text-foreground">{registration.name}</strong>.
            </p>
            <div className="inline-flex items-center justify-center gap-3 text-base font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <CheckCircle2 className="h-4 w-4" />
              Registration Confirmed · {new Date(registration.date).toLocaleDateString()}
            </div>
          </motion.div>
        </GlassCard>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-2xl w-full mx-auto relative z-10">
        <div className="text-center space-y-4 mb-10">
          <img src={logo} alt="Leicester College" className="h-16 w-auto mx-auto mb-6 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Student Registration</h1>
          <p className="text-xl text-muted-foreground font-medium">Confirm your details to unlock the portal.</p>
        </div>

        <GlassCard className="p-10 border-border shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-card/60 backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
                Full Legal Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className="h-16 text-xl px-6 rounded-2xl"
                required
              />
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-1 h-6 w-6 border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="terms"
                className="text-base font-medium leading-relaxed text-foreground/90 cursor-pointer select-none"
              >
                {content.registration.confirmationText}
              </label>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm font-medium px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-16 text-xl font-bold rounded-2xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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
