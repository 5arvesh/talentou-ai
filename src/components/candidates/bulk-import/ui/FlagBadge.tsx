import React from 'react';
import { AlertTriangle, Copy } from 'lucide-react';
import type { Flag } from '../data';

export function FlagBadge({ flag, missingFields }: { flag: Flag; missingFields?: string[] }) {
  if (flag === 'incomplete') {
    const fields = missingFields && missingFields.length ? missingFields.join(', ') : 'fields';
    return (
      <span
        data-tour-id="bulk-flag-badge"
        className="inline-flex items-center gap-[3px] rounded-full text-[9px] font-semibold px-[7px] py-[2px]"
        style={{ background: '#FCEFD7', color: '#7A4F08' }}
      >
        <AlertTriangle className="h-[9px] w-[9px]" />
        Missing: {fields}
      </span>
    );
  }
  return (
    <span
      data-tour-id="bulk-flag-badge"
      className="inline-flex items-center gap-[3px] rounded-full text-[9px] font-semibold px-[7px] py-[2px]"
      style={{ background: '#FBE0E0', color: '#8E1C1C' }}
    >
      <Copy className="h-[9px] w-[9px]" />
      Possible duplicate
    </span>
  );
}

export default FlagBadge;
