import React from 'react';
import { CircleCheck, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Stage } from '../BulkImportScreen';

const STEPS: { key: Stage; label: string }[] = [
  { key: 'upload', label: 'Upload' },
  { key: 'parsing', label: 'Parsing' },
  { key: 'review', label: 'Review and assign' },
  { key: 'complete', label: 'Complete' },
];

export function ImportStepper({ stage }: { stage: Stage }) {
  const currentIdx = STEPS.findIndex((s) => s.key === stage);

  return (
    <div data-tour-id="bulk-import-stepper" className="flex w-full items-stretch gap-2">
      {STEPS.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div
            key={s.key}
            className={cn(
              'flex-1 flex flex-col gap-2 pb-2 border-b-2',
              done ? 'border-text-success' : active ? 'border-[#7800D3]' : 'border-border'
            )}
          >
            <div className="flex items-center gap-1.5">
              {done ? (
                <CircleCheck className="h-3.5 w-3.5 text-text-success" fill="currentColor" />
              ) : active ? (
                <span className="h-3.5 w-3.5 rounded-full shrink-0" style={{ background: '#7800D3' }} />
              ) : (
                <Circle className="h-3.5 w-3.5 text-text-muted" />
              )}
              <span
                className={cn(
                  'text-[12px] font-medium truncate',
                  done ? 'text-text-success' : active ? 'text-[#7800D3]' : 'text-text-muted'
                )}
              >
                {s.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ImportStepper;
