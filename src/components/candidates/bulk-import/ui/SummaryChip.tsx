import React from 'react';

export function SummaryChip({ value, label, color }: { value: number; label: string; color?: string }) {
  return (
    <div
      className="flex-1 min-w-[100px] rounded-[12px] bg-white px-4 py-3 text-center"
      style={{ border: '1px solid #E3DCF2' }}
    >
      <div className="font-sora text-[22px] font-bold leading-none" style={{ color: color ?? '#1A0B2E' }}>
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8A879A] mt-1">{label}</div>
    </div>
  );
}

export default SummaryChip;
