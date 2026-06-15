import React from 'react';
import { useRecruitmentPlan } from '@/context/RecruitmentPlanContext';

export function getPaceColor(pct: number): { bar: string; text: string } {
  if (pct >= 85) return { bar: 'bg-success', text: 'text-success' };
  if (pct >= 50) return { bar: 'bg-warning', text: 'text-warning' };
  return { bar: 'bg-destructive', text: 'text-destructive' };
}

export function PaceTodayCard() {
  const { data } = useRecruitmentPlan();
  const { todayActual, dailyTarget } = data.pace;
  const pct = Math.min(100, Math.round((todayActual / dailyTarget) * 100));
  const color = getPaceColor(pct);

  return (
    <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-medium text-foreground">Daily sourcing pace</span>
        <span className={`font-sora text-[13px] font-semibold ${color.text}`}>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full ${color.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-[10px] text-muted-foreground">
        {todayActual} / {dailyTarget} target
      </p>
    </div>
  );
}

export default PaceTodayCard;
