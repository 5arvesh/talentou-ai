import React from 'react';
import { Info } from 'lucide-react';

/** Unobtrusive marker shown on dashboards while data is hard-coded mock (not API-wired). */
export function SampleDataBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 text-warning border border-warning/20 text-xs font-medium px-2 py-0.5">
      <Info className="h-3 w-3" />
      Sample data
    </span>
  );
}

export default SampleDataBadge;
