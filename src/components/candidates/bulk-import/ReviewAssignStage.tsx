import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { StatCard } from './ui/StatCard';
import { CandidateReviewRow } from './ui/CandidateReviewRow';
import { confidenceTier, type ParsedCandidate, type SourceChannel } from './data';
import { useMatchingSettingsStore } from '@/store/matching-settings-store';

interface ReviewAssignStageProps {
  candidates: ParsedCandidate[];
  onConfirm: (id: string) => void;
  onSkip: (id: string) => void;
  onChangePosition: (id: string, title: string) => void;
  onChangeSource: (id: string, source: SourceChannel) => void;
  onConfirmAllHigh: () => void;
  onImport: () => void;
}

export function ReviewAssignStage({
  candidates, onConfirm, onSkip, onChangePosition, onChangeSource, onConfirmAllHigh, onImport,
}: ReviewAssignStageProps) {
  const { highThreshold, lowThreshold } = useMatchingSettingsStore();
  const tierOf = (c: ParsedCandidate) => confidenceTier(c.score, highThreshold, lowThreshold);

  const total = candidates.length;
  const highConfidence = candidates.filter((c) => tierOf(c) === 'high').length;
  const needsReview = candidates.filter((c) => tierOf(c) === 'medium').length;
  const incomplete = candidates.filter((c) => c.flags.includes('incomplete')).length;
  const duplicate = candidates.filter((c) => c.flags.includes('duplicate')).length;
  const confirmedCount = candidates.filter((c) => c.status === 'confirmed').length;

  return (
    <div className="space-y-4">
      {/* Summary stat cards */}
      <div
        data-tour-id="bulk-import-stat-cards"
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))' }}
      >
        <StatCard value={total} label="Total parsed" bg="hsl(var(--surface-1))" valueColor="hsl(var(--text-primary))" />
        <StatCard value={highConfidence} label="High confidence" bg="#E1F5EE" valueColor="#085041" />
        <StatCard value={needsReview} label="Needs review" bg="#FAEEDA" valueColor="#633806" />
        <StatCard value={incomplete} label="Incomplete" bg="hsl(var(--surface-1))" valueColor="hsl(var(--text-primary))" />
        <StatCard value={duplicate} label="Possible duplicate" bg="#FCEBEB" valueColor="#791F1F" />
      </div>

      {/* High-confidence bulk action banner */}
      {highConfidence > 0 && (
        <div
          data-tour-id="bulk-import-confidence-banner"
          className="flex items-center justify-between gap-3 flex-wrap rounded-[var(--radius)] px-3.5 py-2.5"
          style={{ background: '#EEEDFE' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="h-4 w-4 shrink-0" style={{ color: '#7800D3' }} />
            <p className="text-[12px] text-text-primary">
              {highConfidence} {highConfidence === 1 ? 'candidate' : 'candidates'} cleared the high-confidence bar. Confirm them all at once, or review individually below.
            </p>
          </div>
          <button
            type="button"
            data-tour-id="bulk-confirm-all-btn"
            onClick={onConfirmAllHigh}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-[9px] px-3.5 py-2 text-[12px] font-semibold text-white"
            style={{ background: '#7800D3' }}
          >
            Confirm all high-confidence
          </button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-[var(--radius)] border border-border overflow-hidden">
        <div
          className="grid items-center gap-3 px-3 py-2.5 bg-surface-1 border-b border-border text-[11px] font-semibold uppercase tracking-[0.02em] text-text-muted"
          style={{ gridTemplateColumns: '2fr 2fr 1fr 1.4fr 0.8fr' }}
        >
          <span>Candidate</span>
          <span>Suggested position</span>
          <span>Confidence</span>
          <span>Flags</span>
          <span className="text-right">Action</span>
        </div>
        <div className="max-h-[420px] overflow-y-auto">
          {candidates.map((c) => (
            <CandidateReviewRow
              key={c.id}
              candidate={c}
              onConfirm={() => onConfirm(c.id)}
              onSkip={() => onSkip(c.id)}
              onChangePosition={(title) => onChangePosition(c.id, title)}
              onChangeSource={(source) => onChangeSource(c.id, source)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div data-tour-id="bulk-import-import-button" className="flex items-center justify-between gap-3 flex-wrap pt-1">
        <p className="text-[12px] text-text-muted">Unconfirmed candidates are saved to an Unassigned pool.</p>
        <button
          type="button"
          onClick={onImport}
          disabled={confirmedCount === 0}
          className="inline-flex items-center gap-1.5 rounded-[10px] px-5 py-[11px] text-[13px] font-semibold text-white transition-opacity disabled:opacity-40"
          style={{ background: '#7800D3' }}
        >
          <Check className="h-4 w-4" />
          Import {confirmedCount} confirmed {confirmedCount === 1 ? 'candidate' : 'candidates'}
        </button>
      </div>
    </div>
  );
}

export default ReviewAssignStage;
