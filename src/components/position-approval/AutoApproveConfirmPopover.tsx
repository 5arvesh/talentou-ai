import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePositionApproval } from '@/context/PositionApprovalContext';

const CHECKLIST_ITEMS = [
  'Assign best-fit recruiter by bandwidth & skill',
  'Rank sourcing channels with predicted yield',
  'Set week-close target & daily sourcing goals',
  'Surface candidates from similar past roles',
  'Flag any copied plan that may be stale',
];

export function AutoApproveConfirmPopover() {
  const { cancelAutoApproveConfirm, confirmAutoApprove } = usePositionApproval();

  return (
    <div className="mt-2 space-y-2.5 rounded-card border border-primary p-3.5 animate-in fade-in slide-in-from-bottom-1">
      <h5 className="font-sora text-[11px] font-semibold text-foreground">
        AI will handle the following for this position:
      </h5>
      <ul className="space-y-1.5">
        {CHECKLIST_ITEMS.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[11px] text-foreground/80">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>
      <p className="border-t border-border pt-2 text-[10px] text-muted-foreground">
        You'll be notified when the plan is ready (~30s).
      </p>
      <div className="flex items-center justify-end gap-2 pt-1">
        <Button variant="outline" size="sm" className="h-8 text-[12px]" onClick={cancelAutoApproveConfirm}>
          Cancel
        </Button>
        <Button
          size="sm"
          className="h-8 bg-primary text-[12px] text-white hover:bg-primary/90"
          onClick={confirmAutoApprove}
        >
          Confirm auto-approve
        </Button>
      </div>
    </div>
  );
}

export default AutoApproveConfirmPopover;
