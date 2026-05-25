import { ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function GlassCard({ children, className, onClick, hoverable = false }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={hoverable ? { scale: 1.02, y: -2 } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/8 bg-card/30 backdrop-blur-xl shadow-xl",
        hoverable && "cursor-pointer hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(0,169,206,0.15)] transition-all duration-300",
        className
      )}
    >
      {/* Mouse tracking glow */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 169, 206, 0.1), transparent 40%)`
        }}
      />
      
      {/* Inner subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none" />

      {/* Subtle top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
      <div className="p-6 relative z-10">{children}</div>
    </motion.div>
  );
}