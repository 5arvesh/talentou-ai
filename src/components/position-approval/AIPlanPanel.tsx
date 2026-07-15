import React, { useState } from 'react';
import {
  Briefcase, ListOrdered, MapPin, Radio, Sparkles, Target, UserCheck,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePositionApproval } from '@/context/PositionApprovalContext';
import { PlaybookSuggestions } from './PlaybookSuggestions';

export function AIPlanPanel() {
  const { selected, brief, enterEditMode, confirmSend } = usePositionApproval();
  const [jdOpen, setJdOpen] = useState(false);

  if (!selected || !selected.position || !brief) {
    return (
      <div className="flex-1 flex items-center justify-center border-r border-border bg-muted/10">
        <p className="text-[11px] text-muted-foreground px-4 text-center">
          Select a notification to view the position plan.
        </p>
      </div>
    );
  }

  const { position } = selected;
  const { recruiter, targets } = brief;

  const mediumChannel = brief.channels.find((c) => c.yield === 'medium');

  const planRows: { Icon: typeof UserCheck; lead?: string; text: string }[] = [
    {
      Icon: UserCheck,
      lead: recruiter.name,
      text: ` · ${recruiter.bandwidthPct}% bandwidth · ${recruiter.closesCount} React closes`,
    },
    {
      Icon: MapPin,
      lead: brief.talentPool.locations.slice(0, 3).join(', '),
      text: ` · ${brief.talentPool.industries.slice(0, 3).join(', ')}`,
    },
    {
      Icon: Radio,
      lead: brief.channels.filter((c) => c.yield === 'high').map((c) => c.name).join(' + '),
      text: mediumChannel ? ` · ${mediumChannel.name}` : '',
    },
    {
      Icon: Target,
      lead: `${targets.closeDays} days to close`,
      text: ` · ${targets.dailySourcingGoal} candidates/day · ${targets.confidence}% confidence`,
    },
    {
      Icon: ListOrdered,
      text: recruiter.planSteps[0]?.split('.')[0] + '…',
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Sticky header */}
      <div className="shrink-0 border-b border-border bg-background px-[18px] py-[14px]">
        <div className="flex items-start justify-between gap-2 mb-[5px]">
          <h3 className="font-sora text-[15px] font-semibold text-foreground leading-snug">
            {position.jobTitle}
          </h3>
          <span className="shrink-0 rounded-full text-[9px] font-medium px-[6px] py-[2px] bg-[#FAECE7] text-[#712B13] mt-[2px]">
            {position.priority}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground mb-[7px]">
          Requested by {position.requestedBy} · {position.dept} · Submitted {position.submittedHoursAgo}h ago
        </p>
        <div className="flex flex-wrap gap-[6px] text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-[4px]">
            <MapPin className="h-[10px] w-[10px]" />
            {position.location}
          </span>
          <span className="inline-flex items-center gap-[4px]">
            <Briefcase className="h-[10px] w-[10px]" />
            {position.experience}
          </span>
          <span>{position.budget}</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center px-5 pt-[32px] pb-[28px]">
        <div className="w-full" style={{ maxWidth: '760px' }}>
          {/* AI Plan Summary card */}
          <div data-tour-id="pa-plan-summary" className="w-full rounded-[14px] border-[0.5px] border-[rgba(192,132,252,0.2)] bg-[#0e0020] p-[28px_36px]">
            <div className="flex items-center gap-[6px] mb-3">
              <Sparkles className="h-[11px] w-[11px] text-[#c084fc] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#c084fc]">
                AI Plan Summary
              </span>
            </div>
            <div className="flex flex-col gap-[12px]">
              {planRows.map(({ Icon, lead, text }, i) => (
                <div key={i} className="flex gap-[7px]">
                  <Icon className="h-4 w-4 text-[#c084fc] shrink-0 mt-[2px]" />
                  <span className="text-[14px] text-white/80 leading-[1.6]">
                    {lead && <span className="text-white font-semibold">{lead}</span>}
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmation block */}
          <div className="w-full mt-[20px] text-center">
            <p className="font-sora text-[16px] font-semibold text-foreground leading-[1.5] mb-1">
              Happy with this plan, or want to make any changes?
            </p>
            <p className="text-[12px] text-muted-foreground leading-[1.5]">
              Talentou's AI agent drafted this based on the position requirements.
            </p>
          </div>

          {/* Reuse a previous Playbook */}
          <PlaybookSuggestions />
        </div>
      </div>

      {/* Sticky footer — centered buttons */}
      <div data-tour-id="pa-footer-actions" className="shrink-0 border-t border-border bg-background px-[18px] py-[14px] flex items-center justify-center gap-2">
        <button
          onClick={() => setJdOpen(true)}
          className="inline-flex items-center gap-1 border border-border text-[12px] text-muted-foreground font-medium px-4 py-[9px] rounded-[9px] hover:bg-muted transition-colors"
        >
          View JD
        </button>
        <button
          onClick={enterEditMode}
          className="inline-flex items-center gap-1 border-[0.5px] border-[rgba(120,0,211,0.3)] text-[#7800D3] text-[12px] font-medium px-4 py-[9px] rounded-[9px] hover:bg-[#faf8ff] transition-colors"
        >
          Edit the AI plan
        </button>
        <button
          data-tour-id="pa-approve-btn"
          onClick={confirmSend}
          className="inline-flex items-center gap-1.5 bg-[#7800D3] text-white text-[12px] font-medium px-4 py-[9px] rounded-[9px] hover:opacity-90 transition-opacity"
        >
          <Sparkles className="h-3 w-3" />
          Approve &amp; implement plan
        </button>
      </div>

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

export default AIPlanPanel;
