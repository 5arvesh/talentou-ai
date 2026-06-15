import React, { useState } from 'react';
import { Sparkles, Check, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/avatar';
import { RoleType } from '@/components/shared/ModernJobList';
import { useRecruitmentPlan, YieldLevel } from '@/context/RecruitmentPlanContext';

const YIELD_BADGE: Record<YieldLevel, string> = {
  High: 'bg-success/10 text-success',
  Medium: 'bg-warning/10 text-warning',
  Low: 'bg-muted text-muted-foreground',
};

function getBandwidthColor(pct: number) {
  if (pct >= 85) return 'bg-destructive';
  if (pct >= 60) return 'bg-warning';
  return 'bg-success';
}

interface RecruitmentPlanPanelProps {
  role: RoleType;
}

export function RecruitmentPlanPanel({ role }: RecruitmentPlanPanelProps) {
  const { data, approveTargetChange, rejectTargetChange, requestTargetChange } = useRecruitmentPlan();
  const { recruiter, channels, targets, targetChangeRequest, pastPlan } = data;
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [reason, setReason] = useState('');
  const [proposedDays, setProposedDays] = useState(String(data.totalDays + 14));

  const pendingChange = targetChangeRequest?.status === 'pending';

  if (role === 'hiring-lead') {
    return (
      <div className="rounded-card border border-border bg-card p-3.5 shadow-card space-y-3">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground mb-1">Target close date</p>
          <p className="font-sora text-[18px] font-semibold text-foreground">{targets.targetCloseDate}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium text-muted-foreground mb-1.5">Sourcing channels</p>
          <div className="flex flex-wrap gap-1.5">
            {channels.map((c) => (
              <span key={c.name} className="px-2 py-1 rounded-chip text-[10px] bg-muted text-muted-foreground">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleRequestSubmit = () => {
    const days = parseInt(proposedDays, 10);
    if (!reason.trim() || Number.isNaN(days) || days <= data.totalDays) return;
    requestTargetChange(reason.trim(), days);
    setShowRequestForm(false);
    setReason('');
  };

  return (
    <div className="space-y-3">
      <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#EEEDFE] text-[#3C3489] font-sora text-[13px] font-semibold flex items-center justify-center shrink-0">
            {getInitials(recruiter.name)}
          </div>
          <div className="min-w-0">
            <p className="font-sora text-[13px] font-semibold text-foreground truncate">{recruiter.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{recruiter.title}</p>
            {recruiter.assignedByAI && (
              <p className="flex items-center gap-1 text-[9px] text-[#c084fc] mt-0.5">
                <Sparkles className="h-2.5 w-2.5" />
                Assigned by AI recommendation
              </p>
            )}
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
            <span>Bandwidth</span>
            <span>{recruiter.bandwidthPct}% · {recruiter.openReqs} open reqs</span>
          </div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div
              className={cn('h-full rounded-full', getBandwidthColor(recruiter.bandwidthPct))}
              style={{ width: `${recruiter.bandwidthPct}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 mt-3 pt-3 border-t border-border text-center">
          <div>
            <p className="font-sora text-[13px] font-semibold text-foreground">{recruiter.closesCount}</p>
            <p className="text-[9px] text-muted-foreground">Closes</p>
          </div>
          <div>
            <p className="font-sora text-[13px] font-semibold text-foreground">{recruiter.avgCloseTimeDays}d</p>
            <p className="text-[9px] text-muted-foreground">Avg close</p>
          </div>
          <div>
            <p className="font-sora text-[13px] font-semibold text-foreground">{recruiter.offerAcceptRate}%</p>
            <p className="text-[9px] text-muted-foreground">Offer accept</p>
          </div>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
        <p className="text-[11px] font-medium text-muted-foreground mb-2">Sourcing channels</p>
        <div className="space-y-1.5">
          {channels.map((channel) => (
            <div key={channel.name} className="flex items-center gap-2 border border-border rounded-btn px-2.5 py-2">
              <span className="font-sora text-[10px] font-semibold text-muted-foreground w-4">{channel.rank}</span>
              <span className="flex-1 text-[12px] text-foreground truncate">{channel.name}</span>
              <span className={cn('px-1.5 py-0.5 rounded-chip text-[10px] font-medium', YIELD_BADGE[channel.yield])}>
                {channel.yield}
              </span>
              {channel.active ? (
                <span className="flex items-center gap-1 text-[10px] text-success">
                  <Check className="h-3 w-3" />
                  Active
                </span>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-[10px] border-primary/30 text-primary hover:bg-primary/5"
                  onClick={() => toast.success(`${channel.name} channel opened`)}
                >
                  Open channel
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
        <p className="text-[11px] font-medium text-muted-foreground mb-2">Targets</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-border rounded-btn p-2.5">
            <p className="font-sora text-[18px] font-semibold text-foreground">{targets.targetCloseDate}</p>
            <p className="text-[10px] text-muted-foreground">Target close date</p>
          </div>
          <div className="border border-border rounded-btn p-2.5">
            <p className="font-sora text-[18px] font-semibold text-foreground">{targets.dailySourcingTarget}/day</p>
            <p className="text-[10px] text-muted-foreground">Daily sourcing target</p>
          </div>
        </div>

        {!pendingChange && targets.approved && <p className="mt-2 text-[10px] text-success">✓ Approved</p>}

        {pendingChange && targetChangeRequest && role === 'ta-leader' && (
          <div className="mt-3 rounded-btn bg-warning/10 text-warning p-2.5">
            <p className="text-[11px]">
              ⚠ {targetChangeRequest.requestedBy} has requested a target change ({targetChangeRequest.currentDays} →{' '}
              {targetChangeRequest.proposedDays} days). Awaiting your approval.
            </p>
            <p className="text-[10px] mt-1 italic opacity-80">"{targetChangeRequest.reason}"</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" className="h-7 text-[10px] bg-primary text-white hover:bg-primary/90" onClick={approveTargetChange}>
                Approve
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-[10px]" onClick={rejectTargetChange}>
                Reject
              </Button>
            </div>
          </div>
        )}

        {pendingChange && targetChangeRequest && role === 'recruiter' && (
          <div className="mt-3 rounded-btn bg-warning/10 text-warning p-2.5 text-[11px]">
            ⏳ Your change request is awaiting TA Leader approval. Targets paused — pace tracker shows "pending" state.
          </div>
        )}

        {!pendingChange && role === 'recruiter' && (
          <div className="mt-3">
            {!showRequestForm ? (
              <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary" onClick={() => setShowRequestForm(true)}>
                Request target change
              </Button>
            ) : (
              <div className="space-y-2 mt-1">
                <Textarea
                  placeholder="Reason for the change..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="text-[11px] min-h-[60px]"
                />
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={proposedDays}
                    onChange={(e) => setProposedDays(e.target.value)}
                    className="h-7 text-[11px] w-20"
                    min={data.totalDays + 1}
                  />
                  <span className="text-[10px] text-muted-foreground">proposed days</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="h-7 text-[10px] bg-primary text-white hover:bg-primary/90" onClick={handleRequestSubmit}>
                    Send request
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 text-[10px]" onClick={() => setShowRequestForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {pastPlan && (
        <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
          <div className="flex items-center gap-1.5 mb-2">
            <ClipboardList className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] font-medium text-muted-foreground">Past plan</p>
          </div>
          <p className="text-[12px] text-foreground">{pastPlan.title}</p>
          <p className="text-[11px] text-muted-foreground">
            Closed in {pastPlan.closedDays} days · {pastPlan.closedDate}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Sourced via: {pastPlan.sourcedVia.map((s) => `${s.name} ${s.pct}%`).join(', ')}
          </p>
          {pastPlan.staleMonths >= 2 && (
            <p className="text-[10px] text-warning mt-1.5">
              ⚠ This plan is {pastPlan.staleMonths} months old — review channel relevance before reuse.
            </p>
          )}
          <div className="flex gap-2 mt-2.5">
            <Button variant="outline" size="sm" className="h-7 text-[10px]" onClick={() => toast.info('Plan preview coming soon')}>
              Preview plan
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-[10px]" onClick={() => toast.success('Targets copied from past plan')}>
              Copy targets from this plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruitmentPlanPanel;
