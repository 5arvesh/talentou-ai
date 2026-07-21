import React from 'react';

interface StatCardProps {
  value: number;
  label: string;
  bg: string;
  valueColor: string;
}

/** Shared stat-card primitive — one 5-card set used by both Review and Complete stages. */
export function StatCard({ value, label, bg, valueColor }: StatCardProps) {
  return (
    <div className="rounded-[var(--radius)] px-4 py-3 text-center" style={{ background: bg }}>
      <div className="font-sora text-[22px] font-bold leading-none" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-text-muted mt-1">{label}</div>
    </div>
  );
}

export default StatCard;
