import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Target, Calendar, PhoneCall, MessageSquare, Award } from 'lucide-react';

const TALeaderDashboard = () => {
  const [selectedRecruiter, setSelectedRecruiter] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("thisweek");

  const recruiters = [
    { id: "all", name: "All Recruiters" },
    { id: "john", name: "John Doe" },
    { id: "sarah", name: "Sarah Chen" },
    { id: "mike", name: "Mike Johnson" },
    { id: "lisa", name: "Lisa Wang" },
  ];

  const timeframes = [
    { id: "today", name: "Today" },
    { id: "thisweek", name: "This Week" },
    { id: "lastweek", name: "Last Week" },
    { id: "thismonth", name: "This Month" },
    { id: "custom", name: "Custom Range" },
  ];

  const MetricCard = ({ title, value, change, changeLabel, icon: Icon, trend }: {
    title: string;
    value: string | number;
    change: string;
    changeLabel: string;
    icon: any;
    trend: 'up' | 'down';
  }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {change}
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{changeLabel}</p>
        </div>
      </CardContent>
    </Card>
  );

  const FunnelChart = () => {
    const funnelData = [
      { 
        stage: "Sourced & Applied", 
        count: 1359, 
        sourcedCount: 850,
        appliedCount: 509,
        color: "bg-blue-200",
        isSplit: true
      },
      { stage: "Interview Scheduled", count: 355, color: "bg-orange-200" },
      { stage: "Review", count: 766, color: "bg-purple-200" },
      { stage: "Offered", count: 24, color: "bg-yellow-200" },
      { stage: "Accepted", count: 24, color: "bg-green-200" },
      { stage: "Hired", count: 20, color: "bg-indigo-200" },
      { stage: "Rejected", count: 947, color: "bg-red-200" },
    ];

    const splitLegendData = [
      { label: "Sourced", count: 850, color: "bg-blue-300" },
      { label: "Applied", count: 509, color: "bg-blue-500" },
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recruitment Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex">
            {/* Funnel visualization */}
            <div className="flex-1">
              <div className="space-y-2">
                {funnelData.map((item, index) => (
                  <div
                    key={item.stage}
                    className="relative"
                    style={{
                      width: `${100 - index * 8}%`,
                      marginLeft: `${index * 4}%`,
                    }}
                  >
                    {item.isSplit ? (
                      <div className="flex text-center text-sm font-medium">
                        <div 
                          className="bg-blue-300 px-3 py-2 flex items-center justify-center"
                          style={{ width: `${(item.sourcedCount / item.count) * 100}%` }}
                        >
                          {item.sourcedCount?.toLocaleString()}
                        </div>
                        <div 
                          className="bg-blue-500 px-3 py-2 flex items-center justify-center text-white"
                          style={{ width: `${(item.appliedCount / item.count) * 100}%` }}
                        >
                          {item.appliedCount?.toLocaleString()}
                        </div>
                      </div>
                    ) : (
                      <div className={`${item.color} px-3 py-2 text-center text-sm font-medium`}>
                        {item.count.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Legend */}
            <div className="ml-4 space-y-2">
              {funnelData.map((item) => (
                <div key={item.stage}>
                  {item.isSplit ? (
                    <div className="space-y-1">
                      <div className="flex items-center text-sm font-medium">
                        <span>{item.stage}</span>
                      </div>
                      {splitLegendData.map((split) => (
                        <div key={split.label} className="flex items-center text-xs">
                          <div className={`w-3 h-3 ${split.color} mr-2 rounded-sm`}></div>
                          <span>{split.label} ({split.count.toLocaleString()})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center text-sm">
                      <div className={`w-3 h-3 ${item.color} mr-2 rounded-sm`}></div>
                      <span>{item.stage}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Sample data for charts
  const hiringVelocityData = [
    { month: 'Jan', percentage: 65 },
    { month: 'Feb', percentage: 72 },
    { month: 'Mar', percentage: 68 },
    { month: 'Apr', percentage: 75 },
    { month: 'May', percentage: 80 },
    { month: 'Jun', percentage: 85 },
  ];

  const hiringEfficiencyData = [
    { month: 'Jan', percentage: 58 },
    { month: 'Feb', percentage: 63 },
    { month: 'Mar', percentage: 70 },
    { month: 'Apr', percentage: 67 },
    { month: 'May', percentage: 74 },
    { month: 'Jun', percentage: 78 },
  ];

  const HiringVelocityChart = () => (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Hiring Velocity</CardTitle>
        <p className="text-sm text-muted-foreground">% of positions closed out of total open positions</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            velocity: {
              label: "Velocity %",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[200px]"
        >
          <LineChart data={hiringVelocityData}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="percentage" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );

  const HiringEfficiencyChart = () => (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Hiring Efficiency</CardTitle>
        <p className="text-sm text-muted-foreground">% of positions closed on time out of total closed positions</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            efficiency: {
              label: "Efficiency %",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px]"
        >
          <LineChart data={hiringEfficiencyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="percentage" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">TA Leader Dashboard</h1>
          <p className="text-muted-foreground">Monitor recruitment performance and team metrics</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select recruiter" />
            </SelectTrigger>
            <SelectContent>
              {recruiters.map((recruiter) => (
                <SelectItem key={recruiter.id} value={recruiter.id}>
                  {recruiter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe.id} value={timeframe.id}>
                  {timeframe.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">Database Status</h2>
          <MetricCard
            title="Number of Candidates added"
            value={168}
            change="15%"
            changeLabel="Compared to last week"
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="Number of Positions filled"
            value={248}
            change="4%"
            changeLabel="Compared to last week"
            icon={Award}
            trend="up"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">Performance</h2>
          <MetricCard
            title="Average time to close a position (in weeks)"
            value={3}
            change="28%"
            changeLabel="Compared to last week"
            icon={Target}
            trend="up"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HiringVelocityChart />
        <HiringEfficiencyChart />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunnelChart />
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                    JD
                  </div>
                  <span className="font-medium">John Doe</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">23 Placements</div>
                  <div className="text-sm text-muted-foreground">This month</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-medium">
                    SC
                  </div>
                  <span className="font-medium">Sarah Chen</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">19 Placements</div>
                  <div className="text-sm text-muted-foreground">This month</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-sm font-medium">
                    MJ
                  </div>
                  <span className="font-medium">Mike Johnson</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">15 Placements</div>
                  <div className="text-sm text-muted-foreground">This month</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TALeaderDashboard;