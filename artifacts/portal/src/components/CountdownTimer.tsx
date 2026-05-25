import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative perspective-[400px]">
        <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full scale-150 z-0"></div>
        <div className="relative overflow-hidden bg-card/60 backdrop-blur-xl border border-primary/30 rounded-lg w-20 h-28 sm:w-28 sm:h-36 flex items-center justify-center shadow-[0_0_30px_rgba(0,169,206,0.15)] z-10 group">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="text-4xl sm:text-6xl font-black font-mono tracking-tighter text-primary drop-shadow-[0_0_20px_rgba(0,169,206,0.3)] origin-bottom"
            >
              {value.toString().padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-black/40 z-20 shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-black/50 rounded-r-md"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-black/50 rounded-l-md"></div>
        </div>
      </div>
      <span className="text-xs sm:text-sm mt-4 font-bold text-muted-foreground uppercase tracking-[0.2em]">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-3 sm:gap-6 justify-center items-center">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="text-4xl sm:text-5xl font-black mb-8 text-primary/30 animate-pulse">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="text-4xl sm:text-5xl font-black mb-8 text-primary/30 animate-pulse">:</span>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <span className="text-4xl sm:text-5xl font-black mb-8 text-primary/30 animate-pulse">:</span>
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
      <div className="text-sm font-medium text-muted-foreground/60 tracking-wider">
        Departure: 14 July 2025, 06:30
      </div>
    </div>
  );
}