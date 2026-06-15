import React, { useState } from 'react';
import { RoleType, JobItem } from '@/components/shared/ModernJobList';
import { RecruitmentPlanProvider, useRecruitmentPlan, ZoneKey, JobOverride } from '@/context/RecruitmentPlanContext';
import { Button } from '@/components/ui/button';
import { JobDashboardNav } from './JobDashboardNav';
import { TodaysFocusCard } from './TodaysFocusCard';
import { PaceTodayCard } from './PaceTodayCard';
import { PipelineFunnelChart } from './PipelineFunnelChart';
import { RecruitmentPlanPanel } from './RecruitmentPlanPanel';
import { SourcingPerformanceCharts } from './SourcingPerformanceCharts';
import { PaceTrackerChart } from './PaceTrackerChart';
import { ResurfacedCandidateCard } from './ResurfacedCandidateCard';
import { AIActivityFeed } from './AIActivityFeed';

interface JobDashboardProps {
  jobId: string;
  role: RoleType;
  jobOverride?: JobItem;
}

const ZONE_META: Record<ZoneKey, { title: string; subtitle: string }> = {
  today: { title: "Today's focus", subtitle: 'AI-curated priorities for this role, refreshed daily' },
  plan: { title: 'Recruitment plan', subtitle: 'Assigned recruiter, sourcing channels & targets' },
  funnel: { title: 'Pipeline funnel', subtitle: 'Candidate progression across stages' },
  sourcing: { title: 'Sourcing performance', subtitle: 'Channel effectiveness & candidate fit' },
  pace: { title: 'Pace tracker', subtitle: 'Sourcing pace vs. target over time' },
  resurfaced: { title: 'Resurfaced candidates', subtitle: 'Past applicants worth re-engaging' },
  activity: { title: 'AI activity feed', subtitle: 'Actions and suggestions from the AI planner' },
};

function ZoneBlock({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-1" style={{ animationDelay: `${index * 60}ms` }}>
      {children}
    </div>
  );
}

function ZoneContent({ role, activeZone }: { role: RoleType; activeZone: ZoneKey }) {
  const { data } = useRecruitmentPlan();
  const [showAllResurfaced, setShowAllResurfaced] = useState(false);

  switch (activeZone) {
    case 'today':
      return (
        <div className="space-y-3">
          <ZoneBlock index={0}>
            <TodaysFocusCard role={role} />
          </ZoneBlock>
          <ZoneBlock index={1}>
            <PipelineFunnelChart variant="compact" />
          </ZoneBlock>
          <ZoneBlock index={2}>
            <PaceTodayCard />
          </ZoneBlock>
        </div>
      );
    case 'plan':
      return (
        <ZoneBlock index={0}>
          <RecruitmentPlanPanel role={role} />
        </ZoneBlock>
      );
    case 'funnel':
      return (
        <ZoneBlock index={0}>
          <PipelineFunnelChart variant="full" />
        </ZoneBlock>
      );
    case 'sourcing':
      return (
        <ZoneBlock index={0}>
          <SourcingPerformanceCharts role={role} />
        </ZoneBlock>
      );
    case 'pace':
      return (
        <ZoneBlock index={0}>
          <PaceTrackerChart role={role} />
        </ZoneBlock>
      );
    case 'resurfaced': {
      const sorted = [...data.resurfacedCandidates].sort((a, b) => b.fitScore - a.fitScore);
      const capped = role === 'ta-leader' && !showAllResurfaced ? sorted.slice(0, 5) : sorted;
      if (sorted.length === 0) {
        return <p className="text-[12px] text-muted-foreground">No resurfaced candidates yet.</p>;
      }
      return (
        <div className="space-y-3">
          {capped.map((candidate, index) => (
            <ZoneBlock key={candidate.id} index={index}>
              <ResurfacedCandidateCard candidate={candidate} />
            </ZoneBlock>
          ))}
          {role === 'ta-leader' && sorted.length > 5 && (
            <Button variant="ghost" size="sm" className="text-[11px]" onClick={() => setShowAllResurfaced((v) => !v)}>
              {showAllResurfaced ? 'Show less' : `Show ${sorted.length - 5} more`}
            </Button>
          )}
        </div>
      );
    }
    case 'activity':
      return (
        <ZoneBlock index={0}>
          <AIActivityFeed />
        </ZoneBlock>
      );
    default:
      return null;
  }
}

function DashboardContent({ role }: { role: RoleType }) {
  const { activeZone } = useRecruitmentPlan();
  const meta = ZONE_META[activeZone];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="border-b border-border px-4 py-3 shrink-0">
        <h3 className="font-sora text-[15px] font-semibold text-foreground">{meta.title}</h3>
        <p className="text-[11px] text-muted-foreground">{meta.subtitle}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <ZoneContent role={role} activeZone={activeZone} />
      </div>
    </div>
  );
}

export function JobDashboard({ jobId, role, jobOverride }: JobDashboardProps) {
  const override: JobOverride | undefined = jobOverride
    ? { jobRole: jobOverride.jobRole, location: jobOverride.location, recruiter: jobOverride.recruiter }
    : undefined;

  return (
    <RecruitmentPlanProvider jobId={jobId} jobOverride={override}>
      <div className="h-full flex">
        <JobDashboardNav jobId={jobId} role={role} />
        <DashboardContent role={role} />
      </div>
    </RecruitmentPlanProvider>
  );
}

export default JobDashboard;
