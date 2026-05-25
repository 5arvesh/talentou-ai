import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Calendar, CheckCircle2, ChevronRight, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const jobOpenings = [
  { id: 1, title: 'Senior React Developer', location: 'Bangalore',  experience: '4–7y', totalCandidates: 12, stages: { interview: 3, selected: 1 }, daysOpen: 14 },
  { id: 2, title: 'Product Manager',        location: 'Remote',     experience: '5–8y', totalCandidates: 8,  stages: { interview: 2, selected: 0 }, daysOpen: 21 },
  { id: 3, title: 'Data Scientist',         location: 'Mumbai',     experience: '3–6y', totalCandidates: 15, stages: { interview: 4, selected: 2 }, daysOpen: 9  },
  { id: 4, title: 'DevOps Engineer',        location: 'Hyderabad',  experience: '3–5y', totalCandidates: 6,  stages: { interview: 1, selected: 0 }, daysOpen: 30 },
  { id: 5, title: 'UX Designer',            location: 'Pune',       experience: '2–5y', totalCandidates: 9,  stages: { interview: 2, selected: 0 }, daysOpen: 18 },
  { id: 6, title: 'QA Engineer',            location: 'Chennai',    experience: '2–4y', totalCandidates: 11, stages: { interview: 3, selected: 0 }, daysOpen: 7  },
];

const upcomingInterviews = [
  { candidate: 'Arun Sharma',  role: 'Senior React Developer', type: 'Technical',   date: 'Today',        time: '3:00 PM' },
  { candidate: 'Priya Nair',   role: 'Data Scientist',         type: 'HR Round',    date: 'Tomorrow',     time: '11:00 AM' },
  { candidate: 'Rahul Verma',  role: 'Senior React Developer', type: 'Final Round', date: 'Wed, 21 May',  time: '2:30 PM' },
  { candidate: 'Sneha Patel',  role: 'Product Manager',        type: 'Technical',   date: 'Thu, 22 May',  time: '4:00 PM' },
  { candidate: 'Kiran Reddy',  role: 'DevOps Engineer',        type: 'Technical',   date: 'Fri, 23 May',  time: '10:00 AM' },
];

const interviewTypeBadge: Record<string, string> = {
  Technical:    'bg-blue-50 text-blue-700 border-blue-200',
  'HR Round':   'bg-green-50 text-green-700 border-green-200',
  'Final Round':'bg-[#7800D3]/10 text-[#7800D3] border-[#7800D3]/20',
};

const kpiStats = [
  { label: 'My Open Positions',       value: 6,  sub: 'Active requisitions', subColor: 'text-muted-foreground' },
  { label: 'Candidates in Pipeline',  value: 47, sub: 'Across all roles',    subColor: 'text-muted-foreground' },
  { label: 'Interviews This Week',    value: 8,  sub: '↑ vs last week',      subColor: 'text-[#4EAD3B]' },
  { label: 'Selected This Month',     value: 3,  sub: 'Offers extended',     subColor: 'text-muted-foreground' },
];

export function HiringLeadCommandDashboard() {
  const navigate = useNavigate();

  // Sort jobs by urgency: longest open first
  const sortedJobs = [...jobOpenings].sort((a, b) => b.daysOpen - a.daysOpen);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Your Hiring Activity</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Open positions and upcoming interviews</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
        {kpiStats.map((stat) => (
          <div key={stat.label} className="bg-card px-5 py-4 flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <span className="text-2xl font-bold text-foreground">{stat.value}</span>
            <span className={`text-xs font-medium ${stat.subColor}`}>{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Job Openings */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-foreground px-1">My Job Openings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedJobs.map((job) => {
              const isStale = job.daysOpen >= 21;
              return (
                <Card key={job.id} className={`border shadow-sm hover:shadow-md transition-all cursor-pointer ${isStale ? 'border-amber-200' : 'border-border'}`}>
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-foreground leading-snug">{job.title}</p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />{job.location}
                      </span>
                      <span className="text-xs text-muted-foreground">{job.experience} exp</span>
                      <span className={`flex items-center gap-1 text-xs font-medium ${isStale ? 'text-amber-600' : 'text-muted-foreground'}`}>
                        <Clock className="h-3 w-3" />{job.daysOpen}d open
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-muted/50">
                        {job.totalCandidates} candidates
                      </Badge>
                      {job.stages.interview > 0 && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-[#7800D3]/10 text-[#7800D3] border-[#7800D3]/20">
                          {job.stages.interview} Interview
                        </Badge>
                      )}
                      {job.stages.selected > 0 && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-green-50 text-[#4EAD3B] border-green-200">
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
              );
            })}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="lg:col-span-2">
          <Card className="border border-border shadow-sm h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Upcoming Interviews</CardTitle>
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Next 7 days</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingInterviews.map((iv, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#7800D3] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">
                      {iv.candidate.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{iv.candidate}</p>
                    <p className="text-xs text-muted-foreground truncate">{iv.role}</p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <Badge variant="outline" className={`text-xs px-1.5 py-0 ${interviewTypeBadge[iv.type] || 'bg-muted text-muted-foreground'}`}>
                        {iv.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{iv.date} · {iv.time}</span>
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
