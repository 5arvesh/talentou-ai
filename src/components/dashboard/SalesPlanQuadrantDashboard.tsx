import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Timer, TrendingUp, CheckCircle2, Info, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KPIStrip } from "@/components/shared/KPIStrip";
import { SampleDataBadge } from "@/components/dashboard/SampleDataBadge";
import { useScreenTour } from "@/hooks/useScreenTour";
import { TourStep } from "@/store/tour-store";
import { RL_TOUR_SCREEN_SEQUENCE } from "@/constants/tourScreens";

const recruiters = [
  { name: 'Sarah Chen', initials: 'SC', active: 4, max: 5, closed: 3, avgClose: '3.8w', status: 'on-track' },
  { name: 'John Doe', initials: 'JD', active: 5, max: 5, closed: 2, avgClose: '5.2w', status: 'at-risk' },
  { name: 'Mike Johnson', initials: 'MJ', active: 3, max: 5, closed: 4, avgClose: '4.1w', status: 'on-track' },
  { name: 'Lisa Wang', initials: 'LW', active: 5, max: 5, closed: 1, avgClose: '7.0w', status: 'behind' },
  { name: 'Emma Rodriguez', initials: 'ER', active: 2, max: 5, closed: 5, avgClose: '3.2w', status: 'on-track' },
];

const pipelineData = [
  { stage: 'Applied',     count: 18 },
  { stage: 'Shortlisted', count: 12 },
  { stage: 'Interview',   count: 9  },
  { stage: 'Offered',     count: 4  },
];

const longRunningPositions = [
  { title: 'Senior Backend Developer', recruiter: 'Lisa Wang', priority: 'High', daysOpen: 28 },
  { title: 'Data Scientist', recruiter: 'John Doe', priority: 'High', daysOpen: 26 },
  { title: 'UX Designer', recruiter: 'John Doe', priority: 'Medium', daysOpen: 19 },
  { title: 'DevOps Engineer', recruiter: 'Lisa Wang', priority: 'Low', daysOpen: 17 },
];

const bottleneckData = [
  { stage: 'Applied',     stalled: 3 },
  { stage: 'Shortlisted', stalled: 7 },
  { stage: 'Interview',   stalled: 2 },
  { stage: 'Offered',     stalled: 0 },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  'on-track': { label: 'On Track', className: 'bg-success/10 text-success border-success/20' },
  'at-risk':  { label: 'At Risk',  className: 'bg-warning/10 text-warning border-warning/20' },
  'behind':   { label: 'Behind',   className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

const kpiStats = [
  { label: 'Total Open Positions', value: 24,     sub: '+3 this quarter',    subColor: 'text-success', icon: TrendingUp },
  { label: 'Open > 3 Weeks',       value: 5,      sub: '+2 vs last month',   subColor: 'text-destructive', icon: TrendingUp },
  { label: 'Avg Time-to-Close',    value: '4.2w', sub: 'Below 5w target',    subColor: 'text-success', icon: CheckCircle2 },
  { label: 'Advancement Rate',     value: '37%',  sub: 'Above 30% target',   subColor: 'text-success', icon: CheckCircle2 },
  { label: 'Offer Acceptance Rate', value: '83%', sub: 'Above 75% target',   subColor: 'text-success', icon: CheckCircle2, id: 'kpi-offer-acceptance' },
];

const RL_DASHBOARD_TOUR_STEPS: TourStep[] = [
  {
    variant: 'intro',
    icon: LayoutDashboard,
    screenSequence: RL_TOUR_SCREEN_SEQUENCE,
    screenKey: 'dashboard',
    title: "Welcome to your Recruitment Dashboard",
    description: "Get a complete view of your team's hiring performance, open positions, and recruitment progress from one place.",
  },
  {
    targetSelector: '[data-tour-id="rl-dash-recruiter-filter"]',
    title: "Focus on any recruiter's performance",
    description: "When this is live, you'll be able to drill into one recruiter's roles and performance — for now it shows the full team view.",
  },
  {
    targetSelector: '[data-tour-id="rl-dash-kpi-row"]',
    title: "Hiring performance at a glance",
    description: "Track open positions, ageing roles, time-to-close, candidate advancement, and offer acceptance. Green means you're on track, while red highlights areas that need attention.",
  },
  {
    targetSelector: '[data-tour-id="rl-dash-recruiter-performance"]',
    title: "See how each recruiter is performing",
    description: "Compare recruiter workload, closures, and average closing time to quickly identify who's on track and where support may be needed.",
  },
  {
    targetSelector: '[data-tour-id="rl-dash-pipeline-health"]',
    title: "Track progress against hiring targets",
    description: "See how your team's hiring outcomes compare against targets and quickly spot areas falling behind.",
    completionTitle: "You're all set",
    completionDescription: "You now have everything you need to monitor recruitment performance and keep your hiring team on track.",
  },
];

const sourceOfHireData = [
  { source: 'Referral',        count: 9 },
  { source: 'LinkedIn',        count: 7 },
  { source: 'Job Boards',      count: 5 },
  { source: 'Career Site',     count: 3 },
  { source: 'Direct Sourcing', count: 2 },
];

// Purple → blue token ramp, strongest channel first
const SOURCE_OF_HIRE_FILLS = ['bg-primary', 'bg-primary/70', 'bg-info', 'bg-info/70', 'bg-info/40'];

const SalesPlanQuadrantDashboard = () => {
  const navigate = useNavigate();
  const [selectedRecruiter, setSelectedRecruiter] = useState('all');
  const totalHires = sourceOfHireData.reduce((sum, s) => sum + s.count, 0);

  useScreenTour("ta-leader", "dashboard", RL_DASHBOARD_TOUR_STEPS);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-foreground">Pipeline Overview</h1>
            <SampleDataBadge />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">Team recruiting activity at a glance</p>
        </div>
        {/* Per-recruiter filter not yet wired to API — shown disabled */}
        <div data-tour-id="rl-dash-recruiter-filter" className="flex items-center gap-2">
          <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter} disabled>
            <SelectTrigger className="w-[160px] h-9 opacity-70 cursor-not-allowed">
              <SelectValue placeholder="All Recruiters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Recruiters</SelectItem>
              {recruiters.map((r) => (
                <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-border shrink-0">Coming soon</Badge>
        </div>
      </div>

      {/* KPI Strip */}
      <div data-tour-id="rl-dash-kpi-row">
        <KPIStrip stats={kpiStats} cols={5} />
      </div>

      {/* Quadrant Grid */}
      <div data-tour-id="rl-dash-quadrant-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recruiter Performance */}
        <Card data-tour-id="rl-dash-recruiter-performance" className="rounded-card border border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recruiter Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6 text-xs">Recruiter</TableHead>
                  <TableHead className="text-xs text-center">Active</TableHead>
                  <TableHead className="text-xs text-center">Closed</TableHead>
                  <TableHead className="text-xs text-center">Avg Close</TableHead>
                  <TableHead className="pr-6 text-xs text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recruiters.map((r) => {
                  const cfg = statusConfig[r.status];
                  return (
                    <TableRow key={r.name} className="cursor-pointer hover:bg-muted/40" onClick={() => navigate('/sales-plan/dashboard/recruiter-metrics')}>
                      <TableCell className="pl-6 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs bg-primary text-white">{r.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{r.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        <span className={r.active >= r.max ? 'text-destructive font-semibold' : ''}>{r.active}/{r.max}</span>
                      </TableCell>
                      <TableCell className="text-center text-sm">{r.closed}</TableCell>
                      <TableCell className="text-center text-sm">{r.avgClose}</TableCell>
                      <TableCell className="pr-6 text-right">
                        <Badge variant="outline" className={`text-xs ${cfg.className}`}>{cfg.label}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pipeline Health */}
        <Card data-tour-id="rl-dash-pipeline-health" className="rounded-card border border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Pipeline Health</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ count: { label: 'Candidates', color: 'hsl(var(--chart-1))' } }} className="h-[220px]">
              <BarChart data={pipelineData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="stage" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={4}>
                  {pipelineData.map((_, i) => (
                    <Cell key={i} fill={['hsl(var(--info))', 'hsl(var(--warning))', 'hsl(var(--primary))', 'hsl(var(--success))'][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Longest Open Positions */}
        <Card className="rounded-card border border-border shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Longest Open Positions</CardTitle>
              <Badge variant="outline" className="text-xs bg-muted text-muted-foreground">{longRunningPositions.length} positions</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {longRunningPositions.map((item, i) => {
              const isLong = item.daysOpen >= 28;
              const isMid  = item.daysOpen >= 21 && !isLong;
              return (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${isLong ? 'bg-destructive/5 border-destructive/20' : isMid ? 'bg-warning/10 border-warning/20' : 'bg-muted/40 border-transparent'}`}>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.recruiter}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    <Badge variant="outline" className={`text-xs ${item.priority === 'High' ? 'border-destructive/30 text-destructive' : item.priority === 'Medium' ? 'border-warning/40 text-warning' : 'border-muted-foreground/30 text-muted-foreground'}`}>
                      {item.priority}
                    </Badge>
                    <span className={`text-xs font-semibold ${isLong ? 'text-destructive' : isMid ? 'text-warning' : 'text-muted-foreground'}`}>
                      {item.daysOpen}d open
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Bottleneck Indicator — flags all stages ≥3 stalled */}
        <Card className="rounded-card border border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Bottleneck Indicator</CardTitle>
            <p className="text-xs text-muted-foreground">Candidates stalled &gt;5 days per stage</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {bottleneckData.map((d) => {
                const isBottleneck = d.stalled >= 3;
                return (
                  <div key={d.stage} className={`flex flex-col items-center p-3 rounded-card border-2 transition-all ${isBottleneck ? 'border-warning/40 bg-warning/10' : 'border-muted bg-muted/20'}`}>
                    <span className={`text-2xl font-bold ${isBottleneck ? 'text-warning' : 'text-foreground'}`}>{d.stalled}</span>
                    <span className="text-xs text-muted-foreground text-center mt-1 leading-tight">{d.stage}</span>
                    {isBottleneck && (
                      <span className="text-xs font-semibold text-warning mt-1 flex items-center gap-0.5">
                        <Timer className="h-3 w-3" /> Stalled
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              All stages with 3 or more candidates stalled over 5 days are flagged.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Source of Hire */}
      <Card data-tour-id="rl-dash-source-of-hire" className="rounded-card border border-border shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Source of Hire</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Where your hires came from · last 90 days</p>
            </div>
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20 shrink-0">
              {totalHires} hires
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sourceOfHireData.map((s, i) => {
              const share = Math.round((s.count / totalHires) * 100);
              return (
                <div key={s.source} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-xs font-medium text-foreground truncate">{s.source}</span>
                  <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-muted">
                    <div
                      className={`flex h-full items-center rounded-md ${SOURCE_OF_HIRE_FILLS[i]} transition-all`}
                      style={{ width: `${share}%` }}
                    >
                      <span className="pl-2 text-[11px] font-semibold text-white">{share}%</span>
                    </div>
                  </div>
                  <span className="w-6 shrink-0 text-right text-xs font-semibold text-foreground tabular-nums">{s.count}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-start gap-1.5 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>Requires a candidate <span className="font-medium text-foreground">source</span> captured at creation. Channels without a source are excluded.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPlanQuadrantDashboard;
