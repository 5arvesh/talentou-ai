import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, CheckCircle2, IndianRupee, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getPriorityColor } from '@/components/shared/ModernJobList';
import { getJobStatusColor } from '@/constants/statuses';
import { usePositionApproval } from '@/context/PositionApprovalContext';
import { AutoApproveConfirmPopover } from './AutoApproveConfirmPopover';
import { PlanLoadingCard } from './PlanLoadingCard';

export function PositionDetailPanel() {
  const navigate = useNavigate();
  const { selected, viewState, openAutoApproveConfirm, reviewAndApprove } = usePositionApproval();
  const [jdOpen, setJdOpen] = useState(false);

  if (!selected || !selected.position) {
    return (
      <div className="flex flex-1 items-center justify-center text-[12px] text-muted-foreground">
        Select a notification to view details.
      </div>
    );
  }

  const { position } = selected;

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-border px-4 py-3">
        <h3 className="font-sora text-[13px] font-semibold text-foreground">{position.jobTitle}</h3>
        <p className="text-[11px] text-muted-foreground">
          Requested by {position.requestedBy} · {position.dept} · Submitted {position.submittedHoursAgo}h ago
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {viewState === 'generating' ? (
          <PlanLoadingCard />
        ) : viewState === 'ready' ? (
          <div className="space-y-3 rounded-card border border-border bg-card p-4 animate-in fade-in slide-in-from-bottom-1">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-[13px] font-semibold text-foreground">
                Recruitment plan ready for {position.jobTitle}
              </span>
            </div>
            <Button
              className="h-9 gap-1.5 bg-primary text-white hover:bg-primary/90"
              onClick={() => navigate(`/sales-plan/jobs/${selected.relatedJobId}/dashboard`)}
            >
              Review plan
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-3 rounded-card border border-border bg-card p-4 animate-in fade-in slide-in-from-bottom-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-[14px] font-semibold text-foreground">{position.jobTitle}</h4>
              <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                <Badge variant="outline" className={cn('font-medium px-2 py-0.5 text-xs', getPriorityColor(position.priority))}>
                  {position.priority}
                </Badge>
                <Badge variant="outline" className={cn('font-medium px-2 py-0.5 text-xs', getJobStatusColor(position.status))}>
                  {position.status}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {position.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {position.experience}
              </span>
              <span className="inline-flex items-center gap-1">
                <IndianRupee className="h-3.5 w-3.5" />
                {position.budget}
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {position.openings} opening{position.openings === 1 ? '' : 's'}
              </span>
            </div>

            <div className="rounded-md bg-muted p-2.5 text-[11px] leading-relaxed text-foreground/80">
              {position.jdSummary}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
              <Button variant="outline" size="sm" className="h-8 text-[12px]" onClick={() => setJdOpen(true)}>
                View JD
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 border border-primary/30 text-[12px] text-primary hover:bg-primary/5 hover:text-primary"
                onClick={openAutoApproveConfirm}
              >
                Auto-approve & let AI handle
              </Button>
              <Button
                size="sm"
                className="h-8 bg-primary text-[12px] text-white hover:bg-primary/90"
                onClick={reviewAndApprove}
              >
                Review & approve
              </Button>
            </div>

            {viewState === 'auto-approve-confirm' && <AutoApproveConfirmPopover />}
          </div>
        )}
      </div>

      <Dialog open={jdOpen} onOpenChange={setJdOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{position.jobTitle} — Job Description</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto whitespace-pre-line text-[12.5px] leading-relaxed text-foreground/90">
            {position.jdFull}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PositionDetailPanel;
