import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  date?: string;
  time?: string;
  title: string;
  description: ReactNode;
  icon?: ReactNode;
  isActive?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative space-y-12 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-primary/60 before:to-transparent", className)}>
      {/* Moving gradient overlay on spine */}
      <div className="absolute inset-0 ml-6 -translate-x-px md:mx-auto md:translate-x-0 h-full w-[2px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-white to-transparent opacity-50 animate-scan-line" style={{ animationDuration: '4s' }}></div>
      </div>

      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: typeof window !== 'undefined' && window.innerWidth >= 768 ? (index % 2 === 0 ? -50 : 50) : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-card text-muted-foreground shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-all duration-300",
              item.isActive ? "bg-primary text-primary-foreground border-primary/30 shadow-[0_0_20px_rgba(0,169,206,0.6)] scale-110" : "group-hover:border-primary/50 group-hover:text-primary"
            )}
          >
             <div className="absolute inset-0 rounded-full border border-white/10"></div>
             {item.isActive && <div className="absolute -inset-2 rounded-full border border-primary/50 animate-ping opacity-50"></div>}
            {item.icon || (
              <div className="h-3 w-3 rounded-full bg-current" />
            )}
          </motion.div>
          
          <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl border border-white/8 bg-card/50 backdrop-blur-xl shadow-xl hover:border-primary/40 hover:bg-card/80 transition-all duration-300 group-hover:shadow-[0_10px_40px_rgba(0,169,206,0.15)] relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 relative z-10">
              <h4 className={cn("font-black text-xl tracking-tight", item.isActive ? "text-primary drop-shadow-[0_0_8px_rgba(0,169,206,0.5)]" : "text-foreground")}>{item.title}</h4>
              {(item.date || item.time) && (
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-black/20 border border-white/5 px-3 py-1.5 rounded-full w-fit mt-2 sm:mt-0 shadow-inner">
                  {item.date} {item.time}
                </span>
              )}
            </div>
            <div className="text-muted-foreground/90 font-medium text-base leading-relaxed relative z-10">
              {item.description}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}