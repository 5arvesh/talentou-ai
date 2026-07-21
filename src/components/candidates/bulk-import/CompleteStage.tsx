import React from 'react';
import { PartyPopper, HelpCircle } from 'lucide-react';
import { StatCard } from './ui/StatCard';
import { confidenceTier, type ParsedCandidate } from './data';
import { useMatchingSettingsStore } from '@/store/matching-settings-store';

interface CompleteStageProps {
  candidates: ParsedCandidate[];
  onDone: () => void;
}

export function CompleteStage({ candidates, onDone }: CompleteStageProps) {
  const { highThreshold, lowThreshold } = useMatchingSettingsStore();
  const tierOf = (c: ParsedCandidate) => confidenceTier(c.score, highThreshold, lowThreshold);

  const total = candidates.length;
  const highConfidence = candidates.filter((c) => tierOf(c) === 'high').length;
  const needsReview = candidates.filter((c) => tierOf(c) === 'medium').length;
  const incomplete = candidates.filter((c) => c.flags.includes('incomplete')).length;
  const duplicate = candidates.filter((c) => c.flags.includes('duplicate')).length;

  const confirmed = candidates.filter((c) => c.status === 'confirmed');
  const merged = confirmed.filter((c) => c.flags.includes('duplicate')).length;
  const imported = confirmed.length - merged;
  const unassigned = candidates.length - confirmed.length;

  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center" style={{ background: '#DCEFC8' }}>
        <PartyPopper className="h-7 w-7" style={{ color: '#1F4A0A' }} />
      </div>
      <p className="font-sora text-[18px] font-semibold mt-3 text-text-primary">Import complete!</p>
      <p className="text-[12px] text-text-muted mt-1 text-center">
        {imported} imported{merged > 0 ? ` (${merged} merged into existing profiles)` : ''}
        {unassigned > 0 ? ` · ${unassigned} sent to Unassigned` : ''}.
      </p>

      <div
        className="grid gap-3 mt-5 w-full"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))' }}
      >
        <StatCard value={total} label="Total parsed" bg="hsl(var(--surface-1))" valueColor="hsl(var(--text-primary))" />
        <StatCard value={highConfidence} label="High confidence" bg="#E1F5EE" valueColor="#085041" />
        <StatCard value={needsReview} label="Needs review" bg="#FAEEDA" valueColor="#633806" />
        <StatCard value={incomplete} label="Incomplete" bg="hsl(var(--surface-1))" valueColor="hsl(var(--text-primary))" />
        <StatCard value={duplicate} label="Possible duplicate" bg="#FCEBEB" valueColor="#791F1F" />
      </div>

      {unassigned > 0 && (
        <div data-tour-id="bulk-unassigned-summary" className="flex items-start gap-2.5 rounded-[var(--radius)] px-3.5 py-3 mt-5 w-full" style={{ background: '#F6F3FC' }}>
          <HelpCircle className="h-4 w-4 shrink-0 mt-px" style={{ color: '#7800D3' }} />
          <p className="text-[12px] leading-[1.5]" style={{ color: '#3C3489' }}>
            {unassigned} {unassigned === 1 ? 'candidate' : 'candidates'} didn't have a clear position match or were missing key details —
            they've been added to your <span className="font-semibold">Unassigned Candidates</span> pool so you can review and assign them later.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onDone}
        className="w-full rounded-[10px] h-12 text-[14px] font-semibold text-white mt-5"
        style={{ background: '#2F7A10' }}
      >
        Done
      </button>
    </div>
  );
}

export default CompleteStage;
