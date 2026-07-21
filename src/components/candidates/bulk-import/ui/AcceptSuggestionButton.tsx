import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { JobMatchSelect } from './JobMatchSelect';

interface AcceptSuggestionButtonProps {
  suggestedTitle: string;
  score: number | null;
  value: string;
  onChange: (title: string) => void;
}

/** Medium-tier row: a click-to-accept chip (not a pre-filled dropdown) — the AI's guess is
 *  worth showing, but not confident enough to rubber-stamp. "Choose a different role" reveals
 *  the real dropdown for anyone who'd rather pick manually. */
export function AcceptSuggestionButton({ suggestedTitle, score, value, onChange }: AcceptSuggestionButtonProps) {
  const [pickingManually, setPickingManually] = useState(false);

  if (pickingManually) {
    return <JobMatchSelect value={value} onChange={onChange} />;
  }

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => onChange(suggestedTitle)}
        className="inline-flex items-center gap-1 rounded-[var(--radius)] px-2.5 py-1.5 text-[12px] font-medium transition-colors"
        style={{ background: '#FAEEDA', border: '1px solid #EF9F27', color: '#854F0B' }}
      >
        Accept: {suggestedTitle}? {score}%
      </button>
      <button
        type="button"
        onClick={() => setPickingManually(true)}
        className="flex items-center gap-0.5 text-[11px] text-text-muted hover:text-foreground transition-colors"
      >
        Choose a different role
        <ChevronDown className="h-3 w-3" />
      </button>
    </div>
  );
}

export default AcceptSuggestionButton;
