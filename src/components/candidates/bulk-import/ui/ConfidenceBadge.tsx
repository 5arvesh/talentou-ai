import React from 'react';
import { Sparkles } from 'lucide-react';
import type { Tier } from '../data';

const STYLES: Record<Tier, { bg: string; color: string; label: (s: number | null) => string; showSpark: boolean }> = {
  high: { bg: '#DCEFC8', color: '#1F4A0A', label: (s) => `${s}% match`, showSpark: true },
  medium: { bg: '#FBEEDA', color: '#9A6A0A', label: (s) => `${s}% match`, showSpark: true },
  none: { bg: '#ECEAF0', color: '#6B6B6B', label: () => 'Low confidence', showSpark: false },
};

export function ConfidenceBadge({ tier, score }: { tier: Tier; score: number | null }) {
  const s = STYLES[tier];
  return (
    <span
      className="inline-flex items-center gap-[3px] rounded-full text-[10px] font-semibold px-[7px] py-[2px]"
      style={{ background: s.bg, color: s.color }}
    >
      {s.showSpark && <Sparkles className="h-[9px] w-[9px]" />}
      {s.label(score)}
    </span>
  );
}

export default ConfidenceBadge;
