import { Phone, ShieldAlert, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export function QuickHelp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-[0_0_20px_rgba(0,169,206,0.4)] hover:shadow-[0_0_30px_rgba(0,169,206,0.6)] bg-primary text-primary-foreground transition-all"
        >
          {isOpen ? <X className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-72 rounded-2xl border border-white/10 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/5 bg-destructive/10">
              <h3 className="font-bold text-destructive flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" /> Emergency Contacts
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <a href="tel:112" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="bg-destructive/20 p-2 rounded-full text-destructive">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">European Emergency</div>
                  <div className="text-xs text-muted-foreground">Call 112</div>
                </div>
              </a>
              <a href="tel:+447700900123" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="bg-primary/20 p-2 rounded-full text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Mr Smith (Trip Leader)</div>
                  <div className="text-xs text-muted-foreground">+44 7700 900123</div>
                </div>
              </a>
              <a href="tel:+34955123456" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="bg-white/10 p-2 rounded-full text-foreground">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Residencia Office</div>
                  <div className="text-xs text-muted-foreground">+34 955 123 456</div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}