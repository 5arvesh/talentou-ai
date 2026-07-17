import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export type ZoneKey = 'today' | 'plan' | 'funnel' | 'sourcing' | 'pace' | 'resurfaced' | 'activity';
export type PlanState = 'pending_target_change' | 'live';
export type StatusPill = 'on_track' | 'at_risk' | 'critical';
export type YieldLevel = 'High' | 'Medium' | 'Low';

export interface RecruiterAssignment {
  name: string;
  title: string;
  bandwidthPct: number;
  openReqs: number;
  closesCount: number;
  avgCloseTimeDays: number;
  offerAcceptRate: number;
  assignedByAI: boolean;
}

export interface SourcingChannel {
  rank: number;
  name: string;
  yield: YieldLevel;
  active: boolean;
}

export interface TargetChangeRequest {
  requestedBy: string;
  reason: string;
  currentDays: number;
  proposedDays: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PastPlan {
  title: string;
  closedDays: number;
  closedDate: string;
  sourcedVia: { name: string; pct: number }[];
  staleMonths: number;
}

export interface FunnelCounts {
  applied: number;
  shortlisted: number;
  interview: number;
  selected: number;
}

export interface ConversionBenchmark {
  stage: string;
  rate: number;
  benchmark: number;
}

export interface SourcingPerformance {
  channel: string;
  progressed: number;
  shortlistedOut: number;
  avgFitScore: number;
}

export interface PaceAnnotation {
  day: number;
  label: string;
}

export interface PaceChartPoint {
  day: number;
  target: number | null;
  actual: number | null;
  projected: number | null;
  targetRequested: number | null;
}

export interface PaceData {
  chartData: PaceChartPoint[];
  annotations: PaceAnnotation[];
  dailyTarget: number;
  todayActual: number;
  projectedCloseDate: string;
  targetCloseDate: string;
  isEscalation: boolean;
  escalationDaysLate: number;
}

export interface ResurfacedCandidate {
  id: string;
  name: string;
  title: string;
  appliedFor: string;
  appliedDate: string;
  fitScore: number;
  aiNote: string;
  lastContactDays: number;
}

export type ActivityIconType = 'ai' | 'alert' | 'complete' | 'info' | 'resurface';

export interface ActivityItem {
  time: string;
  type: ActivityIconType;
  icon: 'sparkles' | 'clipboard' | 'radio' | 'user-check' | 'alert-triangle' | 'check' | 'info' | 'rotate-cw';
  text: string;
}

export interface ActivityGroup {
  day: string;
  items: ActivityItem[];
}

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface RecruitmentPlanData {
  jobTitle: string;
  location: string;
  priority: PriorityLevel;
  dayOfPlan: number;
  totalDays: number;
  statusPill: StatusPill;
  approvalMethod: 'auto' | 'manual';
  hiringLeadName: string;
  recruiter: RecruiterAssignment;
  channels: SourcingChannel[];
  targets: {
    targetCloseDate: string;
    dailySourcingTarget: number;
    approved: boolean;
  };
  targetChangeRequest?: TargetChangeRequest;
  pastPlan?: PastPlan;
  funnel: FunnelCounts;
  conversionBenchmarks: ConversionBenchmark[];
  sourcingBySource: SourcingPerformance[];
  pace: PaceData;
  resurfacedCandidates: ResurfacedCandidate[];
  activityFeed: ActivityGroup[];
}

// Pace chart: 4/day target, today (day 9) actual is at 60% of cumulative target (22 vs 36).
// Projected & requested-target lines diverge from "today", reaching the original
// 42-day target total (168) at day 55 (projected, 13 days late) and day 56 (requested).
function buildPaceChartData(): PaceChartPoint[] {
  const projectedRate = (168 - 22) / (55 - 9);
  const requestedRate = (168 - 22) / (56 - 9);
  const projected = (day: number) => +(22 + (day - 9) * projectedRate).toFixed(1);
  const requested = (day: number) => +(22 + (day - 9) * requestedRate).toFixed(1);

  return [
    { day: 0, target: 0, actual: 0, projected: null, targetRequested: null },
    { day: 3, target: 12, actual: 9, projected: null, targetRequested: null },
    { day: 5, target: 20, actual: 14, projected: null, targetRequested: null },
    { day: 7, target: 28, actual: 19, projected: null, targetRequested: null },
    { day: 9, target: 36, actual: 22, projected: 22, targetRequested: 22 },
    { day: 15, target: 60, actual: null, projected: projected(15), targetRequested: requested(15) },
    { day: 21, target: 84, actual: null, projected: projected(21), targetRequested: requested(21) },
    { day: 28, target: 112, actual: null, projected: projected(28), targetRequested: requested(28) },
    { day: 35, target: 140, actual: null, projected: projected(35), targetRequested: requested(35) },
    { day: 42, target: 168, actual: null, projected: projected(42), targetRequested: requested(42) },
    { day: 49, target: null, actual: null, projected: projected(49), targetRequested: requested(49) },
    { day: 56, target: null, actual: null, projected: projected(56), targetRequested: requested(56) },
  ];
}

const SENIOR_REACT_DEVELOPER: RecruitmentPlanData = {
  jobTitle: 'Senior React Developer',
  location: 'Bangalore',
  priority: 'High',
  dayOfPlan: 9,
  totalDays: 42,
  statusPill: 'at_risk',
  approvalMethod: 'auto',
  hiringLeadName: 'Priya Menon',
  recruiter: {
    name: 'Rohan Kapoor',
    title: 'Recruiter · Bangalore',
    bandwidthPct: 78,
    openReqs: 2,
    closesCount: 3,
    avgCloseTimeDays: 31,
    offerAcceptRate: 88,
    assignedByAI: true,
  },
  channels: [
    { rank: 1, name: 'LinkedIn Recruiter', yield: 'High', active: true },
    { rank: 2, name: 'Employee Referrals', yield: 'High', active: false },
    { rank: 3, name: 'Naukri.com', yield: 'Medium', active: true },
    { rank: 4, name: 'Careers page', yield: 'Low', active: true },
  ],
  targets: {
    targetCloseDate: '15 Jul',
    dailySourcingTarget: 4,
    approved: true,
  },
  pastPlan: {
    title: 'Backend Engineer (Node)',
    closedDays: 38,
    closedDate: 'Mar 2025',
    sourcedVia: [
      { name: 'LinkedIn', pct: 60 },
      { name: 'Referrals', pct: 40 },
    ],
    staleMonths: 3,
  },
  funnel: { applied: 22, shortlisted: 14, interview: 6, selected: 2 },
  conversionBenchmarks: [
    { stage: 'Applied/Sourced → Shortlisted', rate: 64, benchmark: 60 },
    { stage: 'Shortlisted → Interview', rate: 43, benchmark: 45 },
    { stage: 'Interview → Selected', rate: 33, benchmark: 30 },
  ],
  sourcingBySource: [
    { channel: 'LinkedIn Recruiter', progressed: 6, shortlistedOut: 3, avgFitScore: 82 },
    { channel: 'Employee Referrals', progressed: 4, shortlistedOut: 1, avgFitScore: 88 },
    { channel: 'Naukri.com', progressed: 3, shortlistedOut: 3, avgFitScore: 65 },
    { channel: 'Careers page', progressed: 1, shortlistedOut: 1, avgFitScore: 58 },
  ],
  pace: {
    chartData: buildPaceChartData(),
    annotations: [
      { day: 3, label: 'Public holiday — expected dip' },
      { day: 5, label: 'Referral channel opened' },
      { day: 9, label: 'Pace alert flagged' },
    ],
    dailyTarget: 4,
    todayActual: 2.4,
    projectedCloseDate: '28 Jul',
    targetCloseDate: '15 Jul',
    isEscalation: true,
    escalationDaysLate: 13,
  },
  resurfacedCandidates: [
    {
      id: 'rc-1',
      name: 'Arun Sharma',
      title: 'Senior SWE',
      appliedFor: 'Backend Eng',
      appliedDate: 'Mar 2025',
      fitScore: 87,
      aiNote: 'Strong React match. Reached final interview — exited due to counter-offer. Worth re-engaging.',
      lastContactDays: 90,
    },
    {
      id: 'rc-2',
      name: 'Sneha Iyer',
      title: 'Frontend Engineer',
      appliedFor: 'Frontend Developer',
      appliedDate: 'Jan 2025',
      fitScore: 81,
      aiNote: 'Solid TypeScript/React background from a similar past role.',
      lastContactDays: 75,
    },
    {
      id: 'rc-3',
      name: 'Karthik Raman',
      title: 'Full Stack Developer',
      appliedFor: 'Full Stack Engineer',
      appliedDate: 'Nov 2024',
      fitScore: 74,
      aiNote: 'Good culture fit signal from past interview feedback.',
      lastContactDays: 120,
    },
    {
      id: 'rc-4',
      name: 'Divya Nair',
      title: 'React Developer',
      appliedFor: 'Frontend Developer',
      appliedDate: 'Oct 2024',
      fitScore: 69,
      aiNote: 'Meets core skill requirements; lower seniority match.',
      lastContactDays: 150,
    },
  ],
  activityFeed: [
    {
      day: 'Today',
      items: [
        { time: '09:00', type: 'ai', icon: 'sparkles', text: "Generated Today's Focus — referral channel recommendation based on past hire patterns" },
      ],
    },
    {
      day: 'Yesterday',
      items: [
        { time: '17:30', type: 'alert', icon: 'alert-triangle', text: 'Pace alert: sourcing 40% below daily target — escalation sent to Recruitment Lead & Hiring Lead' },
        { time: '11:00', type: 'resurface', icon: 'rotate-cw', text: 'Resurfaced 4 candidates from past Backend/React hires (fit scores: 87%, 81%, 74%, 69%)' },
      ],
    },
    {
      day: 'Day 5',
      items: [
        { time: '10:15', type: 'info', icon: 'info', text: 'Pace dip on Days 3–5 attributed to Bangalore public holiday — adjusted projection window' },
      ],
    },
    {
      day: 'Day 1 · Approval',
      items: [
        { time: '14:22', type: 'complete', icon: 'check', text: 'Recruitment plan generated (auto-approved by Kavita R.)' },
        { time: '14:21', type: 'ai', icon: 'user-check', text: 'Assigned Rohan Kapoor — bandwidth 78%, 3 React/Node closes, avg 31-day close' },
        { time: '14:20', type: 'ai', icon: 'radio', text: 'Ranked channels: LinkedIn (high), Referrals (high), Naukri (medium), Careers page (low)' },
        { time: '14:19', type: 'ai', icon: 'clipboard', text: 'Past plan matched: Backend Eng (Node), Mar 2025. Flagged as 3mo old — review channel relevance' },
      ],
    },
  ],
};

export const MOCK_PLANS: Record<string, RecruitmentPlanData> = {
  'job-senior-react-developer': SENIOR_REACT_DEVELOPER,
  // id '3' ("Senior Developer") exists in all three role job lists — reuse the
  // fully-realized seed so "View Plan" surfaces every v1 state from real navigation
  '3': SENIOR_REACT_DEVELOPER,
};

export interface JobOverride {
  jobRole?: string;
  location?: string;
  recruiter?: string;
  priority?: PriorityLevel;
}

export function getDefaultPlanData(jobId: string, jobOverride?: JobOverride): RecruitmentPlanData {
  const jobTitle = jobOverride?.jobRole ?? 'This Role';
  const location = jobOverride?.location ?? 'Bangalore';
  const recruiterName = jobOverride?.recruiter ?? 'Unassigned';
  const priority = jobOverride?.priority ?? 'Medium';

  return {
    jobTitle,
    location,
    priority,
    dayOfPlan: 5,
    totalDays: 30,
    statusPill: 'on_track',
    approvalMethod: 'manual',
    hiringLeadName: 'Hiring Lead',
    recruiter: {
      name: recruiterName,
      title: 'Recruiter',
      bandwidthPct: 55,
      openReqs: 1,
      closesCount: 2,
      avgCloseTimeDays: 28,
      offerAcceptRate: 80,
      assignedByAI: false,
    },
    channels: [
      { rank: 1, name: 'LinkedIn Recruiter', yield: 'High', active: true },
      { rank: 2, name: 'Naukri.com', yield: 'Medium', active: true },
      { rank: 3, name: 'Careers page', yield: 'Low', active: true },
    ],
    targets: {
      targetCloseDate: '30 days from approval',
      dailySourcingTarget: 3,
      approved: true,
    },
    funnel: { applied: 12, shortlisted: 7, interview: 3, selected: 1 },
    conversionBenchmarks: [
      { stage: 'Applied/Sourced → Shortlisted', rate: 58, benchmark: 60 },
      { stage: 'Shortlisted → Interview', rate: 43, benchmark: 45 },
      { stage: 'Interview → Selected', rate: 33, benchmark: 30 },
    ],
    sourcingBySource: [
      { channel: 'LinkedIn Recruiter', progressed: 4, shortlistedOut: 2, avgFitScore: 76 },
      { channel: 'Naukri.com', progressed: 2, shortlistedOut: 2, avgFitScore: 70 },
      { channel: 'Careers page', progressed: 1, shortlistedOut: 1, avgFitScore: 64 },
    ],
    pace: {
      chartData: [
        { day: 0, target: 0, actual: 0, projected: null, targetRequested: null },
        { day: 5, target: 15, actual: 15, projected: 15, targetRequested: null },
        { day: 15, target: 45, actual: null, projected: 45, targetRequested: null },
        { day: 30, target: 90, actual: null, projected: 90, targetRequested: null },
      ],
      annotations: [],
      dailyTarget: 3,
      todayActual: 3,
      projectedCloseDate: 'On schedule',
      targetCloseDate: '30 days from approval',
      isEscalation: false,
      escalationDaysLate: 0,
    },
    resurfacedCandidates: [],
    activityFeed: [],
  };
}

interface RecruitmentPlanContextValue {
  jobId: string;
  data: RecruitmentPlanData;
  planState: PlanState;
  activeZone: ZoneKey;
  setActiveZone: (zone: ZoneKey) => void;
  requestTargetChange: (reason: string, proposedDays: number) => void;
  approveTargetChange: () => void;
  rejectTargetChange: () => void;
  acceptTargets: () => void;
  toggleChannel: (name: string) => void;
  extendTargetDirect: (newDays: number) => void;
  seedTourExtensionRequest: (reason: string, proposedDays: number) => boolean;
  clearTourExtensionRequest: () => void;
}

const RecruitmentPlanContext = createContext<RecruitmentPlanContextValue | undefined>(undefined);

interface RecruitmentPlanProviderProps {
  jobId: string;
  jobOverride?: JobOverride;
  children: ReactNode;
}

interface PersistedExtensionState {
  targetChangeRequest?: TargetChangeRequest;
  totalDays: number;
  targets: RecruitmentPlanData['targets'];
}

function extensionRequestKey(jobId: string) {
  return `talentou:extension-request:${jobId}`;
}

function loadPersistedExtensionState(jobId: string): PersistedExtensionState | null {
  try {
    const raw = localStorage.getItem(extensionRequestKey(jobId));
    return raw ? (JSON.parse(raw) as PersistedExtensionState) : null;
  } catch {
    return null;
  }
}

function savePersistedExtensionState(jobId: string, data: RecruitmentPlanData) {
  const slice: PersistedExtensionState = {
    targetChangeRequest: data.targetChangeRequest,
    totalDays: data.totalDays,
    targets: data.targets,
  };
  try {
    localStorage.setItem(extensionRequestKey(jobId), JSON.stringify(slice));
  } catch {
    // localStorage unavailable/full — extension state simply won't persist across role switches
  }
}

export function RecruitmentPlanProvider({ jobId, jobOverride, children }: RecruitmentPlanProviderProps) {
  const [data, setData] = useState<RecruitmentPlanData>(() => {
    const base = MOCK_PLANS[jobId] ?? getDefaultPlanData(jobId, jobOverride);
    const persisted = loadPersistedExtensionState(jobId);
    return persisted ? { ...base, ...persisted } : base;
  });
  const [activeZone, setActiveZone] = useState<ZoneKey>('plan');

  const planState: PlanState = data.targetChangeRequest?.status === 'pending' ? 'pending_target_change' : 'live';

  const requestTargetChange = (reason: string, proposedDays: number) => {
    setData((prev) => {
      const next: RecruitmentPlanData = {
        ...prev,
        targetChangeRequest: {
          requestedBy: prev.recruiter.name,
          reason,
          currentDays: prev.totalDays,
          proposedDays,
          status: 'pending',
        },
      };
      savePersistedExtensionState(jobId, next);
      return next;
    });
    toast.success('Target change request sent to Recruitment Lead for approval.');
  };

  const approveTargetChange = () => {
    setData((prev) => {
      if (!prev.targetChangeRequest) return prev;
      const next: RecruitmentPlanData = {
        ...prev,
        totalDays: prev.targetChangeRequest.proposedDays,
        targets: { ...prev.targets, approved: true },
        targetChangeRequest: { ...prev.targetChangeRequest, status: 'approved' },
      };
      savePersistedExtensionState(jobId, next);
      return next;
    });
    toast.success('Target change approved. Pace tracker resumed.');
  };

  const rejectTargetChange = () => {
    setData((prev) => {
      if (!prev.targetChangeRequest) return prev;
      const next: RecruitmentPlanData = {
        ...prev,
        targetChangeRequest: { ...prev.targetChangeRequest, status: 'rejected' },
      };
      savePersistedExtensionState(jobId, next);
      return next;
    });
    toast.info('Target change request rejected. Original targets remain in place.');
  };

  const acceptTargets = () => {
    setData((prev) => ({ ...prev, targets: { ...prev.targets, approved: true } }));
    toast.success('Targets accepted. Dashboard is now live.');
  };

  const toggleChannel = (name: string) => {
    setData((prev) => ({
      ...prev,
      channels: prev.channels.map((c) => (c.name === name ? { ...c, active: true } : c)),
    }));
    toast.success(`${name} channel opened`);
  };

  const extendTargetDirect = (newDays: number) => {
    setData((prev) => {
      const next: RecruitmentPlanData = {
        ...prev,
        totalDays: newDays,
        targets: { ...prev.targets, approved: true },
      };
      savePersistedExtensionState(jobId, next);
      return next;
    });
    toast.success(`Timeline extended to ${newDays} days.`);
  };

  // Demo-only: lets the product tour guarantee a pending request exists to point the
  // extension-approval coach mark at, without a toast and without touching real user data.
  const seedTourExtensionRequest = (reason: string, proposedDays: number): boolean => {
    if (data.targetChangeRequest?.status === 'pending') return false;
    setData((prev) => {
      const next: RecruitmentPlanData = {
        ...prev,
        targetChangeRequest: {
          requestedBy: prev.recruiter.name,
          reason,
          currentDays: prev.totalDays,
          proposedDays,
          status: 'pending',
        },
      };
      savePersistedExtensionState(jobId, next);
      return next;
    });
    return true;
  };

  const clearTourExtensionRequest = () => {
    setData((prev) => {
      if (!prev.targetChangeRequest) return prev;
      const next: RecruitmentPlanData = { ...prev, targetChangeRequest: undefined };
      savePersistedExtensionState(jobId, next);
      return next;
    });
  };

  return (
    <RecruitmentPlanContext.Provider
      value={{
        jobId,
        data,
        planState,
        activeZone,
        setActiveZone,
        requestTargetChange,
        approveTargetChange,
        rejectTargetChange,
        acceptTargets,
        toggleChannel,
        extendTargetDirect,
        seedTourExtensionRequest,
        clearTourExtensionRequest,
      }}
    >
      {children}
    </RecruitmentPlanContext.Provider>
  );
}

export function useRecruitmentPlan() {
  const context = useContext(RecruitmentPlanContext);
  if (!context) {
    throw new Error('useRecruitmentPlan must be used within RecruitmentPlanProvider');
  }
  return context;
}
