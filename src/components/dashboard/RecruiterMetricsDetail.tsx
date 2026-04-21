import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Target, Calendar, PhoneCall, MessageSquare, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecruiterMetricsDetail = () => {
  const navigate = useNavigate();
  const [selectedRecruiter, setSelectedRecruiter] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("thismonth");

  const recruiters = [
    { id: "all", name: "All Recruiters" },
    { id: "john", name: "John Doe" },
    { id: "sarah", name: "Sarah Chen" },
    { id: "mike", name: "Mike Johnson" },
    { id: "lisa", name: "Lisa Wang" },
    { id: "alex", name: "Alex Rodriguez" },
    { id: "emma", name: "Emma Thompson" },
  ];

  const timeframes = [
    { id: "thismonth", name: "This Month" },
    { id: "lastmonth", name: "Last Month" },
    { id: "thisquarter", name: "This Quarter" },
  ];

  const MetricCard = ({ title, value, change, changeLabel, icon: Icon, trend, detail }: {
    title: string;
    value: string | number;
    change: string;
    changeLabel: string;
    icon: any;
    trend: 'up' | 'down';
    detail?: string;
  }) => (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-6 w-6 text-muted-foreground" />
          <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {change}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{changeLabel}</p>
          {detail && <p className="text-xs text-blue-600 font-medium">{detail}</p>}
        </div>
      </CardContent>
    </Card>
  );


  const trendsData = [
    { month: 'Jan', candidates: 142, positions: 18, interviews: 67, outreach: 89, responses: 24 },
    { month: 'Feb', candidates: 156, positions: 22, interviews: 74, outreach: 95, responses: 28 },
    { month: 'Mar', candidates: 168, positions: 24, interviews: 81, outreach: 77, responses: 22 },
    { month: 'Apr', candidates: 175, positions: 26, interviews: 85, outreach: 82, responses: 25 },
    { month: 'May', candidates: 163, positions: 21, interviews: 78, outreach: 71, responses: 19 },
    { month: 'Jun', candidates: 184, positions: 29, interviews: 92, outreach: 88, responses: 31 },
    { month: 'Jul', candidates: 198, positions: 32, interviews: 105, outreach: 94, responses: 35 },
    { month: 'Aug', candidates: 205, positions: 31, interviews: 98, outreach: 87, responses: 29 },
    { month: 'Sep', candidates: 189, positions: 28, interviews: 89, outreach: 91, responses: 33 },
    { month: 'Oct', candidates: 212, positions: 35, interviews: 112, outreach: 102, responses: 38 },
    { month: 'Nov', candidates: 196, positions: 33, interviews: 95, outreach: 89, responses: 31 },
    { month: 'Dec', candidates: 178, positions: 27, interviews: 83, outreach: 76, responses: 26 },
  ];

  const recruiterComparisonData = [
    { name: 'John Doe', candidates: 187, positions: 23, efficiency: 87 },
    { name: 'Sarah Chen', candidates: 156, positions: 19, efficiency: 82 },
    { name: 'Mike Johnson', candidates: 132, positions: 15, efficiency: 78 },
    { name: 'Lisa Wang', candidates: 98, positions: 12, efficiency: 75 },
    { name: 'Alex Rodriguez', candidates: 145, positions: 18, efficiency: 80 },
    { name: 'Emma Thompson', candidates: 122, positions: 14, efficiency: 76 },
    { name: 'David Kim', candidates: 165, positions: 21, efficiency: 84 },
    { name: 'Rachel Green', candidates: 139, positions: 16, efficiency: 79 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/sales-plan/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Recruiter Performance Metrics</h1>
            <p className="text-muted-foreground">Comprehensive view of recruitment performance indicators</p>
          </div>
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

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card style={{ backgroundColor: '#e0fcea' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-6 w-6 text-muted-foreground" />
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                15%
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Candidates Added</h3>
              <p className="text-3xl font-bold">184</p>
              <p className="text-xs text-muted-foreground">Compared to last month</p>
              <p className="text-xs text-blue-600 font-medium">Target: 200</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#e0fcea' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-6 w-6 text-muted-foreground" />
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                8%
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Positions Filled</h3>
              <p className="text-3xl font-bold">29</p>
              <p className="text-xs text-muted-foreground">Compared to last month</p>
              <p className="text-xs text-blue-600 font-medium">Target: 35</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#e0fcea' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-6 w-6 text-muted-foreground" />
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                12%
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Interviews Scheduled</h3>
              <p className="text-3xl font-bold">92</p>
              <p className="text-xs text-muted-foreground">Compared to last month</p>
              <p className="text-xs text-blue-600 font-medium">Conversion: 31%</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#e0fcea' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-6 w-6 text-muted-foreground" />
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                12%
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Avg Time to Close</h3>
              <p className="text-3xl font-bold">18 days</p>
              <p className="text-xs text-muted-foreground">Compared to last month</p>
              <p className="text-xs text-blue-600 font-medium">Target: 21 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly trends across key metrics</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                candidates: {
                  label: "Candidates Added",
                  color: "#3b82f6",
                },
                positions: {
                  label: "Positions Filled",
                  color: "#10b981",
                },
                interviews: {
                  label: "Interviews",
                  color: "#f59e0b",
                },
              }}
              className="h-[400px]"
            >
              <LineChart data={trendsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="candidates" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="positions" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="interviews" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Team Comparison */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Team Comparison</CardTitle>
            <p className="text-sm text-muted-foreground">Individual recruiter performance comparison</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                candidates: {
                  label: "Candidates Added",
                  color: "#8b5cf6",
                },
                positions: {
                  label: "Positions Filled",
                  color: "#ec4899",
                },
              }}
              className="h-[400px]"
            >
              <BarChart data={recruiterComparisonData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="candidates" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="positions" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterMetricsDetail;