import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookMarked, Hash, Radio, Sparkles, Target, UserCheck } from 'lucide-react';
import { usePositionApproval } from '@/context/PositionApprovalContext';
import { getTopPlaybooks, getAllPlaybooks, formatClosed, type Playbook } from './playbooks';

function matchBadgeClass(pct: number) {
  if (pct >= 85) return 'bg-[#EAF3DE] text-[#27500A]';
  if (pct >= 70) return 'bg-[#FAEEDA] text-[#633806]';
  return 'bg-[#F1EFE8] text-[#444441]';
}

function PlaybookRow({ pb, onUse }: { pb: Playbook; onUse: (pb: Playbook) => void }) {
  return (
    <button
      type="button"
      onClick={() => onUse(pb)}
      className="group w-full text-left flex items-start gap-3 rounded-[12px] border-[0.5px] border-border bg-card px-[14px] py-3 hover:border-[rgba(120,0,211,0.4)] hover:bg-[#faf8ff] transition-colors"
    >
      <span className={`shrink-0 mt-[2px] rounded-full text-[10px] font-semibold px-[8px] py-[3px] ${matchBadgeClass(pb.matchPct)}`}>
        {pb.matchPct}% match
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-sora text-[13px] font-semibold text-foreground truncate">{pb.name}</span>
          <span className="text-[10px] text-muted-foreground truncate hidden sm:inline">· {pb.context}</span>
        </div>

        <div className="mt-[3px] flex flex-wrap items-center gap-x-3 gap-y-[2px] text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-[4px]">
            <UserCheck className="h-3 w-3" />
            {pb.summary.recruiter}
          </span>
          <span className="inline-flex items-center gap-[4px]">
            <Radio className="h-3 w-3" />
            {pb.summary.channels}
          </span>
          <span className="inline-flex items-center gap-[4px]">
            <Target className="h-3 w-3" />
            {pb.summary.closeDays}d close
          </span>
        </div>

        {/* Job ID + closed-ago */}
        <div className="mt-[3px] flex flex-wrap items-center gap-x-3 text-[10px] text-muted-foreground/80">
          <span className="inline-flex items-center gap-[3px]">
            <Hash className="h-[10px] w-[10px]" />
            {pb.jobId}
          </span>
          <span>{formatClosed(pb.closedDaysAgo)}</span>
        </div>

        {/* AI diff note */}
        <div className="mt-[6px] flex items-start gap-[5px] text-[10px] text-[#7800D3]/80 leading-[1.45]">
          <Sparkles className="h-[11px] w-[11px] shrink-0 mt-[1px]" />
          <span className="italic">{pb.diffNote}</span>
        </div>
      </div>

      <span className="shrink-0 mt-[2px] inline-flex items-center gap-1 text-[11px] font-medium text-[#7800D3] opacity-0 group-hover:opacity-100 transition-opacity">
        Use plan
        <ArrowRight className="h-3 w-3" />
      </span>
    </button>
  );
}

export function PlaybookSuggestions() {
  const navigate = useNavigate();
  const { selected, applyPlaybook } = usePositionApproval();
  const topPlaybooks = getTopPlaybooks(3);
  const totalPlaybooks = getAllPlaybooks().length;
  const positionTitle = selected?.position?.jobTitle ?? '';

  return (
    <div className="w-full mt-7">
      {/* "or" divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex items-center gap-[7px] mb-1">
        <BookMarked className="h-[15px] w-[15px] text-[#7800D3]" />
        <h4 className="font-sora text-[14px] font-semibold text-foreground">Start from a previous Playbook</h4>
      </div>
      <p className="text-[12px] text-muted-foreground mb-4">
        Reuse a Recruitment Plan from a similar position, then tweak what's different.
      </p>

      <div className="flex flex-col gap-[10px]">
        {topPlaybooks.map((pb) => (
          <PlaybookRow key={pb.id} pb={pb} onUse={applyPlaybook} />
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          navigate('/notifications/new-position/playbooks', {
            state: { fromPosition: true, positionTitle },
          })
        }
        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-[12px] border-[0.5px] border-dashed border-[rgba(120,0,211,0.35)] bg-transparent px-4 py-[11px] text-[12px] font-medium text-[#7800D3] hover:bg-[#faf8ff] transition-colors"
      >
        <BookMarked className="h-3.5 w-3.5" />
        Browse all Playbooks ({totalPlaybooks})
      </button>
    </div>
  );
}

export default PlaybookSuggestions;
