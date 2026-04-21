import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Target, UserX, Calendar, Bell, UserPlus, CheckCircle2, ArrowRight, Sparkles, Zap, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TAAssociateDashboard = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState("thisquarter");

  const timeframes = [
    { id: "thisquarter", name: "This Quarter" },
    { id: "lastquarter", name: "Last Quarter" },
    { id: "thisyear", name: "This Year" },
    { id: "custom", name: "Custom Range" },
  ];

  const LatestNotifications = () => {
    const recentNotifications = [
      { id: 1, title: "Interview completed", user: "John Doe", time: "1 hour ago", type: "interview" },
      { id: 2, title: "Candidate feedback submitted", user: "Sarah Chen", time: "3 hours ago", type: "success" },
      { id: 3, title: "New candidate assigned", user: "Mike Johnson", time: "1 day ago", type: "candidate" },
    ];

    return (
      <Card 
        className="h-full cursor-pointer group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30"
        onClick={() => navigate('/notifications')}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Bell className="h-5 w-5 text-purple-500" />
              </div>
              Latest Notifications
            </CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentNotifications.map((notif) => (
            <div key={notif.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                <AvatarFallback className="text-xs bg-gradient-to-br from-primary/80 to-primary text-primary-foreground">
                  {notif.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{notif.title}</p>
                <p className="text-xs text-muted-foreground">{notif.user} • {notif.time}</p>
              </div>
              {notif.type === 'success' && <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />}
              {notif.type === 'candidate' && <UserPlus className="h-4 w-4 text-blue-500 flex-shrink-0" />}
              {notif.type === 'interview' && <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0" />}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const NoShowRate = () => (
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-500/10">
            <UserX className="h-5 w-5 text-red-500" />
          </div>
          Interview No-Show Rate
        </CardTitle>
        <p className="text-sm text-muted-foreground">Candidates who miss interviews</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current Rate</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">12.3%</p>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
            <TrendingDown className="h-3.5 w-3.5" />
            -3.1%
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to target</span>
            <span className="font-medium">12.3% / 10%</span>
          </div>
          <Progress value={77} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Scheduled</p>
            <p className="text-2xl font-bold">65</p>
          </div>
          <div className="p-3 rounded-xl bg-red-500/10">
            <p className="text-xs text-muted-foreground mb-1">No-Shows</p>
            <p className="text-2xl font-bold text-red-500">8</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const HiringEfficiency = () => {
    const quarters = [
      { label: "Q1", value: 65, status: "baseline" },
      { label: "Q2", value: 72, status: "improved" },
      { label: "Q3", value: 68, status: "slight-dip" },
      { label: "Q4", value: 75, status: "current" },
    ];

    return (
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Target className="h-5 w-5 text-blue-500" />
            </div>
            Hiring Efficiency
          </CardTitle>
          <p className="text-sm text-muted-foreground">Quarterly performance tracking</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-3 h-[140px]">
            {quarters.map((q, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex flex-col items-center">
                  <span className="text-sm font-bold mb-1">{q.value}%</span>
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      q.status === 'current' 
                        ? 'bg-gradient-to-t from-blue-500 to-blue-400' 
                        : 'bg-gradient-to-t from-muted to-muted-foreground/20'
                    }`}
                    style={{ height: `${q.value}px` }}
                  />
                </div>
                <span className={`text-xs font-medium ${q.status === 'current' ? 'text-blue-500' : 'text-muted-foreground'}`}>
                  {q.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Current Quarter</span>
            </div>
            <span className="text-sm text-green-600 font-medium">+10% vs Q1</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const HiringVelocity = () => {
    const quarters = [
      { label: "Q1", value: 58, status: "baseline" },
      { label: "Q2", value: 63, status: "improved" },
      { label: "Q3", value: 70, status: "peak" },
      { label: "Q4", value: 67, status: "current" },
    ];

    return (
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Activity className="h-5 w-5 text-emerald-500" />
            </div>
            Hiring Velocity
          </CardTitle>
          <p className="text-sm text-muted-foreground">Speed of hiring process</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-3 h-[140px]">
            {quarters.map((q, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex flex-col items-center">
                  <span className="text-sm font-bold mb-1">{q.value}%</span>
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      q.status === 'current' 
                        ? 'bg-gradient-to-t from-amber-500 to-amber-400' 
                        : q.status === 'peak'
                        ? 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                        : 'bg-gradient-to-t from-muted to-muted-foreground/20'
                    }`}
                    style={{ height: `${q.value}px` }}
                  />
                </div>
                <span className={`text-xs font-medium ${
                  q.status === 'current' ? 'text-amber-500' : 
                  q.status === 'peak' ? 'text-emerald-500' : 'text-muted-foreground'
                }`}>
                  {q.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">Slight dip from Q3</span>
            </div>
            <span className="text-sm text-amber-600 font-medium">-3%</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              TA Associate Dashboard
            </h1>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground">Monitor your recruitment performance and key metrics</p>
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

      {/* 4-Quadrant Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LatestNotifications />
        <NoShowRate />
        <HiringEfficiency />
        <HiringVelocity />
      </div>
    </div>
  );
};

export default TAAssociateDashboard;