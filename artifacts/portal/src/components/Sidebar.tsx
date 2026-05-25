import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Plane, 
  Bus, 
  Home, 
  ShieldCheck, 
  CalendarDays, 
  Globe2, 
  BookOpen, 
  ClipboardCheck, 
  Star, 
  HelpCircle, 
  Settings,
  LayoutDashboard
} from "lucide-react";
import logo from "@assets/download__1_-removebg-preview_1779668985807.png";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/flights", label: "Flights", icon: Plane },
  { href: "/transport", label: "Transport", icon: Bus },
  { href: "/accommodation", label: "Accommodation", icon: Home },
  { href: "/safety", label: "Keeping Safe", icon: ShieldCheck },
  { href: "/itinerary", label: "Itinerary", icon: CalendarDays },
  { href: "/culture", label: "Culture Guide", icon: Globe2 },
  { href: "/diary", label: "Diary", icon: BookOpen },
  { href: "/register", label: "Registration", icon: ClipboardCheck },
  { href: "/evaluation", label: "Evaluation", icon: Star },
  { href: "/faq", label: "FAQs", icon: HelpCircle },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isMobile: boolean;
  isOpen: boolean; // mobile open state
  setIsOpen: (v: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed, isMobile, isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-sidebar via-sidebar to-background/95 border-r border-sidebar-border relative z-20">
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border h-16 shrink-0">
        <img 
          src={logo} 
          alt="Leicester College" 
          className="h-9 w-auto max-w-[120px] object-contain shrink-0" 
          style={{ filter: 'drop-shadow(0 0 8px rgba(0,169,206,0.4))' }}
        />
        {(!isCollapsed || isMobile) && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-bold text-sm leading-tight text-sidebar-foreground truncate"
          >
            International Work<br/>Experience Portal
          </motion.span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => isMobile && setIsOpen(false)}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group relative overflow-hidden",
                  isActive 
                    ? "text-primary-foreground bg-primary shadow-[0_0_20px_rgba(0,169,206,0.25)]" 
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                {!isActive && (
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100"
                    layoutId="nav-hover-bar"
                  />
                )}
                <item.icon className={cn("h-5 w-5 shrink-0 z-10", isActive ? "text-primary-foreground" : "text-sidebar-foreground/70 group-hover:text-primary")} />
                {(!isCollapsed || isMobile) && (
                  <span className="font-medium truncate z-10">{item.label}</span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-primary z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}

        <div className="mt-auto pt-4">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4 shadow-[0_0_10px_rgba(0,169,206,0.5)]" />
          <Link href="/staff" onClick={() => isMobile && setIsOpen(false)}>
            <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group relative overflow-hidden",
                location === "/staff"
                  ? "text-primary-foreground bg-primary shadow-[0_0_20px_rgba(0,169,206,0.25)]" 
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}>
              {!isActiveStaff && (
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100"
                    layoutId="nav-hover-bar"
                  />
                )}
              <Settings className={cn("h-5 w-5 shrink-0 z-10", isActiveStaff ? "text-primary-foreground" : "text-sidebar-foreground/70 group-hover:text-primary")} />
              {(!isCollapsed || isMobile) && (
                <span className="font-medium z-10">Staff Area</span>
              )}
            </div>
          </Link>
        </div>
        
        {(!isCollapsed || isMobile) && (
          <div className="mt-4 px-3 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2 justify-center">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wide text-foreground/80 uppercase">Trip Active</span>
            <span className="text-xs text-muted-foreground ml-auto">Spain '25</span>
          </div>
        )}
      </div>
    </div>
  );

  const isActiveStaff = location === "/staff";

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 w-[280px] z-50 shadow-2xl"
        >
          <SidebarContent />
        </motion.div>
      </>
    );
  }

  return (
    <motion.div
      animate={{ width: isCollapsed ? "80px" : "280px" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen shrink-0 relative hidden md:block z-20"
    >
      <SidebarContent />
    </motion.div>
  );
}