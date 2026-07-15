import React from 'react';
import { useRecruitmentPlan } from '@/context/RecruitmentPlanContext';

export function getPaceColor(pct: number): { text: string } {
  if (pct >= 85) return { text: 'text-success' };
  if (pct >= 50) return { text: 'text-warning' };
  return { text: 'text-destructive' };
}

export function PaceTodayCard() {
  const { data } = useRecruitmentPlan();
  const { todayActual, dailyTarget } = data.pace;
  const pct = Math.min(100, Math.round((todayActual / dailyTarget) * 100));
  const color = getPaceColor(pct);

  return (
    <div data-tour-id="jd-pace-today" className="rounded-card border border-border bg-card p-3.5 shadow-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-medium text-foreground">Daily sourcing pace</span>
        <span className={`font-sora text-[13px] font-semibold ${color.text}`}>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, hsl(var(--destructive)) 0%, hsl(var(--warning)) 50%, hsl(var(--success)) 100%)',
            backgroundSize: pct > 0 ? `${10000 / pct}% 100%` : '100% 100%',
          }}
        />
      </div>
      <p className="mt-1.5 text-[10px] text-muted-foreground">
        {todayActual} / {dailyTarget} target
      </p>
    </div>
  );
}

export default PaceTodayCard;
