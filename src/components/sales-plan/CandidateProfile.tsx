import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ArrowLeft, User, MapPin, Code, GraduationCap, FileText, Award, Briefcase,
  Calendar, Mail, Phone, Linkedin, Download,
  Building2, DollarSign, MessageSquare, Sparkles, ChevronDown, ChevronUp,
  ClipboardList, ChevronLeft, ChevronRight, Search, Eye, MoreHorizontal,
  UserCheck, XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";

interface CandidateProfileProps {
  jobs: { id: number; jobRole: string }[];
}

export function CandidateProfile({ jobs }: CandidateProfileProps) {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const [notes, setNotes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [jobFitReasonOpen, setJobFitReasonOpen] = useState(false);
  const [interviewReasonOpen, setInterviewReasonOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const currentPath = window.location.pathname;
  const basePath = currentPath.split('/candidate-profile')[0] || '/sales-plan';

  // Helper function to format date from YYYY-MM-DD to DD-MM-YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return dateString;
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  // Mock candidates data
  const allCandidates = [
    {
      id: 1,
      name: "Samarth Upadhyay",
      email: "samarthupadhyay29@gmail.com",
      phone: "+919461982714",
      linkedinProfile: "https://linkedin.com/in/samarthupadhyay",
      skill: "React, Node.js, TypeScript",
      status: "Interview",
      statusTooltip: "Interview scheduled for next week",
      recruiter: "Alice Johnson",
      hiringLead: "Bob Smith",
      role: "Frontend Developer",
      interviewScheduledDate: "2024-01-25",
      interviewCompletedDate: "",
      location: "H.no.- 8, Gokul Villa, Banswara, Rajasthan, 327001",
      firstName: "Samarth",
      lastName: "Upadhyay",
      bestTimeToCall: "10:00 AM - 6:00 PM",
      currentLocation: "Banswara, Rajasthan",
      preferredWorkLocation: "Remote/Hybrid",
      keySkills: ["React", "Node.js", "TypeScript", "MongoDB", "Express.js"],
      desiredSkills: ["Team Leadership", "Communication", "Problem Solving"],
      education: [
        { year: "2016 - 2021", institution: "B.Pharm in Pharma Tech at NIMS University", location: "Jaipur, Rajasthan" },
        { year: "2014", institution: "St. Paul's Sr. Secondary School", location: "Banswara, Rajasthan" },
        { year: "2012", institution: "New Look Sr. Secondary School", location: "Banswara, Rajasthan" }
      ],
      workExperience: [
        { years: "2021 - now", position: "Research Analyst", company: "MarketandMarkets", duration: "4 years 7 months", location: "Pune, Maharashtra" },
        { years: "2020 - 2021", position: "Sales and Marketing Intern", company: "Alembic Pharmaceuticals", duration: "5 months", location: "Vadodara, Gujarat" },
        { years: "2019 - 2020", position: "Technical Intern", company: "Pyramid Pharma Solutions", duration: "2 months", location: "Mumbai, Maharashtra" },
        { years: "2018 - 2019", position: "Business Intern", company: "Mayfield Wellness Pvt. Ltd", duration: "2 months", location: "Delhi, India" }
      ],
      certifications: [
        { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
        { name: "React Developer Certification", issuer: "Meta", year: "2022" },
        { name: "Node.js Application Development", issuer: "IBM", year: "2022" }
      ],
      awards: [
        { name: "Employee of the Year", organization: "MarketandMarkets", year: "2023" },
        { name: "Best Innovation Award", organization: "Tech Conference 2022", year: "2022" }
      ],
      resumeUrl: "/path/to/samarth_resume.pdf",
      earliestJoiningDate: "2024-03-01",
      currentCTC: "$65,000",
      expectedCTC: "$75,000 - $85,000",
      jobFitScore: 87,
      jobFitReason: "Strong match on required React and TypeScript skills. 4+ years experience exceeds minimum requirement. Previous work in e-commerce aligns with company domain. Resume shows consistent career growth and relevant certifications.",
      interviewScore: 78,
      interviewReason: "Demonstrated solid technical knowledge with clear explanations of React concepts. Good communication skills and problem-solving approach. Could improve on system design explanations and time management during complex questions.",
      screeningResponses: [
        { question: "Are you open to relocation?", answer: "Yes, willing to relocate to Bangalore or Pune" },
        { question: "Notice period?", answer: "30 days" },
        { question: "Why are you looking for a change?", answer: "Looking for growth opportunities and challenging projects in a product-based company" },
        { question: "Expected CTC?", answer: "75-85 LPA based on role and responsibilities" }
      ],
      yearsOfExperience: 4.5
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1234567890",
      linkedinProfile: "https://linkedin.com/in/johnsmith",
      skill: "Python, Django, SQL",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation",
      recruiter: "Jane Doe",
      hiringLead: "Mike Wilson",
      role: "Backend Developer",
      interviewScheduledDate: "2024-02-01",
      interviewCompletedDate: "",
      location: "New York, NY, 10001",
      firstName: "John",
      lastName: "Smith",
      bestTimeToCall: "9:00 AM - 5:00 PM",
      currentLocation: "New York, NY",
      preferredWorkLocation: "On-site",
      keySkills: ["Python", "Django", "PostgreSQL", "REST APIs", "Docker"],
      desiredSkills: ["Analytical Thinking", "Collaboration", "Time Management"],
      education: [
        { year: "2018 - 2022", institution: "Computer Science at NYU", location: "New York, NY" },
        { year: "2016", institution: "Brooklyn High School", location: "Brooklyn, NY" }
      ],
      workExperience: [
        { years: "2022 - now", position: "Software Developer", company: "TechCorp", duration: "2 years", location: "New York, NY" },
        { years: "2021 - 2022", position: "Intern", company: "StartupXYZ", duration: "6 months", location: "New York, NY" }
      ],
      certifications: [],
      awards: [],
      earliestJoiningDate: "2024-02-15",
      currentCTC: "$70,000",
      expectedCTC: "$80,000 - $90,000",
      jobFitScore: 72,
      jobFitReason: "Good match on Python and Django skills. 2 years experience meets minimum requirement. Limited exposure to cloud technologies which is a nice-to-have for this role.",
      interviewScore: 68,
      interviewReason: "Solid understanding of backend concepts. Could benefit from more depth in system design. Communication was clear but could be more concise.",
      screeningResponses: [
        { question: "Are you open to relocation?", answer: "Prefer to stay in NYC area" },
        { question: "Notice period?", answer: "2 weeks" },
        { question: "Why are you looking for a change?", answer: "Seeking more challenging technical problems" }
      ],
      yearsOfExperience: 2
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1987654321",
      linkedinProfile: "https://linkedin.com/in/emilydavis",
      skill: "Figma, Adobe XD, UI/UX",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application",
      recruiter: "Sarah Johnson",
      hiringLead: "David Wilson",
      role: "UX Designer",
      interviewScheduledDate: "",
      interviewCompletedDate: "",
      location: "San Francisco, CA, 94102",
      firstName: "Emily",
      lastName: "Davis",
      bestTimeToCall: "11:00 AM - 7:00 PM",
      currentLocation: "San Francisco, CA",
      preferredWorkLocation: "Hybrid",
      keySkills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      desiredSkills: ["Creativity", "Empathy", "Attention to Detail"],
      education: [
        { year: "2017 - 2021", institution: "Design Studies at RISD", location: "Providence, RI" },
        { year: "2015", institution: "Art High School", location: "San Francisco, CA" }
      ],
      workExperience: [
        { years: "2021 - now", position: "UX Designer", company: "DesignStudio", duration: "3 years", location: "San Francisco, CA" },
        { years: "2020 - 2021", position: "Design Intern", company: "Creative Agency", duration: "8 months", location: "San Francisco, CA" }
      ],
      certifications: [],
      awards: [],
      earliestJoiningDate: "2024-03-15",
      currentCTC: "$62,000",
      expectedCTC: "$70,000 - $80,000",
      jobFitScore: 65,
      jobFitReason: "Strong design portfolio with relevant experience. Good understanding of user research methodologies. Limited experience with enterprise-level design systems.",
      interviewScore: null,
      interviewReason: null,
      screeningResponses: [
        { question: "Are you open to relocation?", answer: "Yes, open to remote or relocation" },
        { question: "Portfolio link?", answer: "www.emilydavisdesign.com" }
      ],
      yearsOfExperience: 3
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+1555666777",
      linkedinProfile: "https://linkedin.com/in/michaelbrown",
      skill: "Java, Spring Boot, Microservices",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate",
      recruiter: "Lisa Zhang",
      hiringLead: "Emma Rodriguez",
      role: "Senior Developer",
      interviewScheduledDate: "2024-01-30",
      interviewCompletedDate: "",
      location: "Austin, TX, 78701",
      firstName: "Michael",
      lastName: "Brown",
      bestTimeToCall: "8:00 AM - 4:00 PM",
      currentLocation: "Austin, TX",
      preferredWorkLocation: "Remote",
      keySkills: ["Java", "Spring Framework", "Kubernetes", "AWS", "Jenkins"],
      desiredSkills: ["Leadership", "Mentoring", "Strategic Thinking"],
      education: [
        { year: "2015 - 2019", institution: "Software Engineering at UT Austin", location: "Austin, TX" },
        { year: "2013", institution: "Austin High School", location: "Austin, TX" }
      ],
      workExperience: [
        { years: "2019 - now", position: "Senior Software Engineer", company: "BigTech", duration: "5 years", location: "Austin, TX" },
        { years: "2018 - 2019", position: "Software Engineer Intern", company: "TechGiant", duration: "1 year", location: "Austin, TX" }
      ],
      certifications: [],
      awards: [],
      earliestJoiningDate: "2024-02-01",
      currentCTC: "$85,000",
      expectedCTC: "$95,000 - $110,000",
      jobFitScore: 92,
      jobFitReason: "Excellent match on all required skills including Java, Spring, and microservices. 5 years of senior-level experience exceeds requirements. Strong cloud and DevOps background is a great fit.",
      interviewScore: 85,
      interviewReason: "Exceptional system design skills and deep technical knowledge. Clear communication and strong leadership qualities. Minor areas for improvement in explaining trade-offs.",
      screeningResponses: [
        { question: "Are you open to relocation?", answer: "Prefer remote but can relocate if needed" },
        { question: "Notice period?", answer: "45 days" },
        { question: "Team size managed?", answer: "Currently mentoring 3 junior developers" }
      ],
      yearsOfExperience: 5
    },
    {
      id: 6,
      name: "Sivabharath H",
      email: "sivabharath.h@example.com",
      phone: "+91 98765 43210",
      linkedinProfile: "https://linkedin.com/in/sivabharath",
      skill: "Premiere Pro, After Effects, DaVinci Resolve",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application",
      recruiter: "Priya Kumar",
      hiringLead: "Ananthan M",
      role: "Video Editor",
      interviewScheduledDate: "",
      interviewCompletedDate: "",
      location: "Karur, Tamil Nadu, 639001",
      firstName: "Sivabharath",
      lastName: "H",
      bestTimeToCall: "10:00 AM - 6:00 PM",
      currentLocation: "Karur, Tamil Nadu",
      preferredWorkLocation: "Hybrid",
      keySkills: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Color Grading", "Motion Graphics"],
      desiredSkills: ["Storytelling", "Creativity", "Attention to Detail"],
      education: [
        { year: "2019 - 2023", institution: "B.Sc Visual Communication at Bharathidasan University", location: "Tiruchirappalli, Tamil Nadu" },
        { year: "2017 - 2019", institution: "Govt. Higher Secondary School", location: "Karur, Tamil Nadu" }
      ],
      workExperience: [
        { years: "2023 - now", position: "Video Editor", company: "Digital Wave Studios", duration: "1 year 5 months", location: "Chennai, Tamil Nadu" },
        { years: "2022 - 2023", position: "Video Editing Intern", company: "Pixel Media", duration: "6 months", location: "Coimbatore, Tamil Nadu" }
      ],
      certifications: [
        { name: "Adobe Certified Professional – Premiere Pro", issuer: "Adobe", year: "2023" }
      ],
      awards: [],
      resumeUrl: "/path/to/sivabharath_resume.pdf",
      earliestJoiningDate: "2024-04-01",
      currentCTC: "₹4,20,000",
      expectedCTC: "₹6,00,000 - ₹7,50,000",
      jobFitScore: 82,
      jobFitReason: "Strong match on core video editing tools — Premiere Pro and After Effects are exact requirements. Color grading experience is a strong plus. 1.5 years of direct experience fits the 1-3 year requirement window.",
      interviewScore: null,
      interviewReason: null,
      screeningResponses: [
        { question: "Are you willing to relocate or work remotely?", answer: "Open to hybrid — can come to office 2-3 days a week." },
        { question: "Notice period?", answer: "30 days" },
        { question: "Do you have experience editing long-form content (>30 min)?", answer: "Yes, edited multiple short films and YouTube series averaging 45 minutes per episode." }
      ],
      yearsOfExperience: 1.5
    },
    {
      id: 5,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1444555666",
      linkedinProfile: "https://linkedin.com/in/sarahwilson",
      skill: "Python, Pandas, Machine Learning",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team",
      recruiter: "Alex Thompson",
      hiringLead: "Maria Garcia",
      role: "Data Analyst",
      interviewScheduledDate: "",
      interviewCompletedDate: "",
      location: "Seattle, WA, 98101",
      firstName: "Sarah",
      lastName: "Wilson",
      bestTimeToCall: "10:00 AM - 6:00 PM",
      currentLocation: "Seattle, WA",
      preferredWorkLocation: "Hybrid",
      keySkills: ["Python", "SQL", "Tableau", "Machine Learning", "Statistics"],
      desiredSkills: ["Data-driven Decision Making", "Presentation Skills", "Curiosity"],
      education: [
        { year: "2018 - 2022", institution: "Data Science at University of Washington", location: "Seattle, WA" },
        { year: "2016", institution: "Seattle Prep School", location: "Seattle, WA" }
      ],
      workExperience: [
        { years: "2022 - now", position: "Data Analyst", company: "DataCorp", duration: "2 years", location: "Seattle, WA" },
        { years: "2021 - 2022", position: "Research Assistant", company: "UW", duration: "1 year", location: "Seattle, WA" }
      ],
      certifications: [],
      awards: [],
      earliestJoiningDate: "2024-04-01",
      currentCTC: "$58,000",
      expectedCTC: "$65,000 - $75,000",
      jobFitScore: 78,
      jobFitReason: "Good match on Python, SQL, and analytics skills. Data science background is relevant. Could benefit from more experience with big data technologies.",
      interviewScore: null,
      interviewReason: null,
      screeningResponses: [
        { question: "Are you open to relocation?", answer: "Yes, open to relocation within US" },
        { question: "Notice period?", answer: "3 weeks" }
      ],
      yearsOfExperience: 2
    }
  ];

  const filteredCandidates = allCandidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const parsedId = parseInt(candidateId || "0");
  const candidate = parsedId > 0
    ? (allCandidates.find(c => c.id === parsedId) ?? allCandidates[(parsedId - 1) % allCandidates.length])
    : undefined;

  if (!candidate) {
    return (
      <div className="h-[calc(100vh-64px)] bg-white flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <div className="h-16 w-16 rounded-full bg-[#7800D3]/10 flex items-center justify-center mx-auto mb-5">
            <User className="h-8 w-8 text-[#7800D3]/50" />
          </div>
          <h2 className="text-xl font-semibold text-[#7800D3] mb-2">We couldn't load this profile</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            The candidate profile you're looking for may have been removed or is no longer available.
          </p>
          <Button
            onClick={() => navigate(`${basePath}/candidates`)}
            className="bg-[#7800D3] hover:bg-[#7800D3]/90 text-white gap-2"
          >
            <ArrowLeft size={16} />
            Back to Candidates
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'interview':
      case 'interview scheduled':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'shortlisted':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'applied':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'under review':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-emerald-500/20 to-emerald-500/5';
    if (score >= 60) return 'from-amber-500/20 to-amber-500/5';
    return 'from-red-500/20 to-red-500/5';
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-64px)] bg-background">
      {/* Candidate List Sidebar */}
      {isListOpen && (
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-white border-r border-[#7800D3]/15">
          <div className="flex flex-col h-full bg-white">
            <div className="p-4 border-b border-[#7800D3]/15 sticky top-0 bg-white z-10">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(`${basePath}/candidates`)} 
                className="mb-4 -ml-2 hover:bg-transparent hover:text-[#7800D3]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h2 className="text-xl font-bold text-[#7800D3]">Candidates</h2>
              <div className="relative mt-3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search candidates..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 bg-muted/30 focus-visible:ring-[#7800D3]" 
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredCandidates.map(c => (
                <div 
                  key={c.id} 
                  onClick={() => navigate(`${basePath}/candidate-profile/${c.id}`)}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer border transition-all", 
                    candidate.id === c.id 
                      ? 'border-[#7800D3] bg-[#7800D3]/5 shadow-sm' 
                      : 'border-transparent hover:bg-muted'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center font-bold", 
                      candidate.id === c.id ? 'bg-[#7800D3] text-white' : 'bg-muted text-muted-foreground'
                    )}>
                      {c.firstName[0]}{c.lastName[0]}
                    </div>
                    <div>
                      <p className={cn(
                        "font-medium text-sm", 
                        candidate.id === c.id ? 'text-[#7800D3]' : 'text-foreground'
                      )}>
                        {c.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{c.role}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredCandidates.length === 0 && (
                <div className="text-center p-4 text-sm text-muted-foreground">
                  No candidates found
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>
      )}

      <ResizableHandle>
        <div 
          className="absolute z-50 flex h-6 w-5 items-center justify-center rounded-full border border-gray-200 bg-white cursor-pointer shadow-md text-gray-500 hover:text-gray-800 hover:bg-gray-50"
          onClick={() => setIsListOpen(!isListOpen)}
          title="Toggle Candidates List"
        >
          {isListOpen ? <ChevronLeft className="h-4 w-4 pr-0.5" /> : <ChevronRight className="h-4 w-4 pl-0.5" />}
        </div>
      </ResizableHandle>

      <ResizablePanel defaultSize={80} minSize={50} className="bg-background flex flex-col h-[calc(100vh-64px)]">
          {/* Sticky Header */}
          <div className="bg-white border-b border-[#7800D3]/20 shadow-sm relative overflow-hidden sticky top-0 z-20 shrink-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7800D3]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-5">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-lg">
                {candidate.firstName[0]}{candidate.lastName[0]}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-[#7800D3]">{candidate.name}</h1>
                  <Badge className={cn("text-xs font-semibold", getStatusColor(candidate.status))}>
                    {candidate.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {candidate.role}
                </p>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  {candidate.currentLocation}
                </p>
              </div>
            </div>

            {/* Dual Score Cards */}
            <div className="lg:ml-auto flex flex-wrap gap-4">
              {/* Job Fit Score */}
              <Collapsible open={jobFitReasonOpen} onOpenChange={setJobFitReasonOpen}>
                <Card className={cn("p-4 border-2 min-w-[200px]", `bg-gradient-to-br ${getScoreBg(candidate.jobFitScore)}`)}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-muted" />
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={`${(candidate.jobFitScore) * 1.76} 176`} className={getScoreColor(candidate.jobFitScore)} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={cn("text-lg font-bold", getScoreColor(candidate.jobFitScore))}>{candidate.jobFitScore}%</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Job Fit Score
                        </p>
                        <p className="text-xs text-muted-foreground">CV vs JD match</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                          {jobFitReasonOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          <span>View reason</span>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground leading-relaxed">{candidate.jobFitReason}</p>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* AI Interview Score */}
              {candidate.interviewScore !== null && (
                <Collapsible open={interviewReasonOpen} onOpenChange={setInterviewReasonOpen}>
                  <Card className={cn("p-4 border-2 min-w-[200px]", `bg-gradient-to-br ${getScoreBg(candidate.interviewScore)}`)}>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <svg className="w-16 h-16 transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-muted" />
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={`${(candidate.interviewScore) * 1.76} 176`} className={getScoreColor(candidate.interviewScore)} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={cn("text-lg font-bold", getScoreColor(candidate.interviewScore))}>{candidate.interviewScore}%</span>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            Interview Score
                          </p>
                          <p className="text-xs text-muted-foreground">AI assessment</p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                            {interviewReasonOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            <span>View reason</span>
                          </div>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground leading-relaxed">{candidate.interviewReason}</p>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" className="gap-2 bg-[#7800D3] hover:bg-[#7800D3]/90 text-white shadow-sm">
                <Calendar className="h-4 w-4" />
                Schedule Interview
              </Button>
              <Button size="sm" variant="outline" className="gap-2 border-[#7800D3]/30 text-[#7800D3] hover:bg-[#7800D3]/10">
                <UserCheck className="h-4 w-4" />
                Move to Next Stage
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="border-[#7800D3]/30 text-[#7800D3] hover:bg-[#7800D3]/10 px-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Mail className="h-4 w-4" /> Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Phone className="h-4 w-4" /> Call Candidate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-600">
                    <XCircle className="h-4 w-4" /> Reject Candidate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-white border border-[#7800D3]/10 shadow-sm rounded-lg p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Overview</TabsTrigger>
                <TabsTrigger value="screening" className="data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Screening</TabsTrigger>
                <TabsTrigger value="documents" className="data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Documents</TabsTrigger>
                <TabsTrigger value="experience" className="data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Experience</TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Contact Info */}
                <Card className="p-5">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Email</label>
                      <p className="text-sm text-foreground">{candidate.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Phone</label>
                      <p className="text-sm text-foreground">{candidate.phone}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Best Time to Call</label>
                      <p className="text-sm text-foreground">{candidate.bestTimeToCall}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">LinkedIn</label>
                      <a 
                        href={candidate.linkedinProfile} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Linkedin className="h-3 w-3" />
                        View Profile
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="p-5">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      Skills & Competencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Must Have</label>
                      <div className="flex flex-wrap gap-2">
                        {candidate.keySkills.map((skill, index) => (
                          <Badge key={index} className="px-3 py-1 bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-100 font-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Desired Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {candidate.desiredSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compensation */}
                <Card className="p-5">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      Compensation Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Current CTC</label>
                      <p className="text-sm font-semibold text-foreground">{candidate.currentCTC}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Expected CTC</label>
                      <p className="text-sm font-semibold text-foreground">{candidate.expectedCTC}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Earliest Joining</label>
                      <p className="text-sm font-semibold text-foreground">{formatDate(candidate.earliestJoiningDate)}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Screening Tab */}
              <TabsContent value="screening" className="space-y-6">
                <Card className="p-5">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-primary" />
                      Screening Responses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {candidate.screeningResponses.map((response, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium text-foreground mb-2">{response.question}</p>
                          <p className="text-sm text-muted-foreground bg-background p-3 rounded border">
                            {response.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card className="p-5 border-[#7800D3]/20 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base flex items-center gap-2 text-[#7800D3]">
                      <FileText className="h-4 w-4" />
                      Applicant Resume
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center justify-between p-4 border border-[#7800D3]/20 bg-[#7800D3]/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[#7800D3]/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-[#7800D3]" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{candidate.firstName}_Resume.pdf</p>
                          <p className="text-xs text-muted-foreground">Uploaded on {formatDate("2024-01-15")} · 1.2 MB</p>
                        </div>
                      </div>
                      <Button size="sm" className="gap-2 bg-[#7800D3] hover:bg-[#7800D3]/90 text-white shadow-sm">
                        <Download className="h-4 w-4" />
                        Download CV
                      </Button>
                    </div>

                    {/* CV Preview Image Mock */}
                    <div className="w-full h-[600px] border border-border rounded-lg bg-muted/30 overflow-hidden relative flex flex-col items-center">
                      <div className="w-full border-b border-border bg-white px-4 py-2 flex items-center gap-2 shadow-sm z-10">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground shrink-0">CV Preview</span>
                        <div className="h-4 w-px bg-border mx-2" />
                        <span className="text-xs text-muted-foreground truncate">{candidate.firstName}_{candidate.lastName}_Resume_Final_2024.pdf</span>
                        <Button variant="ghost" size="sm" className="ml-auto gap-2 text-primary hover:bg-primary/5">
                          <Eye className="h-4 w-4" /> Open Full
                        </Button>
                      </div>
                      
                      {/* Fake Resume Content to look like a CV */}
                      <div className="w-full flex-1 overflow-y-auto bg-[#e5e5e5] p-8 pb-12 flex justify-center">
                        <div className="w-full max-w-[800px] bg-white shadow-lg p-12 text-black font-sans aspect-[1/1.4] transform origin-top scale-[0.85] md:scale-100">
                          <h1 className="text-3xl font-bold border-b-2 border-primary/30 pb-4 mb-6 text-gray-900">{candidate.name}</h1>
                          
                          <div className="text-sm text-gray-600 mb-8 flex gap-4 font-medium">
                            <span>{candidate.email}</span>
                            <span>•</span>
                            <span>{candidate.phone}</span>
                            <span>•</span>
                            <span>{candidate.currentLocation}</span>
                          </div>

                          <h2 className="text-xl font-bold text-[#7800D3] uppercase tracking-wider mb-4">Summary</h2>
                          <p className="text-gray-700 leading-relaxed mb-8">
                            A highly motivated and results-driven {candidate.role} with {candidate.yearsOfExperience} years of experience in the industry. 
                            Passionate about leveraging cutting-edge technologies to solve complex problems and deliver robust solutions. 
                            Proven track record of success working within cross-functional teams to exceed expectations.
                          </p>

                          <h2 className="text-xl font-bold text-[#7800D3] uppercase tracking-wider mb-4">Experience</h2>
                          <div className="space-y-6 mb-8">
                            {candidate.workExperience.map((exp, i) => (
                              <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                  <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                                  <span className="text-sm text-gray-500 font-medium">{exp.years}</span>
                                </div>
                                <h4 className="text-md text-gray-600 font-medium mb-2">{exp.company} | {exp.location}</h4>
                                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                                  <li>Spearheaded key initiatives driving 30% operational efficiency improvement.</li>
                                  <li>Collaborated with {exp.company} stakeholders to align technical capabilities with business goals.</li>
                                  <li>Consistently maintained high performance and met all project deadlines throughout the {exp.duration} tenure.</li>
                                </ul>
                              </div>
                            ))}
                          </div>

                          <h2 className="text-xl font-bold text-[#7800D3] uppercase tracking-wider mb-4">Education</h2>
                          <div className="space-y-4 mb-8">
                            {candidate.education.map((edu, i) => (
                              <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                  <h3 className="text-md font-bold text-gray-800">{edu.institution}</h3>
                                  <span className="text-sm text-gray-500">{edu.year}</span>
                                </div>
                                <h4 className="text-sm text-gray-600">{edu.location}</h4>
                              </div>
                            ))}
                          </div>

                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Card className="p-5">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Work Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-6">
                      {candidate.workExperience.map((work, index) => (
                        <div key={index} className="relative pl-6 pb-6 last:pb-0 border-l-2 border-primary/20 last:border-l-0">
                          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary/20 border-2 border-primary" />
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{work.position}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Building2 className="h-3 w-3" />
                                {work.company}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-foreground">{work.years}</p>
                              <p className="text-xs text-muted-foreground">{work.duration}</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {work.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                {candidate.certifications && candidate.certifications.length > 0 && (
                  <Card className="p-5">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-3">
                        {candidate.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div>
                              <p className="font-medium text-foreground">{cert.name}</p>
                              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                            </div>
                            <Badge variant="outline">{cert.year}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Card className="p-5">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Educational Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {candidate.education.map((edu, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-foreground">{edu.institution}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {edu.location}
                              </p>
                            </div>
                            <Badge variant="outline">{edu.year}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents tab removed from here to insert above Experience */}
            </Tabs>
          </div>

          {/* Right Column - Actions Sidebar */}
          <div className="space-y-6">
            {/* Status Update */}
            <Card className="p-5">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-base">Update Status</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer Extended</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full mt-3 bg-[#7800D3] hover:bg-[#7800D3]/90 text-white" disabled={!selectedStatus}>
                  Update Status
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="p-5">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <span className="font-semibold text-foreground">{candidate.yearsOfExperience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Work Preference</span>
                  <span className="font-semibold text-foreground">{candidate.preferredWorkLocation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Recruiter</span>
                  <span className="font-semibold text-foreground">{candidate.recruiter}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Hiring Lead</span>
                  <span className="font-semibold text-foreground">{candidate.hiringLead}</span>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="p-5">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea 
                  placeholder="Add notes about this candidate..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button variant="outline" className="w-full mt-3" disabled={!notes.trim()}>
                  Save Note
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
