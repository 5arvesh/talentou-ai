import React from 'react';
import { AlertTriangle, Copy, Sparkles } from 'lucide-react';
import type { Flag } from '../data';

export function FlagBadge({ flag, missingFields }: { flag: Flag; missingFields?: string[] }) {
  if (flag === 'incomplete') {
    const fields = missingFields && missingFields.length ? missingFields.join(', ') : 'fields';
    return (
      <span
        data-tour-id="bulk-flag-badge"
        className="inline-flex items-center gap-[3px] rounded-full text-[9px] font-semibold px-[7px] py-[2px]"
        style={{ background: '#FCEBEB', color: '#A32D2D' }}
      >
        <AlertTriangle className="h-[9px] w-[9px]" />
        Missing: {fields}
      </span>
    );
  }
  if (flag === 'duplicate') {
    return (
      <span
        data-tour-id="bulk-flag-badge"
        className="inline-flex items-center gap-[3px] rounded-full text-[9px] font-semibold px-[7px] py-[2px]"
        style={{ background: '#FCEBEB', color: '#A32D2D' }}
      >
        <Copy className="h-[9px] w-[9px]" />
        Possible duplicate
      </span>
    );
  }
  return (
    <span
      data-tour-id="bulk-flag-badge"
      className="inline-flex items-center gap-[3px] rounded-full text-[9px] font-semibold px-[7px] py-[2px]"
      style={{ background: '#EEEDFE', color: '#3C3489' }}
    >
      <Sparkles className="h-[9px] w-[9px]" />
      AI-refined
    </span>
  );
}

export default FlagBadge;
