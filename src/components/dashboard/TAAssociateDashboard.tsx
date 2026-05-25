import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ReferenceLine } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const assignedRoles = [
  { id: 1, title: 'Senior React Developer', priority: 'High',   daysLeft: 8,  pipeline: { applied: 4, shortlisted: 2, interview: 1 } },
  { id: 2, title: 'Product Manager',        priority: 'Medium', daysLeft: 22, pipeline: { applied: 3, shortlisted: 1, interview: 0 } },
  { id: 3, title: 'Data Scientist',         priority: 'High',   daysLeft: 5,  pipeline: { applied: 2, shortlisted: 3, interview: 2 } },
  { id: 4, title: 'DevOps Engineer',        priority: 'Low',    daysLeft: 35, pipeline: { applied: 5, shortlisted: 0, interview: 0 } },
];

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
  Low:    { label: 'Low',    className: 'bg-green-50 text-[#4EAD3B] border-green-200' },
};

const kpiStats = [
  { label: 'Active Roles',        value: 4,      sub: 'Assigned to you',     subColor: 'text-muted-foreground' },
  { label: 'Closed This Month',   value: 2,      sub: '↑ vs last month',     subColor: 'text-[#4EAD3B]' },
  { label: 'Avg Time-to-Close',   value: '3.8w', sub: '✓ Below 5w target',   subColor: 'text-[#4EAD3B]' },
  { label: 'Advancement Rate',    value: '42%',  sub: '✓ Above 30% target',  subColor: 'text-[#4EAD3B]' },
];

const TAAssociateDashboard = () => {
  const navigate = useNavigate();
  const dailyTarget = 2;

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Your Active Roles</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Performance and workload this week</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
        {kpiStats.map((stat) => (
          <div key={stat.label} className="bg-card px-5 py-4 flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <span className="text-2xl font-bold text-foreground">{stat.value}</span>
            <span className={`text-xs font-medium ${stat.subColor}`}>{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* My Assigned Roles */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-foreground px-1">My Assigned Roles</h2>
          {assignedRoles.map((role) => {
            const pCfg = priorityConfig[role.priority];
            const isUrgent = role.daysLeft <= 7;
            const total = role.pipeline.applied + role.pipeline.shortlisted + role.pipeline.interview;
            return (
              <Card key={role.id} className="border border-border shadow-sm hover:shadow-md transition-all">
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
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs text-[#7800D3] border-[#7800D3]/30 hover:bg-[#7800D3]/5"
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
          <Card className="border border-border shadow-sm">
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
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs font-semibold">{m.mine}</span>
                    <span className={`text-sm ${m.passing ? 'text-[#4EAD3B]' : 'text-red-500'}`}>{m.passing ? '✓' : '✗'}</span>
                  </div>
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
