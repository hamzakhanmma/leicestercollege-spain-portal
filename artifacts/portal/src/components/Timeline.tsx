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
    <div className={cn("relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent", className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
        >
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors",
              item.isActive ? "bg-primary text-primary-foreground border-primary/30 shadow-[0_0_15px_rgba(0,169,206,0.5)]" : ""
            )}
          >
            {item.icon || (
              <div className="h-2.5 w-2.5 rounded-full bg-current" />
            )}
          </div>
          
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-card/40 backdrop-blur-sm shadow hover:border-primary/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h4 className={cn("font-bold text-lg", item.isActive ? "text-primary" : "")}>{item.title}</h4>
              {(item.date || item.time) && (
                <span className="text-xs font-medium text-muted-foreground bg-white/5 px-2 py-1 rounded-md w-fit mt-1 sm:mt-0">
                  {item.date} {item.time}
                </span>
              )}
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}