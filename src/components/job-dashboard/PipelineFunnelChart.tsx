import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useRecruitmentPlan } from '@/context/RecruitmentPlanContext';

export const PURPLE_RAMP = ['#AFA9EC', '#7F77DD', '#534AB7', '#3C3489'];

interface PipelineFunnelChartProps {
  variant?: 'full' | 'compact';
}

export function PipelineFunnelChart({ variant = 'full' }: PipelineFunnelChartProps) {
  const { data } = useRecruitmentPlan();
  const { funnel, conversionBenchmarks } = data;

  const segments = [
    { label: 'Applied', count: funnel.applied },
    { label: 'Screened', count: funnel.screened },
    { label: 'Interview', count: funnel.interview },
    { label: 'Selected', count: funnel.selected },
  ];
  const total = segments.reduce((sum, s) => sum + s.count, 0);

  if (total === 0) {
    return (
      <div data-tour-id="jd-pipeline-funnel" className="rounded-card border border-border bg-card p-3.5 shadow-card">
        <p className="text-[11px] font-medium text-muted-foreground mb-1">Pipeline funnel · 0 total</p>
        <p className="text-[12px] text-muted-foreground py-4 text-center">No candidates yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
      <p className="text-[11px] font-medium text-muted-foreground mb-3">Pipeline funnel · {total} total</p>

      <div className="flex h-3 w-full rounded-[4px] overflow-hidden">
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            style={{ width: `${(seg.count / total) * 100}%`, backgroundColor: PURPLE_RAMP[i] }}
          />
        ))}
      </div>

      {variant === 'compact' ? (
        <TooltipProvider>
          <div className="flex items-stretch justify-between mt-3">
            {segments.map((seg, i) => {
              const benchmark = i > 0 ? conversionBenchmarks[i - 1] : null;
              const content = (
                <div key={seg.label} className="text-center">
                  <p className="font-sora text-[15px] font-semibold text-foreground">{seg.count}</p>
                  <p className="text-[10px] text-muted-foreground">{seg.label}</p>
                </div>
              );
              if (!benchmark) return content;
              return (
                <Tooltip key={seg.label}>
                  <TooltipTrigger asChild>
                    <div className="text-center cursor-help">
                      <p className="font-sora text-[15px] font-semibold text-foreground">{seg.count}</p>
                      <p className="text-[10px] text-muted-foreground">{seg.label}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>
                      {benchmark.rate}% conversion from {segments[i - 1].label} · benchmark {benchmark.benchmark}%
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      ) : (
        <div className="flex items-stretch mt-3">
          {segments.map((seg, i) => (
            <React.Fragment key={seg.label}>
              <div className="flex-1 text-center">
                <p className="font-sora text-[15px] font-semibold text-foreground">{seg.count}</p>
                <p className="text-[10px] text-muted-foreground">{seg.label}</p>
              </div>
              {i < segments.length - 1 && (
                <div className="flex flex-col items-center justify-center px-1 pt-1">
                  <span
                    className={cn(
                      'text-[10px] font-medium',
                      conversionBenchmarks[i].rate >= conversionBenchmarks[i].benchmark ? 'text-success' : 'text-warning'
                    )}
                  >
                    {conversionBenchmarks[i].rate}%
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {variant === 'full' && (
        <>
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground mb-2">vs. benchmark (last 3 similar roles)</p>
            <div className="grid grid-cols-3 gap-2">
              {conversionBenchmarks.map((b) => {
                const aboveBenchmark = b.rate >= b.benchmark;
                const DeltaIcon = aboveBenchmark ? ArrowUp : ArrowDown;
                return (
                  <div key={b.stage} className="rounded-btn border border-border p-2 text-center">
                    <p className="text-[10px] text-muted-foreground mb-1">{b.stage}</p>
                    <p className={cn('flex items-center justify-center gap-0.5 font-sora text-[13px] font-semibold', aboveBenchmark ? 'text-success' : 'text-warning')}>
                      <DeltaIcon className="h-3 w-3" />
                      {b.rate}%
                    </p>
                    <p className="text-[9px] text-muted-foreground">benchmark {b.benchmark}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground mb-2">Stage distribution</p>
            <ChartContainer
              config={{ count: { label: 'Candidates', color: PURPLE_RAMP[2] } }}
              className="h-[140px] w-full"
              role="img"
              aria-label={`Pipeline stage distribution: ${segments
                .map((s) => `${s.label} ${Math.round((s.count / total) * 100)}%`)
                .join(', ')}`}
            >
              <PieChart>
                <Pie data={segments} dataKey="count" nameKey="label" innerRadius={38} outerRadius={58} paddingAngle={2}>
                  {segments.map((_, i) => (
                    <Cell key={i} fill={PURPLE_RAMP[i]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {segments.map((seg, i) => (
                <div key={seg.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: PURPLE_RAMP[i] }} />
                  {seg.label} · {Math.round((seg.count / total) * 100)}%
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PipelineFunnelChart;
