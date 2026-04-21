import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Users, Target, Award, MapPin, Calendar, Clock, Bell, UserPlus, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const SalesPlanQuadrantDashboard = () => {
  const navigate = useNavigate();
  const [selectedRecruiter, setSelectedRecruiter] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("thisquarter");

  const recruiters = [
    { id: "all", name: "All Recruiters" },
    { id: "john", name: "John Doe" },
    { id: "sarah", name: "Sarah Chen" },
    { id: "mike", name: "Mike Johnson" },
    { id: "lisa", name: "Lisa Wang" },
  ];

  const timeframes = [
    { id: "thisquarter", name: "This Quarter" },
    { id: "lastquarter", name: "Last Quarter" },
    { id: "thisyear", name: "This Year" },
    { id: "custom", name: "Custom Range" },
  ];

  const MetricCard = ({ title, value, change, target, icon: Icon, trend, gradient }: {
    title: string;
    value: string | number;
    change: string;
    target?: string;
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
          {target && <p className="text-white/60 text-xs">Target: {target}</p>}
        </div>
      </CardContent>
    </Card>
  );

  const LatestNotifications = () => {
    const recentNotifications = [
      { id: 1, title: "New candidate added", user: "John Doe", time: "2 hours ago", type: "candidate" },
      { id: 2, title: "Position filled", user: "Sarah Chen", time: "4 hours ago", type: "success" },
      { id: 3, title: "Interview scheduled", user: "Mike Johnson", time: "1 day ago", type: "interview" },
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

  const HiringMetrics = () => {
    const metrics = [
      { label: "Current Efficiency", value: "75%", change: "+7%", trend: "up", color: "from-emerald-500 to-teal-500" },
      { label: "Current Velocity", value: "67%", change: "-3%", trend: "down", color: "from-amber-500 to-orange-500" },
      { label: "Overall Score", value: "71%", change: "+2%", trend: "up", color: "from-violet-500 to-purple-500" },
    ];

    return (
      <Card 
        className="h-full cursor-pointer group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30"
        onClick={() => navigate('/sales-plan/dashboard/hiring-metrics')}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Target className="h-5 w-5 text-blue-500" />
              </div>
              Hiring Metrics
            </CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((metric, idx) => (
              <div key={idx} className={`p-4 rounded-xl bg-gradient-to-br ${metric.color} text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                <p className="text-xs font-medium text-white/80 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className={`flex items-center gap-1 text-xs mt-1 ${metric.trend === 'up' ? 'text-white/90' : 'text-white/90'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {metric.change} from last quarter
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const RecruiterMetrics = () => {
    const stats = [
      { icon: Users, label: "Candidates", value: "184", change: "+15%", color: "text-blue-500", bg: "bg-blue-500/10" },
      { icon: Target, label: "Positions", value: "29", change: "+8%", color: "text-emerald-500", bg: "bg-emerald-500/10" },
      { icon: Calendar, label: "Interviews", value: "92", change: "+12%", color: "text-orange-500", bg: "bg-orange-500/10" },
      { icon: Clock, label: "Avg Close", value: "18d", change: "-12%", color: "text-purple-500", bg: "bg-purple-500/10", trend: "down" },
    ];

    return (
      <Card 
        className="h-full cursor-pointer group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30"
        onClick={() => navigate('/sales-plan/dashboard/recruiter-metrics')}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              Recruiter Performance
            </CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className={`mx-auto w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className={`text-xs ${stat.trend === 'down' ? 'text-red-500' : 'text-green-500'}`}>{stat.change}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const FunnelChart = () => {
    const funnelStats = [
      { icon: Users, label: "Conversion", value: "1.5%", change: "+0.3%", color: "text-blue-500", bg: "bg-blue-500/10" },
      { icon: Clock, label: "Time to Hire", value: "28d", change: "+3d", color: "text-orange-500", bg: "bg-orange-500/10", trend: "down" },
      { icon: Target, label: "Interview", value: "6.8%", change: "Above avg", color: "text-emerald-500", bg: "bg-emerald-500/10" },
      { icon: Award, label: "Acceptance", value: "83%", change: "+8%", color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    return (
      <Card 
        className="h-full cursor-pointer group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30"
        onClick={() => navigate('/sales-plan/dashboard/funnel')}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <MapPin className="h-5 w-5 text-indigo-500" />
              </div>
              Recruitment Funnel
            </CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {funnelStats.map((stat, idx) => (
              <div key={idx} className="text-center p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className={`mx-auto w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className={`text-xs ${stat.trend === 'down' ? 'text-red-500' : 'text-green-500'}`}>{stat.change}</p>
              </div>
            ))}
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
              TA Leader Dashboard
            </h1>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground">Monitor recruitment performance and team metrics</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
            <SelectTrigger className="w-48 bg-background/80 backdrop-blur-sm border-muted-foreground/20">
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
      </div>

      {/* Top Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Candidates Added"
          value="184"
          change="+15%"
          target="200"
          icon={Users}
          trend="up"
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Positions Filled"
          value="29"
          change="+8%"
          target="35"
          icon={Target}
          trend="up"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <MetricCard
          title="Interviews Scheduled"
          value="92"
          change="+12%"
          target="100"
          icon={Calendar}
          trend="up"
          gradient="bg-gradient-to-br from-violet-500 to-purple-600"
        />
        <MetricCard
          title="Avg Time to Close"
          value="18 days"
          change="-12%"
          target="21 days"
          icon={Clock}
          trend="down"
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
        />
      </div>

      {/* 4-Quadrant Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LatestNotifications />
        <HiringMetrics />
        <RecruiterMetrics />
        <FunnelChart />
      </div>
    </div>
  );
};

export default SalesPlanQuadrantDashboard;