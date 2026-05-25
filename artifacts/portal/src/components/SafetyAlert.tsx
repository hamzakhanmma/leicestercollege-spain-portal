import { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafetyAlertProps {
  type: "info" | "warning" | "critical";
  title: string;
  children: ReactNode;
  className?: string;
}

const typeStyles = {
  info: "border-blue-500/30 bg-blue-500/10 text-blue-200",
  warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-200",
  critical: "border-red-500/30 bg-red-500/10 text-red-200",
};

const icons = {
  info: Info,
  warning: AlertTriangle,
  critical: ShieldAlert,
};

export function SafetyAlert({ type, title, children, className }: SafetyAlertProps) {
  const Icon = icons[type];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-lg border p-4 flex gap-3 backdrop-blur-sm",
        typeStyles[type],
        className
      )}
    >
      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </motion.div>
  );
}