import React from "react";

interface KPIStat {
  label: string;
  value: string | number;
  sub: string;
  subColor: string;
}

interface KPIStripProps {
  stats: KPIStat[];
  cols?: 2 | 3 | 4;
}

export function KPIStrip({ stats, cols = 4 }: KPIStripProps) {
  const colClass = cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid ${colClass} gap-px bg-border rounded-xl overflow-hidden border border-border`}>
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card px-5 py-4 flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">{stat.label}</span>
          <span className="text-2xl font-bold text-foreground">{stat.value}</span>
          <span className={`text-xs font-medium ${stat.subColor}`}>{stat.sub}</span>
        </div>
      ))}
    </div>
  );
}
