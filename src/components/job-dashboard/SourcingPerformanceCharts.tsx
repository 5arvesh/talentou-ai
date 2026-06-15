import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { RoleType } from '@/components/shared/ModernJobList';
import { useRecruitmentPlan } from '@/context/RecruitmentPlanContext';

const PROGRESSED_COLOR = '#534AB7';
const SCREENED_OUT_COLOR = '#AFA9EC';

interface SourcingPerformanceChartsProps {
  role: RoleType;
}

export function SourcingPerformanceCharts({ role }: SourcingPerformanceChartsProps) {
  const { data } = useRecruitmentPlan();
  const { sourcingBySource } = data;

  if (role === 'hiring-lead') {
    return (
      <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
        <p className="text-[11px] font-medium text-muted-foreground mb-2">Sourcing channels</p>
        <div className="flex flex-wrap gap-1.5">
          {sourcingBySource.map((source) => (
            <span key={source.channel} className="px-2 py-1 rounded-chip text-[10px] bg-muted text-muted-foreground">
              {source.channel}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const chartData = sourcingBySource.map((source) => ({ ...source, label: source.channel.split(' ')[0] }));

  return (
    <div className="space-y-3">
      <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
        <p className="text-[11px] font-medium text-muted-foreground mb-3">Candidates progressed by source</p>
        <ChartContainer
          config={{
            progressed: { label: 'Progressed past screen', color: PROGRESSED_COLOR },
            screenedOut: { label: 'Screened out', color: SCREENED_OUT_COLOR },
          }}
          className="h-[140px] w-full"
        >
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="progressed" stackId="a" fill={PROGRESSED_COLOR} />
            <Bar dataKey="screenedOut" stackId="a" fill={SCREENED_OUT_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <div className="flex justify-center gap-4 mt-2">
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: PROGRESSED_COLOR }} />
            Progressed past screen
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: SCREENED_OUT_COLOR }} />
            Screened out
          </span>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
        <p className="text-[11px] font-medium text-muted-foreground mb-3">Average fit score by source</p>
        <div className="space-y-2.5">
          {sourcingBySource.map((source) => (
            <div key={source.channel} className="flex items-center gap-3">
              <span className="flex-1 text-[12px] text-foreground truncate">{source.channel}</span>
              <div className="w-12 h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn('h-full rounded-full', source.avgFitScore >= 80 ? 'bg-success' : 'bg-warning')}
                  style={{ width: `${source.avgFitScore}%` }}
                />
              </div>
              <span
                className={cn(
                  'font-sora text-[11px] font-semibold w-9 text-right',
                  source.avgFitScore >= 80 ? 'text-success' : 'text-warning'
                )}
              >
                {source.avgFitScore}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SourcingPerformanceCharts;
