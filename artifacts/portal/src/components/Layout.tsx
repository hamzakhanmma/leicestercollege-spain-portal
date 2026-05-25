import { ReactNode, useState, useEffect, useMemo } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { QuickHelp } from "./QuickHelp";
import { NotificationBanner } from "./NotificationBanner";
import { motion } from "framer-motion";

export function Layout({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.4 + 0.2,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 8
    }));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden selection:bg-primary/30 relative">
      {/* Dynamic background effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated grid overlay */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `linear-gradient(rgba(0,169,206,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,169,206,0.04) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Scan-line sweep */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan-line" />

        {/* Dramatic Orbs */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/15 blur-[150px] mix-blend-screen"
          style={{ animation: 'pulse 12s infinite alternate' }} 
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/8 blur-[120px] mix-blend-screen"
          style={{ animation: 'pulse 10s infinite alternate', animationDelay: '4s' }} 
        />
        <div 
          className="absolute left-[40%] top-[30%] w-[200px] h-[200px] rounded-full bg-cyan-400/10 blur-[80px] mix-blend-screen"
          style={{ animation: 'float 8s infinite alternate' }}
        />

        {/* Particle Field */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              backgroundColor: 'hsl(197, 100%, 60%)',
              boxShadow: '0 0 6px 2px hsla(197, 100%, 60%, 0.4)',
            }}
            animate={{
              y: [0, -30, 30, 0],
              x: [0, 15, -15, 0],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isMobileSidebarOpen}
        setIsOpen={setIsMobileSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen relative z-10">
        <NotificationBanner />
        
        <TopBar 
          toggleSidebar={() => isMobile ? setIsMobileSidebarOpen(true) : setIsSidebarCollapsed(!isSidebarCollapsed)} 
          isSidebarCollapsed={isSidebarCollapsed}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
          <div className="max-w-6xl mx-auto pb-24 md:pb-10">
            {children}
          </div>
        </main>
      </div>

      <QuickHelp />
    </div>
  );
}