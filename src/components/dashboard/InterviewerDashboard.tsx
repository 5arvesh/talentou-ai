import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts';
import { Eye, FileText, TrendingUp, TrendingDown, ClipboardCheck, UserCheck, Users, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export function InterviewerDashboard() {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState("thisweek");

  const timeframes = [
    { id: "today", name: "Today" },
    { id: "thisweek", name: "This Week" },
    { id: "lastweek", name: "Last Week" },
    { id: "thismonth", name: "This Month" },
    { id: "custom", name: "Custom Range" },
  ];

  const getReviewTrendData = () => {
    switch (selectedTimeframe) {
      case "today":
        return [
          { period: '9 AM', pending: 2, completed: 3 },
          { period: '11 AM', pending: 3, completed: 4 },
          { period: '1 PM', pending: 2, completed: 5 },
          { period: '3 PM', pending: 3, completed: 6 },
          { period: '5 PM', pending: 2, completed: 7 },
        ];
      case "thisweek":
      case "lastweek":
        return [
          { period: 'Mon', pending: 8, completed: 12 },
          { period: 'Tue', pending: 10, completed: 15 },
          { period: 'Wed', pending: 7, completed: 18 },
          { period: 'Thu', pending: 9, completed: 14 },
          { period: 'Fri', pending: 6, completed: 20 },
        ];
      case "thismonth":
        return [
          { period: 'Week 1', pending: 28, completed: 45 },
          { period: 'Week 2', pending: 32, completed: 52 },
          { period: 'Week 3', pending: 25, completed: 58 },
          { period: 'Week 4', pending: 30, completed: 48 },
        ];
      default:
        return [
          { period: 'Mon', pending: 8, completed: 12 },
          { period: 'Tue', pending: 10, completed: 15 },
          { period: 'Wed', pending: 7, completed: 18 },
          { period: 'Thu', pending: 9, completed: 14 },
          { period: 'Fri', pending: 6, completed: 20 },
        ];
    }
  };

  const reviewTrendData = getReviewTrendData();

  const candidateStatusData = [
    { week: 'Week 1', reviewed: 28, aligned: 22, selected: 18 },
    { week: 'Week 2', reviewed: 32, aligned: 26, selected: 21 },
    { week: 'Week 3', reviewed: 35, aligned: 29, selected: 24 },
    { week: 'Week 4', reviewed: 38, aligned: 31, selected: 27 },
  ];

  const hiringPlans = [
    {
      id: 1,
      jobRole: "Software Engineer",
      project: "Product Alpha",
      requiredSkills: "React, TypeScript, Node.js",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      recruiter: "Sarah Johnson",
      hiringLead: "John Smith",
      progress: 75,
    },
    {
      id: 2,
      jobRole: "Product Manager",
      project: "Platform Beta",
      requiredSkills: "Strategy, Analytics, Agile",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      recruiter: "David Wilson",
      hiringLead: "Sarah Connor",
      progress: 45,
    },
    {
      id: 3,
      jobRole: "UX Designer",
      project: "Design System",
      requiredSkills: "Figma, User Research, Prototyping",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      recruiter: "Emma Rodriguez",
      hiringLead: "Mike Johnson",
      progress: 60,
    },
  ];

  const handleViewAll = () => {
    navigate("/interviewer/jobs");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "Pending Approval":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "On Hold":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const MetricCard = ({ title, value, change, changeLabel, icon: Icon, trend, gradient }: {
    title: string;
    value: string | number;
    change: string;
    changeLabel: string;
    icon: any;
    trend: 'up' | 'down';
    gradient: string;
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
          <p className="text-white/60 text-xs">{changeLabel}</p>
        </div>
      </CardContent>
    </Card>
  );

  const ReviewPendingVsCompleted = () => (
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <ClipboardCheck className="h-4 w-4 text-orange-500" />
          </div>
          Reviews Pending vs Completed
        </CardTitle>
        <p className="text-sm text-muted-foreground">Weekly review activity</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            pending: { label: "Pending", color: "hsl(25, 95%, 53%)" },
            completed: { label: "Completed", color: "hsl(142, 71%, 45%)" },
          }}
          className="h-[220px]"
        >
          <BarChart data={reviewTrendData}>
            <XAxis dataKey="period" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="pending" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CandidateAlignmentChart = () => (
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-500/10">
            <Users className="h-4 w-4 text-violet-500" />
          </div>
          Candidate Progress Funnel
        </CardTitle>
        <p className="text-sm text-muted-foreground">Reviewed → Aligned → Selected</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            reviewed: { label: "Reviewed", color: "hsl(217, 91%, 60%)" },
            aligned: { label: "Aligned", color: "hsl(142, 71%, 45%)" },
            selected: { label: "Selected", color: "hsl(262, 83%, 58%)" },
          }}
          className="h-[220px]"
        >
          <LineChart data={candidateStatusData}>
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="reviewed" stroke="hsl(217, 91%, 60%)" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="aligned" stroke="hsl(142, 71%, 45%)" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="selected" stroke="hsl(262, 83%, 58%)" strokeWidth={3} dot={false} />
          </LineChart>
        </ChartContainer>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-muted-foreground">Reviewed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Aligned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <span className="text-xs text-muted-foreground">Selected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Interviewer Dashboard
              </h1>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Live
              </Badge>
            </div>
            <p className="text-muted-foreground">Monitor interview reviews and candidate progress</p>
          </div>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40 bg-background/80 backdrop-blur-sm border-muted-foreground/20">
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

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Reviews Pending"
            value={12}
            change="-8%"
            changeLabel="Compared to last week"
            icon={ClipboardCheck}
            trend="down"
            gradient="bg-gradient-to-br from-red-500 to-rose-600"
          />
          <MetricCard
            title="Candidates Reviewed"
            value={38}
            change="+12%"
            changeLabel="Compared to last week"
            icon={Users}
            trend="up"
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Candidates Aligned"
            value={31}
            change="+15%"
            changeLabel="81.6% alignment rate"
            icon={UserCheck}
            trend="up"
            gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          />
          <MetricCard
            title="Selected by Hiring Lead"
            value={27}
            change="+10%"
            changeLabel="87.1% selection rate"
            icon={CheckCircle2}
            trend="up"
            gradient="bg-gradient-to-br from-violet-500 to-purple-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReviewPendingVsCompleted />
          <CandidateAlignmentChart />
        </div>

        {/* Assigned Job Openings Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/30">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2">
                Assigned Job Openings
              </CardTitle>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 gap-1"
                onClick={handleViewAll}
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Job ID</TableHead>
                    <TableHead className="font-semibold">Job Role</TableHead>
                    <TableHead className="font-semibold">Skills</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Recruiter</TableHead>
                    <TableHead className="font-semibold">Hiring Lead</TableHead>
                    <TableHead className="text-center font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hiringPlans.map((plan) => (
                    <TableRow key={plan.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">
                        #{String(plan.id).padStart(4, "0")}
                      </TableCell>
                      <TableCell className="font-medium">{plan.jobRole}</TableCell>
                      <TableCell className="text-muted-foreground max-w-[200px] truncate">
                        {plan.requiredSkills}
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className={`${getStatusColor(plan.status)} cursor-help`}>
                              {plan.status}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{plan.statusTooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{plan.recruiter}</TableCell>
                      <TableCell>{plan.hiringLead}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                                onClick={() => navigate(`/interviewer/questionnaire/create?jobId=${plan.id}`)}
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Create Questionnaire</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                                onClick={() => navigate(`/interviewer/candidates?jobRole=${encodeURIComponent(plan.jobRole)}`)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Candidates</TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}