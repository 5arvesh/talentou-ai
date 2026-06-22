import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts';
import { toast } from 'sonner';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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

interface PaceTrackerChartProps {
  role: RoleType;
}

export function PaceTrackerChart({ role }: PaceTrackerChartProps) {
  const { data } = useRecruitmentPlan();
  const { pace, targetChangeRequest, hiringLeadName } = data;
  const pendingChange = targetChangeRequest?.status === 'pending';
  const proposedDays = targetChangeRequest?.proposedDays ?? data.totalDays + pace.escalationDaysLate;

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
          <p className="text-destructive font-semibold text-[12px]">
            {role === 'ta-leader'
              ? `⚠ Escalation: Projected to close ${pace.escalationDaysLate} days late`
              : "⚠ You're behind pace — here are some options"}
          </p>
          <p className="text-[11px] text-destructive/90 mt-1">
            Projected close {pace.projectedCloseDate} vs. target {pace.targetCloseDate}.
            {role === 'ta-leader' && ` ${hiringLeadName} has been notified.`}
          </p>
          <div className="flex flex-wrap gap-2 mt-2.5">
            <button
              className="px-2.5 py-1 rounded-btn text-[10px] bg-destructive/[0.08] border border-destructive/30 text-destructive hover:bg-destructive/[0.15] transition-colors"
              onClick={() => toast.success(`Timeline extended to ${proposedDays} days`)}
            >
              Extend to {proposedDays} days
            </button>
            <button
              className="px-2.5 py-1 rounded-btn text-[10px] bg-destructive/[0.08] border border-destructive/30 text-destructive hover:bg-destructive/[0.15] transition-colors"
              onClick={() => toast.success('Referral channel opened')}
            >
              Open referral channel
            </button>
            <button
              className="px-2.5 py-1 rounded-btn text-[10px] bg-destructive/[0.08] border border-destructive/30 text-destructive hover:bg-destructive/[0.15] transition-colors"
              onClick={() => toast.info('JD criteria sent for review')}
            >
              Review JD criteria
            </button>
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
