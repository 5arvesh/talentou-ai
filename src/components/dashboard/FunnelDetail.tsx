import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FunnelDetail = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("thismonth");

  const jobs = [
    { id: "all", name: "All Positions" },
    { id: "dev001", name: "Senior Software Engineer - REQ001" },
    { id: "dev002", name: "Frontend Developer - REQ002" },
    { id: "dev003", name: "Backend Developer - REQ003" },
    { id: "pm001", name: "Product Manager - REQ004" },
    { id: "ds001", name: "Data Scientist - REQ005" },
    { id: "ux001", name: "UX Designer - REQ006" },
  ];

  const timeframes = [
    { id: "thismonth", name: "This Month" },
    { id: "lastmonth", name: "Last Month" },
    { id: "thisquarter", name: "This Quarter" },
    { id: "lastquarter", name: "Last Quarter" },
  ];


  const funnelData = [
    { 
      stage: "Sourced & Applied", 
      count: 1359, 
      sourcedCount: 850,
      appliedCount: 509,
      conversionRate: "100%",
      color: "bg-blue-300",
      isSplit: true,
      change: "+12%"
    },
    { 
      stage: "Interview Scheduled", 
      count: 355, 
      conversionRate: "26.1%", 
      color: "bg-orange-300", 
      change: "+8%" 
    },
    { 
      stage: "Review", 
      count: 766, 
      conversionRate: "56.4%", 
      color: "bg-purple-300", 
      change: "+15%" 
    },
    { 
      stage: "Offered", 
      count: 24, 
      conversionRate: "1.8%", 
      color: "bg-yellow-300", 
      change: "-5%" 
    },
    { 
      stage: "Accepted", 
      count: 24, 
      conversionRate: "100%", 
      color: "bg-green-300", 
      change: "+2%" 
    },
    { 
      stage: "Hired", 
      count: 20, 
      conversionRate: "83.3%", 
      color: "bg-indigo-300", 
      change: "+10%" 
    },
    { 
      stage: "Rejected", 
      count: 947, 
      conversionRate: "69.7%", 
      color: "bg-red-300", 
      change: "-8%" 
    },
  ];

  const stageAnalytics = [
    {
      stage: "Sourced vs Applied",
      description: "Quality of sourcing channels and application conversion",
      insights: [
        "LinkedIn sourcing shows 35% higher conversion to application",
        "Job board applications have lower quality but higher volume",
        "Referrals have 85% application rate from initial contact"
      ],
      recommendations: [
        "Focus on LinkedIn sourcing for senior roles",
        "Improve job board posting quality",
        "Expand referral program"
      ]
    },
    {
      stage: "Interview Scheduling",
      description: "Conversion from application to interview",
      insights: [
        "Average time to schedule: 5.2 days",
        "26.1% conversion rate (industry avg: 23%)",
        "Remote positions have 40% higher scheduling success"
      ],
      recommendations: [
        "Implement automated scheduling",
        "Reduce initial screening time",
        "Offer flexible interview times"
      ]
    },
    {
      stage: "Interview to Offer",
      description: "Success rate through interview process",
      insights: [
        "Technical interviews have 68% pass rate",
        "Cultural fit interviews: 82% pass rate",
        "Multi-round process takes average 12 days"
      ],
      recommendations: [
        "Standardize technical assessment",
        "Provide interview training to managers",
        "Streamline decision-making process"
      ]
    }
  ];


  const splitLegendData = [
    { label: "Sourced", count: 850, color: "bg-blue-300" },
    { label: "Applied", count: 509, color: "bg-blue-500" },
  ];

  const EnhancedFunnelChart = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Interactive Recruitment Funnel
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Detailed breakdown with conversion rates and trends
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Funnel Visualization */}
          <div className="flex">
            <div className="flex-1 pr-8">
              <div className="space-y-3">
                {funnelData.map((item, index) => (
                  <div
                    key={item.stage}
                    className="relative group cursor-pointer"
                    style={{
                      width: `${100 - index * 6}%`,
                      marginLeft: `${index * 3}%`,
                    }}
                  >
                     {item.isSplit ? (
                      <div className="flex text-center text-sm font-medium">
                        <div 
                          className="bg-blue-300 px-4 py-3 flex items-center justify-center transition-all hover:bg-blue-400"
                          style={{ width: `${(item.sourcedCount / item.count) * 100}%` }}
                        >
                          {item.sourcedCount?.toLocaleString()}
                        </div>
                        <div 
                          className="bg-blue-500 px-4 py-3 flex items-center justify-center transition-all hover:bg-blue-600"
                          style={{ width: `${(item.appliedCount / item.count) * 100}%` }}
                        >
                          {item.appliedCount?.toLocaleString()}
                        </div>
                      </div>
                    ) : (
                      <div className={`${item.color} px-4 py-3 text-center text-sm font-medium transition-all hover:opacity-80`}>
                        <div className="flex justify-between items-center">
                          <span>{item.count.toLocaleString()}</span>
                          <div className="text-right">
                            <div className="text-xs">{item.conversionRate}</div>
                            <div className={`text-xs flex items-center ${item.change?.startsWith('+') ? 'text-green-700' : 'text-red-700'}`}>
                              {item.change?.startsWith('+') ? 
                                <TrendingUp className="h-3 w-3 mr-1" /> : 
                                <TrendingDown className="h-3 w-3 mr-1" />
                              }
                              {item.change}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Legend */}
            <div className="ml-4 space-y-3 min-w-[280px]">
              {funnelData.map((item) => (
                <div key={item.stage} className="min-h-[48px] flex items-center">
                  {item.isSplit ? (
                    <div className="space-y-1 w-full">
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
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center text-sm">
                        <div className={`w-3 h-3 ${item.color} mr-2 rounded-sm`}></div>
                        <span>{item.stage}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
            <h1 className="text-2xl font-bold">Recruitment Funnel Analysis</h1>
            <p className="text-muted-foreground">Detailed funnel performance with filtering and insights</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Job Position" />
            </SelectTrigger>
            <SelectContent>
              {jobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Timeline" />
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card style={{ backgroundColor: '#e0fcea' }}>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Overall Conversion</p>
            <p className="text-2xl font-bold">1.5%</p>
            <p className="text-xs text-green-600">+0.3% vs last period</p>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#fff0dc' }}>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Time to Hire</p>
            <p className="text-2xl font-bold">28 days</p>
            <p className="text-xs text-red-600">+3 days vs target</p>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#e0fcea' }}>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Interview Success</p>
            <p className="text-2xl font-bold">6.8%</p>
            <p className="text-xs text-green-600">Above industry avg</p>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#e0fcea' }}>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Offer Acceptance</p>
            <p className="text-2xl font-bold">83%</p>
            <p className="text-xs text-green-600">+8% vs last quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Funnel Chart */}
      <EnhancedFunnelChart />


      {/* Stage Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {stageAnalytics.map((stage, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">{stage.stage}</CardTitle>
              <p className="text-sm text-muted-foreground">{stage.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    {stage.insights.map((insight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    {stage.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600">→</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FunnelDetail;