import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ReferenceLine } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, CheckCircle2, XCircle, AlertTriangle, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KPIStrip } from "@/components/shared/KPIStrip";
import { cn } from "@/lib/utils";
import { getRoleFitColor } from "@/components/shared/ModernCandidateList";
import { getInitials, getAvatarSolidColor } from "@/lib/avatar";
import { SampleDataBadge } from "@/components/dashboard/SampleDataBadge";
import { useScreenTour } from "@/hooks/useScreenTour";
import { TourStep } from "@/store/tour-store";
import { RECRUITER_TOUR_SCREEN_SEQUENCE } from "@/constants/tourScreens";

const assignedRoles = [
  { id: 1, title: 'Senior React Developer', priority: 'High',   daysLeft: 8,  pipeline: { applied: 4, shortlisted: 2, interview: 1 }, topCandidateFit: 88, topMatch: { name: 'Arun Sharma',  skills: 'React · TypeScript', exp: '6y', stage: 'Interview' },   stalled: { count: 1, stage: 'Shortlisted', days: 12 } },
  { id: 2, title: 'Product Manager',        priority: 'Medium', daysLeft: 22, pipeline: { applied: 3, shortlisted: 1, interview: 0 }, topCandidateFit: 64, topMatch: { name: 'Sneha Patel',  skills: 'Roadmapping · SQL',  exp: '4y', stage: 'Shortlisted' }, stalled: null },
  { id: 3, title: 'Data Scientist',         priority: 'High',   daysLeft: 5,  pipeline: { applied: 2, shortlisted: 3, interview: 2 }, topCandidateFit: 92, topMatch: { name: 'Priya Nair',   skills: 'ML · Python',       exp: '5y', stage: 'Interview' },   stalled: null },
  { id: 4, title: 'DevOps Engineer',        priority: 'Low',    daysLeft: 35, pipeline: { applied: 5, shortlisted: 0, interview: 0 }, topCandidateFit: 45, topMatch: { name: 'Kiran Reddy',  skills: 'K8s · Terraform',    exp: '5y', stage: 'Applied' },      stalled: { count: 2, stage: 'Applied', days: 14 } },
];

const stalledRoles = assignedRoles.filter((r) => r.stalled);
const stalledTotal = stalledRoles.reduce((sum, r) => sum + (r.stalled?.count ?? 0), 0);

const performanceMetrics = [
  { label: 'Time-to-First-Outreach',    target: '2d',  mine: '1.5d', passing: true },
  { label: 'Weekly Sourcing Activity',  target: '10',  mine: '8',    passing: false },
  { label: 'Interview Advancement Rate', target: '30%', mine: '42%',  passing: true },
  { label: 'JD Quality Score',          target: '70%', mine: '85%',  passing: true },
];

const weeklyActivity = [
  { day: 'Mon', contacted: 3 },
  { day: 'Tue', contacted: 6 },
  { day: 'Wed', contacted: 2 },
  { day: 'Thu', contacted: 4 },
  { day: 'Fri', contacted: 5 },
];

const priorityConfig: Record<string, { label: string; className: string }> = {
  High:   { label: 'High',   className: 'bg-red-50 text-red-700 border-red-200' },
  Medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  Low:    { label: 'Low',    className: 'bg-green-50 text-green-600 border-green-200' },
};

const kpiStats = [
  { label: 'Active Roles',        value: 4,      sub: 'Assigned to you',     subColor: 'text-muted-foreground', id: 'kpi-active-roles' },
  { label: 'Closed This Month',   value: 2,      sub: 'vs last month',     subColor: 'text-green-600', icon: TrendingUp, id: 'kpi-closed-this-month' },
  { label: 'Avg Time-to-Close',   value: '3.8w', sub: 'Below 5w target',   subColor: 'text-green-600', icon: CheckCircle2, id: 'kpi-avg-time-to-close' },
  { label: 'Advancement Rate',    value: '42%',  sub: 'Above 30% target',  subColor: 'text-green-600', icon: CheckCircle2, id: 'kpi-advancement-rate' },
];

const DASHBOARD_TOUR_STEPS: TourStep[] = [
  {
    variant: 'intro',
    icon: LayoutDashboard,
    screenSequence: RECRUITER_TOUR_SCREEN_SEQUENCE,
    screenKey: 'dashboard',
    title: "Your daily workbench",
    description: "This dashboard shows your assigned roles, how your candidates are progressing, and where things need attention today. Everything here is scoped to your workload — not the whole team's.",
  },
  {
    variant: 'intro',
    icon: LayoutDashboard,
    screenSequence: RECRUITER_TOUR_SCREEN_SEQUENCE,
    screenKey: 'dashboard',
    title: "Watch for alerts",
    description: "Stalled candidates and missed targets show up front. If something's amber or red, that's where to start.",
  },
  {
    targetSelector: '[data-tour-id="recruiter-dash-kpi-row"]',
    title: "Your numbers",
    description: "Active Roles, Closed This Month, Avg Time-to-Close, and Advancement Rate. These update as you work.",
  },
  {
    targetSelector: '[data-tour-id="recruiter-dash-stalled-alert"]',
    title: "Stalled candidates",
    description: "This amber bar appears when any candidate has been sitting in the same stage for 10+ days. It's not a failure — it's a prompt to check in or move them forward.",
  },
  {
    targetSelector: '[data-tour-id="recruiter-dash-role-cards"]',
    title: "Your open roles",
    description: "Each card shows the role, its pipeline breakdown, and the top-matched candidate (name + fit score). Click to open the full candidate list for that role.",
  },
  {
    targetSelector: '[data-tour-id="recruiter-dash-performance"]',
    title: "How you're tracking",
    description: "Pass/fail markers against your sourcing and close-time targets. Green is on track, red needs attention.",
  },
];

const TAAssociateDashboard = () => {
  const navigate = useNavigate();
  const dailyTarget = 2;

  useScreenTour("recruiter", "dashboard", DASHBOARD_TOUR_STEPS);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold text-foreground">Your Active Roles</h1>
          <SampleDataBadge />
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">Performance and workload this week</p>
      </div>

      {/* Stalled-candidate alert */}
      {stalledTotal > 0 && (
        <div data-tour-id="recruiter-dash-stalled-alert" className="flex items-start gap-3 rounded-card bg-warning/10 border-[1.5px] border-warning/40 p-4">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">
              {stalledTotal} candidate{stalledTotal === 1 ? ' has' : 's have'} been in the same stage for 10+ days
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Across {stalledRoles.map((r) => r.title).join(', ')}. Re-engage or move them forward to keep pipelines healthy.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs text-warning border-warning/40 hover:bg-warning/10 shrink-0"
            onClick={() => navigate('/ta-associate/candidates?filter=stalled')}
          >
            Review stalled
          </Button>
        </div>
      )}

      {/* KPI Strip */}
      <div data-tour-id="recruiter-dash-kpi-row">
        <KPIStrip stats={kpiStats} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* My Assigned Roles */}
        <div data-tour-id="recruiter-dash-role-cards" className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-foreground px-1">My Assigned Roles</h2>
          {assignedRoles.map((role) => {
            const pCfg = priorityConfig[role.priority];
            const isUrgent = role.daysLeft <= 7;
            const total = role.pipeline.applied + role.pipeline.shortlisted + role.pipeline.interview;
            return (
              <Card key={role.id} className={cn("border shadow-sm hover:shadow-md transition-all", role.stalled ? "border-warning/40" : "border-border")}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold truncate">{role.title}</p>
                        <Badge variant="outline" className={`text-xs shrink-0 ${pCfg.className}`}>{pCfg.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {role.pipeline.applied} Applied · {role.pipeline.shortlisted} Shortlisted · {role.pipeline.interview} Interview
                        <span className="ml-2 text-foreground font-medium">({total} total)</span>
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className={`text-sm font-bold ${isUrgent ? 'text-red-600' : 'text-foreground'}`}>{role.daysLeft}d left</p>
                      <p className="text-xs text-muted-foreground">to close</p>
                    </div>
                  </div>

                  {/* Top-match candidate */}
                  <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-muted/40 p-2.5">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", getAvatarSolidColor(role.topMatch.name))}>
                      <span className="text-xs font-bold text-white">{getInitials(role.topMatch.name)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {role.topMatch.name} <span className="font-normal text-muted-foreground">· top match</span>
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{role.topMatch.skills} · {role.topMatch.exp} · {role.topMatch.stage}</p>
                    </div>
                    <span className={cn("text-sm font-bold shrink-0", getRoleFitColor(role.topCandidateFit))}>{role.topCandidateFit}%</span>
                  </div>

                  {role.stalled && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-warning">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      {role.stalled.count} candidate{role.stalled.count === 1 ? '' : 's'} stalled in {role.stalled.stage} for {role.stalled.days} days
                    </p>
                  )}

                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs text-primary border-primary/30 hover:bg-primary/5"
                      onClick={() => navigate(`/ta-associate/candidates?role=${role.id}`)}
                    >
                      View Candidates <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Performance vs Targets */}
          <Card data-tour-id="recruiter-dash-performance" className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Performance vs Targets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {performanceMetrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">{m.label}</p>
                    <p className="text-xs text-muted-foreground">Target: {m.target}</p>
                  </div>
                  {m.passing ? (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs font-semibold">{m.mine}</span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 shrink-0 rounded-full bg-destructive/10 text-destructive px-2 py-0.5">
                      <span className="text-xs font-semibold">{m.mine}</span>
                      <XCircle className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Activity Chart */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Weekly Activity</CardTitle>
              <p className="text-xs text-muted-foreground">Candidates contacted per day (target: {dailyTarget}/day)</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ contacted: { label: 'Contacted', color: 'hsl(var(--primary))' } }} className="h-[140px]">
                <BarChart data={weeklyActivity} barSize={24}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={20} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ReferenceLine y={dailyTarget} stroke="hsl(var(--success))" strokeDasharray="4 2" strokeWidth={1.5} label={{ value: 'target', position: 'insideTopRight', fontSize: 9, fill: 'hsl(var(--success))' }} />
                  <Bar dataKey="contacted" fill="hsl(var(--primary))" radius={3} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TAAssociateDashboard;
