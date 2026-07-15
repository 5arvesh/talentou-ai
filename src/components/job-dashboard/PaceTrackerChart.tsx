import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RoleType } from '@/components/shared/ModernJobList';
import { useRecruitmentPlan } from '@/context/RecruitmentPlanContext';

const TARGET_COLOR = '#888780';
const REQUESTED_COLOR = '#D97706';
const ACTUAL_COLOR = '#534AB7';
const PROJECTED_COLOR = '#BA7517';

function LegendItem({ color, dash, label }: { color: string; dash?: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
      <svg width="16" height="4">
        <line x1="0" y1="2" x2="16" y2="2" stroke={color} strokeWidth="2" strokeDasharray={dash} />
      </svg>
      {label}
    </span>
  );
}

function DisabledActionButton({ label, reason }: { label: string; reason: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            disabled
            className="px-2.5 py-1 rounded-btn text-[10px] bg-destructive/[0.08] border border-destructive/30 text-destructive opacity-50 cursor-not-allowed"
          >
            {label}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{reason}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface PaceTrackerChartProps {
  role: RoleType;
}

export function PaceTrackerChart({ role }: PaceTrackerChartProps) {
  const { data, requestTargetChange, extendTargetDirect } = useRecruitmentPlan();
  const { pace, targetChangeRequest, hiringLeadName } = data;
  const pendingChange = targetChangeRequest?.status === 'pending';
  const proposedDays = targetChangeRequest?.proposedDays ?? data.totalDays + pace.escalationDaysLate;
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (role === 'hiring-lead') {
    return (
      <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
        <p className="text-[11px] font-medium text-muted-foreground mb-1">Projected close</p>
        <p className="font-sora text-[18px] font-semibold text-foreground">{pace.projectedCloseDate}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {pace.isEscalation && (
        <div className="rounded-card border border-destructive/30 bg-destructive/10 p-3">
          <p className="flex items-center gap-1.5 text-destructive font-semibold text-[12px]">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            {role === 'ta-leader'
              ? `Escalation: Projected to close ${pace.escalationDaysLate} days late`
              : "You're behind pace — here are some options"}
          </p>
          <p className="text-[11px] text-destructive/90 mt-1">
            Projected close {pace.projectedCloseDate} vs. target {pace.targetCloseDate}.
            {role === 'ta-leader' && ` ${hiringLeadName} has been notified.`}
          </p>
          <div className="flex flex-wrap gap-2 mt-2.5">
            {!pendingChange && role === 'recruiter' && (
              <button
                className="px-2.5 py-1 rounded-btn text-[10px] bg-destructive/[0.08] border border-destructive/30 text-destructive hover:bg-destructive/[0.15] transition-colors"
                onClick={() => requestTargetChange('Requested from pace tracker escalation', proposedDays)}
              >
                Request extension to {proposedDays} days
              </button>
            )}
            {!pendingChange && role === 'ta-leader' && (
              <>
                <button
                  className="px-2.5 py-1 rounded-btn text-[10px] bg-destructive/[0.08] border border-destructive/30 text-destructive hover:bg-destructive/[0.15] transition-colors"
                  onClick={() => setConfirmOpen(true)}
                >
                  Extend target to {proposedDays} days
                </button>
                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Extend timeline?</DialogTitle>
                    </DialogHeader>
                    <p className="text-[13px] text-muted-foreground">
                      This updates the target close date immediately to reflect {proposedDays} total days — no approval step, since you're the approver.
                    </p>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => setConfirmOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="bg-primary text-white hover:bg-primary/90"
                        onClick={() => {
                          extendTargetDirect(proposedDays);
                          setConfirmOpen(false);
                        }}
                      >
                        Confirm extension
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            <DisabledActionButton label="Open referral channel" reason="Referral channel integration coming soon" />
            <DisabledActionButton label="Review JD criteria" reason="No linked JD-edit view for this role yet" />
          </div>
        </div>
      )}

      {pendingChange && (
        <div className="rounded-btn bg-warning/10 text-warning px-2.5 py-1.5 text-[10px]">
          Target change pending Recruitment Lead review — pace tracker paused
        </div>
      )}

      <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
        <p className="text-[11px] font-medium text-muted-foreground mb-3">Sourcing pace</p>
        <ChartContainer
          config={{
            target: { label: 'Original target', color: TARGET_COLOR },
            targetRequested: { label: 'Requested target', color: REQUESTED_COLOR },
            actual: { label: 'Actual pace', color: ACTUAL_COLOR },
            projected: { label: 'Projected pace', color: PROJECTED_COLOR },
          }}
          className="h-[150px] w-full"
        >
          <LineChart data={pace.chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" type="number" domain={[0, 'dataMax']} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="target" stroke={TARGET_COLOR} strokeDasharray="4 4" strokeWidth={1.5} dot={false} connectNulls={false} />
            {pendingChange && (
              <Line dataKey="targetRequested" stroke={REQUESTED_COLOR} strokeDasharray="6 2" strokeWidth={1.5} dot={false} connectNulls={false} />
            )}
            <Line dataKey="actual" stroke={ACTUAL_COLOR} strokeWidth={2} dot={false} connectNulls={false} />
            <Line dataKey="projected" stroke={PROJECTED_COLOR} strokeDasharray="2 2" strokeWidth={1.5} dot={false} connectNulls={false} />
            {pace.annotations.map((a) => (
              <ReferenceLine
                key={a.day}
                x={a.day}
                stroke="#94a3b8"
                strokeDasharray="2 2"
                label={{ value: a.label, position: 'top', fontSize: 9, fill: '#94a3b8' }}
              />
            ))}
          </LineChart>
        </ChartContainer>

        <div className="flex flex-wrap gap-3 mt-3 justify-center">
          <LegendItem color={TARGET_COLOR} dash="4 4" label="Original target" />
          {pendingChange && <LegendItem color={REQUESTED_COLOR} dash="6 2" label="Requested target" />}
          <LegendItem color={ACTUAL_COLOR} label="Actual pace" />
          <LegendItem color={PROJECTED_COLOR} dash="2 2" label="Projected pace" />
        </div>
      </div>
    </div>
  );
}

export default PaceTrackerChart;
