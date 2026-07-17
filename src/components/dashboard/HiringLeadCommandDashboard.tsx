import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, ChevronRight, Plus, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KPIStrip } from "@/components/shared/KPIStrip";
import { SampleDataBadge } from "@/components/dashboard/SampleDataBadge";
import { HiringLeadScorecard, ScorecardCandidate } from "@/components/dashboard/HiringLeadScorecard";
import { getJobStatusColor } from "@/constants/statuses";
import { useScreenTour } from "@/hooks/useScreenTour";
import { TourStep } from "@/store/tour-store";
import { HL_TOUR_SCREEN_SEQUENCE } from "@/constants/tourScreens";

const jobOpenings = [
  { id: 1, jobRole: 'Senior React Developer', project: 'Platform Core',     requiredSkills: 'React, TypeScript, Node.js',        status: 'Active',    recruiter: 'Sarah Johnson',  interviewer: 'Mike Chen',     totalCandidates: 12, stages: { interview: 3, selected: 1 }, daysOpen: 14, stalledCount: 2, priority: 'Urgent' },
  { id: 2, jobRole: 'Product Manager',        project: 'Growth Squad',      requiredSkills: 'Strategy, Analytics, Agile',        status: 'In Review',  recruiter: 'David Wilson',   interviewer: 'Lisa Zhang',    totalCandidates: 8,  stages: { interview: 2, selected: 0 }, daysOpen: 21, stalledCount: 0, priority: 'Medium' },
  { id: 3, jobRole: 'Data Scientist',         project: 'ML Platform',       requiredSkills: 'Python, TensorFlow, Statistics',    status: 'Active',    recruiter: 'Priya Sharma',   interviewer: 'David Kim',     totalCandidates: 15, stages: { interview: 4, selected: 2 }, daysOpen: 9,  stalledCount: 1, priority: 'High' },
  { id: 4, jobRole: 'DevOps Engineer',        project: 'Infrastructure',    requiredSkills: 'Kubernetes, CI/CD, Terraform',      status: 'Active',    recruiter: 'Rachel Kim',     interviewer: 'Robert Taylor', totalCandidates: 6,  stages: { interview: 1, selected: 0 }, daysOpen: 30, stalledCount: 3, priority: 'High' },
  { id: 5, jobRole: 'UX Designer',            project: 'Design System',     requiredSkills: 'Figma, User Research, Prototyping', status: 'On Hold',    recruiter: 'Alex Thompson',  interviewer: 'Maria Garcia',  totalCandidates: 9,  stages: { interview: 2, selected: 0 }, daysOpen: 18, stalledCount: 0, priority: 'Low' },
  { id: 6, jobRole: 'QA Engineer',            project: 'Testing Framework', requiredSkills: 'Selenium, Testing, Automation',     status: 'Closed',     recruiter: 'Nina Patel',     interviewer: 'Chris Wilson',  totalCandidates: 11, stages: { interview: 3, selected: 0 }, daysOpen: 7,  stalledCount: 0, priority: 'Medium' },
];

const HL_PRIORITY_PILL: Record<string, string> = {
  Urgent: 'bg-[#FCEBEB] text-[#A32D2D] border-transparent',
  High: 'bg-[#FAEEDA] text-[#854F0B] border-transparent',
};

const upcomingInterviews = [
  { candidate: 'Arun Sharma',  role: 'Senior React Developer', type: 'Technical',   date: 'Today',        time: '3:00 PM',  exp: '6y', fitScore: 88, action: 'Score' as const, aiSummary: 'Strong React and TypeScript depth; led a design-system migration. Probe system-design tradeoffs at scale.' },
  { candidate: 'Priya Nair',   role: 'Data Scientist',         type: 'HR Round',    date: 'Tomorrow',     time: '11:00 AM', exp: '5y', fitScore: 92, action: 'Prep' as const,  aiSummary: 'Excellent ML fundamentals and clear communication. Compensation expectations slightly above band — confirm in HR round.' },
  { candidate: 'Rahul Verma',  role: 'Senior React Developer', type: 'Final Round', date: 'Wed, 21 May',  time: '2:30 PM',  exp: '7y', fitScore: 81, action: 'Prep' as const,  aiSummary: 'Solid frontend craft, mentored juniors. Earlier rounds flagged shallow testing habits — validate before offer.' },
  { candidate: 'Sneha Patel',  role: 'Product Manager',        type: 'Technical',   date: 'Thu, 22 May',  time: '4:00 PM',  exp: '4y', fitScore: 64, action: 'Prep' as const,  aiSummary: 'Good stakeholder instincts but thin on quantitative rigor. Push on metrics ownership and prioritization frameworks.' },
];

const roundLabel: Record<string, string> = {
  Technical: 'Technical Round',
  'HR Round': 'HR Round',
  'Final Round': 'Final Round',
};

const interviewTypeBadge: Record<string, string> = {
  Technical:    'bg-[#E2EEFB] text-[#0C5FB3]',
  'HR Round':   'bg-[#DCEFC8] text-[#1F4A0A]',
  'Final Round':'bg-[#EEEDFE] text-[#3C3489]',
};

const stalledCandidates = 3;

const kpiStats = [
  { label: 'Open Positions', value: 6, sub: 'Across all projects', subColor: 'text-muted-foreground', id: 'kpi-open-positions' },
  {
    label: 'Needs your decision', value: 2, sub: 'Candidates awaiting scorecard', subColor: 'text-muted-foreground',
    labelColor: 'text-primary', valueColor: 'text-primary', borderColor: 'border-l-[3px] border-l-primary', id: 'kpi-needs-decision',
  },
  { label: 'In Review', value: 1, sub: 'Awaiting sign-off', subColor: 'text-warning', id: 'kpi-in-review' },
  {
    label: 'Stalled > 10 days', value: stalledCandidates, sub: 'Candidates stuck in one stage',
    subColor: 'text-destructive', icon: AlertTriangle, valueColor: 'text-destructive', id: 'kpi-stalled',
  },
];

const DASHBOARD_TOUR_STEPS: TourStep[] = [
  {
    variant: 'intro',
    icon: LayoutDashboard,
    screenSequence: HL_TOUR_SCREEN_SEQUENCE,
    screenKey: 'dashboard',
    title: "Your hiring at a glance",
    description: "This dashboard shows every role you've opened, who's in the pipeline, and what needs your attention today. You don't need to dig — the urgent stuff surfaces automatically.",
  },
  {
    variant: 'intro',
    icon: LayoutDashboard,
    screenSequence: HL_TOUR_SCREEN_SEQUENCE,
    screenKey: 'dashboard',
    title: "Decisions, not busywork",
    description: "The numbers up top tell you what needs action. The table below tells you where.",
  },
  {
    targetSelector: '[data-tour-id="kpi-needs-decision"]',
    title: "Decisions waiting",
    description: "The count of candidates or positions that need your input right now — approvals, interview feedback, offer sign-offs. Purple accent means it's yours to act on.",
  },
  {
    targetSelector: '[data-tour-id="kpi-stalled"]',
    title: "Stalled roles",
    description: "Roles where no candidate has moved stage in over 10 days. Red means something is stuck and needs a nudge.",
  },
  {
    targetSelector: '[data-tour-id="hl-dash-positions-table"]',
    title: "Your open roles",
    description: "Each row is a position you've created. Status shows where it stands, Days tells you how long it's been active, and Pipeline gives a quick applied/interview/stalled count — all color-coded by urgency.",
  },
  {
    targetSelector: '[data-tour-id="hl-dash-create-position-btn"]',
    title: "Open a new role",
    description: "This jumps you to your job list — actual position creation and planning happens together with your Recruitment Lead.",
  },
  {
    targetSelector: '[data-tour-id="hl-dash-upcoming-interviews"]',
    title: "What's scheduled",
    description: "Interviews coming up across your roles. Score opens a scorecard to review a completed interview — Prep isn't wired up yet.",
  },
];

export function HiringLeadCommandDashboard() {
  const navigate = useNavigate();
  const [scorecard, setScorecard] = React.useState<ScorecardCandidate | null>(null);
  const userName = localStorage.getItem('userName') ?? 'User';

  useScreenTour("hiring-lead", "dashboard", DASHBOARD_TOUR_STEPS);

  // Sort jobs by urgency: longest open first
  const sortedJobs = [...jobOpenings].sort((a, b) => b.daysOpen - a.daysOpen);

  // Most urgent: first (by days open) job that has stalled candidates
  const mostUrgentJobId = sortedJobs.find((j) => j.stalledCount > 0)?.id ?? null;

  // Dashboard summary — cap visible rows; full list lives at /hiring-lead/jobs
  const visibleJobs = sortedJobs.slice(0, 5);

  const openScorecard = (iv: typeof upcomingInterviews[number]) => {
    setScorecard({
      name: iv.candidate,
      initials: iv.candidate.split(' ').map((n) => n[0]).join(''),
      role: iv.role,
      round: roundLabel[iv.type] || iv.type,
      exp: iv.exp,
      statusLabel: 'In Interview',
      fitScore: iv.fitScore,
      aiSummary: iv.aiSummary,
    });
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header — greeting only, no sub-copy */}
      <div className="flex items-center gap-2.5">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {userName}</h1>
        <SampleDataBadge />
      </div>

      {/* KPI Strip — action-oriented metrics */}
      <KPIStrip stats={kpiStats} />

      {/* Job Openings */}
      <div className="space-y-3">
        {/* Section header — heading, View all, and Create New Position CTA together */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-foreground">Recent job openings</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/hiring-lead/jobs')}
              className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-0.5"
            >
              View all <ChevronRight className="h-3 w-3" />
            </button>
            <Button
              data-tour-id="hl-dash-create-position-btn"
              size="sm"
              className="h-auto px-4 py-2 text-xs rounded-lg gap-1.5 bg-primary text-white hover:opacity-90 transition-opacity"
              onClick={() => navigate('/hiring-lead/jobs')}
            >
              <Plus className="h-3.5 w-3.5" />
              Create new position
            </Button>
          </div>
        </div>

        <div data-tour-id="hl-dash-positions-table" className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Role</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Required Skills</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Pipeline</TableHead>
                <TableHead>Recruiter</TableHead>
                <TableHead>Interviewer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleJobs.map((job) => {
                const isStale = job.daysOpen >= 21;
                const isMostUrgent = job.id === mostUrgentJobId;
                const isDraft = job.status === 'Draft';

                // Days column: 3-tier scale, independent of row-level urgency tinting
                const daysColor = job.daysOpen >= 21 ? 'text-destructive' : job.daysOpen >= 14 ? 'text-warning' : 'text-foreground';

                return (
                  <TableRow
                    key={job.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/hiring-lead/jobs/${job.id}/pipeline`)}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/hiring-lead/jobs/${job.id}/pipeline`)}
                    className={`cursor-pointer outline-none transition-shadow duration-150 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset rounded-none ${
                      isMostUrgent
                        ? 'border-l-[3px] border-l-[#A32D2D] bg-[rgba(252,235,235,0.3)]'
                        : isStale
                        ? 'border-l-[3px] border-l-[#BA7517] bg-[rgba(252,239,215,0.15)]'
                        : ''
                    }`}
                  >
                    <TableCell className="font-medium text-foreground">
                      <div className="flex flex-col gap-0.5">
                        {job.jobRole}
                        {isMostUrgent && (
                          <span className="shrink-0 text-[9px] font-semibold text-[#A32D2D] uppercase tracking-wide whitespace-nowrap">
                            Needs attention
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{job.project}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[220px] truncate" title={job.requiredSkills}>
                      {job.requiredSkills}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {HL_PRIORITY_PILL[job.priority] && (
                          <span className={`inline-flex items-center text-[10px] font-semibold px-[9px] py-[3px] rounded-full border ${HL_PRIORITY_PILL[job.priority]}`}>
                            {job.priority}
                          </span>
                        )}
                        <span className={`inline-flex items-center text-[10px] font-semibold px-[9px] py-[3px] rounded-full border ${getJobStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={`font-medium whitespace-nowrap ${daysColor}`}>
                      {job.daysOpen}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {isDraft ? (
                        '—'
                      ) : (
                        <>
                          {job.totalCandidates} applied · {job.stages.interview} interview ·{' '}
                          <span className="font-semibold text-destructive">{job.stalledCount} stalled</span>
                        </>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{job.recruiter}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{job.interviewer}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Upcoming Interviews — full-width below jobs */}
      <Card data-tour-id="hl-dash-upcoming-interviews" className="bg-card border-[0.5px] border-border rounded-xl shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-semibold">Upcoming interviews</CardTitle>
            <span className="text-xs text-muted-foreground">next 7 days</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {upcomingInterviews.map((iv, i) => (
            <div
              key={i}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/30"
            >
              {/* Avatar */}
              <div className="w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">
                  {iv.candidate.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>

              {/* Candidate info */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{iv.candidate}</p>
                <p className="text-xs text-muted-foreground truncate">{iv.role}</p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <Badge variant="outline" className={`text-xs px-1.5 py-0 ${interviewTypeBadge[iv.type] || 'bg-muted text-muted-foreground'}`}>
                    {iv.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{iv.date} · {iv.time}</span>
                </div>
              </div>

              {/* Score (completed) vs Prep (upcoming) affordance */}
              {iv.action === 'Score' ? (
                <button
                  type="button"
                  onClick={() => openScorecard(iv)}
                  className="shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-md bg-[#EEEDFE] text-[#3C3489] border border-[#CECBF6] whitespace-nowrap"
                >
                  Score
                </button>
              ) : (
                <button
                  type="button"
                  className="shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-md bg-muted text-muted-foreground border border-border whitespace-nowrap"
                >
                  Prep
                </button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <HiringLeadScorecard
        open={scorecard !== null}
        onClose={() => setScorecard(null)}
        candidate={scorecard}
      />
    </div>
  );
}

export default HiringLeadCommandDashboard;
