import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Users, Calendar, CheckCircle2, ChevronRight, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MetricCard = ({ title, value, sub, icon: Icon, gradient }: {
  title: string; value: string | number; sub?: string;
  icon: React.ElementType; gradient: string;
}) => (
  <Card className={`relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${gradient}`}>
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
    <CardContent className="p-4 relative">
      <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm w-fit mb-2">
        <Icon className="h-4 w-4 text-white" />
      </div>
      <p className="text-white/80 text-xs font-medium">{title}</p>
      <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
      {sub && <p className="text-white/60 text-xs mt-0.5">{sub}</p>}
    </CardContent>
  </Card>
);

const jobOpenings = [
  { id: 1, title: 'Senior React Developer', location: 'Bangalore', experience: '4–7y', totalCandidates: 12, stages: { interview: 3, selected: 1 }, daysOpen: 14 },
  { id: 2, title: 'Product Manager', location: 'Remote', experience: '5–8y', totalCandidates: 8, stages: { interview: 2, selected: 0 }, daysOpen: 21 },
  { id: 3, title: 'Data Scientist', location: 'Mumbai', experience: '3–6y', totalCandidates: 15, stages: { interview: 4, selected: 2 }, daysOpen: 9 },
  { id: 4, title: 'DevOps Engineer', location: 'Hyderabad', experience: '3–5y', totalCandidates: 6, stages: { interview: 1, selected: 0 }, daysOpen: 30 },
  { id: 5, title: 'UX Designer', location: 'Pune', experience: '2–5y', totalCandidates: 9, stages: { interview: 2, selected: 0 }, daysOpen: 18 },
  { id: 6, title: 'QA Engineer', location: 'Chennai', experience: '2–4y', totalCandidates: 11, stages: { interview: 3, selected: 0 }, daysOpen: 7 },
];

const upcomingInterviews = [
  { candidate: 'Arun Sharma', role: 'Senior React Developer', type: 'Technical', date: 'Today', time: '3:00 PM' },
  { candidate: 'Priya Nair', role: 'Data Scientist', type: 'HR Round', date: 'Tomorrow', time: '11:00 AM' },
  { candidate: 'Rahul Verma', role: 'Senior React Developer', type: 'Final Round', date: 'Wed, 21 May', time: '2:30 PM' },
  { candidate: 'Sneha Patel', role: 'Product Manager', type: 'Technical', date: 'Thu, 22 May', time: '4:00 PM' },
  { candidate: 'Kiran Reddy', role: 'DevOps Engineer', type: 'Technical', date: 'Fri, 23 May', time: '10:00 AM' },
];

const interviewTypeBadge: Record<string, string> = {
  Technical: 'bg-blue-50 text-blue-700 border-blue-200',
  'HR Round': 'bg-green-50 text-green-700 border-green-200',
  'Final Round': 'bg-violet-50 text-violet-700 border-violet-200',
};

export function HiringLeadCommandDashboard() {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('thisquarter');

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hiring Lead Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Status of your open positions</p>
        </div>
        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
          <SelectTrigger className="w-[160px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thisquarter">This Quarter</SelectItem>
            <SelectItem value="lastquarter">Last Quarter</SelectItem>
            <SelectItem value="thisyear">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="My Open Positions" value={6} icon={Briefcase} gradient="bg-gradient-to-br from-blue-500 to-blue-600" />
        <MetricCard title="Candidates in Pipeline" value={47} sub="Across all roles" icon={Users} gradient="bg-gradient-to-br from-violet-500 to-purple-600" />
        <MetricCard title="Interviews This Week" value={8} icon={Calendar} gradient="bg-gradient-to-br from-emerald-500 to-teal-600" />
        <MetricCard title="Selected This Month" value={3} icon={CheckCircle2} gradient="bg-gradient-to-br from-amber-500 to-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-foreground px-1">My Job Openings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="border-0 shadow-sm hover:shadow-md transition-all border-l-2 border-l-[#7800D3]/30 cursor-pointer">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-foreground leading-snug">{job.title}</p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />{job.location}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{job.experience} exp</span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />{job.daysOpen}d open
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 bg-muted/50">
                      {job.totalCandidates} candidates
                    </Badge>
                    {job.stages.interview > 0 && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 bg-violet-50 text-violet-700 border-violet-200">
                        {job.stages.interview} Interview
                      </Badge>
                    )}
                    {job.stages.selected > 0 && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 bg-green-50 text-[#4EAD3B] border-green-200">
                        {job.stages.selected} Selected
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs text-[#7800D3] border-[#7800D3]/30 hover:bg-[#7800D3]/5 mt-3 w-full"
                    onClick={() => navigate(`/hiring-lead/jobs/${job.id}/pipeline`)}
                  >
                    View Pipeline <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Upcoming Interviews</CardTitle>
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Next 7 days</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingInterviews.map((iv, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7800D3]/70 to-[#7800D3] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">
                      {iv.candidate.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{iv.candidate}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{iv.role}</p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${interviewTypeBadge[iv.type] || 'bg-muted text-muted-foreground'}`}>
                        {iv.type}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{iv.date} · {iv.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HiringLeadCommandDashboard;
