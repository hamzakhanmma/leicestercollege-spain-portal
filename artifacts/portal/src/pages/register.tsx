import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, PartyPopper } from "lucide-react";

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
    }, 1000);
  };

  if (registration) {
    return (
      <AnimatedPage className="flex items-center justify-center min-h-[60vh]">
        <GlassCard className="max-w-md w-full text-center p-8 border-primary/30 bg-primary/5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"
          >
            <PartyPopper className="h-10 w-10" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-4">Registration Complete!</h2>
          <p className="text-muted-foreground mb-6">
            Welcome to the Leicester College Spain Work Experience 2025 team, {registration.name}.
          </p>
          <div className="inline-flex items-center justify-center gap-2 text-sm text-green-400 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
            <CheckCircle2 className="h-4 w-4" /> Confirmed on {new Date(registration.date).toLocaleDateString()}
          </div>
        </GlassCard>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="max-w-xl mx-auto space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Student Registration</h1>
        <p className="text-muted-foreground">Please confirm your details to access full trip information.</p>
      </div>

      <GlassCard className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="bg-black/20 h-12 text-lg"
              required
            />
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
            <Checkbox 
              id="terms" 
              checked={agreed}
              onCheckedChange={(c) => setAgreed(c === true)}
              className="mt-1"
            />
            <label 
              htmlFor="terms" 
              className="text-sm font-medium leading-relaxed text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              I confirm that I have read and understood the International Work Experience guidance and agree to follow all rules and expectations set by Leicester College and the host organisation.
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg" 
            disabled={!name.trim() || !agreed || isSubmitting}
          >
            {isSubmitting ? "Confirming..." : "Confirm Registration"}
          </Button>
        </form>
      </GlassCard>
    </AnimatedPage>
  );
}