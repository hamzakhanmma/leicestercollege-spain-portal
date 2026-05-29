import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, HelpCircle, Calendar, Shield, Globe,
  Plane, MapPin, Home, BellRing
} from "lucide-react";
import { usePortalContent, type PortalContent } from "@/lib/portal-content";

interface SearchResult {
  title: string;
  description: string;
  path: string;
  category: string;
  Icon: typeof Search;
}

function buildSearchIndex(content: PortalContent): SearchResult[] {
  const results: SearchResult[] = [];

  for (const faq of content.faq) {
    results.push({
      title: faq.question,
      description: faq.answer.slice(0, 100),
      path: "/faq",
      category: "FAQ",
      Icon: HelpCircle,
    });
  }

  for (const day of content.itinerary) {
    results.push({
      title: `${day.date} — ${day.title}`,
      description: day.description,
      path: "/itinerary",
      category: "Itinerary",
      Icon: Calendar,
    });
  }

  for (const contact of content.safety.contacts) {
    results.push({
      title: contact.name,
      description: `${contact.role} · ${contact.number}`,
      path: "/safety",
      category: "Safety",
      Icon: Shield,
    });
  }
  for (const tip of content.safety.healthTips) {
    results.push({ title: tip, description: "Health tip", path: "/safety", category: "Safety", Icon: Shield });
  }

  for (const phrase of content.culture.phrases) {
    results.push({
      title: `"${phrase.en}" → "${phrase.es}"`,
      description: `Pronunciation: ${phrase.pron}`,
      path: "/culture",
      category: "Culture",
      Icon: Globe,
    });
  }

  results.push({
    title: `Outbound: ${content.flights.outboundFlight}`,
    description: `${content.flights.outboundDate} at ${content.flights.outboundTime} · ${content.flights.airline}`,
    path: "/flights",
    category: "Flights",
    Icon: Plane,
  });
  results.push({
    title: `Return: ${content.flights.returnFlight}`,
    description: `${content.flights.returnDate} at ${content.flights.returnTime}`,
    path: "/flights",
    category: "Flights",
    Icon: Plane,
  });
  results.push({
    title: `Meeting point: ${content.flights.meetingPlace}`,
    description: `Meet at ${content.flights.meetingTime}`,
    path: "/flights",
    category: "Flights",
    Icon: Plane,
  });

  results.push({
    title: content.accommodation.name,
    description: content.accommodation.address,
    path: "/accommodation",
    category: "Accommodation",
    Icon: MapPin,
  });
  results.push({
    title: `Curfew: Weekdays ${content.accommodation.curfewWeekday}, Weekends ${content.accommodation.curfewWeekend}`,
    description: "Accommodation rules",
    path: "/accommodation",
    category: "Accommodation",
    Icon: MapPin,
  });
  for (const rule of content.accommodation.rules) {
    results.push({
      title: rule.title,
      description: rule.description,
      path: "/accommodation",
      category: "Accommodation",
      Icon: MapPin,
    });
  }

  results.push({
    title: content.transport.outboundSummary,
    description: "Outbound transport",
    path: "/transport",
    category: "Transport",
    Icon: Plane,
  });

  for (const ann of content.announcements) {
    results.push({
      title: ann.text,
      description: `Announcement · ${new Date(ann.date).toLocaleDateString()}`,
      path: "/",
      category: "Announcements",
      Icon: BellRing,
    });
  }

  results.push({
    title: "Dashboard",
    description: "Trip overview, countdown, and quick access",
    path: "/",
    category: "Pages",
    Icon: Home,
  });
  results.push({ title: "Flight Information", description: "Departure and return flight details", path: "/flights", category: "Pages", Icon: Plane });
  results.push({ title: "Itinerary", description: "Day-by-day trip schedule", path: "/itinerary", category: "Pages", Icon: Calendar });
  results.push({ title: "Keeping Safe", description: "Emergency contacts and safety advice", path: "/safety", category: "Pages", Icon: Shield });
  results.push({ title: "Culture Guide", description: "Spanish phrases, customs and culture", path: "/culture", category: "Pages", Icon: Globe });
  results.push({ title: "Accommodation", description: "Residencia details, meals, curfews", path: "/accommodation", category: "Pages", Icon: MapPin });
  results.push({ title: "FAQs", description: "Frequently asked questions", path: "/faq", category: "Pages", Icon: HelpCircle });

  return results;
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-primary/30 text-primary rounded px-0.5 not-italic font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();
  const { content } = usePortalContent();

  const index = buildSearchIndex(content);

  const results =
    query.trim().length < 2
      ? []
      : index
          .filter((item) => {
            const q = query.toLowerCase();
            return (
              item.title.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q) ||
              item.category.toLowerCase().includes(q)
            );
          })
          .slice(0, 10);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  const groupedResults = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-16 px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            initial={{ y: -12, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flights, FAQs, itinerary, safety, culture..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">Esc</kbd>
              )}
            </div>

            <div className="max-h-[440px] overflow-y-auto">
              {query.trim().length < 2 ? (
                <div className="p-10 text-center text-muted-foreground space-y-2">
                  <Search className="h-8 w-8 mx-auto opacity-30" />
                  <p className="font-medium">Search the portal</p>
                  <p className="text-xs">FAQs, flights, itinerary, safety, culture and more</p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground space-y-2">
                  <p className="font-medium">No results for "{query}"</p>
                  <p className="text-xs">Try different keywords</p>
                </div>
              ) : (
                <div className="p-2">
                  {Object.entries(groupedResults).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {category}
                      </div>
                      {items.map((result, i) => {
                        const Icon = result.Icon;
                        return (
                          <button
                            key={i}
                            onClick={() => handleSelect(result.path)}
                            className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors group"
                          >
                            <div className="mt-0.5 p-1.5 rounded-md bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-foreground truncate">
                                {highlight(result.title, query)}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5 truncate">
                                {result.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>Esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
