import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Users, Award, TrendingUp, TrendingDown, Clock, Target, CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

const TeamPerformanceDetail = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState("thismonth");
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>();
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);

  const timeframes = [
    { id: "thismonth", name: "This Month" },
    { id: "lastmonth", name: "Last Month" },
    { id: "thisquarter", name: "This Quarter" },
    { id: "lastquarter", name: "Last Quarter" },
    { id: "custom", name: "Custom" },
  ];

  const recruiterRankings = [
    {
      rank: 1,
      name: "John Doe",
      initials: "JD",
      positionsClosed: 23,
      candidatesAdded: 187,
      averageTimeToFill: "12 days",
      recruiterEfficiency: "92%",
      trend: "up",
      change: "+15%"
    },
    {
      rank: 2,
      name: "Sarah Chen",
      initials: "SC",
      positionsClosed: 19,
      candidatesAdded: 156,
      averageTimeToFill: "15 days",
      recruiterEfficiency: "88%",
      trend: "up",
      change: "+8%"
    },
    {
      rank: 3,
      name: "Mike Johnson",
      initials: "MJ",
      positionsClosed: 15,
      candidatesAdded: 132,
      averageTimeToFill: "18 days",
      recruiterEfficiency: "85%",
      trend: "down",
      change: "-3%"
    },
    {
      rank: 4,
      name: "Lisa Wang",
      initials: "LW",
      positionsClosed: 12,
      candidatesAdded: 98,
      averageTimeToFill: "20 days",
      recruiterEfficiency: "89%",
      trend: "up",
      change: "+12%"
    }
  ];

  const RecruiterCard = ({ recruiter }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-muted-foreground">#{recruiter.rank}</span>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                {recruiter.initials}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{recruiter.name}</h3>
                <div className="flex items-center gap-1 text-sm">
                  {recruiter.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={recruiter.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {recruiter.change}
                  </span>
                  <span className="text-muted-foreground ml-2">vs last period</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-8">
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Positions Closed</span>
              </div>
              <p className="text-2xl font-bold">{recruiter.positionsClosed}</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Candidates Added</span>
              </div>
              <p className="text-2xl font-bold">{recruiter.candidatesAdded}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Avg Time to Fill</span>
              </div>
              <p className="text-2xl font-bold">{recruiter.averageTimeToFill}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Efficiency</span>
              </div>
              <p className="text-2xl font-bold">{recruiter.recruiterEfficiency}</p>
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );

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
            <h1 className="text-2xl font-bold">Team Performance</h1>
            <p className="text-muted-foreground">Detailed view of recruiting team rankings and performance</p>
          </div>
        </div>
        
        <div className="flex gap-2 items-center">
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
          
          {selectedTimeframe === "custom" && (
            <Popover open={isCustomDateOpen} onOpenChange={setIsCustomDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !customDateRange?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customDateRange?.from ? (
                    customDateRange.to ? (
                      <>
                        {format(customDateRange.from, "LLL dd, y")} -{" "}
                        {format(customDateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(customDateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={customDateRange?.from}
                  selected={customDateRange}
                  onSelect={setCustomDateRange}
                  numberOfMonths={2}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Positions Closed</p>
            <p className="text-2xl font-bold">69</p>
            <p className="text-xs text-green-600">+8% vs last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Candidates Added</p>
            <p className="text-2xl font-bold">573</p>
            <p className="text-xs text-green-600">+12% vs last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Average Time to Fill</p>
            <p className="text-2xl font-bold">18 days</p>
            <p className="text-xs text-red-600">+2 days vs last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Team Efficiency</p>
            <p className="text-2xl font-bold">87%</p>
            <p className="text-xs text-green-600">+5% vs last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Recruiter Rankings */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recruiter Rankings</h2>
        <div className="space-y-4">
          {recruiterRankings.map((recruiter) => (
            <RecruiterCard key={recruiter.rank} recruiter={recruiter} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPerformanceDetail;