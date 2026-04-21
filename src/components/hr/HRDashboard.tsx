import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Users, Calendar, AlertCircle, CheckCircle, XCircle, Clock, TrendingUp, ArrowRight, Sparkles, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function HRDashboard() {
  const navigate = useNavigate();

  const dashboardData = {
    pendingOffers: 8,
    sentOffers: 15,
    offerStatus: {
      offered: 12,
      accepted: 8,
      hired: 5,
      rejected: 3,
      noShow: 1
    },
    upcomingJoining: [
      { name: "John Doe", role: "Software Engineer", date: "2024-01-15" },
      { name: "Jane Smith", role: "Product Manager", date: "2024-01-18" },
    ]
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, gradient, action, onClick }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: any;
    gradient: string;
    action?: string;
    onClick?: () => void;
  }) => (
    <Card 
      className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${gradient}`}
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      <CardContent className="p-5 relative">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <ArrowRight className="h-4 w-4 text-white/60" />
        </div>
        <div className="space-y-2">
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-4xl font-bold text-white">{value}</p>
          <p className="text-white/60 text-xs">{subtitle}</p>
          {action && (
            <Button size="sm" className="mt-2 w-full bg-white/20 hover:bg-white/30 text-white border-0">
              {action}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const OfferStatusCard = () => {
    const statuses = [
      { label: "Offered", value: dashboardData.offerStatus.offered, color: "bg-blue-500", percentage: 40 },
      { label: "Accepted", value: dashboardData.offerStatus.accepted, color: "bg-emerald-500", percentage: 27 },
      { label: "Hired", value: dashboardData.offerStatus.hired, color: "bg-violet-500", percentage: 17 },
      { label: "Rejected", value: dashboardData.offerStatus.rejected, color: "bg-red-500", percentage: 10 },
    ];

    return (
      <Card 
        className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-background to-muted/30"
        onClick={() => navigate("/hr/candidates")}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Users className="h-5 w-5 text-violet-500" />
              </div>
              Offer Status
            </CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {statuses.map((status, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${status.color}`} />
                  <span className="text-sm font-medium">{status.label}</span>
                </div>
                <span className="text-sm font-bold">{status.value}</span>
              </div>
              <Progress value={status.percentage} className="h-1.5" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const OnboardingCard = () => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Calendar className="h-5 w-5 text-emerald-500" />
          </div>
          Onboarding Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Upcoming Joinings</p>
          {dashboardData.upcomingJoining.map((joining, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
                {joining.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{joining.name}</p>
                <p className="text-xs text-muted-foreground">{joining.role}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {joining.date}
              </Badge>
            </div>
          ))}
        </div>
        {dashboardData.offerStatus.noShow > 0 && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{dashboardData.offerStatus.noShow} No Show Alert</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const notifications = [
    { type: "create", title: "Candidate approved, create offer letter", subtitle: "John Doe - Software Engineer position", icon: CheckCircle, color: "bg-blue-500/10 border-blue-500/20", iconColor: "text-blue-500", action: "Create Letter" },
    { type: "accepted", title: "Candidate accepted offer, update onboarding", subtitle: "Jane Smith - Product Manager position", icon: CheckCircle, color: "bg-emerald-500/10 border-emerald-500/20", iconColor: "text-emerald-500", action: "Update Status" },
    { type: "expiring", title: "Offer letter expires in 2 days", subtitle: "Mike Johnson - Backend Developer position", icon: Clock, color: "bg-amber-500/10 border-amber-500/20", iconColor: "text-amber-500", action: "Follow Up" },
    { type: "rejected", title: "Candidate rejected offer", subtitle: "Sarah Williams - UX Designer position", icon: XCircle, color: "bg-red-500/10 border-red-500/20", iconColor: "text-red-500", action: "Review" },
    { type: "onboarded", title: "New candidate onboarded successfully", subtitle: "David Chen - Data Analyst position", icon: UserPlus, color: "bg-violet-500/10 border-violet-500/20", iconColor: "text-violet-500", action: "View Details" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            HR Dashboard
          </h1>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            Live
          </Badge>
        </div>
        <p className="text-muted-foreground">Manage offer letters and onboarding processes</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Pending Offer Letters"
          value={dashboardData.pendingOffers}
          subtitle="Awaiting offer creation"
          icon={FileText}
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
          action="Create Offer Letter"
          onClick={() => navigate("/hr/candidates")}
        />
        <MetricCard
          title="Offer Letters Sent"
          value={dashboardData.sentOffers}
          subtitle="Total offers dispatched"
          icon={Mail}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          onClick={() => navigate("/hr/candidates")}
        />
        <OfferStatusCard />
        <OnboardingCard />
      </div>

      {/* Notifications Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <AlertCircle className="h-5 w-5 text-primary" />
            </div>
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notif, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-4 p-4 rounded-xl border ${notif.color} hover:shadow-md transition-all duration-200`}
            >
              <div className={`p-2 rounded-lg ${notif.color}`}>
                <notif.icon className={`h-5 w-5 ${notif.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notif.title}</p>
                <p className="text-xs text-muted-foreground">{notif.subtitle}</p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                {notif.action}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}