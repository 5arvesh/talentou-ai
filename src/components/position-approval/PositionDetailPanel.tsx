import React, { useState } from 'react';
import { FileText, Send, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePositionApproval } from '@/context/PositionApprovalContext';
import { RecruitmentBrief } from './RecruitmentBrief';

export function PositionDetailPanel() {
  const { selected, viewState, openAutoApproveSummary, confirmApproval } = usePositionApproval();
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
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Sticky header */}
      <div className="shrink-0 border-b border-border bg-background px-4 py-3">
        <h3 className="font-sora text-[13px] font-semibold text-foreground">{position.jobTitle}</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Requested by {position.requestedBy} · {position.dept} · {position.priority} · {position.budget} · {position.location} · {position.experience}
        </p>
      </div>

      {/* Scrollable brief body */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted/20">
        <RecruitmentBrief />
      </div>

      {/* Sticky approve bar — Path A only */}
      {viewState === 'brief' && (
        <div className="shrink-0 border-t border-border bg-background px-4 py-2.5 flex items-center gap-2">
          <button
            onClick={() => setJdOpen(true)}
            className="border border-border text-[11px] text-muted-foreground rounded-md px-3 py-1.5 flex items-center gap-1.5 hover:bg-muted transition-colors"
          >
            <FileText className="h-3 w-3" />
            View JD
          </button>
          <div className="flex-1" />
          <button
            onClick={openAutoApproveSummary}
            className="border border-primary/30 text-primary text-[11px] font-medium rounded-md px-3 py-1.5 flex items-center gap-1.5 hover:bg-primary/5 transition-colors"
          >
            <Sparkles className="h-3 w-3" />
            Auto-approve
          </button>
          <button
            onClick={() => confirmApproval('manual')}
            className="bg-primary text-white text-[11px] font-medium rounded-md px-3 py-1.5 flex items-center gap-1.5 hover:bg-primary/90 transition-colors"
          >
            <Send className="h-3 w-3" />
            Approve & send to recruiter
          </button>
        </div>
      )}

      {/* JD Dialog */}
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
