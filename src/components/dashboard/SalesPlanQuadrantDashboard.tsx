import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, Briefcase, Clock, BarChart2, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MetricCard = ({ title, value, change, target, icon: Icon, trend, gradient }: {
  title: string; value: string | number; change: string; target?: string;
  icon: React.ElementType; trend: 'up' | 'down'; gradient: string;
}) => (
  <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${gradient}`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
    <CardContent className="p-5 relative">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trend === 'up' ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
          {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {target && <p className="text-white/60 text-xs">{target}</p>}
      </div>
    </CardContent>
  </Card>
);

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
  'on-track': { label: 'On Track', className: 'bg-[#4EAD3B]/10 text-[#4EAD3B] border-[#4EAD3B]/20' },
  'at-risk': { label: 'At Risk', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  'behind': { label: 'Behind', className: 'bg-red-50 text-red-700 border-red-200' },
};

const SalesPlanQuadrantDashboard = () => {
  const navigate = useNavigate();
  const [selectedRecruiter, setSelectedRecruiter] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('thisquarter');

  const maxStalled = Math.max(...bottleneckData.map((d) => d.stalled));

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">TA Leader Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Recruiting operation health at a glance</p>
        </div>
        <div className="flex gap-3">
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
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisquarter">This Quarter</SelectItem>
              <SelectItem value="lastquarter">Last Quarter</SelectItem>
              <SelectItem value="thisyear">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Open Positions" value={24} change="+3 this quarter" icon={Briefcase} trend="up" gradient="bg-gradient-to-br from-blue-500 to-blue-600" />
        <MetricCard title="Open > 3 Weeks" value={5} change="+2 vs last month" icon={Timer} trend="down" gradient="bg-gradient-to-br from-amber-500 to-orange-600" />
        <MetricCard title="Avg Time-to-Close" value="4.2w" change="vs target 5w" target="✓ Below target" icon={Clock} trend="up" gradient="bg-gradient-to-br from-emerald-500 to-teal-600" />
        <MetricCard title="Advancement Rate" value="37%" change="vs target 30%" target="✓ Above target" icon={BarChart2} trend="up" gradient="bg-gradient-to-br from-violet-500 to-purple-600" />
      </div>

      {/* Quadrant Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recruiter Leaderboard */}
        <Card className="border-0 shadow-lg">
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
                    <TableRow
                      key={r.name}
                      className="cursor-pointer hover:bg-muted/40"
                      onClick={() => navigate('/sales-plan/dashboard/recruiter-metrics')}
                    >
                      <TableCell className="pl-6 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-[#7800D3]/70 to-[#7800D3] text-white">
                              {r.initials}
                            </AvatarFallback>
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
        <Card className="border-0 shadow-lg">
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
                    <Cell key={i} fill={['#0A92FE', '#f59e0b', '#7800D3', '#4EAD3B'][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Longest Open Positions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Longest Open Positions</CardTitle>
              <Badge variant="outline" className="text-xs bg-muted text-muted-foreground">{longRunningPositions.length} positions</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {longRunningPositions.map((item, i) => {
              const isLong = item.daysOpen >= 28;
              const isMid = item.daysOpen >= 21 && !isLong;
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

        {/* Bottleneck Indicator */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Bottleneck Indicator</CardTitle>
            <p className="text-xs text-muted-foreground">Candidates stalled &gt;5 days per stage</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {bottleneckData.map((d) => {
                const isBottleneck = d.stalled === maxStalled && d.stalled > 0;
                return (
                  <div key={d.stage} className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${isBottleneck ? 'border-amber-400 bg-amber-50' : 'border-muted bg-muted/20'}`}>
                    <span className={`text-2xl font-bold ${isBottleneck ? 'text-amber-600' : 'text-foreground'}`}>{d.stalled}</span>
                    <span className="text-[10px] text-muted-foreground text-center mt-1 leading-tight">{d.stage}</span>
                    {isBottleneck && <span className="text-[10px] font-semibold text-amber-600 mt-1">⚠ Bottleneck</span>}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Review candidates who have had no status change in over 5 days.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesPlanQuadrantDashboard;
