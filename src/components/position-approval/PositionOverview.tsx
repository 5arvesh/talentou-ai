import React, { useState } from 'react';
import {
  Briefcase, Info, List, ListOrdered, MapPin,
  Radio, Send, Sparkles, Target, UserCheck,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePositionApproval } from '@/context/PositionApprovalContext';

function bandwidthColor(pct: number) {
  if (pct < 60) return '#639922';
  if (pct <= 85) return '#BA7517';
  return '#E24B4A';
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function PositionOverview() {
  const { selected, brief, confirmSend } = usePositionApproval();
  const [jdOpen, setJdOpen] = useState(false);

  if (!selected || !selected.position || !brief) {
    return (
      <div className="w-[540px] shrink-0 border-r border-border bg-muted/20 flex items-center justify-center">
        <p className="text-[11px] text-muted-foreground px-4 text-center">Select a notification to view the position overview.</p>
      </div>
    );
  }

  const { position } = selected;
  const { recruiter, targets } = brief;
  const bwColor = bandwidthColor(recruiter.bandwidthPct);

  return (
    <div className="w-[540px] shrink-0 flex flex-col border-r border-border bg-muted/20">
      {/* Sticky header */}
      <div className="shrink-0 border-b border-border bg-muted/20 px-3 py-3 space-y-1.5">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className="font-sora text-[13px] font-semibold text-foreground leading-snug">{position.jobTitle}</h3>
          <span className="shrink-0 rounded-full text-[9px] font-medium px-[6px] py-[2px] bg-[#FAECE7] text-[#712B13]">
            {position.priority}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground flex items-center gap-1 flex-wrap">
          <Briefcase className="h-2.5 w-2.5 shrink-0" />
          {position.dept}
          <span>·</span>
          <MapPin className="h-2.5 w-2.5 shrink-0" />
          {position.location}
          <span>·</span>
          {position.experience}
          <span>·</span>
          {position.budget}
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="inline-flex items-center gap-1 bg-[#0e0020] text-[#c084fc] rounded-full text-[9px] px-[6px] py-[2px]">
            <Sparkles className="h-2.5 w-2.5" />
            AI plan ready
          </span>
          <span className="inline-flex items-center rounded-full text-[9px] px-[6px] py-[2px] bg-[#EAF3DE] text-[#27500A]">
            Pending your review
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* AI summary card */}
        <div className="bg-[#0e0020] border border-[rgba(192,132,252,0.2)] rounded-lg p-3 mx-3 my-2">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="h-2.5 w-2.5 text-[#c084fc]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#c084fc]">AI Plan Summary</span>
          </div>
          <div className="space-y-1.5">
            {[
              {
                Icon: UserCheck,
                text: `${recruiter.name} · ${recruiter.bandwidthPct}% bandwidth · ${recruiter.closesCount} React closes`,
              },
              {
                Icon: MapPin,
                text: `${brief.talentPool.locations.slice(0, 3).join(', ')} · ${brief.talentPool.industries.slice(0, 3).join(', ')}`,
              },
              {
                Icon: Radio,
                text: brief.channels.filter((c) => c.yield === 'high').map((c) => c.name).join(' + ') + (brief.channels.find((c) => c.yield === 'medium') ? ' · ' + brief.channels.find((c) => c.yield === 'medium')?.name : ''),
              },
              {
                Icon: Target,
                text: `${targets.closeDays} days to close · ${targets.dailySourcingGoal} candidates/day · ${targets.confidence}% confidence`,
              },
              {
                Icon: ListOrdered,
                text: recruiter.planSteps[0]?.split('.')[0] + '…',
              },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="flex items-start gap-[6px]">
                <Icon className="h-[11px] w-[11px] text-[#c084fc] shrink-0 mt-[1px]" />
                <span className="text-[10px] text-white/70 leading-[1.4]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stat cells */}
        <div className="grid grid-cols-2 gap-1.5 px-3 pb-2">
          <div className="bg-background border border-border rounded-md p-[8px_10px]">
            <p className="font-sora text-base font-semibold text-foreground">{addDays(targets.closeDays)}</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">Target close</p>
            <span className="mt-1 inline-block bg-[#0e0020] text-[#c084fc] rounded-full text-[9px] px-[5px] py-px">
              ✦ {targets.confidence}% conf
            </span>
          </div>
          <div className="bg-background border border-border rounded-md p-[8px_10px]">
            <p className="font-sora text-base font-semibold text-foreground">{targets.dailySourcingGoal}/day</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">Daily goal</p>
            <span className="mt-1 inline-block bg-[#0e0020] text-[#c084fc] rounded-full text-[9px] px-[5px] py-px">
              ✦ AI suggest
            </span>
          </div>
        </div>

        {/* Assigned recruiter card */}
        <div className="bg-background border border-border rounded-lg p-[10px_12px] mx-3 mb-2">
          <div className="flex gap-2 items-start">
            <div className="w-7 h-7 rounded-full bg-[#EEEDFE] text-[#3C3489] flex items-center justify-center font-sora text-[10px] font-semibold shrink-0">
              {recruiter.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[11px] font-medium text-foreground">{recruiter.name}</span>
                {recruiter.aiPick && (
                  <span className="inline-flex items-center gap-1 bg-[#0e0020] text-[#c084fc] text-[9px] rounded-full px-[5px] py-px">
                    <Sparkles className="h-2 w-2" />
                    AI pick
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground">{recruiter.title} · Bangalore</p>
              <div className="mt-1.5 h-[3px] rounded-full bg-muted w-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${recruiter.bandwidthPct}%`, backgroundColor: bwColor }}
                />
              </div>
              <p className="text-[9px] mt-0.5" style={{ color: bwColor }}>
                {recruiter.bandwidthPct}% · {recruiter.activeReqs} active reqs
              </p>
            </div>
          </div>

          {recruiter.otherActivePositions.length > 0 && (
            <div className="border-t border-border pt-1.5 mt-1.5 flex items-start gap-1 text-[10px] text-muted-foreground">
              <List className="h-3 w-3 shrink-0 mt-0.5" />
              <span>Other active: {recruiter.otherActivePositions.join(' · ')}</span>
            </div>
          )}
        </div>

        {/* Guidance note */}
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground px-3 pb-3">
          <Info className="h-3 w-3 shrink-0" />
          <span>Review the brief on the right. Click the pencil on any section to edit.</span>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 border-t border-border bg-background px-3 py-2.5 flex items-center gap-2">
        <button
          onClick={() => setJdOpen(true)}
          className="border border-border text-[11px] text-muted-foreground rounded-md px-3 py-[6px] hover:bg-muted transition-colors"
        >
          View JD
        </button>
        <button
          onClick={confirmSend}
          className="flex-1 bg-primary text-white text-[11px] font-medium rounded-md px-3 py-[6px] flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors"
        >
          <Send className="h-3 w-3" />
          Send to recruiter
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

export default PositionOverview;
