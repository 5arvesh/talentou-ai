import React from 'react';
import { Check, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LOADING_STEPS, usePositionApproval } from '@/context/PositionApprovalContext';

export function PlanLoadingCard() {
  const { loadingStepIndex } = usePositionApproval();

  return (
    <div className="space-y-3 rounded-card border border-border bg-card p-4 animate-in fade-in slide-in-from-bottom-1">
      <h4 className="font-sora text-[12px] font-semibold text-foreground">AI is building the recruitment plan…</h4>

      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/3 rounded-full bg-primary animate-plan-loading" />
      </div>

      <div className="space-y-2">
        {LOADING_STEPS.map((step, index) => {
          const isDone = index < loadingStepIndex;
          const isActive = index === loadingStepIndex;

          return (
            <div
              key={step}
              className={cn(
                'flex items-center gap-2 text-[11px]',
                isDone ? 'text-success' : isActive ? 'text-foreground' : 'text-muted-foreground/40'
              )}
            >
              {isDone ? (
                <Check className="h-3.5 w-3.5 shrink-0" />
              ) : isActive ? (
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
              ) : (
                <Circle className="h-3.5 w-3.5 shrink-0" />
              )}
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanLoadingCard;
