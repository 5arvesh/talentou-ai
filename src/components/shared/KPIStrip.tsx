import React from "react";
import { LucideIcon } from "lucide-react";

interface KPIStat {
  label: string;
  value: string | number;
  sub: string;
  subColor: string;
  icon?: LucideIcon;
}

interface KPIStripProps {
  stats: KPIStat[];
  cols?: 2 | 3 | 4 | 5;
}

export function KPIStrip({ stats, cols = 4 }: KPIStripProps) {
  const colClass = cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : cols === 5 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid ${colClass} gap-px bg-border rounded-xl overflow-hidden border border-border`}>
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card px-5 py-4 flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">{stat.label}</span>
          <span className="text-2xl font-bold text-foreground">{stat.value}</span>
          <span className={`text-xs font-medium flex items-center gap-1 ${stat.subColor}`}>
            {stat.icon && <stat.icon className="h-3 w-3" />}
            {stat.sub}
          </span>
        </div>
      ))}
    </div>
  );
}
