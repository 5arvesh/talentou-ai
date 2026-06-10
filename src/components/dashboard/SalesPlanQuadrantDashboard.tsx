import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  'on-track': { label: 'On Track', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
  'at-risk':  { label: 'At Risk',  className: 'bg-amber-50 text-amber-700 border-amber-200' },
  'behind':   { label: 'Behind',   className: 'bg-red-50 text-red-700 border-red-200' },
};

const kpiStats = [
  { label: 'Total Open Positions', value: 24,     sub: '+3 this quarter',     subColor: 'text-green-600' },
  { label: 'Open > 3 Weeks',       value: 5,      sub: '+2 vs last month',    subColor: 'text-red-500' },
  { label: 'Avg Time-to-Close',    value: '4.2w', sub: 'âœ“ Below 5w target',   subColor: 'text-green-600' },
  { label: 'Advancement Rate',     value: '37%',  sub: 'âœ“ Above 30% target',  subColor: 'text-green-600' },
];

const SalesPlanQuadrantDashboard = () => {
  const navigate = useNavigate();
  const [selectedRecruiter, setSelectedRecruiter] = useState('all');

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pipeline Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Team recruiting activity at a glance</p>
        </div>
        <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
          <SelectTrigger className="w-[160px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Recruiters</SelectItem>
            {recruiters.map((r) => (
              <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-card overflow-hidden border border-border">
        {kpiStats.map((stat) => (
          <div key={stat.label} className="bg-card px-5 py-4 flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <span className="text-2xl font-bold text-foreground">{stat.value}</span>
            <span className={`text-xs font-medium ${stat.subColor}`}>{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Quadrant Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recruiter Performance */}
        <Card className="rounded-card border border-border shadow-card">
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
                        <span className={r.active >= r.max ? 'text-red-600 font-semibold' : ''}>{r.active}/{r.max}</span>
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
        <Card className="rounded-card border border-border shadow-card">
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
                    <Cell key={i} fill={['#0A92FE', '#f59e0b', 'hsl(var(--primary))', '#4EAD3B'][i]} />
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
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${isLong ? 'bg-red-50 border-red-200' : isMid ? 'bg-amber-50 border-amber-200' : 'bg-muted/40 border-transparent'}`}>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.recruiter}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    <Badge variant="outline" className={`text-xs ${item.priority === 'High' ? 'border-red-300 text-red-700' : item.priority === 'Medium' ? 'border-amber-300 text-amber-700' : 'border-gray-300 text-gray-600'}`}>
                      {item.priority}
                    </Badge>
                    <span className={`text-xs font-semibold ${isLong ? 'text-red-600' : isMid ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {item.daysOpen}d open
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Bottleneck Indicator â€” flags all stages â‰¥3 stalled */}
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
                  <div key={d.stage} className={`flex flex-col items-center p-3 rounded-card border-2 transition-all ${isBottleneck ? 'border-amber-400 bg-amber-50' : 'border-muted bg-muted/20'}`}>
                    <span className={`text-2xl font-bold ${isBottleneck ? 'text-amber-600' : 'text-foreground'}`}>{d.stalled}</span>
                    <span className="text-xs text-muted-foreground text-center mt-1 leading-tight">{d.stage}</span>
                    {isBottleneck && (
                      <span className="text-xs font-semibold text-amber-600 mt-1 flex items-center gap-0.5">
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
    </div>
  );
};

export default SalesPlanQuadrantDashboard;
