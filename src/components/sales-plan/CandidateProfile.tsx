// v2
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft, User, MapPin, Code, GraduationCap, FileText, Award, Briefcase,
  Calendar, Mail, Phone, Linkedin, Download,
  Building2, DollarSign, MessageSquare, Sparkles, ChevronDown,
  ClipboardList, ChevronLeft, ChevronRight, Search, Eye, TrendingUp, TrendingDown,
  MoreHorizontal, BarChart2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CandidateProfileProps {
  jobs: { id: number; jobRole: string }[];
}

export function CandidateProfile({ jobs }: CandidateProfileProps) {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const [notes, setNotes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isListOpen, setIsListOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const currentPath = window.location.pathname;
  const basePath = currentPath.split('/candidate-profile')[0] || '/sales-plan';

  const formatDate = (dateString: string) => {
    if (!dateString) return dateString;
    const parts = dateString.split('-');
    if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
    return dateString;
  };

  // Stub generator for candidates without detailed profiles
  const stub = (id: number, name: string, role: string, skills: string[], score: number, status: string) => {
    const [firstName, ...rest] = name.split(' ');
    const lastName = rest.join(' ');
    return {
      id, name, firstName, lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s/g, '')}@email.com`,
      phone: "+1 (555) 000-0000",
      linkedinProfile: `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase().replace(/\s/g, '')}`,
      skill: skills.join(', '), status,
      statusTooltip: "Candidate status",
      recruiter: "Alex Thompson", hiringLead: "Emma Rodriguez",
      role, interviewScheduledDate: "", interviewCompletedDate: "",
      location: "San Francisco, CA", bestTimeToCall: "9:00 AM - 5:00 PM",
      currentLocation: "San Francisco, CA", preferredWorkLocation: "Hybrid",
      keySkills: skills, desiredSkills: ["Communication", "Problem Solving", "Teamwork"],
      education: [{ year: "2018 - 2022", institution: `${role} Studies at State University`, location: "San Francisco, CA" }],
      workExperience: [{ years: "2022 - now", position: role, company: "TechCorp", duration: "2 years", location: "San Francisco, CA" }],
      certifications: [] as { name: string; issuer: string; year: string }[], awards: [] as { name: string; organization: string; year: string }[],
      resumeUrl: "", earliestJoiningDate: "2024-03-01", currentCTC: "$65,000", expectedCTC: "$75,000 - $85,000",
      jobFitScore: score,
      jobFitReason: `Good match for the ${role} position based on skills in ${skills.slice(0, 2).join(' and ')}.`,
      jobFitStrengths: skills.slice(0, 3),
      interviewScore: null as number | null, interviewReason: null as string | null,
      interviewImprovements: [] as string[],
      screeningResponses: [
        { question: "Are you open to relocation?", answer: "Open to discuss" },
        { question: "Notice period?", answer: "2–4 weeks" },
      ],
      yearsOfExperience: (id % 6) + 2,
    };
  };

  const allCandidates = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
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
      jobFitStrengths: ["React expertise", "TypeScript", "Career growth", "Certifications"],
      interviewScore: 78,
      interviewReason: "Demonstrated solid technical knowledge with clear explanations of React concepts. Good communication skills and problem-solving approach. Could improve on system design explanations and time management during complex questions.",
      interviewImprovements: ["System design", "Time management"],
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
      jobFitStrengths: ["Python", "Django", "REST APIs"],
      interviewScore: 68,
      interviewReason: "Solid understanding of backend concepts. Could benefit from more depth in system design. Communication was clear but could be more concise.",
      interviewImprovements: ["System design depth", "Conciseness"],
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
      jobFitStrengths: ["Portfolio", "User research", "Prototyping"],
      interviewScore: null,
      interviewReason: null,
      interviewImprovements: [],
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
      jobFitStrengths: ["Java", "Microservices", "Cloud", "DevOps", "Leadership"],
      interviewScore: 85,
      interviewReason: "Exceptional system design skills and deep technical knowledge. Clear communication and strong leadership qualities. Minor areas for improvement in explaining trade-offs.",
      interviewImprovements: ["Trade-off articulation"],
      screeningResponses: [
        { question: "Are you open to relocation?", answer: "Prefer remote but can relocate if needed" },
        { question: "Notice period?", answer: "45 days" },
        { question: "Team size managed?", answer: "Currently mentoring 3 junior developers" }
      ],
      yearsOfExperience: 5
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
      jobFitStrengths: ["Python", "SQL", "Analytics"],
      interviewScore: null,
      interviewReason: null,
      interviewImprovements: [],
      screeningResponses: [
        { question: "Are you open to relocation?", answer: "Yes, open to relocation within US" },
        { question: "Notice period?", answer: "3 weeks" }
      ],
      yearsOfExperience: 2
    },
    stub(6,  "Jessica Lee",      "Product Manager",           ["Product Management","Agile","Analytics","Roadmapping"], 72,  "Sourced"),
    stub(7,  "Robert Taylor",    "Senior Backend Developer",   ["Backend Development","Database Design","SQL"],         35,  "Rejected"),
    stub(8,  "Lisa Chen",        "Frontend Developer",         ["React","TypeScript","CSS","Tailwind"],                 68,  "Applied"),
    stub(9,  "Mark Anderson",    "Mobile Developer",           ["Mobile Development","React Native","iOS","Android"],   81,  "Interview"),
    stub(10, "Amanda White",     "QA Engineer",                ["QA Testing","Automation","Selenium","Cypress"],        76,  "Review"),
    stub(11, "Daniel Martinez",  "Software Engineer",          ["React","JavaScript","MongoDB","Express"],              78,  "Shortlisted"),
    stub(12, "Sophie Anderson",  "Software Engineer",          ["Vue.js","Node.js","GraphQL","Redis"],                 65,  "Applied"),
    stub(13, "Ryan Cooper",      "Software Engineer",          ["Angular","TypeScript","RxJS","Firebase"],              42,  "Rejected"),
    stub(14, "Olivia Brown",     "UX Designer",                ["Sketch","InVision","User Testing","Wireframing"],      88,  "Offered"),
    stub(15, "Lucas Williams",   "UX Designer",                ["Figma","Adobe Creative Suite","Design Systems"],       71,  "Sourced"),
    stub(16, "Ethan Garcia",     "Backend Developer",          ["Python","Django","REST APIs","MySQL"],                 83,  "Interview"),
    stub(17, "Ava Martinez",     "Backend Developer",          ["Node.js","Express","MongoDB","GraphQL"],               69,  "Applied"),
    stub(18, "Noah Rodriguez",   "Backend Developer",          ["Java","Spring","Hibernate","Oracle"],                  75,  "Withdrawn"),
    stub(19, "Isabella Thomas",  "Data Scientist",             ["R","Statistics","PyTorch","Data Visualization"],       81,  "Review"),
    stub(20, "Mason Lee",        "Data Scientist",             ["Python","Scikit-learn","Pandas","NumPy"],              79,  "Shortlisted"),
    stub(21, "Mia Taylor",       "DevOps Engineer",            ["Terraform","Jenkins","Azure","Linux"],                 86,  "Interview"),
    stub(22, "William Harris",   "DevOps Engineer",            ["Ansible","Docker","Kubernetes","GCP"],                 73,  "Applied"),
    stub(23, "James Wilson",     "Product Manager",            ["Product Strategy","Market Research","Jira","SQL"],     77,  "Review"),
    stub(24, "Charlotte Moore",  "Product Manager",            ["Product Development","Scrum","UX","Data Analysis"],   84,  "Shortlisted"),
    stub(25, "Benjamin White",   "Senior Backend Developer",   ["Scala","Kafka","Microservices","Redis"],               91,  "Interview"),
    stub(26, "Amelia Clark",     "Senior Backend Developer",   ["Go","PostgreSQL","Docker","REST APIs"],                87,  "Offered"),
    stub(27, "Harper Lewis",     "Frontend Developer",         ["Vue.js","Nuxt","SCSS","Webpack"],                      74,  "Sourced"),
    stub(28, "Elijah Walker",    "Frontend Developer",         ["React","Next.js","Styled Components","Redux"],         82,  "Review"),
    stub(29, "Abigail Hall",     "Mobile Developer",           ["Flutter","Dart","Firebase","Mobile UI"],               76,  "Shortlisted"),
    stub(30, "Alexander Young",  "Mobile Developer",           ["Swift","iOS Development","Xcode","UIKit"],             70,  "Applied"),
    stub(31, "Evelyn King",      "QA Engineer",                ["Test Automation","Jest","Playwright","API Testing"],   89,  "Offered"),
    stub(32, "Sebastian Wright", "QA Engineer",                ["Manual Testing","Selenium","TestNG","JIRA"],           67,  "Sourced"),
  ];

  const filteredCandidates = allCandidates.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const candidate = allCandidates.find(c => c.id === parseInt(candidateId || "0"));

  if (!candidate) {
    return (
      <div className="h-full p-6 bg-white flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <Button variant="outline" onClick={() => navigate(`${basePath}/candidates`)} className="mb-6 hover:bg-[#7800D3] hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Candidates
          </Button>
          <h1 className="text-2xl font-bold text-[#7800D3]">Candidate Not Found</h1>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'interview':
      case 'interview scheduled': return 'bg-blue-100 text-blue-700';
      case 'shortlisted': return 'bg-emerald-100 text-emerald-700';
      case 'applied': return 'bg-purple-100 text-purple-700';
      case 'under review': return 'bg-amber-100 text-amber-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4ead3b';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreTextClass = (score: number) => {
    if (score >= 80) return 'text-[#4ead3b]';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  // SVG ring helpers
  const r = 36;
  const circ = 2 * Math.PI * r;
  const ScoreRing = ({ score, label, icon }: { score: number; label: string; icon: React.ReactNode }) => (
    <div className="flex items-center gap-4">
      <div className="shrink-0">
        <svg width="84" height="84" viewBox="0 0 84 84">
          <circle cx="42" cy="42" r={r} fill="none" stroke="#e5e7eb" strokeWidth="7" />
          <circle
            cx="42" cy="42" r={r} fill="none"
            stroke={getScoreColor(score)} strokeWidth="7"
            strokeDasharray={circ}
            strokeDashoffset={circ - (score / 100) * circ}
            strokeLinecap="round"
            transform="rotate(-90 42 42)"
          />
          <text x="42" y="47" textAnchor="middle" fontSize="17" fontWeight="700" fill={getScoreColor(score)}>
            {score}%
          </text>
        </svg>
      </div>
      <div>
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-xs font-semibold text-[#7800D3]">{label}</span>
        </div>
        <span className={cn("text-2xl font-bold", getScoreTextClass(score))}>{score}%</span>
      </div>
    </div>
  );

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full bg-background">
      {/* Candidate List Sidebar */}
      {isListOpen && (
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-white border-r border-[#7800D3]/15">
          <div className="flex flex-col h-full bg-white">
            <div className="p-4 border-b border-[#7800D3]/15 sticky top-0 bg-white z-10">
              <Button variant="ghost" size="sm" onClick={() => navigate(`${basePath}/candidates`)} className="mb-4 -ml-2 hover:bg-transparent hover:text-[#7800D3]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h2 className="text-xl font-bold text-[#7800D3]">Candidates</h2>
              <div className="relative mt-3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search candidates..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 bg-muted/30 focus-visible:ring-[#7800D3]" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredCandidates.map(c => (
                <div
                  key={c.id}
                  onClick={() => navigate(`${basePath}/candidate-profile/${c.id}`)}
                  className={cn("p-3 rounded-lg cursor-pointer border transition-all", candidate.id === c.id ? 'border-[#7800D3] bg-[#7800D3]/5 shadow-sm' : 'border-transparent hover:bg-muted')}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center font-bold", candidate.id === c.id ? 'bg-[#7800D3] text-white' : 'bg-muted text-muted-foreground')}>
                      {c.firstName[0]}{c.lastName[0]}
                    </div>
                    <div>
                      <p className={cn("font-medium text-sm", candidate.id === c.id ? 'text-[#7800D3]' : 'text-foreground')}>{c.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{c.role}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredCandidates.length === 0 && (
                <div className="text-center p-4 text-sm text-muted-foreground">No candidates found</div>
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

      <ResizablePanel defaultSize={80} minSize={50} className="bg-background flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">

          {/* ── Header ── */}
          <div className="bg-white border-b border-[#7800D3]/15 px-6 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">

              {/* Avatar + Name + Status controls + Role + Location */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#7800D3] to-[#0A92FE] flex items-center justify-center text-white text-xl font-bold shadow shrink-0">
                  {candidate.firstName[0]}{candidate.lastName[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-lg font-bold text-[#7800D3] leading-tight">{candidate.name}</h1>
                    <Badge className={cn("text-[10px] font-semibold shrink-0", getStatusColor(candidate.status))}>
                      {candidate.status}
                    </Badge>
                    {/* Status update controls — inline with name */}
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="h-7 text-xs w-32 border-[#7800D3]/30 focus:ring-[#7800D3]/30">
                        <SelectValue placeholder="Update Status" />
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
                    <Button size="sm" className="h-7 text-xs bg-[#7800D3] hover:bg-[#6200ad] text-white px-3" disabled={!selectedStatus}>
                      Update
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Briefcase className="h-3 w-3 shrink-0" />
                    {candidate.role}
                    <span className="text-gray-300">·</span>
                    <MapPin className="h-3 w-3 shrink-0" />
                    {candidate.currentLocation}
                  </p>
                </div>
              </div>

              {/* Actions: Schedule Interview + ⋯ */}
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" className="h-8 text-xs bg-[#4ead3b] hover:bg-[#3d9630] text-white gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Schedule Interview
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
                      <Mail className="h-3.5 w-3.5" /> Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
                      <Phone className="h-3.5 w-3.5" /> Call Candidate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
                      <Linkedin className="h-3.5 w-3.5" /> View LinkedIn
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* ── Main Content ── */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left: Tabs */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="quick-stats" className="w-full">
                  <TabsList className="w-full justify-start mb-6 bg-white border border-[#7800D3]/10 shadow-sm rounded-lg p-1 flex-wrap h-auto gap-0.5">
                    <TabsTrigger value="quick-stats" className="text-xs data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Quick Stats</TabsTrigger>
                    <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Overview</TabsTrigger>
                    <TabsTrigger value="screening" className="text-xs data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Screening</TabsTrigger>
                    <TabsTrigger value="documents" className="text-xs data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Documents</TabsTrigger>
                    <TabsTrigger value="experience" className="text-xs data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Experience</TabsTrigger>
                    <TabsTrigger value="education" className="text-xs data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Education</TabsTrigger>
                    <TabsTrigger value="notes" className="text-xs data-[state=active]:bg-[#7800D3]/10 data-[state=active]:text-[#7800D3] data-[state=active]:shadow-none">Notes</TabsTrigger>
                  </TabsList>

                  {/* Quick Stats Tab */}
                  <TabsContent value="quick-stats">
                    <Card className="p-5 border-[#7800D3]/10">
                      <CardHeader className="p-0 pb-4">
                        <CardTitle className="text-base flex items-center gap-2">
                          <BarChart2 className="h-4 w-4 text-[#7800D3]" />
                          Quick Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                          {[
                            { label: "Years of Experience", value: `${candidate.yearsOfExperience} years` },
                            { label: "Work Preference", value: candidate.preferredWorkLocation },
                            { label: "Current Location", value: candidate.currentLocation },
                            { label: "Current CTC", value: candidate.currentCTC },
                            { label: "Expected CTC", value: candidate.expectedCTC },
                            { label: "Earliest Joining", value: formatDate(candidate.earliestJoiningDate) },
                            { label: "Best Time to Call", value: candidate.bestTimeToCall },
                            { label: "Email", value: candidate.email },
                            { label: "Phone", value: candidate.phone },
                            { label: "Recruiter", value: candidate.recruiter },
                            { label: "Hiring Lead", value: candidate.hiringLead },
                            ...(candidate.interviewScheduledDate
                              ? [{ label: "Interview Date", value: formatDate(candidate.interviewScheduledDate) }]
                              : []),
                          ].map(({ label, value }) => (
                            <div key={label} className="flex items-center justify-between py-3">
                              <span className="text-sm text-muted-foreground">{label}</span>
                              <span className="text-sm font-semibold text-foreground text-right max-w-[60%] break-all">{value}</span>
                            </div>
                          ))}
                          {candidate.keySkills.length > 0 && (
                            <div className="flex items-start justify-between py-3">
                              <span className="text-sm text-muted-foreground shrink-0">Key Skills</span>
                              <div className="flex flex-wrap gap-1 justify-end max-w-[65%]">
                                {candidate.keySkills.map((skill, i) => (
                                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-[#7800D3]/8 text-[#7800D3] border border-[#7800D3]/20 font-medium">{skill}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
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
                          <a href={candidate.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                            <Linkedin className="h-3 w-3" />
                            View Profile
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="p-5">
                      <CardHeader className="p-0 pb-4">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Code className="h-4 w-4 text-primary" />
                          Skills & Competencies
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 space-y-4">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-2 block">Key Skills</label>
                          <div className="flex flex-wrap gap-2">
                            {candidate.keySkills.map((skill, i) => (
                              <Badge key={i} variant="secondary" className="px-3 py-1">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-2 block">Desired Skills</label>
                          <div className="flex flex-wrap gap-2">
                            {candidate.desiredSkills.map((skill, i) => (
                              <Badge key={i} variant="outline" className="px-3 py-1">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

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
                          {candidate.screeningResponses.map((r, i) => (
                            <div key={i} className="p-4 bg-muted/30 rounded-lg">
                              <p className="text-sm font-medium text-foreground mb-2">{r.question}</p>
                              <p className="text-sm text-muted-foreground bg-background p-3 rounded border">{r.answer}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Documents Tab */}
                  <TabsContent value="documents" className="space-y-4">
                    <Card className="p-5 border-[#7800D3]/20 shadow-sm">
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
                          <div className="w-full flex-1 overflow-y-auto bg-[#e5e5e5] p-8 pb-12 flex justify-center">
                            <div className="w-full max-w-[800px] bg-white shadow-lg p-12 text-black font-sans aspect-[1/1.4] transform origin-top scale-[0.85] md:scale-100">
                              <h1 className="text-3xl font-bold border-b-2 border-primary/30 pb-4 mb-6 text-gray-900">{candidate.name}</h1>
                              <div className="text-sm text-gray-600 mb-8 flex gap-4 font-medium">
                                <span>{candidate.email}</span><span>•</span>
                                <span>{candidate.phone}</span><span>•</span>
                                <span>{candidate.currentLocation}</span>
                              </div>
                              <h2 className="text-xl font-bold text-[#7800D3] uppercase tracking-wider mb-4">Summary</h2>
                              <p className="text-gray-700 leading-relaxed mb-8">
                                A highly motivated {candidate.role} with {candidate.yearsOfExperience} years of experience. Passionate about leveraging cutting-edge technologies to solve complex problems and deliver robust solutions.
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
                                  </div>
                                ))}
                              </div>
                              <h2 className="text-xl font-bold text-[#7800D3] uppercase tracking-wider mb-4">Education</h2>
                              <div className="space-y-4">
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

                  {/* Experience Tab */}
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
                          {candidate.workExperience.map((work, i) => (
                            <div key={i} className="relative pl-6 pb-6 last:pb-0 border-l-2 border-primary/20 last:border-l-0">
                              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary/20 border-2 border-primary" />
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-foreground">{work.position}</h4>
                                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Building2 className="h-3 w-3" />{work.company}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-foreground">{work.years}</p>
                                  <p className="text-xs text-muted-foreground">{work.duration}</p>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />{work.location}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
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
                            {candidate.certifications.map((cert, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
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

                  {/* Education Tab */}
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
                          {candidate.education.map((edu, i) => (
                            <div key={i} className="p-4 bg-muted/30 rounded-lg">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-foreground">{edu.institution}</p>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" />{edu.location}
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

                  {/* Notes Tab */}
                  <TabsContent value="notes">
                    <Card className="p-5">
                      <CardHeader className="p-0 pb-4">
                        <CardTitle className="text-base flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-primary" />
                          Notes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-xs text-muted-foreground mb-3">Add your personal observations or notes about this candidate.</p>
                        <Textarea
                          placeholder="Add notes about this candidate..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="min-h-[140px] border-[#7800D3]/20 focus-visible:ring-[#7800D3]/30"
                        />
                        <Button variant="outline" className="mt-3 border-[#7800D3]/30 text-[#7800D3] hover:bg-[#7800D3]/10" disabled={!notes.trim()}>
                          Save Note
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right: Score cards */}
              <div className="space-y-4">

                {/* Job Fit Score */}
                <div className="bg-white border-2 border-[#7800D3]/20 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#7800D3]" />
                    <span className="text-sm font-semibold text-[#7800D3]">Job Fit Score</span>
                  </div>

                  <ScoreRing score={candidate.jobFitScore} label="CV vs JD match" icon={<FileText className="h-3.5 w-3.5" />} />

                  <div className="bg-[#f5efff] rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-[#7800D3] mb-1.5">AI Reasoning</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{candidate.jobFitReason}</p>
                  </div>

                  {candidate.jobFitStrengths && candidate.jobFitStrengths.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <TrendingUp className="h-3.5 w-3.5 text-[#4ead3b]" />
                        <span className="text-xs font-semibold text-[#7800D3]">Matching Strengths</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {candidate.jobFitStrengths.map((s, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Interview Score */}
                {candidate.interviewScore !== null && (
                  <div className="bg-white border-2 border-[#7800D3]/20 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#7800D3]" />
                      <span className="text-sm font-semibold text-[#7800D3]">AI Interview Score</span>
                    </div>

                    <ScoreRing score={candidate.interviewScore} label="AI assessment" icon={<Sparkles className="h-3.5 w-3.5" />} />

                    <div className="bg-[#f5efff] rounded-lg p-3">
                      <p className="text-[10px] font-semibold text-[#7800D3] mb-1.5">AI Reasoning</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{candidate.interviewReason}</p>
                    </div>

                    {candidate.interviewImprovements && candidate.interviewImprovements.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <TrendingDown className="h-3.5 w-3.5 text-amber-500" />
                          <span className="text-xs font-semibold text-[#7800D3]">Areas to Improve</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {candidate.interviewImprovements.map((imp, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">{imp}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* No interview yet placeholder */}
                {candidate.interviewScore === null && (
                  <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
                    <Sparkles className="h-6 w-6 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs font-medium text-muted-foreground">Interview not yet completed</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">AI score will appear here after the interview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
