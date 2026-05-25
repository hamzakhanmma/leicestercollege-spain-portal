import { useState, useEffect } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function StaffAuthGuard({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("staff-authenticated") === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (password === "leicestercollegespain") {
      setError(false);
      setUnlocking(true);
      setTimeout(() => {
        sessionStorage.setItem("staff-authenticated", "true");
        setAuthenticated(true);
      }, 600);
    } else {
      setError(true);
      setTimeout(() => setError(false), 400); // clear shake
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        <motion.div
          animate={unlocking ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
          className={`relative p-4 rounded-full ${unlocking ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}
        >
          <div className="absolute inset-0 rounded-full border border-amber-500/30 animate-pulse" />
          <Shield className="w-12 h-12 relative z-10" />
        </motion.div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Staff Access</h1>
          <p className="text-muted-foreground">Enter your staff password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <motion.div
              animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`h-12 rounded-xl pr-12 transition-all duration-300 ${
                  error ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:border-amber-400 focus-visible:ring-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.0)] focus-visible:shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                }`}
                autoFocus
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: error ? 1 : 0, height: error ? 'auto' : 0 }}
            className="text-red-500 text-sm font-medium text-left"
          >
            Incorrect password. Please try again.
          </motion.div>

          <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold">
            Unlock
          </Button>
        </form>
      </div>

      <div className="absolute bottom-6 text-sm text-muted-foreground flex items-center gap-2">
        <span>🔒</span> Protected Area
      </div>
    </div>
  );
}
