import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, UserCheck, User, CheckCircle2, AlertTriangle, AlertCircle, ArrowRight, MoreVertical, LucideIcon, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoleType, JobItem } from '@/components/shared/ModernJobList';
import { RecruitmentPlanProvider, useRecruitmentPlan, ZoneKey, JobOverride, StatusPill } from '@/context/RecruitmentPlanContext';
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
import { TourStep } from '@/store/tour-store';
import { useScreenTour } from '@/hooks/useScreenTour';
import { RL_TOUR_SCREEN_SEQUENCE } from '@/constants/tourScreens';

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

const STATUS_PILL_CONFIG: Record<StatusPill, { label: string; className: string; icon: LucideIcon }> = {
  on_track: { label: 'On track', className: 'bg-success/10 text-success', icon: CheckCircle2 },
  at_risk: { label: 'At risk', className: 'bg-warning/10 text-warning', icon: AlertTriangle },
  critical: { label: 'Critical', className: 'bg-destructive/10 text-destructive', icon: AlertCircle },
};

function basePathForRole(role: RoleType) {
  return role === 'ta-leader' ? '/sales-plan' : role === 'recruiter' ? '/ta-associate' : '/hiring-lead';
}

function ZoneBlock({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-1" style={{ animationDelay: `${index * 60}ms` }}>
      {children}
    </div>
  );
}

function DashboardHeader({ jobId, role }: { jobId: string; role: RoleType }) {
  const navigate = useNavigate();
  const { data } = useRecruitmentPlan();

  const statusConfig = STATUS_PILL_CONFIG[data.statusPill];
  const StatusIcon = statusConfig.icon;
  const RecruiterIcon = data.recruiter.assignedByAI ? UserCheck : User;

  const goToPipeline = () => {
    navigate(`${basePathForRole(role)}/jobs/${jobId}/pipeline`);
  };

  return (
    <div className="border-b border-border p-3.5 space-y-2.5 shrink-0">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {data.approvalMethod === 'auto' ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0e0020] text-[#c084fc] text-[10px] font-medium">
              <Sparkles className="h-3 w-3" />
              AI-handled
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-medium">
              <CheckCircle2 className="h-3 w-3" />
              Manually approved
            </span>
          )}
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium', statusConfig.className)}>
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </span>
          <h2 className="font-sora text-[15px] font-semibold text-foreground leading-tight ml-1">{data.jobTitle}</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-primary text-white hover:bg-primary/90 h-9 text-[11px] gap-1.5" onClick={goToPipeline}>
            Go to pipeline
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" disabled>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {data.location}
        </span>
        <span>Day {data.dayOfPlan} of {data.totalDays}</span>
        <span className="inline-flex items-center gap-1">
          <RecruiterIcon className="h-3 w-3" />
          {data.recruiter.name}
        </span>
      </div>
    </div>
  );
}

function SummaryStrip({ role }: { role: RoleType }) {
  return (
    <div className="grid grid-cols-1 desktop-lg:grid-cols-[1.3fr_1fr_1fr] gap-3 p-3.5 border-b border-border shrink-0">
      <ZoneBlock index={0}>
        <TodaysFocusCard role={role} variant="compact" />
      </ZoneBlock>
      <ZoneBlock index={1}>
        <PipelineFunnelChart variant="compact" />
      </ZoneBlock>
      <ZoneBlock index={2}>
        <PaceTodayCard />
      </ZoneBlock>
    </div>
  );
}

function ZoneContent({ role, activeZone }: { role: RoleType; activeZone: ZoneKey }) {
  const { data } = useRecruitmentPlan();
  const [showAllResurfaced, setShowAllResurfaced] = useState(false);

  switch (activeZone) {
    case 'plan':
      return (
        <ZoneBlock index={0}>
          <RecruitmentPlanPanel role={role} />
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
              <ResurfacedCandidateCard candidate={candidate} role={role} />
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

function buildJobDashboardTourSteps(
  setActiveZone: (zone: ZoneKey) => void,
  seedTourExtensionRequest: (reason: string, proposedDays: number) => boolean,
  clearTourExtensionRequest: () => void,
  currentTotalDays: number
): TourStep[] {
  let seededByTour = false;
  return [
    {
      variant: 'intro',
      icon: Briefcase,
      screenSequence: RL_TOUR_SCREEN_SEQUENCE,
      screenKey: 'job-dashboard',
      title: "Everything about this role",
      description: "This page is the single home for one job: its plan, its pipeline, its pace, and its history.",
    },
    {
      variant: 'intro',
      icon: Briefcase,
      screenSequence: RL_TOUR_SCREEN_SEQUENCE,
      screenKey: 'job-dashboard',
      title: "Always-on summary, switchable detail",
      description: "The top strip is always visible. Below it, tabs switch between different kinds of detail.",
    },
    {
      targetSelector: '[data-tour-id="jd-todays-focus"]',
      title: "Today's focus",
      description: "The single most important thing to look at for this role right now — a stalled candidate, a pending request, or a milestone.",
    },
    {
      targetSelector: '[data-tour-id="jd-pipeline-funnel"]',
      title: "Pipeline funnel",
      description: "How many candidates are in each stage, from sourced to offer.",
    },
    {
      targetSelector: '[data-tour-id="jd-pace-today"]',
      title: "Sourcing pace",
      description: "Whether you're bringing in candidates fast enough to hit your close date.",
    },
    {
      targetSelector: '[data-tour-id="jd-tab-bar"]',
      title: "Five tabs, one job",
      description: "Recruitment plan, sourcing performance, pace tracker, resurfaced candidates, and AI activity feed — each goes deeper on one part of this role.",
    },
    {
      targetSelector: '[data-tour-id="jd-recruiter-card"]',
      title: "Who's working this role",
      description: "The assigned recruiter, their current bandwidth, and the channels this role is being sourced through.",
      onEnter: () => setActiveZone('plan'),
    },
    {
      targetSelector: '[data-tour-id="jd-extension-request"]',
      title: "Extension requests",
      description: "When a recruiter requests more time on a close date, you approve or decline it right here — nothing changes until you do.",
      onEnter: () => {
        setActiveZone('plan');
        seededByTour = seedTourExtensionRequest(
          'Requested from pace tracker escalation',
          currentTotalDays + 13
        );
      },
      onExit: () => {
        if (seededByTour) {
          clearTourExtensionRequest();
          seededByTour = false;
        }
      },
    },
  ];
}

function DashboardContent({ role }: { role: RoleType }) {
  const { activeZone, setActiveZone, seedTourExtensionRequest, clearTourExtensionRequest, data } = useRecruitmentPlan();
  const meta = ZONE_META[activeZone];

  const tourSteps = useMemo(
    () =>
      role === 'ta-leader'
        ? buildJobDashboardTourSteps(setActiveZone, seedTourExtensionRequest, clearTourExtensionRequest, data.totalDays)
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [role]
  );
  useScreenTour('ta-leader', 'job-dashboard', tourSteps);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <JobDashboardNav role={role} />
      <div
        role="tabpanel"
        id={`panel-${activeZone}`}
        aria-labelledby={`tab-${activeZone}`}
        className="flex-1 overflow-y-auto p-4 w-full"
      >
        <div className="mb-3">
          <h3 className="font-sora text-[15px] font-semibold text-foreground">{meta.title}</h3>
          <p className="text-[11px] text-muted-foreground">{meta.subtitle}</p>
        </div>
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
      <div className="h-full flex flex-col">
        <DashboardHeader jobId={jobId} role={role} />
        <SummaryStrip role={role} />
        <DashboardContent role={role} />
      </div>
    </RecruitmentPlanProvider>
  );
}

export default JobDashboard;
