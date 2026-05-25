import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      <div className="relative overflow-hidden bg-card/60 backdrop-blur-md border border-white/10 rounded-lg w-14 h-16 sm:w-20 sm:h-24 flex items-center justify-center shadow-lg">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl sm:text-4xl font-bold font-mono tracking-tighter text-primary"
        >
          {value.toString().padStart(2, "0")}
        </motion.span>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/20 z-10" />
      </div>
      <span className="text-xs sm:text-sm mt-2 font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-2 sm:gap-4 justify-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-2xl sm:text-4xl font-bold self-start mt-3 sm:mt-5 text-muted-foreground/30">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl sm:text-4xl font-bold self-start mt-3 sm:mt-5 text-muted-foreground/30">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl sm:text-4xl font-bold self-start mt-3 sm:mt-5 text-muted-foreground/30">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}