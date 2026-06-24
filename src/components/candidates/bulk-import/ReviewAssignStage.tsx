import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { SummaryChip } from './ui/SummaryChip';
import { CandidateReviewRow } from './ui/CandidateReviewRow';
import { confidenceTier, type ParsedCandidate } from './data';

interface ReviewAssignStageProps {
  candidates: ParsedCandidate[];
  onConfirm: (id: string) => void;
  onSkip: (id: string) => void;
  onChangePosition: (id: string, title: string) => void;
  onConfirmAllHigh: () => void;
  onImport: () => void;
}

export function ReviewAssignStage({
  candidates, onConfirm, onSkip, onChangePosition, onConfirmAllHigh, onImport,
}: ReviewAssignStageProps) {
  const total = candidates.length;
  const autoMatched = candidates.filter((c) => confidenceTier(c.score) === 'high').length;
  const incomplete = candidates.filter((c) => c.flags.includes('incomplete')).length;
  const duplicate = candidates.filter((c) => c.flags.includes('duplicate')).length;
  const confirmedCount = candidates.filter((c) => c.status === 'confirmed').length;

  return (
    <div className="space-y-4">
      {/* Summary chips */}
      <div className="flex gap-2.5 flex-wrap">
        <SummaryChip value={total} label="Total parsed" />
        <SummaryChip value={autoMatched} label="Auto-matched" color="#2F7A10" />
        <SummaryChip value={incomplete} label="Incomplete" color="#9A6A0A" />
        <SummaryChip value={duplicate} label="Possible duplicate" color="#A02020" />
      </div>

      {/* Bulk action bar */}
      {autoMatched > 0 && (
        <div
          className="flex items-center justify-between gap-3 flex-wrap rounded-[10px] px-3.5 py-2.5"
          style={{ background: '#1A0B2E' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="h-4 w-4 shrink-0" style={{ color: '#c084fc' }} />
            <p className="text-[12px] text-white/90">
              {autoMatched} {autoMatched === 1 ? 'candidate has' : 'candidates have'} a high-confidence job match. Confirm them all at once, or review individually below.
            </p>
          </div>
          <button
            type="button"
            onClick={onConfirmAllHigh}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-[9px] px-3.5 py-2 text-[12px] font-semibold text-white"
            style={{ background: '#7800D3', border: '1px solid #9B5FE0' }}
          >
            Confirm all high-confidence
          </button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-[12px] border border-[#ECE7F5] overflow-hidden">
        <div
          className="grid items-center gap-3 px-3 py-2.5 bg-[#FAF9FC] border-b border-[#ECE7F5] text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8A879A]"
          style={{ gridTemplateColumns: '34px 1.6fr 1.3fr 0.9fr' }}
        >
          <span />
          <span>Candidate</span>
          <span>Suggested position</span>
          <span className="text-right">Action</span>
        </div>
        <div className="max-h-[320px] overflow-y-auto">
          {candidates.map((c) => (
            <CandidateReviewRow
              key={c.id}
              candidate={c}
              onConfirm={() => onConfirm(c.id)}
              onSkip={() => onSkip(c.id)}
              onChangePosition={(title) => onChangePosition(c.id, title)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
        <p className="text-[11px] text-[#777]">Unconfirmed candidates will be saved to an Unassigned pool.</p>
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
