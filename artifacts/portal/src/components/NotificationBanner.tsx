import { useState } from "react";
import { X, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortalContent } from "@/lib/portal-content";

export function NotificationBanner() {
  const { content } = usePortalContent();
  const [dismissed, setDismissed] = useState(false);

  const latest = content.announcements?.[0];

  if (!latest || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-amber-500/10 border-b border-amber-500/25 relative z-20"
      >
        <div className="px-4 py-3 flex items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-sm font-medium">
            <BellRing className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="text-amber-100/90">{latest.text}</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-amber-400/70 hover:text-amber-400 shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
