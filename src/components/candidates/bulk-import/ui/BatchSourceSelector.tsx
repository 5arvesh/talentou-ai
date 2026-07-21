import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SOURCE_CHANNELS, type SourceChannel } from '../data';

interface BatchSourceSelectorProps {
  value: SourceChannel;
  onChange: (source: SourceChannel) => void;
}

export function BatchSourceSelector({ value, onChange }: BatchSourceSelectorProps) {
  return (
    <div
      data-tour-id="bulk-import-source-selector"
      className="flex flex-wrap items-center gap-3 bg-surface-1 rounded-[var(--radius)] px-4 py-3"
    >
      <span className="text-[13px] font-medium text-text-primary shrink-0">Source for this batch:</span>
      <Select value={value} onValueChange={(v) => onChange(v as SourceChannel)}>
        <SelectTrigger className="h-9 w-[180px] text-[12px] bg-surface-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SOURCE_CHANNELS.map((c) => (
            <SelectItem key={c} value={c} className="text-[12px]">{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-[11px] text-text-muted">— override per candidate below</span>
    </div>
  );
}

export default BatchSourceSelector;
