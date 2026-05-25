import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function GlassCard({ children, className, onClick, hoverable = false }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02, y: -2 } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/5 bg-card/40 backdrop-blur-md shadow-xl",
        hoverable && "cursor-pointer hover:border-primary/30 transition-colors duration-300",
        className
      )}
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="p-6 relative z-10">{children}</div>
    </motion.div>
  );
}
