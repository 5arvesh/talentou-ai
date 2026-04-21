import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, Link, CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ModernCandidateList, CandidateItem } from "../shared/ModernCandidateList";

interface Job {
  id: number;
  jobRole: string;
}

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  skills: string[];
  status: string;
  statusTooltip: string;
  interviewer: string;
  jobTitle: string;
  hasRecording: boolean;
  roleFitScore: number;
}

interface CandidatesPageSalesPlanProps {
  jobs: Job[];
}

export function CandidatesPageSalesPlan({ jobs }: CandidatesPageSalesPlanProps) {
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [scheduleSheetOpen, setScheduleSheetOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [interviewExpiryDate, setInterviewExpiryDate] = useState<Date | undefined>();
  const [questionnaireName, setQuestionnaireName] = useState("");
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Helper functions for schedule interview
  const handleScheduleInterview = (candidate: any, isReschedule: boolean = false) => {
    setSelectedCandidate(candidate);
    setIsRescheduling(isReschedule);
    setQuestionnaireName("");
    setInterviewExpiryDate(undefined);
    setScheduleSheetOpen(true);
  };

  const handleCopyInterviewLink = (candidate: Candidate) => {
    const link = `${window.location.origin}/interview/${candidate.id}`;
    navigator.clipboard.writeText(link);
    toast.success("Interview link copied to clipboard");
  };

  const handleSubmitSchedule = () => {
    if (!interviewExpiryDate) return;
    toast.success(isRescheduling ? "Interview rescheduled successfully" : "Interview scheduled successfully");
    setScheduleSheetOpen(false);
    setSelectedCandidate(null);
    setQuestionnaireName("");
    setInterviewExpiryDate(undefined);
  };

  const [allCandidates] = useState<Candidate[]>([
    // Software Engineer candidates
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      linkedinProfile: "linkedin.com/in/johnsmith",
      skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
      status: "Interview",
      statusTooltip: "Interview has been scheduled with the candidate.",
      interviewer: "Alex Thompson",
      jobTitle: "Software Engineer",
      hasRecording: true,
      roleFitScore: 85,
    },
    {
      id: 11,
      name: "Daniel Martinez",
      email: "daniel.martinez@email.com",
      phone: "+1 (555) 111-2222",
      linkedinProfile: "linkedin.com/in/danielmartinez",
      skills: ["React", "JavaScript", "MongoDB", "Express"],
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for the position.",
      interviewer: "Alex Thompson",
      jobTitle: "Software Engineer",
      hasRecording: false,
      roleFitScore: 78,
    },
    {
      id: 12,
      name: "Sophie Anderson",
      email: "sophie.anderson@email.com",
      phone: "+1 (555) 222-3333",
      linkedinProfile: "linkedin.com/in/sophieanderson",
      skills: ["Vue.js", "Node.js", "GraphQL", "Redis"],
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      interviewer: "Not Assigned",
      jobTitle: "Software Engineer",
      hasRecording: false,
      roleFitScore: 65,
    },
    {
      id: 13,
      name: "Ryan Cooper",
      email: "ryan.cooper@email.com",
      phone: "+1 (555) 333-4444",
      linkedinProfile: "linkedin.com/in/ryancooper",
      skills: ["Angular", "TypeScript", "RxJS", "Firebase"],
      status: "Rejected",
      statusTooltip: "Candidate application has been rejected.",
      interviewer: "Alex Thompson",
      jobTitle: "Software Engineer",
      hasRecording: true,
      roleFitScore: 42,
    },
    
    // UX Designer candidates
    {
      id: 2,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 234-5678",
      linkedinProfile: "linkedin.com/in/emilydavis",
      skills: ["Figma", "UI/UX Design", "Adobe XD", "Prototyping", "User Research"],
      status: "Review",
      statusTooltip: "Application is under review by the hiring team.",
      interviewer: "Jennifer Davis",
      jobTitle: "UX Designer",
      hasRecording: false,
      roleFitScore: 92,
    },
    {
      id: 14,
      name: "Olivia Brown",
      email: "olivia.brown@email.com",
      phone: "+1 (555) 444-5555",
      linkedinProfile: "linkedin.com/in/oliviabrown",
      skills: ["Sketch", "InVision", "User Testing", "Wireframing"],
      status: "Offered",
      statusTooltip: "Offer has been extended to the candidate.",
      interviewer: "Jennifer Davis",
      jobTitle: "UX Designer",
      hasRecording: true,
      roleFitScore: 88,
    },
    {
      id: 15,
      name: "Lucas Williams",
      email: "lucas.williams@email.com",
      phone: "+1 (555) 555-6666",
      linkedinProfile: "linkedin.com/in/lucaswilliams",
      skills: ["Figma", "Adobe Creative Suite", "Design Systems"],
      status: "Sourced",
      statusTooltip: "Candidate has been sourced and identified.",
      interviewer: "Not Assigned",
      jobTitle: "UX Designer",
      hasRecording: false,
      roleFitScore: 71,
    },
    
    // Backend Developer candidates
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+1 (555) 345-6789",
      linkedinProfile: "linkedin.com/in/michaelbrown",
      skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL"],
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for the position.",
      interviewer: "Michael Roberts",
      jobTitle: "Backend Developer",
      hasRecording: true,
      roleFitScore: 78,
    },
    {
      id: 16,
      name: "Ethan Garcia",
      email: "ethan.garcia@email.com",
      phone: "+1 (555) 666-7777",
      linkedinProfile: "linkedin.com/in/ethangarcia",
      skills: ["Python", "Django", "REST APIs", "MySQL"],
      status: "Interview",
      statusTooltip: "Interview has been scheduled with the candidate.",
      interviewer: "Michael Roberts",
      jobTitle: "Backend Developer",
      hasRecording: true,
      roleFitScore: 83,
    },
    {
      id: 17,
      name: "Ava Martinez",
      email: "ava.martinez@email.com",
      phone: "+1 (555) 777-8888",
      linkedinProfile: "linkedin.com/in/avamartinez",
      skills: ["Node.js", "Express", "MongoDB", "GraphQL"],
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      interviewer: "Not Assigned",
      jobTitle: "Backend Developer",
      hasRecording: false,
      roleFitScore: 69,
    },
    {
      id: 18,
      name: "Noah Rodriguez",
      email: "noah.rodriguez@email.com",
      phone: "+1 (555) 888-9999",
      linkedinProfile: "linkedin.com/in/noahrodriguez",
      skills: ["Java", "Spring", "Hibernate", "Oracle"],
      status: "Withdrawn",
      statusTooltip: "Candidate has withdrawn their application.",
      interviewer: "Michael Roberts",
      jobTitle: "Backend Developer",
      hasRecording: false,
      roleFitScore: 75,
    },
    
    // Data Scientist candidates
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 (555) 456-7890",
      linkedinProfile: "linkedin.com/in/sarahwilson",
      skills: ["Python", "Data Analysis", "Machine Learning", "TensorFlow"],
      status: "Offered",
      statusTooltip: "Offer has been extended to the candidate.",
      interviewer: "Sarah Kim",
      jobTitle: "Data Scientist",
      hasRecording: true,
      roleFitScore: 88,
    },
    {
      id: 19,
      name: "Isabella Thomas",
      email: "isabella.thomas@email.com",
      phone: "+1 (555) 999-0000",
      linkedinProfile: "linkedin.com/in/isabellathomas",
      skills: ["R", "Statistics", "PyTorch", "Data Visualization"],
      status: "Review",
      statusTooltip: "Application is under review by the hiring team.",
      interviewer: "Sarah Kim",
      jobTitle: "Data Scientist",
      hasRecording: false,
      roleFitScore: 81,
    },
    {
      id: 20,
      name: "Mason Lee",
      email: "mason.lee@email.com",
      phone: "+1 (555) 000-1111",
      linkedinProfile: "linkedin.com/in/masonlee",
      skills: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for the position.",
      interviewer: "Sarah Kim",
      jobTitle: "Data Scientist",
      hasRecording: true,
      roleFitScore: 79,
    },
    
    // DevOps Engineer candidates
    {
      id: 5,
      name: "David Johnson",
      email: "david.johnson@email.com",
      phone: "+1 (555) 567-8901",
      linkedinProfile: "linkedin.com/in/davidjohnson",
      skills: ["DevOps", "Docker", "AWS", "Kubernetes", "CI/CD"],
      status: "Accepted",
      statusTooltip: "Candidate has accepted the job offer.",
      interviewer: "David Martinez",
      jobTitle: "DevOps Engineer",
      hasRecording: false,
      roleFitScore: 95,
    },
    {
      id: 21,
      name: "Mia Taylor",
      email: "mia.taylor@email.com",
      phone: "+1 (555) 111-2222",
      linkedinProfile: "linkedin.com/in/miataylor",
      skills: ["Terraform", "Jenkins", "Azure", "Linux"],
      status: "Interview",
      statusTooltip: "Interview has been scheduled with the candidate.",
      interviewer: "David Martinez",
      jobTitle: "DevOps Engineer",
      hasRecording: true,
      roleFitScore: 86,
    },
    {
      id: 22,
      name: "William Harris",
      email: "william.harris@email.com",
      phone: "+1 (555) 222-3333",
      linkedinProfile: "linkedin.com/in/williamharris",
      skills: ["Ansible", "Docker", "Kubernetes", "GCP"],
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      interviewer: "Not Assigned",
      jobTitle: "DevOps Engineer",
      hasRecording: false,
      roleFitScore: 73,
    },
    
    // Product Manager candidates
    {
      id: 6,
      name: "Jessica Lee",
      email: "jessica.lee@email.com",
      phone: "+1 (555) 678-9012",
      linkedinProfile: "linkedin.com/in/jessicalee",
      skills: ["Product Management", "Agile", "Analytics", "Roadmapping"],
      status: "Sourced",
      statusTooltip: "Candidate has been sourced and identified.",
      interviewer: "Lisa Chen",
      jobTitle: "Product Manager",
      hasRecording: false,
      roleFitScore: 72,
    },
    {
      id: 23,
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 333-4444",
      linkedinProfile: "linkedin.com/in/jameswilson",
      skills: ["Product Strategy", "Market Research", "Jira", "SQL"],
      status: "Review",
      statusTooltip: "Application is under review by the hiring team.",
      interviewer: "Lisa Chen",
      jobTitle: "Product Manager",
      hasRecording: false,
      roleFitScore: 77,
    },
    {
      id: 24,
      name: "Charlotte Moore",
      email: "charlotte.moore@email.com",
      phone: "+1 (555) 444-5555",
      linkedinProfile: "linkedin.com/in/charlottemoore",
      skills: ["Product Development", "Scrum", "UX", "Data Analysis"],
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for the position.",
      interviewer: "Lisa Chen",
      jobTitle: "Product Manager",
      hasRecording: true,
      roleFitScore: 84,
    },
    
    // Senior Backend Developer candidates
    {
      id: 7,
      name: "Robert Taylor",
      email: "robert.taylor@email.com",
      phone: "+1 (555) 789-0123",
      linkedinProfile: "linkedin.com/in/roberttaylor",
      skills: ["Backend Development", "Database Design", "SQL"],
      status: "Rejected",
      statusTooltip: "Candidate application has been rejected.",
      interviewer: "James Wilson",
      jobTitle: "Senior Backend Developer",
      hasRecording: true,
      roleFitScore: 35,
    },
    {
      id: 25,
      name: "Benjamin White",
      email: "benjamin.white@email.com",
      phone: "+1 (555) 555-6666",
      linkedinProfile: "linkedin.com/in/benjaminwhite",
      skills: ["Scala", "Kafka", "Microservices", "Redis"],
      status: "Interview",
      statusTooltip: "Interview has been scheduled with the candidate.",
      interviewer: "James Wilson",
      jobTitle: "Senior Backend Developer",
      hasRecording: true,
      roleFitScore: 91,
    },
    {
      id: 26,
      name: "Amelia Clark",
      email: "amelia.clark@email.com",
      phone: "+1 (555) 666-7777",
      linkedinProfile: "linkedin.com/in/ameliaclark",
      skills: ["Go", "PostgreSQL", "Docker", "REST APIs"],
      status: "Offered",
      statusTooltip: "Offer has been extended to the candidate.",
      interviewer: "James Wilson",
      jobTitle: "Senior Backend Developer",
      hasRecording: false,
      roleFitScore: 87,
    },
    
    // Frontend Developer candidates
    {
      id: 8,
      name: "Lisa Chen",
      email: "lisa.chen@email.com",
      phone: "+1 (555) 890-1234",
      linkedinProfile: "linkedin.com/in/lisachen",
      skills: ["React", "TypeScript", "CSS", "Tailwind"],
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      interviewer: "Not Assigned",
      jobTitle: "Frontend Developer",
      hasRecording: false,
      roleFitScore: 68,
    },
    {
      id: 27,
      name: "Harper Lewis",
      email: "harper.lewis@email.com",
      phone: "+1 (555) 777-8888",
      linkedinProfile: "linkedin.com/in/harperlewis",
      skills: ["Vue.js", "Nuxt", "SCSS", "Webpack"],
      status: "Sourced",
      statusTooltip: "Candidate has been sourced and identified.",
      interviewer: "Not Assigned",
      jobTitle: "Frontend Developer",
      hasRecording: false,
      roleFitScore: 74,
    },
    {
      id: 28,
      name: "Elijah Walker",
      email: "elijah.walker@email.com",
      phone: "+1 (555) 888-9999",
      linkedinProfile: "linkedin.com/in/elijahwalker",
      skills: ["React", "Next.js", "Styled Components", "Redux"],
      status: "Review",
      statusTooltip: "Application is under review by the hiring team.",
      interviewer: "Not Assigned",
      jobTitle: "Frontend Developer",
      hasRecording: true,
      roleFitScore: 82,
    },
    
    // Mobile Developer candidates
    {
      id: 9,
      name: "Mark Anderson",
      email: "mark.anderson@email.com",
      phone: "+1 (555) 901-2345",
      linkedinProfile: "linkedin.com/in/markanderson",
      skills: ["Mobile Development", "React Native", "iOS", "Android"],
      status: "Interview",
      statusTooltip: "Interview has been scheduled with the candidate.",
      interviewer: "Alex Thompson",
      jobTitle: "Mobile Developer",
      hasRecording: true,
      roleFitScore: 81,
    },
    {
      id: 29,
      name: "Abigail Hall",
      email: "abigail.hall@email.com",
      phone: "+1 (555) 999-0000",
      linkedinProfile: "linkedin.com/in/abigailhall",
      skills: ["Flutter", "Dart", "Firebase", "Mobile UI"],
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for the position.",
      interviewer: "Alex Thompson",
      jobTitle: "Mobile Developer",
      hasRecording: false,
      roleFitScore: 76,
    },
    {
      id: 30,
      name: "Alexander Young",
      email: "alexander.young@email.com",
      phone: "+1 (555) 000-1111",
      linkedinProfile: "linkedin.com/in/alexanderyoung",
      skills: ["Swift", "iOS Development", "Xcode", "UIKit"],
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      interviewer: "Not Assigned",
      jobTitle: "Mobile Developer",
      hasRecording: false,
      roleFitScore: 70,
    },
    
    // QA Engineer candidates
    {
      id: 10,
      name: "Amanda White",
      email: "amanda.white@email.com",
      phone: "+1 (555) 012-3456",
      linkedinProfile: "linkedin.com/in/amandawhite",
      skills: ["QA Testing", "Automation", "Selenium", "Cypress"],
      status: "Review",
      statusTooltip: "Application is under review by the hiring team.",
      interviewer: "Jennifer Davis",
      jobTitle: "QA Engineer",
      hasRecording: false,
      roleFitScore: 76,
    },
    {
      id: 31,
      name: "Evelyn King",
      email: "evelyn.king@email.com",
      phone: "+1 (555) 111-2222",
      linkedinProfile: "linkedin.com/in/evelynking",
      skills: ["Test Automation", "Jest", "Playwright", "API Testing"],
      status: "Offered",
      statusTooltip: "Offer has been extended to the candidate.",
      interviewer: "Jennifer Davis",
      jobTitle: "QA Engineer",
      hasRecording: true,
      roleFitScore: 89,
    },
    {
      id: 32,
      name: "Sebastian Wright",
      email: "sebastian.wright@email.com",
      phone: "+1 (555) 222-3333",
      linkedinProfile: "linkedin.com/in/sebastianwright",
      skills: ["Manual Testing", "Selenium", "TestNG", "JIRA"],
      status: "Sourced",
      statusTooltip: "Candidate has been sourced and identified.",
      interviewer: "Not Assigned",
      jobTitle: "QA Engineer",
      hasRecording: false,
      roleFitScore: 67,
    },
  ]);

  const handleActionClick = (action: string, candidate: any) => {
    if (action === "schedule-interview") {
      handleScheduleInterview(candidate);
    } else if (action === "view-profile") {
      navigate(`/sales-plan/candidate-profile/${candidate.id}`);
    }
  };

  const candidatesWithExp = allCandidates.map(c => ({
    ...c,
    yearsOfExperience: (c.id % 8) + 2
  }));

  return (
    <>
      <ModernCandidateList 
        role="ta-leader" 
        candidates={candidatesWithExp} 
        onAction={handleActionClick} 
      />

      {/* Schedule Interview Sheet */}
      <Sheet open={scheduleSheetOpen} onOpenChange={setScheduleSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {isRescheduling ? "Reschedule Interview" : "Schedule Interview"}
            </SheetTitle>
            <SheetDescription>
              {isRescheduling 
                ? "Update the interview details for this candidate"
                : "Set up an interview for this candidate"}
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6 py-6">
            {/* Candidate Info Card */}
            {selectedCandidate && (
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedCandidate.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCandidate.jobTitle}</p>
                </div>
              </div>
            )}
            
            {/* Questionnaire Name */}
            <div className="space-y-2">
              <Label htmlFor="questionnaire-name">Questionnaire Name</Label>
              <Input 
                id="questionnaire-name"
                placeholder="Enter questionnaire name"
                value={questionnaireName}
                onChange={(e) => setQuestionnaireName(e.target.value)}
                className="bg-background"
              />
            </div>
            
            {/* Expiry Date with Calendar Popover */}
            <div className="space-y-2">
              <Label>
                Interview Link Expiry Date <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background",
                      !interviewExpiryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {interviewExpiryDate ? format(interviewExpiryDate, "PPP") : "Select expiry date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={interviewExpiryDate}
                    onSelect={setInterviewExpiryDate}
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground">
                The interview link will expire on this date
              </p>
            </div>
          </div>
          
          <SheetFooter className="flex gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setScheduleSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitSchedule} disabled={!interviewExpiryDate}>
              <Link className="mr-2 h-4 w-4" />
              {isRescheduling ? "Update & Send Link" : "Send Interview Link"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
