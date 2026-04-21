import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowLeft, TrendingUp, Target, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HiringMetricsDetail = () => {
  const navigate = useNavigate();
  const [selectedRecruiter, setSelectedRecruiter] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("yearly");

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
    { id: "yearly", name: "Yearly View" },
    { id: "quarterly", name: "Quarterly View" },
    { id: "monthly", name: "Monthly View" },
  ];

  const hiringEfficiencyData = [
    { period: '0', percentage: 0, positions_closed: 0, positions_opened: 0, label: "0%" },
    { period: 'Q1 2024', percentage: 65, positions_closed: 58, positions_opened: 89, label: "65%" },
    { period: 'Q2 2024', percentage: 72, positions_closed: 72, positions_opened: 100, label: "72%" },
    { period: 'Q3 2024', percentage: 68, positions_closed: 85, positions_opened: 125, label: "68%" },
    { period: 'Q4 2024', percentage: 75, positions_closed: 90, positions_opened: 120, label: "75%" },
  ];

  const hiringVelocityData = [
    { period: '0', percentage: 0, positions_on_time: 0, positions_closed: 0, label: "0%" },
    { period: 'Q1 2024', percentage: 58, positions_on_time: 42, positions_closed: 72, label: "58%" },
    { period: 'Q2 2024', percentage: 63, positions_on_time: 51, positions_closed: 81, label: "63%" },
    { period: 'Q3 2024', percentage: 70, positions_on_time: 67, positions_closed: 96, label: "70%" },
    { period: 'Q4 2024', percentage: 67, positions_on_time: 73, positions_closed: 109, label: "67%" },
  ];


  return (
    <div className="p-6 space-y-6">
      <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/sales-plan/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Hiring Metrics Analysis</h1>
            <p className="text-muted-foreground">Detailed performance trends and analytics</p>
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
            <SelectTrigger className="w-48">
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

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card style={{ backgroundColor: '#e0fcea' }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Current Efficiency</span>
            </div>
            <p className="text-3xl font-bold">75%</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +7% from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card style={{ backgroundColor: '#fff0dc' }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Current Velocity</span>
            </div>
            <p className="text-3xl font-bold">67%</p>
            <p className="text-sm text-red-600">-3% from last quarter</p>
          </CardContent>
        </Card>
        
        <Card style={{ backgroundColor: '#e0fcea' }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Overall Score</span>
            </div>
            <p className="text-3xl font-bold">71%</p>
            <p className="text-sm text-green-600">+2% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Efficiency Detailed Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Efficiency Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">
              Formula: (Positions Closed ÷ Positions Opened) × 100
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <ChartContainer
                config={{
                  efficiency: {
                    label: "Efficiency %",
                    color: "#92c5fc",
                  },
                }}
                className="h-[350px] min-w-[600px]"
              >
                <LineChart data={hiringEfficiencyData}>
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background p-3 border rounded-lg shadow-md">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-muted-foreground">
                              Positions Closed: {data.positions_closed}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Positions Opened: {data.positions_opened}
                            </p>
                            <p className="text-sm font-medium">
                              Efficiency: {data.percentage}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    stroke="#92c5fc" 
                    strokeWidth={3}
                    dot={{ fill: "#92c5fc", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hiring Velocity Detailed Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Velocity Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">
              Formula: (Positions Closed On Time ÷ Total Positions Closed) × 100
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <ChartContainer
                config={{
                  velocity: {
                    label: "Velocity %",
                    color: "#bbf7d1",
                  },
                }}
                className="h-[350px] min-w-[600px]"
              >
                <LineChart data={hiringVelocityData}>
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background p-3 border rounded-lg shadow-md">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-muted-foreground">
                              On Time: {data.positions_on_time}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Total Closed: {data.positions_closed}
                            </p>
                            <p className="text-sm font-medium">
                              Velocity: {data.percentage}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    stroke="#bbf7d1" 
                    strokeWidth={3}
                    dot={{ fill: "#bbf7d1", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default HiringMetricsDetail;