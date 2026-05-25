import { useState } from "react";
import { X, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";

export function NotificationBanner() {
  const [announcements] = useLocalStorage("portal-announcements", [
    { id: "1", text: "Departure meeting confirmed for 12 July — Room A14", date: new Date().toISOString() }
  ]);
  const [dismissed, setDismissed] = useState(false);

  const latest = announcements[0];

  if (!latest || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-primary/20 border-b border-primary/30 relative z-20"
      >
        <div className="px-4 py-3 flex items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-sm font-medium text-primary-foreground">
            <BellRing className="h-4 w-4 text-primary" />
            <span className="text-primary/90">{latest.text}</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-primary/70 hover:text-primary shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}