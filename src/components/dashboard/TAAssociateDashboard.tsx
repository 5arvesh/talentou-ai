import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Briefcase, CheckCircle2, Clock, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MetricCard = ({ title, value, sub, icon: Icon, trend, gradient }: {
  title: string; value: string | number; sub?: string;
  icon: React.ElementType; trend: 'up' | 'down'; gradient: string;
}) => (
  <Card className={`relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${gradient}`}>
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
    <CardContent className="p-4 relative">
      <div className="flex items-start justify-between mb-2">
        <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium ${trend === 'up' ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
          {trend === 'up' ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
        </div>
      </div>
      <p className="text-white/80 text-xs font-medium">{title}</p>
      <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
      {sub && <p className="text-white/60 text-xs mt-0.5">{sub}</p>}
    </CardContent>
  </Card>
);

const assignedRoles = [
  { id: 1, title: 'Senior React Developer', priority: 'High', daysLeft: 8, pipeline: { applied: 4, shortlisted: 2, interview: 1 } },
  { id: 2, title: 'Product Manager', priority: 'Medium', daysLeft: 22, pipeline: { applied: 3, shortlisted: 1, interview: 0 } },
  { id: 3, title: 'Data Scientist', priority: 'High', daysLeft: 5, pipeline: { applied: 2, shortlisted: 3, interview: 2 } },
  { id: 4, title: 'DevOps Engineer', priority: 'Low', daysLeft: 35, pipeline: { applied: 5, shortlisted: 0, interview: 0 } },
];

const performanceMetrics = [
  { label: 'Time-to-First-Outreach', target: '2d', mine: '1.5d', passing: true },
  { label: 'Weekly Sourcing Activity', target: '10', mine: '8', passing: false },
  { label: 'Interview Advancement Rate', target: '30%', mine: '42%', passing: true },
  { label: 'JD Quality Score', target: '70%', mine: '85%', passing: true },
];

const weeklyActivity = [
  { day: 'Mon', contacted: 3 },
  { day: 'Tue', contacted: 6 },
  { day: 'Wed', contacted: 2 },
  { day: 'Thu', contacted: 4 },
  { day: 'Fri', contacted: 5 },
];

const priorityConfig: Record<string, { label: string; className: string }> = {
  High: { label: 'High', className: 'bg-red-50 text-red-700 border-red-200' },
  Medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  Low: { label: 'Low', className: 'bg-green-50 text-[#4EAD3B] border-green-200' },
};

const TAAssociateDashboard = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('thisquarter');
  const dailyTarget = 2; // weeklyTarget(10) / 5

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Your recruiting performance & workload</p>
        </div>
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

      {/* KPI Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="My Active Roles" value={4} icon={Briefcase} trend="up" gradient="bg-gradient-to-br from-blue-500 to-blue-600" />
        <MetricCard title="Closed This Month" value={2} icon={CheckCircle2} trend="up" gradient="bg-gradient-to-br from-emerald-500 to-teal-600" />
        <MetricCard title="Avg Time-to-Close" value="3.8w" sub="Target: 5w ✓" icon={Clock} trend="up" gradient="bg-gradient-to-br from-violet-500 to-purple-600" />
        <MetricCard title="Advancement Rate" value="42%" sub="Target: 30% ✓" icon={Star} trend="up" gradient="bg-gradient-to-br from-amber-500 to-orange-600" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* My Assigned Roles — 60% */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-foreground px-1">My Assigned Roles</h2>
          {assignedRoles.map((role) => {
            const pCfg = priorityConfig[role.priority];
            const isUrgent = role.daysLeft <= 7;
            const total = role.pipeline.applied + role.pipeline.shortlisted + role.pipeline.interview;
            return (
              <Card key={role.id} className="border-0 shadow-sm hover:shadow-md transition-all">
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
                      <p className="text-[10px] text-muted-foreground">to close</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs text-[#7800D3] border-[#7800D3]/30 hover:bg-[#7800D3]/5"
                      onClick={() => navigate('/ta-associate/candidates')}
                    >
                      View Candidates <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Right column — 40% */}
        <div className="lg:col-span-2 space-y-4">
          {/* Performance vs Targets */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Performance vs Targets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {performanceMetrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">{m.label}</p>
                    <p className="text-[10px] text-muted-foreground">Target: {m.target}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs font-semibold">{m.mine}</span>
                    <span className={`text-sm ${m.passing ? 'text-[#4EAD3B]' : 'text-red-500'}`}>{m.passing ? '✓' : '✗'}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Activity Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Weekly Activity</CardTitle>
              <p className="text-[10px] text-muted-foreground">Candidates contacted per day (target: {dailyTarget}/day)</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ contacted: { label: 'Contacted', color: '#7800D3' } }} className="h-[140px]">
                <BarChart data={weeklyActivity} barSize={24}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={20} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ReferenceLine y={dailyTarget} stroke="#4EAD3B" strokeDasharray="4 2" strokeWidth={1.5} label={{ value: 'target', position: 'insideTopRight', fontSize: 9, fill: '#4EAD3B' }} />
                  <Bar dataKey="contacted" fill="#7800D3" radius={3} />
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
