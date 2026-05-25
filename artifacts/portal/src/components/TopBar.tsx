import { Menu, Search, Bell, Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "./ui/badge";

interface TopBarProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/flights": "Flight Information",
  "/transport": "Transport",
  "/accommodation": "Accommodation",
  "/safety": "Keeping Safe",
  "/itinerary": "Daily Itinerary",
  "/culture": "Cultural Guide",
  "/diary": "Reflective Diary",
  "/register": "Registration",
  "/evaluation": "Evaluation Form",
  "/faq": "FAQs",
  "/staff": "Staff Area",
};

export function TopBar({ toggleSidebar }: TopBarProps) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const title = pageTitles[location] || "Portal";
  const [announcements] = useLocalStorage("portal-announcements", [
    { id: "1", text: "Departure meeting confirmed for 12 July — Room A14", date: new Date().toISOString() }
  ]);

  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-2 flex-1 justify-end">
        <div className="relative hidden md:block max-w-xs w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search portal..." 
            className="pl-9 bg-card/50 border-white/10 h-9 rounded-full focus-visible:ring-primary"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {announcements.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 border-white/10 bg-card/95 backdrop-blur-xl">
            <div className="p-3 border-b border-white/5">
              <h4 className="font-semibold text-sm">Notifications</h4>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
              {announcements.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4 text-center">No new notifications</p>
              ) : (
                announcements.map((a: any) => (
                  <div key={a.id} className="p-3 rounded-md hover:bg-white/5 transition-colors text-sm">
                    <p className="text-foreground/90">{a.text}</p>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {new Date(a.date).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}