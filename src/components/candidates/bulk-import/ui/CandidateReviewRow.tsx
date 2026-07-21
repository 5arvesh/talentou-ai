import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConfidenceBadge } from './ConfidenceBadge';
import { FlagBadge } from './FlagBadge';
import { JobMatchSelect } from './JobMatchSelect';
import { AcceptSuggestionButton } from './AcceptSuggestionButton';
import { confidenceTier, isConfirmable, SOURCE_CHANNELS, type ParsedCandidate, type SourceChannel } from '../data';
import { useMatchingSettingsStore } from '@/store/matching-settings-store';

interface CandidateReviewRowProps {
  candidate: ParsedCandidate;
  onConfirm: () => void;
  onSkip: () => void;
  onChangePosition: (title: string) => void;
  onChangeSource: (source: SourceChannel) => void;
}

function ManualPositionPicker({ value, onChange }: { value: string; onChange: (title: string) => void }) {
  const [revealed, setRevealed] = useState(false);
  if (revealed) return <JobMatchSelect value={value} onChange={onChange} />;
  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className="inline-flex items-center rounded-[var(--radius)] px-2.5 py-1.5 text-[12px] font-medium bg-surface-1 text-text-muted border border-border hover:text-foreground transition-colors"
    >
      Select manually
    </button>
  );
}

export function CandidateReviewRow({ candidate, onConfirm, onSkip, onChangePosition, onChangeSource }: CandidateReviewRowProps) {
  const { highThreshold, lowThreshold } = useMatchingSettingsStore();
  const tier = confidenceTier(candidate.score, highThreshold, lowThreshold);
  const confirmable = isConfirmable(candidate);
  const confirmed = candidate.status === 'confirmed';
  const skipped = candidate.status === 'skipped';

  return (
    <div
      data-tour-id={tier === 'high' ? 'bulk-import-row-high' : tier === 'medium' ? 'bulk-import-row-medium' : 'bulk-import-row-low'}
      className={cn(
        'grid items-start gap-3 px-3 py-3 border-b border-border transition-colors',
        confirmed && 'bg-[#F4FAEE]',
        skipped && 'opacity-50'
      )}
      style={{ gridTemplateColumns: '2fr 2fr 1fr 1.4fr 0.8fr' }}
    >
      {/* Candidate */}
      <div className="min-w-0 flex items-start gap-2.5">
        <div
          className="w-[30px] h-[30px] rounded-full flex items-center justify-center font-sora text-[11px] font-semibold shrink-0"
          style={{ background: '#EEEDFE', color: '#5A2A9E' }}
        >
          {candidate.initials}
        </div>
        <div className="min-w-0">
          <p className="font-sora text-[13px] font-semibold truncate text-text-primary">{candidate.name}</p>
          <p className="text-[11px] text-text-muted truncate">{candidate.summary}</p>
          <Select value={candidate.source} onValueChange={(v) => onChangeSource(v as SourceChannel)}>
            <SelectTrigger className="h-5 w-auto gap-1 border-none bg-transparent px-0 text-[10px] text-text-muted mt-0.5 shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOURCE_CHANNELS.map((c) => (
                <SelectItem key={c} value={c} className="text-[12px]">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Suggested position */}
      <div className="min-w-0">
        {tier === 'high' ? (
          <JobMatchSelect value={candidate.assignedTitle} onChange={onChangePosition} />
        ) : tier === 'medium' && candidate.suggestedTitle ? (
          <AcceptSuggestionButton
            suggestedTitle={candidate.suggestedTitle}
            score={candidate.score}
            value={candidate.assignedTitle}
            onChange={onChangePosition}
          />
        ) : (
          <ManualPositionPicker value={candidate.assignedTitle} onChange={onChangePosition} />
        )}
      </div>

      {/* Confidence */}
      <div className="min-w-0 pt-1">
        <ConfidenceBadge tier={tier} score={candidate.score} />
      </div>

      {/* Flags */}
      <div
        data-tour-id={candidate.flags.length > 1 ? 'bulk-import-flags-column' : undefined}
        className="min-w-0 flex flex-wrap gap-1 pt-1"
      >
        {candidate.flags.map((f) => (
          <FlagBadge key={f} flag={f} missingFields={candidate.missingFields} />
        ))}
        {candidate.flags.length === 0 && <span className="text-[11px] text-text-muted">—</span>}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1.5 pt-1">
        <button
          type="button"
          onClick={onConfirm}
          disabled={!confirmable}
          title={confirmable ? 'Confirm' : 'Pick a position first'}
          className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center transition-colors disabled:cursor-not-allowed"
          style={
            !confirmable
              ? { background: 'hsl(var(--surface-1))', color: 'hsl(var(--text-muted))', border: '1.5px solid hsl(var(--border))' }
              : confirmed
              ? { background: 'hsl(var(--text-success))', color: '#fff', border: '1.5px solid hsl(var(--text-success))' }
              : { background: '#fff', color: 'hsl(var(--text-success))', border: '1.5px solid hsl(var(--text-success) / 0.4)' }
          }
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onSkip}
          title="Skip"
          className="w-[26px] h-[26px] rounded-[7px] bg-white flex items-center justify-center transition-colors border border-border text-text-muted"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default CandidateReviewRow;
