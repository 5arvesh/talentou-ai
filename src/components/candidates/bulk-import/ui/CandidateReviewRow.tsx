import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfidenceBadge } from './ConfidenceBadge';
import { FlagBadge } from './FlagBadge';
import { JobMatchSelect } from './JobMatchSelect';
import { confidenceTier, isConfirmable, type ParsedCandidate } from '../data';

interface CandidateReviewRowProps {
  candidate: ParsedCandidate;
  onConfirm: () => void;
  onSkip: () => void;
  onChangePosition: (title: string) => void;
}

export function CandidateReviewRow({ candidate, onConfirm, onSkip, onChangePosition }: CandidateReviewRowProps) {
  const tier = confidenceTier(candidate.score);
  const confirmable = isConfirmable(candidate);
  const confirmed = candidate.status === 'confirmed';
  const skipped = candidate.status === 'skipped';

  return (
    <div
      className={cn(
        'grid items-center gap-3 px-3 py-3 border-b border-[#F0ECF7] transition-colors',
        confirmed && 'bg-[#F4FAEE]',
        skipped && 'opacity-50'
      )}
      style={{ gridTemplateColumns: '34px 1.6fr 1.3fr 0.9fr' }}
    >
      {/* Avatar */}
      <div
        className="w-[30px] h-[30px] rounded-full flex items-center justify-center font-sora text-[11px] font-semibold shrink-0"
        style={{ background: '#EEEDFE', color: '#5A2A9E' }}
      >
        {candidate.initials}
      </div>

      {/* Candidate info */}
      <div className="min-w-0">
        <p className="font-sora text-[13px] font-semibold truncate" style={{ color: '#1A0B2E' }}>{candidate.name}</p>
        <p className="text-[11px] text-[#777] truncate">{candidate.summary}</p>
        {candidate.flags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {candidate.flags.map((f) => (
              <FlagBadge key={f} flag={f} missingFields={candidate.missingFields} />
            ))}
          </div>
        )}
      </div>

      {/* Suggested position + confidence */}
      <div className="min-w-0">
        <JobMatchSelect value={candidate.assignedTitle} onChange={onChangePosition} />
        <div className="mt-1.5">
          <ConfidenceBadge tier={tier} score={candidate.score} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1.5">
        <button
          type="button"
          onClick={onConfirm}
          disabled={!confirmable}
          title={confirmable ? 'Confirm' : 'Pick a position first'}
          className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center transition-colors disabled:cursor-not-allowed"
          style={
            !confirmable
              ? { background: '#ECEAF0', color: '#999', border: '1.5px solid #E3DCF2' }
              : confirmed
              ? { background: '#2F7A10', color: '#fff', border: '1.5px solid #2F7A10' }
              : { background: '#fff', color: '#2F7A10', border: '1.5px solid #BBD9A0' }
          }
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onSkip}
          title="Skip"
          className="w-[26px] h-[26px] rounded-[7px] bg-white flex items-center justify-center transition-colors"
          style={{ border: '1.5px solid #C9B8E8', color: '#7A4FBF' }}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default CandidateReviewRow;
